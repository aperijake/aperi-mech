#include <gtest/gtest.h>

#include <Compadre_GMLS.hpp>
#include <Compadre_Evaluator.hpp>
#include <Compadre_PointCloudSearch.hpp>
#include <Kokkos_Core.hpp>
#include <cstdlib>

#include "CaptureOutputTestFixture.h"

// Compadre fixture
class CompadreTest : public CaptureOutputTest {
   protected:
    void SetUp() override {
        // Run CaptureOutputTest::SetUp first
        CaptureOutputTest::SetUp();
    }

    void TearDown() override {
        // Run CaptureOutputTest::TearDown last
        CaptureOutputTest::TearDown();
    }
};

KOKKOS_INLINE_FUNCTION
double trueSolution(double x, double y, double z, int order, int dimension) {
    double ans = 0;
    for (int i = 0; i < order + 1; i++) {
        for (int j = 0; j < order + 1; j++) {
            for (int k = 0; k < order + 1; k++) {
                if (i + j + k <= order) {
                    ans += std::pow(x, i) * std::pow(y, j) * std::pow(z, k);
                }
            }
        }
    }
    return ans;
};

KOKKOS_INLINE_FUNCTION
void samplingManufacturedSolution(Kokkos::View<double**, Kokkos::DefaultExecutionSpace> source_coords_device,
                                  Kokkos::View<double*, Kokkos::DefaultExecutionSpace> sampling_data_device, int source_coords_extent, int order, int dimension) {
    Kokkos::parallel_for(
        "Sampling Manufactured Solutions",
        Kokkos::RangePolicy<Kokkos::DefaultExecutionSpace>(0, source_coords_extent),
        KOKKOS_LAMBDA(const int i) {
            // coordinates of source site i
            double xval = source_coords_device(i, 0);
            double yval = (dimension > 1) ? source_coords_device(i, 1) : 0;
            double zval = (dimension > 2) ? source_coords_device(i, 2) : 0;

            // data for targets with scalar input
            sampling_data_device(i) = trueSolution(xval, yval, zval, order, dimension);
        });
}

