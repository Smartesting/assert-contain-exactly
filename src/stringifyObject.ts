// Ideally, we would use stringify-object: https://www.npmjs.com/package/stringify-object
// But it seems to be problematic with our TypeScript setup.

export default function stringifyObject(
  o: unknown,
  indentString = "\t"
): string {
  if (Array.isArray(o)) {
    const stringItems = o.map((item) => stringifyObject(item, indentString));
    if (stringItems.some((item) => item.split("\n").length > 1)) {
      return ["[", ...indent(stringItems.join(",\n"), indentString), "]"].join(
        "\n"
      );
    }
    return `[${o
      .map((item) => stringifyObject(item, indentString))
      .join(", ")}]`;
  }

  if (o === null) {
    return `${o}`;
  }

  if (typeof o === "object") {
    const lines = Object.entries(o)
      .map(([key, value]) => `${key}: ${stringifyObject(value)}`)
      .join(",\n");
    return ["{", ...indent(lines, indentString), "}"].join("\n");
  }

  if (typeof o === "string") {
    return `"${o.replace(/"/g, '\\"')}"`;
  }

  return `${o}`;
}

function indent(lines: string, indent: string) {
  return lines.split("\n").map((line) => `${indent}${line}`);
}
