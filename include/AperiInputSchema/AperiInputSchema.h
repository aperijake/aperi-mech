#pragma once

#include <yaml-cpp/yaml.h>

#include <iostream>
#include <vector>

#include "IoInputSchemaCreator.h"

namespace aperi {

/**
 * @class AperiInputSchema
 * @brief Class for creating the Aperi input schema in YAML format.
 *
 * This class provides methods for creating the Aperi input schema in YAML format.
 */
class AperiInputSchema {
   public:
    AperiInputSchema() = default;
    ~AperiInputSchema() = default;

    /**
     * Retrieves the full input schema_creator as a YAML node.
     *
     * @return The YAML node representing the input schema_creator.
     */
    virtual YAML::Node GetInputSchema() {
        return GetProceduresSchemaCreator().GetInputSchema();
    }

   protected:
    virtual InputSchemaCreator GetFileSchemaCreator() {
        InputSchemaCreator schema_creator("file", "string", "the file to write");
        return schema_creator;
    }

    virtual InputSchemaCreator GetTimeStartSchemaCreator() {
        InputSchemaCreator schema_creator("time_start", "float", "the start time");
        return schema_creator;
    }

    virtual InputSchemaCreator GetTimeEndSchemaCreator() {
        InputSchemaCreator schema_creator("time_end", "float", "the end time");
        return schema_creator;
    }

    virtual InputSchemaCreator GetTimeIncrementSchemaCreator() {
        InputSchemaCreator schema_creator("time_increment", "float", "the time increment");
        return schema_creator;
    }

    virtual InputSchemaCreator GetScaleFactorSchemaCreator() {
        InputSchemaCreator schema_creator("scale_factor", "float", "the scale factor");
        return schema_creator;
    }

    virtual InputSchemaCreator GetUpdateIntervalSchemaCreator() {
        InputSchemaCreator schema_creator("update_interval", "int", "the update interval");
        return schema_creator;
    }

    virtual InputSchemaCreator GetSetSchemaCreator() {
        InputSchemaCreator schema_creator("set", "string", "the name of the set");
        return schema_creator;
    }

    virtual InputSchemaCreator GetSetsSchemaCreator() {
        InputSchemaCreator schema_creator("sets", "sequence", "the name of the sets");
        return schema_creator;
    }

    virtual InputSchemaCreator GetMagnitudeSchemaCreator() {
        InputSchemaCreator schema_creator("magnitude", "float", "the magnitude of the vector");
        return schema_creator;
    }

    virtual InputSchemaCreator GetDirectionSchemaCreator() {
        InputSchemaCreator schema_creator("direction", "direction_vector", "the direction of the vector");
        return schema_creator;
    }

    virtual InputSchemaCreator GetVectorSchemaCreator() {
        InputSchemaCreator schema_creator("vector", "map", "the vector");
        schema_creator.AddAllOf(GetMagnitudeSchemaCreator().GetInputSchema());
        schema_creator.AddAllOf(GetDirectionSchemaCreator().GetInputSchema());
        return schema_creator;
    }

    virtual InputSchemaCreator GetXComponentSchemaCreator() {
        InputSchemaCreator schema_creator("X", "float", "the x component value");
        return schema_creator;
    }

    virtual InputSchemaCreator GetYComponentSchemaCreator() {
        InputSchemaCreator schema_creator("Y", "float", "the y component value");
        return schema_creator;
    }

    virtual InputSchemaCreator GetZComponentSchemaCreator() {
        InputSchemaCreator schema_creator("Z", "float", "the z component value");
        return schema_creator;
    }

    virtual InputSchemaCreator GetComponentsSchemaCreator() {
        InputSchemaCreator schema_creator("components", "map", "the components");
        schema_creator.AddOneOrMoreOf({GetXComponentSchemaCreator().GetInputSchema(),
                                       GetYComponentSchemaCreator().GetInputSchema(),
                                       GetZComponentSchemaCreator().GetInputSchema()});
        return schema_creator;
    }

