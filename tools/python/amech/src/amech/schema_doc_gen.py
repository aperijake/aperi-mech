"""
Schema Documentation Generator

This module parses the Amech schema YAML file and generates user-friendly
markdown documentation.
"""

from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Dict, List, Optional, Set

import yaml


@dataclass
class DocLocation:
    """Location of a schema item in the documentation."""

    filename: str
    anchor: str = ""


class SchemaRegistry:
    """Registry for schema item documentation locations."""

    def __init__(self):
        self.locations: Dict[str, DocLocation] = {}

    def register(self, name: str, filename: str, anchor: str = ""):
        """Register a schema item's location."""
        self.locations[name] = DocLocation(filename, anchor)

    def get_link(self, name: str, text: Optional[str] = None) -> str:
        """Get a markdown link to the schema item.

        Uses anchor-only links for PDF compatibility (all schema docs
        are merged into one document in book format).
        """
        display_text = text or name
        if name in self.locations:
            loc = self.locations[name]
            # Use anchor-only links for PDF compatibility
            return f"[{display_text}](#{loc.anchor})"
        return display_text

    def has_entry(self, name: str) -> bool:
        """Check if an item is registered."""
        return name in self.locations


@dataclass
class SchemaItem:
    """Represents a single schema item with its metadata."""

    name: str
    item_type: str
    description: str
    required: bool = True
    is_pro: bool = False
    is_experimental: bool = False
    example: Optional[str] = None
    subitems: Dict[str, List["SchemaItem"]] = field(default_factory=dict)

    def get_all_of(self) -> List["SchemaItem"]:
        """Get all required subitems."""
        return self.subitems.get("all_of", [])

    def get_one_of(self) -> List["SchemaItem"]:
        """Get mutually exclusive options."""
        return self.subitems.get("one_of", [])

    def get_two_of(self) -> List["SchemaItem"]:
        """Get items where exactly two must be provided."""
        return self.subitems.get("two_of", [])

    def get_optional(self) -> List["SchemaItem"]:
        """Get optional subitems."""
        return self.subitems.get("optional", [])

    def get_one_or_more_of(self) -> List["SchemaItem"]:
        """Get items where at least one must be provided."""
        return self.subitems.get("one_or_more_of", [])


class SchemaParser:
    """Parses the Amech schema YAML into a structured format."""

    def __init__(self, schema_file: Path):
        """
        Initialize the schema parser.

        Args:
            schema_file: Path to the schema YAML file
        """
        self.schema_file = schema_file
        with open(schema_file, "r") as f:
            self.raw_schema = yaml.safe_load(f)

    def parse(self) -> SchemaItem:
        """
        Parse the schema file into a structured SchemaItem tree.

        Returns:
            Root SchemaItem representing the entire schema
        """
        if self.raw_schema is None:
            raise ValueError("Schema file is empty or invalid")

        # The schema has a single root key (procedures)
        root_key = list(self.raw_schema.keys())[0]
        root_data = self.raw_schema[root_key]

        return self._parse_item(root_key, root_data)

    def _parse_item(self, name: str, data: Dict[str, Any]) -> SchemaItem:
        """
        Recursively parse a schema item.

        Args:
            name: The name of the schema item
            data: The YAML data for this item

        Returns:
            Parsed SchemaItem
        """
        item_type = data.get("type", "unknown")
        description = data.get("description", "")
        is_pro = data.get("pro", False)
        is_experimental = data.get("experimental", False)
        example = data.get("example")
        subitems_data = data.get("subitems")

        item = SchemaItem(
            name=name,
            item_type=item_type,
            description=description,
            is_pro=is_pro,
            is_experimental=is_experimental,
            example=example,
        )

        if subitems_data is not None and isinstance(subitems_data, dict):
            # Parse each category of subitems
            for category in [
                "all_of",
                "one_of",
                "two_of",
                "optional",
                "one_or_more_of",
            ]:
                if category in subitems_data:
                    item.subitems[category] = self._parse_subitem_list(
                        subitems_data[category]
                    )

        return item

    def _parse_subitem_list(
        self, subitem_list: List[Dict[str, Any]]
    ) -> List[SchemaItem]:
        """
        Parse a list of subitems.

        Args:
            subitem_list: List of subitem dictionaries with 'set' keys

        Returns:
            List of parsed SchemaItems
        """
        items = []
        for entry in subitem_list:
            if isinstance(entry, dict) and "set" in entry:
                set_items = entry["set"]
                if isinstance(set_items, list):
                    for set_item in set_items:
                        if isinstance(set_item, dict):
                            for sub_name, sub_data in set_item.items():
                                if isinstance(sub_data, dict):
                                    items.append(self._parse_item(sub_name, sub_data))
        return items


