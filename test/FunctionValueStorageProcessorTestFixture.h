#pragma once

#include <gtest/gtest.h>
#include <mpi.h>

#include <filesystem>
#include <iomanip>
#include <stk_io/StkMeshIoBroker.hpp>
#include <stk_mesh/base/BulkData.hpp>
#include <stk_mesh/base/FieldBase.hpp>
#include <stk_mesh/base/MeshBuilder.hpp>
#include <stk_mesh/base/MetaData.hpp>
#include <stk_mesh/base/NgpField.hpp>
#include <stk_mesh/base/Types.hpp>

#include "Constants.h"
#include "NeighborSearchProcessorTestFixture.h"
#include "ShapeFunctionsFunctorReproducingKernel.h"

class FunctionValueStorageProcessorTestFixture : public NeighborSearchProcessorTestFixture {
   protected:
    void SetUp() override {
        NeighborSearchProcessorTestFixture::SetUp();
    }

    void BuildFunctionValueStorageProcessor() {
        // Create the ShapeFunctionsFunctorReproducingKernel functor
        m_shape_functions_functor_reproducing_kernel = std::make_shared<aperi::ShapeFunctionsFunctorReproducingKernel<aperi::MAX_NODE_NUM_NEIGHBORS>>();

        // Create the function value storage processor
        m_function_value_storage_processor = std::make_shared<aperi::FunctionValueStorageProcessor>(m_mesh_data);
    }

    std::shared_ptr<aperi::ShapeFunctionsFunctorReproducingKernel<aperi::MAX_NODE_NUM_NEIGHBORS>> m_shape_functions_functor_reproducing_kernel;
    std::shared_ptr<aperi::FunctionValueStorageProcessor> m_function_value_storage_processor;
};