    virtual InputSchemaCreator GetAbscissaValuesSchemaCreator() {
        InputSchemaCreator schema_creator("abscissa_values", "float_vector", "the abscissa values");
        return schema_creator;
    }

    virtual InputSchemaCreator GetOrdinateValuesSchemaCreator() {
        InputSchemaCreator schema_creator("ordinate_values", "float_vector", "the ordinate values");
        return schema_creator;
    }

    virtual InputSchemaCreator GetRampFunctionSchemaCreator() {
        InputSchemaCreator schema_creator("ramp_function", "map", "a piecewise linear function");
        schema_creator.AddAllOf(GetAbscissaValuesSchemaCreator().GetInputSchema());
        schema_creator.AddAllOf(GetOrdinateValuesSchemaCreator().GetInputSchema());
        return schema_creator;
    }

    virtual InputSchemaCreator GetSmoothStepFunctionSchemaCreator() {
        InputSchemaCreator schema_creator("smooth_step_function", "map", "a smooth step function");
        schema_creator.AddAllOf(GetAbscissaValuesSchemaCreator().GetInputSchema());
        schema_creator.AddAllOf(GetOrdinateValuesSchemaCreator().GetInputSchema());
        return schema_creator;
    }

    virtual InputSchemaCreator GetTimeFunctionSchemaCreator() {
        InputSchemaCreator schema_creator("time_function", "map", "a time function");
        schema_creator.AddOneOf({GetRampFunctionSchemaCreator().GetInputSchema(),
                                 GetSmoothStepFunctionSchemaCreator().GetInputSchema()});
        return schema_creator;
    }

    virtual InputSchemaCreator GetActiveTimeRangeSchemaCreator() {
        InputSchemaCreator schema_creator("active_time_range", "map", "the active time range");
        schema_creator.AddAllOf(GetTimeStartSchemaCreator().GetInputSchema());
        schema_creator.AddAllOf(GetTimeEndSchemaCreator().GetInputSchema());
        return schema_creator;
    }

    virtual InputSchemaCreator GetDirectTimeStepperSchemaCreator() {
        InputSchemaCreator schema_creator("direct_time_stepper", "map", "the direct time stepper");
        schema_creator.AddAllOf(GetTimeIncrementSchemaCreator().GetInputSchema());
        schema_creator.AddAllOf(GetTimeEndSchemaCreator().GetInputSchema());
        return schema_creator;
    }

    virtual InputSchemaCreator GetPowerMethodTimeStepperSchemaCreator() {
        InputSchemaCreator schema_creator("power_method_time_stepper", "map", "the power method time stepper");
        schema_creator.AddAllOf(GetTimeEndSchemaCreator().GetInputSchema());
        schema_creator.AddAllOf(GetScaleFactorSchemaCreator().GetInputSchema());
        schema_creator.AddAllOf(GetUpdateIntervalSchemaCreator().GetInputSchema());
        return schema_creator;
    }

    virtual InputSchemaCreator GetTimeStepperSchemaCreator() {
        InputSchemaCreator schema_creator("time_stepper", "map", "the time stepper");
        schema_creator.AddOneOf({GetDirectTimeStepperSchemaCreator().GetInputSchema(),
                                 GetPowerMethodTimeStepperSchemaCreator().GetInputSchema()});
        return schema_creator;
    }

    virtual InputSchemaCreator GetOutputCoefficientsSchemaCreator() {
        InputSchemaCreator schema_creator("output_coefficients", "bool", "indicates whether to output coefficients");
        return schema_creator;
    }

    virtual InputSchemaCreator GetOutputSchemaCreator() {
        InputSchemaCreator schema_creator("output", "map", "the output");
        schema_creator.AddAllOf(GetFileSchemaCreator().GetInputSchema());
        schema_creator.AddAllOf(GetTimeEndSchemaCreator().GetInputSchema());
        schema_creator.AddAllOf(GetTimeIncrementSchemaCreator().GetInputSchema());
        schema_creator.AddOptional(GetTimeStartSchemaCreator().GetInputSchema());
        schema_creator.AddOptional(GetOutputCoefficientsSchemaCreator().GetInputSchema());
        return schema_creator;
    }