// Test From: https://sandialabs.github.io/compadre/_g_m_l_s_01_tutorial-example.html
TEST_F(CompadreTest, GMLSTutorialExample) {
    StopCapturingOutput();
    int order = 1;
    int dimension = 3;
    int number_target_coords = 40e3;
    int number_of_batches = 1;
    bool keep_coefficients = number_of_batches == 1;

    // the functions we will be seeking to reconstruct are in the span of the basis
    // of the reconstruction space we choose for GMLS, so the error should be very small
    const double failure_tolerance = 1e-9;

    // minimum neighbors for unisolvency is the same as the size of the polynomial basis
    const int min_neighbors = Compadre::GMLS::getNP(order, dimension);

    EXPECT_EQ(min_neighbors, 4);

    //**************** Set up point cloud **************************
    // approximate spacing of source sites
    double h_spacing = 0.05;
    int n_neg1_to_1 = 2 * (1 / h_spacing) + 1;  // always odd

    // number of source coordinate sites that will fill a box of [-1,1]x[-1,1]x[-1,1] with a spacing approximately h
    const int number_source_coords = std::pow(n_neg1_to_1, dimension);

    // coordinates of source sites
    Kokkos::View<double**, Kokkos::DefaultExecutionSpace> source_coords_device("source coordinates",
                                                                               number_source_coords, 3);
    Kokkos::View<double**>::HostMirror source_coords = Kokkos::create_mirror_view(source_coords_device);

    // coordinates of target sites
    Kokkos::View<double**, Kokkos::DefaultExecutionSpace> target_coords_device("target coordinates", number_target_coords, 3);
    Kokkos::View<double**>::HostMirror target_coords = Kokkos::create_mirror_view(target_coords_device);

    // fill source coordinates with a uniform grid
    int source_index = 0;
    double this_coord[3] = {0, 0, 0};
    for (int i = -n_neg1_to_1 / 2; i < n_neg1_to_1 / 2 + 1; ++i) {
        this_coord[0] = i * h_spacing;
        for (int j = -n_neg1_to_1 / 2; j < n_neg1_to_1 / 2 + 1; ++j) {
            this_coord[1] = j * h_spacing;
            for (int k = -n_neg1_to_1 / 2; k < n_neg1_to_1 / 2 + 1; ++k) {
                this_coord[2] = k * h_spacing;
                if (dimension == 3) {
                    source_coords(source_index, 0) = this_coord[0];
                    source_coords(source_index, 1) = this_coord[1];
                    source_coords(source_index, 2) = this_coord[2];
                    source_index++;
                }
            }
            if (dimension == 2) {
                source_coords(source_index, 0) = this_coord[0];
                source_coords(source_index, 1) = this_coord[1];
                source_coords(source_index, 2) = 0;
                source_index++;
            }
        }
        if (dimension == 1) {
            source_coords(source_index, 0) = this_coord[0];
            source_coords(source_index, 1) = 0;
            source_coords(source_index, 2) = 0;
            source_index++;
        }
    }

    // fill target coords somewhere inside of [-0.5,0.5]x[-0.5,0.5]x[-0.5,0.5]
    for (int i = 0; i < number_target_coords; i++) {
        // first, we get a uniformly random distributed direction
        double rand_dir[3] = {0, 0, 0};

        for (int j = 0; j < dimension; ++j) {
            // rand_dir[j] is in [-0.5, 0.5]
            rand_dir[j] = ((double)rand() / (double)RAND_MAX) - 0.5;
        }

        // then we get a uniformly random radius
        for (int j = 0; j < dimension; ++j) {
            target_coords(i, j) = rand_dir[j];
        }
    }

    //**************** Perform Neighbor Search **************************
    // Point cloud construction for neighbor search
    // CreatePointCloudSearch constructs an object of type PointCloudSearch, but deduces the templates for you
    auto point_cloud_search(Compadre::CreatePointCloudSearch(source_coords, dimension));

    double epsilon_multiplier = 1.8;

    // neighbor_lists_device will contain all neighbor lists (for each target site) in a compressed row format
    // Initially, we do a dry-run to calculate neighborhood sizes before actually storing the result. This is
    // why we can start with a neighbor_lists_device size of 0.
    Kokkos::View<int*> neighbor_lists_device("neighbor lists",
                                             0);  // first column is # of neighbors
    Kokkos::View<int*>::HostMirror neighbor_lists = Kokkos::create_mirror_view(neighbor_lists_device);
    // number_of_neighbors_list must be the same size as the number of target sites so that it can be populated
    // with the number of neighbors for each target site.
    Kokkos::View<int*> number_of_neighbors_list_device("number of neighbor lists",
                                                       number_target_coords);  // first column is # of neighbors
    Kokkos::View<int*>::HostMirror number_of_neighbors_list = Kokkos::create_mirror_view(number_of_neighbors_list_device);

    // each target site has a window size
    Kokkos::View<double*, Kokkos::DefaultExecutionSpace> epsilon_device("h supports", number_target_coords);
    Kokkos::View<double*>::HostMirror epsilon = Kokkos::create_mirror_view(epsilon_device);

    // query the point cloud to generate the neighbor lists using a kdtree to produce the n nearest neighbor
    // to each target site, adding (epsilon_multiplier-1)*100% to whatever the distance away the further neighbor used is from
    // each target to the view for epsilon
    //
    // This dry run populates number_of_neighbors_list with neighborhood sizes
    size_t storage_size = point_cloud_search.generateCRNeighborListsFromKNNSearch(true /*dry run*/, target_coords, neighbor_lists,
                                                                                  number_of_neighbors_list, epsilon, min_neighbors, epsilon_multiplier);

    // resize neighbor_lists_device so as to be large enough to contain all neighborhoods
    Kokkos::resize(neighbor_lists_device, storage_size);
    neighbor_lists = Kokkos::create_mirror_view(neighbor_lists_device);

    // query the point cloud a second time, but this time storing results into neighbor_lists
    point_cloud_search.generateCRNeighborListsFromKNNSearch(false /*not dry run*/, target_coords, neighbor_lists,
                                                            number_of_neighbors_list, epsilon, min_neighbors, epsilon_multiplier);

    //**************** Creating the Data **************************
    // source coordinates need copied to device before using to construct sampling data
    Kokkos::deep_copy(source_coords_device, source_coords);

    // target coordinates copied next, because it is a convenient time to send them to device
    Kokkos::deep_copy(target_coords_device, target_coords);

    // need Kokkos View storing true solution
    Kokkos::View<double*, Kokkos::DefaultExecutionSpace> sampling_data_device("samples of true solution",
                                                                              source_coords_device.extent(0));

    // sample the true solution at the source sites
    samplingManufacturedSolution(source_coords_device, sampling_data_device, source_coords_device.extent(0), order, dimension);

    // ********************* Setting Up The GMLS Object ******************

    // Copy data back to device (they were filled on the host)
    // We could have filled Kokkos Views with memory space on the host
    // and used these instead, and then the copying of data to the device
    // would be performed in the GMLS class
    Kokkos::deep_copy(neighbor_lists_device, neighbor_lists);
    Kokkos::deep_copy(number_of_neighbors_list_device, number_of_neighbors_list);
    Kokkos::deep_copy(epsilon_device, epsilon);

    // initialize an instance of the GMLS class
    Compadre::GMLS my_GMLS(Compadre::VectorOfScalarClonesTaylorPolynomial, Compadre::VectorPointSample,
                           order, dimension);
    // solver_name.c_str(), problem_name.c_str(), constraint_name.c_str(),
    // 2 /*manifold order*/);

    // pass in neighbor lists, number of neighbor lists, source coordinates, target coordinates, and window sizes
    //
    // neighbor lists has a compressed row format and is a 1D view:
    //      dimensions: ? (determined by neighbor search, but total size of the sum of the number of neighbors over all target sites)
    //
    // number of neighbors list is a 1D view:
    //      dimensions: (# number of target sites)
    //                  each entry contains the number of neighbors for a target site
    //
    // source coordinates have the format:
    //      dimensions: (# number of source sites) X (dimension)
    //                  entries in the neighbor lists (integers) correspond to rows of this 2D array
    //
    // target coordinates have the format:
    //      dimensions: (# number of target sites) X (dimension)
    //                  # of target sites is same as # of rows of neighbor lists
    //
    my_GMLS.setProblemData(neighbor_lists_device, number_of_neighbors_list_device, source_coords_device, target_coords_device, epsilon_device);

    // create a vector of target operations
    std::vector<Compadre::TargetOperation> lro(1);
    lro[0] = Compadre::ScalarPointEvaluation;

    // and then pass them to the GMLS class
    my_GMLS.addTargets(lro);

    // sets the weighting kernel function from WeightingFunctionType
    my_GMLS.setWeightingType(Compadre::WeightingFunctionType::Power);

    // power to use in that weighting kernel function
    my_GMLS.setWeightingParameter(2);

    // generate the alphas that to be combined with data for each target operation requested in lro
    my_GMLS.generateAlphas(number_of_batches, keep_coefficients /* keep polynomial coefficients, only needed for a test later in this program */);


    //****************** Apply GMLS Alphas To Data **************************
    // it is important to note that if you expect to use the data as a 1D view, then you should use double*
    // however, if you know that the target operation will result in a 2D view (vector or matrix output),
    // then you should template with double** as this is something that can not be infered from the input data
    // or the target operator at compile time. Additionally, a template argument is required indicating either
    // Kokkos::HostSpace or Kokkos::DefaultExecutionSpace::memory_space() 
    
    // The Evaluator class takes care of handling input data views as well as the output data views.
    // It uses information from the GMLS class to determine how many components are in the input 
    // as well as output for any choice of target functionals and then performs the contactions
    // on the data using the alpha coefficients generated by the GMLS class, all on the device.
    Compadre::Evaluator gmls_evaluator(&my_GMLS);
    
    auto output_value = gmls_evaluator.applyAlphasToDataAllComponentsAllTargetSites<double*, Kokkos::HostSpace>
            (sampling_data_device, Compadre::ScalarPointEvaluation);
    
    //****************** Check That Solutions Are Correct ******************

    double max_error = 0;

    // loop through the target sites
    for (int i=0; i<number_target_coords; i++) {
    
        // load value from output
        double GMLS_value = output_value(i);
    
        // target site i's coordinate
        double xval = target_coords(i,0);
        double yval = (dimension>1) ? target_coords(i,1) : 0;
        double zval = (dimension>2) ? target_coords(i,2) : 0;
    
        // evaluation of various exact solutions
        double actual_value = trueSolution(xval, yval, zval, order, dimension);

        double abs_error = std::abs(actual_value - GMLS_value);

        max_error = (abs_error > max_error) ? abs_error : max_error;
    
        // check actual function value
        EXPECT_NEAR(actual_value, GMLS_value, failure_tolerance);
    }

    std::cout << "Max error: " << max_error << std::endl;
}
