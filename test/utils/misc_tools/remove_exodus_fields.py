import exodus

# Open the original Exodus file
old_file = exodus.exodus("results.exo", mode="r", array_type="numpy")

# Get some basic information
num_dim = old_file.num_dimensions()
num_nodes = old_file.num_nodes()
num_elems = old_file.num_elems()
num_elem_blks = old_file.num_blks()
num_node_vars = old_file.get_node_variable_number()
num_elem_vars = old_file.get_element_variable_number()
num_side_sets = old_file.num_side_sets()
num_node_sets = old_file.num_node_sets()


# Create a new Exodus file (with a new name)
new_file = exodus.exodus(
    "output_file.exo",
    mode="w",
    array_type="numpy",
    title=old_file.title(),
    numDims=num_dim,
    numNodes=num_nodes,
    numElems=num_elems,
    numBlocks=num_elem_blks,
    numNodeSets=num_node_sets,
    numSideSets=num_side_sets,
)

# Copy coordinates
coordsX, coordsY, coordsZ = old_file.get_coords()
new_file.put_coord_names(old_file.get_coord_names())
new_file.put_coords(coordsX, coordsY, coordsZ)

# Copy element block information
for blk_id in old_file.get_elem_blk_ids():
    blk_name = old_file.get_elem_blk_name(blk_id)
    numBlkElems = old_file.num_elems_in_blk(blk_id)
    numNodesPerElem = old_file.num_nodes_per_elem(blk_id)
    numAttr = old_file.num_attr(blk_id)
    elem_type = old_file.elem_type(blk_id)  # Get the element type

    print(f"Processing block ID: {blk_id}")
    print(f"Block name: {blk_name}")
    print(f"Number of elements in block: {numBlkElems}")
    print(f"Number of nodes per element: {numNodesPerElem}")
    print(f"Number of attributes: {numAttr}")
    print(f"Element type: {elem_type}")

    new_file.put_elem_blk_info(blk_id, elem_type, numBlkElems, numNodesPerElem, numAttr)
    new_file.put_elem_blk_name(blk_id, blk_name)

    connectivity = old_file.get_elem_connectivity(blk_id)[0]
    print(f"Length of connectivity array: {len(connectivity)}")
    print(f"Expected length: {numBlkElems * numNodesPerElem}")
    print(f"Connectivity array: {connectivity}")
    new_file.put_elem_connectivity(blk_id, connectivity)

# Copy nodeset information
nodeset_ids = old_file.get_node_set_ids()
for nodeset_id in nodeset_ids:
    node_list = old_file.get_node_set_nodes(nodeset_id)
    print(f"Processing nodeset ID: {nodeset_id}")
    print(f"Node list: {node_list}")
    new_file.put_node_set_params(nodeset_id, len(node_list))
    new_file.put_node_set(nodeset_id, node_list)

# Copy nodal variables
old_nodal_vars = old_file.get_node_variable_names()
nodal_vars = []
for var in old_nodal_vars:
    # skip variables that start with "neighbors_" or "function_values_" or "eigenvector_"
    if (
        not var.startswith("neighbors_")
        and not var.startswith("function_values_")
        and not var.startswith("eigenvector_")
        and not var.count("_temp_")
    ):
        nodal_vars.append(var)

new_file.set_node_variable_number(len(nodal_vars))
for index, var in enumerate(nodal_vars, start=1):
    print(f"Processing nodal variable: {var}")
    new_file.put_node_variable_name(var, index)
    for time_step in range(1, old_file.num_times() + 1):
        values = old_file.get_node_variable_values(var, time_step)
        new_file.put_node_variable_values(var, time_step, values)

# Copy element variables except the one to delete
# elem_vars = old_file.get_element_variable_names()
elem_vars = ["volume"]
new_file.set_element_variable_number(len(elem_vars))
for index, var in enumerate(elem_vars, start=1):
    print(f"Processing element variable: {var}")
    new_file.put_element_variable_name(var, index)
    for blk_id in old_file.get_elem_blk_ids():
        for time_step in range(1, old_file.num_times() + 1):
            values = old_file.get_element_variable_values(blk_id, var, time_step)
            new_file.put_element_variable_values(blk_id, var, time_step, values)

# Copy time steps
time_steps = old_file.get_times()
for step_index, time_val in enumerate(time_steps, start=1):
    print(f"Processing time step {step_index} with value {time_val}")
    new_file.put_time(step_index, time_val)

# Close both files
old_file.close()
new_file.close()