    virtual InputSchemaCreator GetGravityLoadSchemaCreator() {
        InputSchemaCreator schema_creator("gravity_load", "map", "the gravity load");
        schema_creator.AddAllOf(GetSetsSchemaCreator().GetInputSchema());
        schema_creator.AddOneOf({GetVectorSchemaCreator().GetInputSchema(),
                                 GetComponentsSchemaCreator().GetInputSchema()});
        schema_creator.AddOptional(GetTimeFunctionSchemaCreator().GetInputSchema());
        return schema_creator;
    }

    virtual InputSchemaCreator GetLoadsSchemaCreator() {
        InputSchemaCreator schema_creator("loads", "sequence", "the loads");
        schema_creator.AddOneOrMoreOf({GetGravityLoadSchemaCreator().GetInputSchema()});
        return schema_creator;
    }

    virtual InputSchemaCreator GetAllExteriorSurfacesSchemaCreator() {
        InputSchemaCreator schema_creator("all_exterior_surfaces", "map", "the all exterior surfaces condition");
        return schema_creator;
    }

    virtual InputSchemaCreator GetInitialVelocitySchemaCreator() {
        InputSchemaCreator schema_creator("velocity", "map", "the initial velocity");
        schema_creator.AddAllOf(GetSetsSchemaCreator().GetInputSchema());
        schema_creator.AddOneOf({GetVectorSchemaCreator().GetInputSchema(),
                                 GetComponentsSchemaCreator().GetInputSchema()});
        return schema_creator;
    }

    virtual InputSchemaCreator GetInitialConditionsSchemaCreator() {
        InputSchemaCreator schema_creator("initial_conditions", "sequence", "the initial conditions");
        schema_creator.AddOptional(GetInitialVelocitySchemaCreator().GetInputSchema());
        return schema_creator;
    }

    virtual InputSchemaCreator GetSpecifiedVelocitySchemaCreator() {
        InputSchemaCreator schema_creator("velocity", "map", "a velocity boundary condition");
        schema_creator.AddAllOf(GetSetsSchemaCreator().GetInputSchema());
        schema_creator.AddOneOf({GetTimeFunctionSchemaCreator().GetInputSchema()});
        schema_creator.AddOneOf({GetVectorSchemaCreator().GetInputSchema(),
                                 GetComponentsSchemaCreator().GetInputSchema()});
        schema_creator.AddOptional(GetActiveTimeRangeSchemaCreator().GetInputSchema());
        return schema_creator;
    }

    virtual InputSchemaCreator GetSpecifiedDisplacementSchemaCreator() {
        InputSchemaCreator schema_creator("displacement", "map", "a displacement boundary condition");
        schema_creator.AddAllOf(GetSetsSchemaCreator().GetInputSchema());
        schema_creator.AddOneOf({GetTimeFunctionSchemaCreator().GetInputSchema()});
        schema_creator.AddOneOf({GetVectorSchemaCreator().GetInputSchema(),
                                 GetComponentsSchemaCreator().GetInputSchema()});
        schema_creator.AddOptional(GetActiveTimeRangeSchemaCreator().GetInputSchema());
        return schema_creator;
    }

    virtual InputSchemaCreator GetBoundaryConditionsSchemaCreator() {
        InputSchemaCreator schema_creator("boundary_conditions", "sequence", "the boundary conditions");
        schema_creator.AddOneOrMoreOf({GetSpecifiedVelocitySchemaCreator().GetInputSchema(),
                                       GetSpecifiedDisplacementSchemaCreator().GetInputSchema()});
        return schema_creator;
    }

