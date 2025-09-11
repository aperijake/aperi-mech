#pragma once

#include <yaml-cpp/yaml.h>

#include <iostream>

#include "IoInputSchemaCreator.h"

namespace aperi {

inline YAML::Node GetFileNode() {
    InputSchemaCreator schema_creator("file", "string", "the file to write");
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetTimeStartNode() {
    InputSchemaCreator schema_creator("time_start", "float", "the start time");
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetTimeEndNode() {
    InputSchemaCreator schema_creator("time_end", "float", "the end time");
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetTimeIncrementNode() {
    InputSchemaCreator schema_creator("time_increment", "float", "the time increment");
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetScaleFactorNode() {
    InputSchemaCreator schema_creator("scale_factor", "float", "the scale factor");
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetUpdateIntervalNode() {
    InputSchemaCreator schema_creator("update_interval", "int", "the update interval");
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetSetNode() {
    InputSchemaCreator schema_creator("set", "string", "the name of the set");
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetSetsNode() {
    InputSchemaCreator schema_creator("sets", "sequence", "the name of the sets");
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetMagnitudeNode() {
    InputSchemaCreator schema_creator("magnitude", "float", "the magnitude of the vector");
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetDirectionNode() {
    InputSchemaCreator schema_creator("direction", "direction_vector", "the direction of the vector");
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetVectorNode() {
    InputSchemaCreator schema_creator("vector", "map", "the vector");
    schema_creator.AddAllOf(GetMagnitudeNode());
    schema_creator.AddAllOf(GetDirectionNode());
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetXComponentNode() {
    InputSchemaCreator schema_creator("X", "float", "the x component value");
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetYComponentNode() {
    InputSchemaCreator schema_creator("Y", "float", "the y component value");
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetZComponentNode() {
    InputSchemaCreator schema_creator("Z", "float", "the z component value");
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetComponentsNode() {
    InputSchemaCreator schema_creator("components", "map", "the components");
    schema_creator.AddOneOrMoreOf(GetXComponentNode());
    schema_creator.AddOneOrMoreOf(GetYComponentNode());
    schema_creator.AddOneOrMoreOf(GetZComponentNode());
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetAbscissaValuesNode() {
    InputSchemaCreator schema_creator("abscissa_values", "float_vector", "the abscissa values");
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetOrdinateValuesNode() {
    InputSchemaCreator schema_creator("ordinate_values", "float_vector", "the ordinate values");
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetRampFunctionNode() {
    InputSchemaCreator schema_creator("ramp_function", "map", "a piecewise linear function");
    schema_creator.AddAllOf(GetAbscissaValuesNode());
    schema_creator.AddAllOf(GetOrdinateValuesNode());
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetSmoothStepFunctionNode() {
    InputSchemaCreator schema_creator("smooth_step_function", "map", "a smooth step function");
    schema_creator.AddAllOf(GetAbscissaValuesNode());
    schema_creator.AddAllOf(GetOrdinateValuesNode());
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetTimeFunctionNode() {
    InputSchemaCreator schema_creator("time_function", "map", "a time function");
    schema_creator.AddOneOf(GetRampFunctionNode());
    schema_creator.AddOneOf(GetSmoothStepFunctionNode());
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetActiveTimeRangeNode() {
    InputSchemaCreator schema_creator("active_time_range", "map", "the active time range");
    schema_creator.AddAllOf(GetTimeStartNode());
    schema_creator.AddAllOf(GetTimeEndNode());
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetDirectTimeStepperNode() {
    InputSchemaCreator schema_creator("direct_time_stepper", "map", "the direct time stepper");
    schema_creator.AddAllOf(GetTimeIncrementNode());
    schema_creator.AddAllOf(GetTimeEndNode());
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetPowerMethodTimeStepperNode() {
    InputSchemaCreator schema_creator("power_method_time_stepper", "map", "the power method time stepper");
    schema_creator.AddAllOf(GetTimeEndNode());
    schema_creator.AddAllOf(GetScaleFactorNode());
    schema_creator.AddAllOf(GetUpdateIntervalNode());
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetTimeStepperNode() {
    InputSchemaCreator schema_creator("time_stepper", "map", "the time stepper");
    schema_creator.AddOneOf(GetDirectTimeStepperNode());
    schema_creator.AddOneOf(GetPowerMethodTimeStepperNode());
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetOutputCoefficientsNode() {
    InputSchemaCreator schema_creator("output_coefficients", "bool", "indicates whether to output coefficients");
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetOutputNode() {
    InputSchemaCreator schema_creator("output", "map", "the output");
    schema_creator.AddAllOf(GetFileNode());
    schema_creator.AddAllOf(GetTimeEndNode());
    schema_creator.AddAllOf(GetTimeIncrementNode());
    schema_creator.AddOptional(GetTimeStartNode());
    schema_creator.AddOptional(GetOutputCoefficientsNode());
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetGravityLoadNode() {
    InputSchemaCreator schema_creator("gravity_load", "map", "the gravity load");
    schema_creator.AddAllOf(GetSetsNode());
    schema_creator.AddOneOf(GetVectorNode());
    schema_creator.AddOneOf(GetComponentsNode());
    schema_creator.AddOptional(GetTimeFunctionNode());
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetLoadsNode() {
    InputSchemaCreator schema_creator("loads", "sequence", "the loads");
    schema_creator.AddOneOrMoreOf(GetGravityLoadNode());
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetAllExteriorSurfacesNode() {
    InputSchemaCreator schema_creator("all_exterior_surfaces", "map", "the all exterior surfaces condition");
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetPenaltyScaleFactorNode() {
    InputSchemaCreator schema_creator("penalty_scale_factor", "float", "the penalty scale factor");
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetPinballNode() {
    InputSchemaCreator schema_creator("pinball", "map", "the pinball contact conditions");
    schema_creator.AddOneOf(GetSetsNode());
    schema_creator.AddOneOf(GetAllExteriorSurfacesNode());
    schema_creator.AddOptional(GetPenaltyScaleFactorNode());
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetContactNode() {
    InputSchemaCreator schema_creator("contact", "sequence", "the contact configuration");
    schema_creator.AddOneOf(GetPinballNode());
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetInitialVelocityNode() {
    InputSchemaCreator schema_creator("velocity", "map", "the initial velocity");
    schema_creator.AddAllOf(GetSetsNode());
    schema_creator.AddOneOf(GetVectorNode());
    schema_creator.AddOneOf(GetComponentsNode());
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetInitialConditionsNode() {
    InputSchemaCreator schema_creator("initial_conditions", "sequence", "the initial conditions");
    schema_creator.AddOptional(GetInitialVelocityNode());
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetSpecifiedVelocityNode() {
    InputSchemaCreator schema_creator("velocity", "map", "a velocity boundary condition");
    schema_creator.AddAllOf(GetSetsNode());
    schema_creator.AddOneOf(GetTimeFunctionNode());
    schema_creator.AddOneOf(GetVectorNode(), 1);
    schema_creator.AddOneOf(GetComponentsNode(), 1);
    schema_creator.AddOptional(GetActiveTimeRangeNode());
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetSpecifiedDisplacementNode() {
    InputSchemaCreator schema_creator("displacement", "map", "a displacement boundary condition");
    schema_creator.AddAllOf(GetSetsNode());
    schema_creator.AddOneOf(GetTimeFunctionNode());
    schema_creator.AddOneOf(GetVectorNode(), 1);
    schema_creator.AddOneOf(GetComponentsNode(), 1);
    schema_creator.AddOptional(GetActiveTimeRangeNode());
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetBoundaryConditionsNode() {
    InputSchemaCreator schema_creator("boundary_conditions", "sequence", "the boundary conditions");
    schema_creator.AddOneOrMoreOf(GetSpecifiedVelocityNode());
    schema_creator.AddOneOrMoreOf(GetSpecifiedDisplacementNode());
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetDensityNode() {
    InputSchemaCreator schema_creator("density", "float", "the density");
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetLambdaNode() {
    InputSchemaCreator schema_creator("lambda", "float", "Lame's first parameter");
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetYoungsModulusNode() {
    InputSchemaCreator schema_creator("youngs_modulus", "float", "the youngs modulus");
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetPoissonsRatioNode() {
    InputSchemaCreator schema_creator("poissons_ratio", "float", "the poissons ratio");
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetBulkModulusNode() {
    InputSchemaCreator schema_creator("bulk_modulus", "float", "the bulk modulus");
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetShearModulusNode() {
    InputSchemaCreator schema_creator("shear_modulus", "float", "the shear modulus");
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetYieldStressNode() {
    InputSchemaCreator schema_creator("yield_stress", "float", "the yield stress");
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetHardeningModulusNode() {
    InputSchemaCreator schema_creator("hardening_modulus", "float", "the hardening modulus");
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetA1Node() {
    InputSchemaCreator schema_creator("A1", "float", "the A1 parameter");
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetA2Node() {
    InputSchemaCreator schema_creator("A2", "float", "the A2 parameter");
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetA2GNode() {
    InputSchemaCreator schema_creator("A2G", "float", "the A2G parameter");
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetANode() {
    InputSchemaCreator schema_creator("A", "float", "the creep constant");
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetNNode() {
    InputSchemaCreator schema_creator("n", "float", "the creep exponent");
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetMNode() {
    InputSchemaCreator schema_creator("m", "float", "the thermal constant");
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetI1CriticalNode() {
    InputSchemaCreator schema_creator("I1_critical", "float", "the I1 value at which damage starts");
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetI1FailureNode() {
    InputSchemaCreator schema_creator("I1_failure", "float", "the I1 value at which damage is complete");
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetAlphaNode() {
    InputSchemaCreator schema_creator("alpha", "float", "the alpha (exponent) parameter");
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetConstantTemperatureNode() {
    InputSchemaCreator schema_creator("constant_temperature", "float", "use a constant temperature of the given value");
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetLinearElasticNode() {
    InputSchemaCreator schema_creator("linear_elastic", "map", "the elastic material properties for the small strain model");
    schema_creator.AddAllOf(GetDensityNode());
    schema_creator.AddTwoOf(GetYoungsModulusNode());
    schema_creator.AddTwoOf(GetPoissonsRatioNode());
    schema_creator.AddTwoOf(GetLambdaNode());
    schema_creator.AddTwoOf(GetBulkModulusNode());
    schema_creator.AddTwoOf(GetShearModulusNode());
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetElasticNode() {
    InputSchemaCreator schema_creator("elastic", "map", "the elastic material properties for the St. Venant-Kirchhoff model");
    schema_creator.AddAllOf(GetDensityNode());
    schema_creator.AddTwoOf(GetYoungsModulusNode());
    schema_creator.AddTwoOf(GetPoissonsRatioNode());
    schema_creator.AddTwoOf(GetLambdaNode());
    schema_creator.AddTwoOf(GetBulkModulusNode());
    schema_creator.AddTwoOf(GetShearModulusNode());
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetNeoHookeanNode() {
    InputSchemaCreator schema_creator("neo_hookean", "map", "the neo-Hookean material properties");
    schema_creator.AddAllOf(GetDensityNode());
    schema_creator.AddTwoOf(GetYoungsModulusNode());
    schema_creator.AddTwoOf(GetPoissonsRatioNode());
    schema_creator.AddTwoOf(GetLambdaNode());
    schema_creator.AddTwoOf(GetBulkModulusNode());
    schema_creator.AddTwoOf(GetShearModulusNode());
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetNeoHookeanWithDamageNode() {
    InputSchemaCreator schema_creator("neo_hookean_with_damage", "map", "the neo-Hookean material properties with damage");
    schema_creator.AddAllOf(GetDensityNode());
    schema_creator.AddTwoOf(GetYoungsModulusNode());
    schema_creator.AddTwoOf(GetPoissonsRatioNode());
    schema_creator.AddTwoOf(GetLambdaNode());
    schema_creator.AddTwoOf(GetBulkModulusNode());
    schema_creator.AddTwoOf(GetShearModulusNode());
    schema_creator.AddAllOf(GetI1CriticalNode());
    schema_creator.AddAllOf(GetI1FailureNode());
    schema_creator.AddAllOf(GetAlphaNode());
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetPlasticNode() {
    InputSchemaCreator schema_creator("plastic", "map", "the plastic material properties");
    schema_creator.AddAllOf(GetDensityNode());
    schema_creator.AddTwoOf(GetYoungsModulusNode());
    schema_creator.AddTwoOf(GetPoissonsRatioNode());
    schema_creator.AddTwoOf(GetLambdaNode());
    schema_creator.AddTwoOf(GetBulkModulusNode());
    schema_creator.AddTwoOf(GetShearModulusNode());
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetDruckerPragerNode() {
    InputSchemaCreator schema_creator("drucker_prager", "map", "the Drucker-Prager material properties");
    schema_creator.AddAllOf(GetDensityNode());
    schema_creator.AddTwoOf(GetYoungsModulusNode());
    schema_creator.AddTwoOf(GetPoissonsRatioNode());
    schema_creator.AddTwoOf(GetLambdaNode());
    schema_creator.AddTwoOf(GetBulkModulusNode());
    schema_creator.AddTwoOf(GetShearModulusNode());
    schema_creator.AddAllOf(GetA1Node());
    schema_creator.AddAllOf(GetA2Node());
    schema_creator.AddAllOf(GetA2GNode());
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetPowerLawCreepNode() {
    InputSchemaCreator schema_creator("power_law_creep", "map", "the power law creep material properties");
    schema_creator.AddAllOf(GetDensityNode());
    schema_creator.AddTwoOf(GetYoungsModulusNode());
    schema_creator.AddTwoOf(GetPoissonsRatioNode());
    schema_creator.AddTwoOf(GetLambdaNode());
    schema_creator.AddTwoOf(GetBulkModulusNode());
    schema_creator.AddTwoOf(GetShearModulusNode());
    schema_creator.AddAllOf(GetANode());
    schema_creator.AddAllOf(GetNNode());
    schema_creator.AddAllOf(GetMNode());
    schema_creator.AddOptional(GetConstantTemperatureNode());
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetMaterialNode() {
    InputSchemaCreator schema_creator("material", "map", "the material");
    schema_creator.AddOneOf(GetLinearElasticNode());
    schema_creator.AddOneOf(GetElasticNode());
    schema_creator.AddOneOf(GetNeoHookeanNode());
    schema_creator.AddOneOf(GetNeoHookeanWithDamageNode());
    schema_creator.AddOneOf(GetPlasticNode());
    schema_creator.AddOneOf(GetDruckerPragerNode());
    schema_creator.AddOneOf(GetPowerLawCreepNode());
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetIntegrationOrderNode() {
    InputSchemaCreator schema_creator("integration_order", "int", "the integration order");
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetGaussQuadratureNode() {
    InputSchemaCreator schema_creator("gauss_quadrature", "map", "gauss quadrature");
    schema_creator.AddAllOf(GetIntegrationOrderNode());
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetSubdomainsNode() {
    InputSchemaCreator schema_creator("subdomains", "int", "the number of smoothing cell subdomains");
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetForceOnePassMethodNode() {
    InputSchemaCreator schema_creator("force_one_pass_method", "bool", "force the one pass method");
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetForceTwoPassMethodNode() {
    InputSchemaCreator schema_creator("force_two_pass_method", "bool", "force the two pass method");
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetUseFBarNode() {
    InputSchemaCreator schema_creator("use_f_bar", "bool", "use f_bar");
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetActivateCenterNodeNode() {
    InputSchemaCreator schema_creator("activate_center_node", "bool", "activate the center node");
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetActivateSubcellCenterNodeNode() {
    InputSchemaCreator schema_creator("activate_subcell_center_node", "bool", "activate the subcell center node");
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetNodalSmoothingCellNode() {
    InputSchemaCreator schema_creator("nodal_smoothing_cell", "map", "a nodal smoothing cell");
    schema_creator.AddAllOf(GetSubdomainsNode());
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetElementSmoothingCellNode() {
    InputSchemaCreator schema_creator("element_smoothing_cell", "map", "an element smoothing cell");
    schema_creator.AddAllOf(GetSubdomainsNode());
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetDeactivateSubcellsSmallerThanNode() {
    InputSchemaCreator schema_creator("deactivate_subcells_smaller_than", "float", "deactivate subcells smaller than this size");
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetStrainSmoothingNode() {
    InputSchemaCreator schema_creator("strain_smoothing", "map", "strain smoothing");
    schema_creator.AddOneOf(GetNodalSmoothingCellNode());
    schema_creator.AddOneOf(GetElementSmoothingCellNode());
    schema_creator.AddOptional(GetForceOnePassMethodNode());
    schema_creator.AddOptional(GetForceTwoPassMethodNode());
    schema_creator.AddOptional(GetUseFBarNode());
    schema_creator.AddOptional(GetActivateCenterNodeNode());
    schema_creator.AddOptional(GetActivateSubcellCenterNodeNode());
    schema_creator.AddOptional(GetDeactivateSubcellsSmallerThanNode());
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetIntegrationSchemeNode() {
    InputSchemaCreator schema_creator("integration_scheme", "map", "the integration scheme");
    schema_creator.AddOneOf(GetGaussQuadratureNode());
    schema_creator.AddOneOf(GetStrainSmoothingNode());
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetFiniteElementNode() {
    InputSchemaCreator schema_creator("finite_element", "map", "finite element approximation");
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetKernelRadiusScaleFactorNode() {
    InputSchemaCreator schema_creator("kernel_radius_scale_factor", "float", "the kernel radius scale factor");
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetReproducingKernelNode() {
    InputSchemaCreator schema_creator("reproducing_kernel", "map", "reproducing kernel approximation");
    schema_creator.AddAllOf(GetKernelRadiusScaleFactorNode());
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetApproximationSpaceNode() {
    InputSchemaCreator schema_creator("approximation_space", "map", "the approximation space");
    schema_creator.AddOneOf(GetFiniteElementNode());
    schema_creator.AddOneOf(GetReproducingKernelNode());
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetFormulationNode() {
    InputSchemaCreator schema_creator("formulation", "map", "the formulation");
    schema_creator.AddAllOf(GetIntegrationSchemeNode());
    schema_creator.AddAllOf(GetApproximationSpaceNode());
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetPartNode() {
    InputSchemaCreator schema_creator("part", "map", "a part");
    schema_creator.AddAllOf(GetSetNode());
    schema_creator.AddAllOf(GetMaterialNode());
    schema_creator.AddOptional(GetFormulationNode());
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetPartsNode() {
    InputSchemaCreator schema_creator("parts", "sequence", "the list of parts");
    schema_creator.AddOneOrMoreOf(GetPartNode());
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetMeshNode() {
    InputSchemaCreator schema_creator("mesh", "string", "the file containing the mesh");
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetMeshSearchDirectoriesNode() {
    InputSchemaCreator schema_creator("mesh_search_directories", "sequence", "the list of directories to search for the mesh");
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetGeometryNode() {
    InputSchemaCreator schema_creator("geometry", "map", "the section describing the geometry");
    schema_creator.AddAllOf(GetMeshNode());
    schema_creator.AddAllOf(GetPartsNode());
    schema_creator.AddOptional(GetMeshSearchDirectoriesNode());
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetTotalLagrangianNode() {
    InputSchemaCreator schema_creator("total_lagrangian", "map", "total Lagrangian formulation");
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetUpdatedLagrangianNode() {
    InputSchemaCreator schema_creator("updated_lagrangian", "map", "updated Lagrangian formulation");
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetSemiLagrangianNode() {
    InputSchemaCreator schema_creator("semi_lagrangian", "map", "semi Lagrangian formulation");
    schema_creator.AddAllOf(GetUpdateIntervalNode());
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetLagrangianNode() {
    InputSchemaCreator schema_creator("lagrangian", "map", "the Lagrangian formulation");
    schema_creator.AddOneOf(GetTotalLagrangianNode());
    schema_creator.AddOneOf(GetUpdatedLagrangianNode());
    schema_creator.AddOneOf(GetSemiLagrangianNode());
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetExplicitDynamicsProcedureNode() {
    InputSchemaCreator schema_creator("explicit_dynamics_procedure", "map", "an explicit dynamics procedure");
    schema_creator.AddAllOf(GetGeometryNode());
    schema_creator.AddAllOf(GetTimeStepperNode());
    schema_creator.AddAllOf(GetOutputNode());
    schema_creator.AddOptional(GetInitialConditionsNode());
    schema_creator.AddOptional(GetBoundaryConditionsNode());
    schema_creator.AddOptional(GetLoadsNode());
    schema_creator.AddOptional(GetContactNode());
    schema_creator.AddOptional(GetLagrangianNode());
    return schema_creator.GetInputSchema();
}

inline YAML::Node GetProceduresNode() {
    InputSchemaCreator schema_creator("procedures", "sequence", "the list of procedures");
    schema_creator.AddOneOrMoreOf(GetExplicitDynamicsProcedureNode());
    return schema_creator.GetInputSchema();
}

/**
 * Retrieves the full input schema_creator as a YAML node.
 *
 * @return The YAML node representing the input schema_creator.
 */
YAML::Node GetInputSchema() {
    return GetProceduresNode();
}
}  // namespace aperi