class MarkdownGenerator:
    """Generates markdown documentation from parsed schema."""

    def __init__(self, schema_item: SchemaItem, output_dir: Path):
        """
        Initialize the markdown generator.

        Args:
            schema_item: Root schema item
            output_dir: Directory to write documentation files
        """
        self.schema_item = schema_item
        self.output_dir = output_dir
        self.output_dir.mkdir(parents=True, exist_ok=True)
        self.registry = SchemaRegistry()
        self.processed_items: Set[str] = set()

    def _get_badges(self, item: SchemaItem) -> str:
        """Generate badge string for an item."""
        badges = []
        if item.is_pro:
            badges.append("🔷 Pro")
        if item.is_experimental:
            badges.append("🧪 Experimental")
        return " ".join(badges)

    def generate_all(self):
        """Generate all documentation files."""
        # First pass: Register all items
        self._register_all()

        # Generate main index
        self.generate_index()

        # Find procedures in the schema
        procedures = self._find_procedures()

        if procedures:
            # Generate procedure-specific pages
            for proc in procedures:
                self.generate_procedure_doc(proc)

        # Generate materials reference
        materials = self._find_materials()
        if materials:
            self.generate_materials_doc(materials)

        # Generate boundary conditions reference
        bcs = self._find_boundary_conditions()
        if bcs:
            self.generate_boundary_conditions_doc(bcs)

        # Generate initial conditions reference
        ics = self._find_initial_conditions()
        if ics:
            self.generate_initial_conditions_doc(ics)

        # Generate loads reference
        loads = self._find_loads()
        if loads:
            self.generate_loads_doc(loads)

        # Generate general settings reference
        general = self._find_general_settings()
        if general:
            self.generate_general_settings_doc(general)

    def _register_all(self):
        """Register all schema items for linking.

        Uses anchor-only references for PDF compatibility.
        """
        # Procedures - each gets its own section ID
        for proc in self._find_procedures():
            self.registry.register(
                proc.name,
                f"{proc.name}.md",
                f"sec-schema-{self._format_anchor(proc.name)}",
            )

        # Materials - subsections within materials.md
        for mat in self._find_materials():
            self.registry.register(
                mat.name, "materials.md", f"sec-schema-{self._format_anchor(mat.name)}"
            )

        # Boundary Conditions - subsections within boundary_conditions.md
        for bc in self._find_boundary_conditions():
            self.registry.register(
                bc.name,
                "boundary_conditions.md",
                f"sec-schema-bc-{self._format_anchor(bc.name)}",
            )

        # Initial Conditions - subsections within initial_conditions.md
        for ic in self._find_initial_conditions():
            self.registry.register(
                ic.name,
                "initial_conditions.md",
                f"sec-schema-ic-{self._format_anchor(ic.name)}",
            )

        # Loads - subsections within loads.md
        for load in self._find_loads():
            self.registry.register(
                load.name, "loads.md", f"sec-schema-{self._format_anchor(load.name)}"
            )

        # General Settings - subsections within general_settings.md
        for item in self._find_general_settings():
            self.registry.register(
                item.name,
                "general_settings.md",
                f"sec-schema-{self._format_anchor(item.name)}",
            )

    def generate_index(self):
        """Generate the main index.md file."""
        output_file = self.output_dir / "index.md"

        with open(output_file, "w") as f:
            f.write("# Amech Input Schema Reference {#sec-schema .unnumbered}\n\n")
            f.write(
                "This documentation describes the input file syntax for Amech and Amech-Pro.\n\n"
            )
            f.write("## Overview\n\n")
            f.write(
                "Amech uses YAML format for input files. The top-level structure contains:\n\n"
            )
            f.write(
                "- **procedures**: One or more analysis procedures (explicit dynamics, static, etc.)\n\n"
            )
            f.write("## Available Procedures\n\n")

            procedures = self._find_procedures()
            for proc in procedures:
                badges = self._get_badges(proc)
                badge_suffix = f" [{badges}]" if badges else ""
                anchor = f"sec-schema-{self._format_anchor(proc.name)}"
                f.write(
                    f"- [{proc.name}](#{anchor}) - {proc.description}{badge_suffix}\n"
                )

            f.write("\n## Common Sections\n\n")
            f.write(
                "- [Materials](#sec-schema-materials) - Material model definitions\n"
            )
            f.write(
                "- [Boundary Conditions](#sec-schema-boundary-conditions) - Boundary condition specifications\n"
            )
            f.write(
                "- [Initial Conditions](#sec-schema-initial-conditions) - Initial state specifications\n"
            )
            f.write("- [Loads](#sec-schema-loads) - External load definitions\n")
            f.write(
                "- [General Settings](#sec-schema-general-settings) - Solvers, contact, output, etc.\n"
            )

    def generate_procedure_doc(self, procedure: SchemaItem):
        """Generate documentation for a specific procedure."""
        output_file = self.output_dir / f"{procedure.name}.md"

        with open(output_file, "w") as f:
            badges = self._get_badges(procedure)
            title = self._format_title(procedure.name)
            anchor = f"sec-schema-{self._format_anchor(procedure.name)}"
            if badges:
                f.write(f"# {title} [{badges}] {{#{anchor}}}\n\n")
            else:
                f.write(f"# {title} {{#{anchor}}}\n\n")
            f.write(f"{procedure.description}\n\n")

            f.write("## Example Usage\n\n")
            f.write("```yaml\n")
            f.write(self._generate_yaml_example(procedure))
            f.write("```\n\n")

            f.write("## Overview\n\n")
            f.write(f"Type: `{procedure.item_type}`\n\n")

            # Required parameters
            all_of = procedure.get_all_of()
            if all_of:
                f.write("## Required Parameters\n\n")
                f.write("The following parameters must be provided:\n\n")
                self._write_parameter_table(f, all_of)

            # Optional parameters
            optional = procedure.get_optional()
            if optional:
                f.write("\n## Optional Parameters\n\n")
                self._write_parameter_table(f, optional)

            # One-of choices
            one_of = procedure.get_one_of()
            if one_of:
                f.write("\n## Choose One Of\n\n")
                f.write("You must provide exactly one of the following:\n\n")
                self._write_parameter_table(f, one_of)

    def generate_materials_doc(self, materials: List[SchemaItem]):
        """Generate materials reference documentation."""
        output_file = self.output_dir / "materials.md"

        with open(output_file, "w") as f:
            f.write("# Material Models {#sec-schema-materials}\n\n")
            f.write(
                "Amech supports various material models for different physical behaviors.\n\n"
            )

            for material in materials:
                badges = self._get_badges(material)
                title = self._format_title(material.name)
                anchor = f"sec-schema-{self._format_anchor(material.name)}"
                if badges:
                    f.write(f"## {title} [{badges}] {{#{anchor}}}\n\n")
                else:
                    f.write(f"## {title} {{#{anchor}}}\n\n")
                f.write(f"{material.description}\n\n")

                f.write("### Example\n\n")
                f.write("```yaml\n")
                f.write(self._generate_yaml_example(material))
                f.write("```\n\n")

                # Required parameters
                all_of = material.get_all_of()
                if all_of:
                    f.write("### Required Parameters\n\n")
                    self._write_parameter_table(f, all_of)

                # Two-of constraints
                two_of = material.get_two_of()
                if two_of:
                    f.write("\n### Elastic Parameters (Choose 2)\n\n")
                    f.write(
                        "Provide exactly two of the following elastic parameters:\n\n"
                    )
                    self._write_parameter_table(f, two_of)

                # Optional parameters
                optional = material.get_optional()
                if optional:
                    f.write("\n### Optional Parameters\n\n")
                    self._write_parameter_table(f, optional)

                f.write("\n---\n\n")

    def generate_boundary_conditions_doc(self, bcs: List[SchemaItem]):
        """Generate boundary conditions reference documentation."""
        output_file = self.output_dir / "boundary_conditions.md"

        with open(output_file, "w") as f:
            f.write("# Boundary Conditions {#sec-schema-boundary-conditions}\n\n")
            f.write(
                "Boundary conditions constrain the solution at specific locations.\n\n"
            )

            for bc in bcs:
                anchor = f"sec-schema-bc-{self._format_anchor(bc.name)}"
                f.write(f"## {self._format_title(bc.name)} {{#{anchor}}}\n\n")
                f.write(f"{bc.description}\n\n")

                f.write("### Example\n\n")
                f.write("```yaml\n")
                f.write(self._generate_yaml_example(bc))
                f.write("```\n\n")

                # Document structure
                all_of = bc.get_all_of()
                one_of = bc.get_one_of()
                optional = bc.get_optional()

                if all_of:
                    f.write("### Required Parameters\n\n")
                    self._write_parameter_table(f, all_of)

                if one_of:
                    f.write("\n### Choose One Of\n\n")
                    self._write_parameter_table(f, one_of)

                if optional:
                    f.write("\n### Optional Parameters\n\n")
                    self._write_parameter_table(f, optional)

                f.write("\n---\n\n")

    def generate_initial_conditions_doc(self, ics: List[SchemaItem]):
        """Generate initial conditions reference documentation."""
        output_file = self.output_dir / "initial_conditions.md"

        with open(output_file, "w") as f:
            f.write("# Initial Conditions {#sec-schema-initial-conditions}\n\n")
            f.write("Initial conditions specify the initial state of the model.\n\n")

            for ic in ics:
                anchor = f"sec-schema-ic-{self._format_anchor(ic.name)}"
                f.write(f"## {self._format_title(ic.name)} {{#{anchor}}}\n\n")
                f.write(f"{ic.description}\n\n")

                f.write("### Example\n\n")
                f.write("```yaml\n")
                f.write(self._generate_yaml_example(ic))
                f.write("```\n\n")

                # Document structure
                all_of = ic.get_all_of()
                one_of = ic.get_one_of()
                optional = ic.get_optional()

                if all_of:
                    f.write("### Required Parameters\n\n")
                    self._write_parameter_table(f, all_of)

                if one_of:
                    f.write("\n### Choose One Of\n\n")
                    self._write_parameter_table(f, one_of)

                if optional:
                    f.write("\n### Optional Parameters\n\n")
                    self._write_parameter_table(f, optional)

                f.write("\n---\n\n")

    def generate_loads_doc(self, loads: List[SchemaItem]):
        """Generate loads reference documentation."""
        output_file = self.output_dir / "loads.md"

        with open(output_file, "w") as f:
            f.write("# Loads {#sec-schema-loads}\n\n")
            f.write("Loads represent external forces applied to the model.\n\n")

            for load in loads:
                anchor = f"sec-schema-{self._format_anchor(load.name)}"
                f.write(f"## {self._format_title(load.name)} {{#{anchor}}}\n\n")
                f.write(f"{load.description}\n\n")

                f.write("### Example\n\n")
                f.write("```yaml\n")
                f.write(self._generate_yaml_example(load))
                f.write("```\n\n")

                # Document structure
                all_of = load.get_all_of()
                one_of = load.get_one_of()
                optional = load.get_optional()

                if all_of:
                    f.write("### Required Parameters\n\n")
                    self._write_parameter_table(f, all_of)

                if one_of:
                    f.write("\n### Choose One Of\n\n")
                    self._write_parameter_table(f, one_of)

                if optional:
                    f.write("\n### Optional Parameters\n\n")
                    self._write_parameter_table(f, optional)

                f.write("\n---\n\n")

    def generate_general_settings_doc(self, items: List[SchemaItem]):
        """Generate general settings reference documentation."""
        output_file = self.output_dir / "general_settings.md"

        with open(output_file, "w") as f:
            f.write("# General Settings {#sec-schema-general-settings}\n\n")
            f.write(
                "Configuration for solvers, contact, output, and other general settings.\n\n"
            )

            for item in items:
                anchor = f"sec-schema-{self._format_anchor(item.name)}"
                f.write(f"## {self._format_title(item.name)} {{#{anchor}}}\n\n")
                f.write(f"{item.description}\n\n")

                f.write("### Example\n\n")
                f.write("```yaml\n")
                f.write(self._generate_yaml_example(item))
                f.write("```\n\n")

                # Document structure
                all_of = item.get_all_of()
                one_of = item.get_one_of()
                optional = item.get_optional()
                one_or_more_of = item.get_one_or_more_of()

                if all_of:
                    f.write("### Required Parameters\n\n")
                    self._write_parameter_table(f, all_of)

                if one_of:
                    f.write("\n### Choose One Of\n\n")
                    self._write_parameter_table(f, one_of)

                if one_or_more_of:
                    f.write("\n### Choose One Or More Of\n\n")
                    self._write_parameter_table(f, one_or_more_of)

                if optional:
                    f.write("\n### Optional Parameters\n\n")
                    self._write_parameter_table(f, optional)

                f.write("\n---\n\n")

    def _write_parameter_table(self, f, items: List[SchemaItem]):
        """Write a markdown table of parameters."""
        f.write("| Parameter | Type | Description | |\n")
        f.write("|-----------|------|-------------|---|\n")
        for item in items:
            badges = self._get_badges(item)

            type_str = item.item_type

            # Link the name if it's a complex object
            name_str = item.name
            if self.registry.has_entry(item.name):
                name_str = self.registry.get_link(item.name)

            f.write(f"| {name_str} | {type_str} | {item.description} | {badges} |\n")
        f.write("\n")

    # Fallback defaults for types without schema-defined examples
    TYPE_DEFAULTS = {
        "string": '"..."',
        "float": "0.0",
        "int": "0",
        "bool": "true",
        "direction_vector": "[1.0, 0.0, 0.0]",
        "location_vector": "[0.0, 0.0, 0.0]",
    }

    def _get_example_value(self, item: SchemaItem) -> str:
        """Get the example value for a schema item.

        Uses the schema-defined example if available, otherwise falls back
        to a type-based default.
        """
        if item.example is not None:
            return str(item.example)
        return self.TYPE_DEFAULTS.get(item.item_type, "...")

    def _generate_yaml_example(self, item: SchemaItem, indent: int = 0) -> str:
        """Generate a minimal YAML example for the schema item."""
        lines = []
        prefix = "  " * indent

        if item.name in self.processed_items:
            return f"{prefix}{item.name}: ...  # (recursive)\n"

        self.processed_items.add(item.name)

        try:
            if item.item_type == "map":
                lines.append(f"{prefix}{item.name}:")
                # Only required items
                for sub in item.get_all_of():
                    lines.append(
                        self._generate_yaml_example(sub, indent + 1).rstrip("\n")
                    )
                # Show one_of as comment listing options
                one_of = item.get_one_of()
                if one_of:
                    names = ", ".join(i.name for i in one_of)
                    lines.append(f"{prefix}  # (one of: {names})")

            elif item.item_type == "sequence":
                lines.append(f"{prefix}{item.name}:")
                lines.append(f"{prefix}  - ...")

            else:
                value = self._get_example_value(item)
                lines.append(f"{prefix}{item.name}: {value}")

        finally:
            self.processed_items.remove(item.name)

        return "\n".join(lines) + "\n"

    def _format_title(self, name: str) -> str:
        """Format a snake_case name into a readable title."""
        return " ".join(word.capitalize() for word in name.split("_"))

    def _format_anchor(self, name: str) -> str:
        """Format a snake_case name into a Quarto-compatible anchor (kebab-case)."""
        return name.replace("_", "-")

    def _find_procedures(self) -> List[SchemaItem]:
        """Find all procedure types in the schema."""
        if self.schema_item.name == "procedures":
            one_of = self.schema_item.get_one_of()
            return one_of if one_of else []
        return []

    def _find_materials(self) -> List[SchemaItem]:
        """Find all material types by traversing the schema."""
        materials = []
        seen_names = set()

        def traverse(item: SchemaItem):
            if item.name == "material":
                # Material node found, get its one_of options
                for mat in item.get_one_of():
                    if mat.name not in seen_names:
                        materials.append(mat)
                        seen_names.add(mat.name)
            # Traverse subitems
            for category_items in item.subitems.values():
                for sub_item in category_items:
                    traverse(sub_item)

        traverse(self.schema_item)
        return materials

    def _find_boundary_conditions(self) -> List[SchemaItem]:
        """Find all boundary condition types by traversing the schema."""
        bcs = []
        seen_names = set()

        def traverse(item: SchemaItem):
            if item.name == "boundary_conditions":
                # BC node found, get its one_or_more_of options
                for bc in item.get_one_or_more_of():
                    if bc.name not in seen_names:
                        bcs.append(bc)
                        seen_names.add(bc.name)
            # Traverse subitems
            for category_items in item.subitems.values():
                for sub_item in category_items:
                    traverse(sub_item)

        traverse(self.schema_item)
        return bcs

    def _find_initial_conditions(self) -> List[SchemaItem]:
        """Find all initial condition types by traversing the schema."""
        ics = []
        seen_names = set()

        def traverse(item: SchemaItem):
            if item.name == "initial_conditions":
                # IC node found, get its optional options
                for ic in item.get_optional():
                    if ic.name not in seen_names:
                        ics.append(ic)
                        seen_names.add(ic.name)
            # Traverse subitems
            for category_items in item.subitems.values():
                for sub_item in category_items:
                    traverse(sub_item)

        traverse(self.schema_item)
        return ics

    def _find_loads(self) -> List[SchemaItem]:
        """Find all load types by traversing the schema."""
        loads = []
        seen_names = set()

        def traverse(item: SchemaItem):
            if item.name == "loads":
                # Loads node found, get its one_or_more_of options
                for load in item.get_one_or_more_of():
                    if load.name not in seen_names:
                        loads.append(load)
                        seen_names.add(load.name)
            # Traverse subitems
            for category_items in item.subitems.values():
                for sub_item in category_items:
                    traverse(sub_item)

        traverse(self.schema_item)
        return loads

    def _find_general_settings(self) -> List[SchemaItem]:
        """Find general settings (solver, contact, etc.) by traversing the schema."""
        general_items = []
        seen_names = set()

        # Exclude items already covered in other sections
        excluded_names = {
            "procedures",
            "material",
            "boundary_conditions",
            "initial_conditions",
            "loads",
        }

        # Also exclude the specific items found in those sections
        for p in self._find_procedures():
            excluded_names.add(p.name)
        for m in self._find_materials():
            excluded_names.add(m.name)
        for b in self._find_boundary_conditions():
            excluded_names.add(b.name)
        for i in self._find_initial_conditions():
            excluded_names.add(i.name)
        for l in self._find_loads():
            excluded_names.add(l.name)

        def traverse(item: SchemaItem):
            # If it's a complex type (map or sequence) and not excluded
            if (
                item.item_type in ["map", "sequence"]
                and item.name not in excluded_names
            ):
                if item.name not in seen_names:
                    general_items.append(item)
                    seen_names.add(item.name)

            # Traverse subitems
            for category_items in item.subitems.values():
                for sub_item in category_items:
                    traverse(sub_item)

        # Start traversal from procedures to avoid adding the root "procedures" item
        for proc in self._find_procedures():
            # Traverse inside each procedure
            for category_items in proc.subitems.values():
                for sub_item in category_items:
                    traverse(sub_item)

        return general_items


def generate_documentation(schema_file: Path, output_dir: Path):
    """
    Main function to generate documentation from schema.

    Args:
        schema_file: Path to the schema YAML file
        output_dir: Directory to write documentation files
    """
    print(f"Parsing schema from: {schema_file}")
    parser = SchemaParser(schema_file)
    schema = parser.parse()

    print(f"Generating documentation in: {output_dir}")
    generator = MarkdownGenerator(schema, output_dir)
    generator.generate_all()

    print("Documentation generation complete!")


if __name__ == "__main__":
    import sys

    if len(sys.argv) < 3:
        print("Usage: python schema_doc_gen.py <schema.yaml> <output_dir>")
        sys.exit(1)

    schema_file = Path(sys.argv[1])
    output_dir = Path(sys.argv[2])

    if not schema_file.exists():
        print(f"Error: Schema file not found: {schema_file}")
        sys.exit(1)

    generate_documentation(schema_file, output_dir)