    virtual InputSchemaCreator GetDensitySchemaCreator() {
        InputSchemaCreator schema_creator("density", "float", "the density");
        return schema_creator;
    }

    virtual InputSchemaCreator GetLambdaSchemaCreator() {
        InputSchemaCreator schema_creator("lambda", "float", "Lame's first parameter");
        return schema_creator;
    }

    virtual InputSchemaCreator GetYoungsModulusSchemaCreator() {
        InputSchemaCreator schema_creator("youngs_modulus", "float", "the youngs modulus");
        return schema_creator;
    }

    virtual InputSchemaCreator GetPoissonsRatioSchemaCreator() {
        InputSchemaCreator schema_creator("poissons_ratio", "float", "the poissons ratio");
        return schema_creator;
    }

    virtual InputSchemaCreator GetBulkModulusSchemaCreator() {
        InputSchemaCreator schema_creator("bulk_modulus", "float", "the bulk modulus");
        return schema_creator;
    }

    virtual InputSchemaCreator GetShearModulusSchemaCreator() {
        InputSchemaCreator schema_creator("shear_modulus", "float", "the shear modulus");
        return schema_creator;
    }

    virtual InputSchemaCreator GetYieldStressSchemaCreator() {
        InputSchemaCreator schema_creator("yield_stress", "float", "the yield stress");
        return schema_creator;
    }

    virtual InputSchemaCreator GetHardeningModulusSchemaCreator() {
        InputSchemaCreator schema_creator("hardening_modulus", "float", "the hardening modulus");
        return schema_creator;
    }

    virtual InputSchemaCreator GetA1SchemaCreator() {
        InputSchemaCreator schema_creator("A1", "float", "the A1 parameter");
        return schema_creator;
    }

    virtual InputSchemaCreator GetA2SchemaCreator() {
        InputSchemaCreator schema_creator("A2", "float", "the A2 parameter");
        return schema_creator;
    }

    virtual InputSchemaCreator GetA2GSchemaCreator() {
        InputSchemaCreator schema_creator("A2G", "float", "the A2G parameter");
        return schema_creator;
    }

    virtual InputSchemaCreator GetASchemaCreator() {
        InputSchemaCreator schema_creator("A", "float", "the creep constant");
        return schema_creator;
    }

    virtual InputSchemaCreator GetNSchemaCreator() {
        InputSchemaCreator schema_creator("n", "float", "the creep exponent");
        return schema_creator;
    }

    virtual InputSchemaCreator GetMSchemaCreator() {
        InputSchemaCreator schema_creator("m", "float", "the thermal constant");
        return schema_creator;
    }

    virtual InputSchemaCreator GetI1CriticalSchemaCreator() {
        InputSchemaCreator schema_creator("I1_critical", "float", "the I1 value at which damage starts");
        return schema_creator;
    }

    virtual InputSchemaCreator GetI1FailureSchemaCreator() {
        InputSchemaCreator schema_creator("I1_failure", "float", "the I1 value at which damage is complete");
        return schema_creator;
    }

    virtual InputSchemaCreator GetAlphaSchemaCreator() {
        InputSchemaCreator schema_creator("alpha", "float", "the alpha (exponent) parameter");
        return schema_creator;
    }

    virtual InputSchemaCreator GetConstantTemperatureSchemaCreator() {
        InputSchemaCreator schema_creator("constant_temperature", "float", "use a constant temperature of the given value");
        return schema_creator;
    }

    virtual InputSchemaCreator GetLinearElasticSchemaCreator() {
        InputSchemaCreator schema_creator("linear_elastic", "map", "the elastic material properties for the small strain model");
        schema_creator.AddAllOf(GetDensitySchemaCreator().GetInputSchema());
        schema_creator.AddTwoOf({GetYoungsModulusSchemaCreator().GetInputSchema(),
                                 GetPoissonsRatioSchemaCreator().GetInputSchema(),
                                 GetLambdaSchemaCreator().GetInputSchema(),
                                 GetBulkModulusSchemaCreator().GetInputSchema(),
                                 GetShearModulusSchemaCreator().GetInputSchema()});
        return schema_creator;
    }

    virtual InputSchemaCreator GetElasticSchemaCreator() {
        InputSchemaCreator schema_creator("elastic", "map", "the elastic material properties for the St. Venant-Kirchhoff model");
        schema_creator.AddAllOf(GetDensitySchemaCreator().GetInputSchema());
        schema_creator.AddTwoOf({GetYoungsModulusSchemaCreator().GetInputSchema(),
                                 GetPoissonsRatioSchemaCreator().GetInputSchema(),
                                 GetLambdaSchemaCreator().GetInputSchema(),
                                 GetBulkModulusSchemaCreator().GetInputSchema(),
                                 GetShearModulusSchemaCreator().GetInputSchema()});
        return schema_creator;
    }

    virtual InputSchemaCreator GetNeoHookeanSchemaCreator() {
        InputSchemaCreator schema_creator("neo_hookean", "map", "the neo-Hookean material properties");
        schema_creator.AddAllOf(GetDensitySchemaCreator().GetInputSchema());
        schema_creator.AddTwoOf({GetYoungsModulusSchemaCreator().GetInputSchema(),
                                 GetPoissonsRatioSchemaCreator().GetInputSchema(),
                                 GetLambdaSchemaCreator().GetInputSchema(),
                                 GetBulkModulusSchemaCreator().GetInputSchema(),
                                 GetShearModulusSchemaCreator().GetInputSchema()});
        return schema_creator;
    }

    virtual InputSchemaCreator GetNeoHookeanWithDamageSchemaCreator() {
        InputSchemaCreator schema_creator("neo_hookean_with_damage", "map", "the neo-Hookean material properties with damage");
        schema_creator.AddAllOf(GetDensitySchemaCreator().GetInputSchema());
        schema_creator.AddTwoOf({GetYoungsModulusSchemaCreator().GetInputSchema(),
                                 GetPoissonsRatioSchemaCreator().GetInputSchema(),
                                 GetLambdaSchemaCreator().GetInputSchema(),
                                 GetBulkModulusSchemaCreator().GetInputSchema(),
                                 GetShearModulusSchemaCreator().GetInputSchema()});
        schema_creator.AddAllOf(GetI1CriticalSchemaCreator().GetInputSchema());
        schema_creator.AddAllOf(GetI1FailureSchemaCreator().GetInputSchema());
        schema_creator.AddAllOf(GetAlphaSchemaCreator().GetInputSchema());
        return schema_creator;
    }

    virtual InputSchemaCreator GetPlasticSchemaCreator() {
        InputSchemaCreator schema_creator("plastic", "map", "the plastic material properties");
        schema_creator.AddAllOf(GetDensitySchemaCreator().GetInputSchema());
        schema_creator.AddTwoOf({GetYoungsModulusSchemaCreator().GetInputSchema(),
                                 GetPoissonsRatioSchemaCreator().GetInputSchema(),
                                 GetLambdaSchemaCreator().GetInputSchema(),
                                 GetBulkModulusSchemaCreator().GetInputSchema(),
                                 GetShearModulusSchemaCreator().GetInputSchema()});
        return schema_creator;
    }

    virtual InputSchemaCreator GetDruckerPragerSchemaCreator() {
        InputSchemaCreator schema_creator("drucker_prager", "map", "the Drucker-Prager material properties");
        schema_creator.AddAllOf(GetDensitySchemaCreator().GetInputSchema());
        schema_creator.AddTwoOf({GetYoungsModulusSchemaCreator().GetInputSchema(),
                                 GetPoissonsRatioSchemaCreator().GetInputSchema(),
                                 GetLambdaSchemaCreator().GetInputSchema(),
                                 GetBulkModulusSchemaCreator().GetInputSchema(),
                                 GetShearModulusSchemaCreator().GetInputSchema()});
        schema_creator.AddAllOf(GetA1SchemaCreator().GetInputSchema());
        schema_creator.AddAllOf(GetA2SchemaCreator().GetInputSchema());
        schema_creator.AddAllOf(GetA2GSchemaCreator().GetInputSchema());
        return schema_creator;
    }

    virtual InputSchemaCreator GetPowerLawCreepSchemaCreator() {
        InputSchemaCreator schema_creator("power_law_creep", "map", "the power law creep material properties");
        schema_creator.AddAllOf(GetDensitySchemaCreator().GetInputSchema());
        schema_creator.AddTwoOf({GetYoungsModulusSchemaCreator().GetInputSchema(),
                                 GetPoissonsRatioSchemaCreator().GetInputSchema(),
                                 GetLambdaSchemaCreator().GetInputSchema(),
                                 GetBulkModulusSchemaCreator().GetInputSchema(),
                                 GetShearModulusSchemaCreator().GetInputSchema()});
        schema_creator.AddAllOf(GetASchemaCreator().GetInputSchema());
        schema_creator.AddAllOf(GetNSchemaCreator().GetInputSchema());
        schema_creator.AddAllOf(GetMSchemaCreator().GetInputSchema());
        schema_creator.AddOptional(GetConstantTemperatureSchemaCreator().GetInputSchema());
        return schema_creator;
    }

    virtual InputSchemaCreator GetMaterialSchemaCreator() {
        InputSchemaCreator schema_creator("material", "map", "the material");
        schema_creator.AddOneOf({GetLinearElasticSchemaCreator().GetInputSchema(),
                                 GetElasticSchemaCreator().GetInputSchema(),
                                 GetNeoHookeanSchemaCreator().GetInputSchema(),
                                 GetNeoHookeanWithDamageSchemaCreator().GetInputSchema(),
                                 GetPlasticSchemaCreator().GetInputSchema(),
                                 GetDruckerPragerSchemaCreator().GetInputSchema(),
                                 GetPowerLawCreepSchemaCreator().GetInputSchema()});
        return schema_creator;
    }

    virtual InputSchemaCreator GetIntegrationOrderSchemaCreator() {
        InputSchemaCreator schema_creator("integration_order", "int", "the integration order");
        return schema_creator;
    }

    virtual InputSchemaCreator GetGaussQuadratureSchemaCreator() {
        InputSchemaCreator schema_creator("gauss_quadrature", "map", "gauss quadrature");
        schema_creator.AddAllOf(GetIntegrationOrderSchemaCreator().GetInputSchema());
        return schema_creator;
    }

    virtual InputSchemaCreator GetSubdomainsSchemaCreator() {
        InputSchemaCreator schema_creator("subdomains", "int", "the number of smoothing cell subdomains");
        return schema_creator;
    }

    virtual InputSchemaCreator GetForceOnePassMethodSchemaCreator() {
        InputSchemaCreator schema_creator("force_one_pass_method", "bool", "force the one pass method");
        return schema_creator;
    }

    virtual InputSchemaCreator GetForceTwoPassMethodSchemaCreator() {
        InputSchemaCreator schema_creator("force_two_pass_method", "bool", "force the two pass method");
        return schema_creator;
    }

    virtual InputSchemaCreator GetUseFBarSchemaCreator() {
        InputSchemaCreator schema_creator("use_f_bar", "bool", "use f_bar");
        return schema_creator;
    }

    virtual InputSchemaCreator GetActivateCenterNodeSchemaCreator() {
        InputSchemaCreator schema_creator("activate_center_node", "bool", "activate the center node");
        return schema_creator;
    }

    virtual InputSchemaCreator GetActivateSubcellCenterNodeSchemaCreator() {
        InputSchemaCreator schema_creator("activate_subcell_center_node", "bool", "activate the subcell center node");
        return schema_creator;
    }

    virtual InputSchemaCreator GetNodalSmoothingCellSchemaCreator() {
        InputSchemaCreator schema_creator("nodal_smoothing_cell", "map", "a nodal smoothing cell");
        schema_creator.AddAllOf(GetSubdomainsSchemaCreator().GetInputSchema());
        return schema_creator;
    }

    virtual InputSchemaCreator GetElementSmoothingCellSchemaCreator() {
        InputSchemaCreator schema_creator("element_smoothing_cell", "map", "an element smoothing cell");
        schema_creator.AddAllOf(GetSubdomainsSchemaCreator().GetInputSchema());
        return schema_creator;
    }

    virtual InputSchemaCreator GetDeactivateSubcellsSmallerThanSchemaCreator() {
        InputSchemaCreator schema_creator("deactivate_subcells_smaller_than", "float", "deactivate subcells smaller than this size");
        return schema_creator;
    }

    virtual InputSchemaCreator GetStrainSmoothingSchemaCreator() {
        InputSchemaCreator schema_creator("strain_smoothing", "map", "strain smoothing");
        schema_creator.AddOneOf({GetNodalSmoothingCellSchemaCreator().GetInputSchema(),
                                 GetElementSmoothingCellSchemaCreator().GetInputSchema()});
        schema_creator.AddOptional(GetForceOnePassMethodSchemaCreator().GetInputSchema());
        schema_creator.AddOptional(GetForceTwoPassMethodSchemaCreator().GetInputSchema());
        schema_creator.AddOptional(GetUseFBarSchemaCreator().GetInputSchema());
        schema_creator.AddOptional(GetActivateCenterNodeSchemaCreator().GetInputSchema());
        schema_creator.AddOptional(GetActivateSubcellCenterNodeSchemaCreator().GetInputSchema());
        schema_creator.AddOptional(GetDeactivateSubcellsSmallerThanSchemaCreator().GetInputSchema());
        return schema_creator;
    }

    virtual InputSchemaCreator GetIntegrationSchemeSchemaCreator() {
        InputSchemaCreator schema_creator("integration_scheme", "map", "the integration scheme");
        schema_creator.AddOneOf({GetGaussQuadratureSchemaCreator().GetInputSchema(),
                                 GetStrainSmoothingSchemaCreator().GetInputSchema()});
        return schema_creator;
    }

    virtual InputSchemaCreator GetFiniteElementSchemaCreator() {
        InputSchemaCreator schema_creator("finite_element", "map", "finite element approximation");
        return schema_creator;
    }

    virtual InputSchemaCreator GetKernelRadiusScaleFactorSchemaCreator() {
        InputSchemaCreator schema_creator("kernel_radius_scale_factor", "float", "the kernel radius scale factor");
        return schema_creator;
    }

    virtual InputSchemaCreator GetReproducingKernelSchemaCreator() {
        InputSchemaCreator schema_creator("reproducing_kernel", "map", "reproducing kernel approximation");
        schema_creator.AddAllOf(GetKernelRadiusScaleFactorSchemaCreator().GetInputSchema());
        return schema_creator;
    }

    virtual InputSchemaCreator GetApproximationSpaceSchemaCreator() {
        InputSchemaCreator schema_creator("approximation_space", "map", "the approximation space");
        schema_creator.AddOneOf({GetFiniteElementSchemaCreator().GetInputSchema(),
                                 GetReproducingKernelSchemaCreator().GetInputSchema()});
        return schema_creator;
    }

    virtual InputSchemaCreator GetFormulationSchemaCreator() {
        InputSchemaCreator schema_creator("formulation", "map", "the formulation");
        schema_creator.AddAllOf(GetIntegrationSchemeSchemaCreator().GetInputSchema());
        schema_creator.AddAllOf(GetApproximationSpaceSchemaCreator().GetInputSchema());
        return schema_creator;
    }

    virtual InputSchemaCreator GetPartSchemaCreator() {
        InputSchemaCreator schema_creator("part", "map", "a part");
        schema_creator.AddAllOf(GetSetSchemaCreator().GetInputSchema());
        schema_creator.AddAllOf(GetMaterialSchemaCreator().GetInputSchema());
        schema_creator.AddOptional(GetFormulationSchemaCreator().GetInputSchema());
        return schema_creator;
    }

    virtual InputSchemaCreator GetPartsSchemaCreator() {
        InputSchemaCreator schema_creator("parts", "sequence", "the list of parts");
        schema_creator.AddOneOrMoreOf({GetPartSchemaCreator().GetInputSchema()});
        return schema_creator;
    }

    virtual InputSchemaCreator GetMeshSchemaCreator() {
        InputSchemaCreator schema_creator("mesh", "string", "the file containing the mesh");
        return schema_creator;
    }

    virtual InputSchemaCreator GetMeshSearchDirectoriesSchemaCreator() {
        InputSchemaCreator schema_creator("mesh_search_directories", "sequence", "the list of directories to search for the mesh");
        return schema_creator;
    }

    virtual InputSchemaCreator GetGeometrySchemaCreator() {
        InputSchemaCreator schema_creator("geometry", "map", "the section describing the geometry");
        schema_creator.AddAllOf(GetMeshSchemaCreator().GetInputSchema());
        schema_creator.AddAllOf(GetPartsSchemaCreator().GetInputSchema());
        schema_creator.AddOptional(GetMeshSearchDirectoriesSchemaCreator().GetInputSchema());
        return schema_creator;
    }

    virtual InputSchemaCreator GetTotalLagrangianSchemaCreator() {
        InputSchemaCreator schema_creator("total_lagrangian", "map", "total Lagrangian formulation");
        return schema_creator;
    }

    virtual InputSchemaCreator GetUpdatedLagrangianSchemaCreator() {
        InputSchemaCreator schema_creator("updated_lagrangian", "map", "updated Lagrangian formulation");
        return schema_creator;
    }

    virtual InputSchemaCreator GetSemiLagrangianSchemaCreator() {
        InputSchemaCreator schema_creator("semi_lagrangian", "map", "semi Lagrangian formulation");
        schema_creator.AddAllOf(GetUpdateIntervalSchemaCreator().GetInputSchema());
        return schema_creator;
    }

    virtual InputSchemaCreator GetLagrangianSchemaCreator() {
        InputSchemaCreator schema_creator("lagrangian", "map", "the Lagrangian formulation");
        schema_creator.AddOneOf({GetTotalLagrangianSchemaCreator().GetInputSchema(),
                                 GetUpdatedLagrangianSchemaCreator().GetInputSchema(),
                                 GetSemiLagrangianSchemaCreator().GetInputSchema()});
        return schema_creator;
    }

    virtual InputSchemaCreator GetExplicitDynamicsProcedureSchemaCreator() {
        InputSchemaCreator schema_creator("explicit_dynamics_procedure", "map", "an explicit dynamics procedure");
        schema_creator.AddAllOf(GetGeometrySchemaCreator().GetInputSchema());
        schema_creator.AddAllOf(GetTimeStepperSchemaCreator().GetInputSchema());
        schema_creator.AddAllOf(GetOutputSchemaCreator().GetInputSchema());
        schema_creator.AddOptional(GetInitialConditionsSchemaCreator().GetInputSchema());
        schema_creator.AddOptional(GetBoundaryConditionsSchemaCreator().GetInputSchema());
        schema_creator.AddOptional(GetLoadsSchemaCreator().GetInputSchema());
        schema_creator.AddOptional(GetLagrangianSchemaCreator().GetInputSchema());
        return schema_creator;
    }

    virtual InputSchemaCreator GetProceduresSchemaCreator() {
        InputSchemaCreator schema_creator("procedures", "sequence", "the list of procedures");
        schema_creator.AddOneOf({GetExplicitDynamicsProcedureSchemaCreator().GetInputSchema()});
        return schema_creator;
    }
};
}  // namespace aperi