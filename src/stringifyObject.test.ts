import assert from "assert";
import stringifyObject from "./stringifyObject";

describe("stringifyObject", () => {
  context("with basic types", () => {
    it("returns a string representation of booleans", () => {
      assert.strictEqual(stringifyObject(true), "true");
      assert.strictEqual(stringifyObject(false), "false");
    });

    it("returns a string representation of numbers", () => {
      assert.strictEqual(stringifyObject(12), "12");
      assert.strictEqual(stringifyObject(3.14), "3.14");
    });

    it("returns a string representation of null", () => {
      assert.strictEqual(stringifyObject(null), "null");
    });

    it("returns a string representation of undefined", () => {
      assert.strictEqual(stringifyObject(undefined), "undefined");
    });

    it("adds quotes around strings", () => {
      assert.strictEqual(stringifyObject("Ola !"), '"Ola !"');
    });

    it("escapes double-quotes oin strings", () => {
      assert.strictEqual(stringifyObject('my "string"'), '"my \\"string\\""');
    });
  });

  context("with objects", () => {
    it("returns a representation of the object on multiple lines", () => {
      const expected = [
        "{",
        '\tname: "My object",',
        '\ttype: "MyObject"',
        "}",
      ].join("\n");

      assert.strictEqual(
        stringifyObject({ name: "My object", type: "MyObject" }),
        expected
      );
    });

    it("recursively display objects", () => {
      const o = {
        name: "My object",
        properties: {
          isProp: true,
        },
      };

      const expected = [
        "{",
        '\tname: "My object",',
        "\tproperties: {",
        "\t\tisProp: true",
        "\t}",
        "}",
      ].join("\n");

      assert.strictEqual(stringifyObject(o), expected);
    });
  });

  context("with arrays", () => {
    it("returns a one-liner when there is only basic types in the array", () => {
      assert.strictEqual(stringifyObject(["a", 1, null]), '["a", 1, null]');
    });

    it("splits one multiple lines when there are objects in the array", () => {
      const expected = [
        "[",
        '\t"a",',
        "\t{",
        "\t\tname: null",
        "\t},",
        "\t1",
        "]",
      ].join("\n");

      assert.strictEqual(stringifyObject(["a", { name: null }, 1]), expected);
    });
  });

  it("properly handles nested objects and arrays", () => {
    const o = {
      name: "My tree",
      children: [
        {
          name: "A leaf",
        },
        {
          name: "Another leaf",
        },
      ],
    };

    const expected = [
      "{",
      '\tname: "My tree",',
      "\tchildren: [",
      "\t\t{",
      '\t\t\tname: "A leaf"',
      "\t\t},",
      "\t\t{",
      '\t\t\tname: "Another leaf"',
      "\t\t}",
      "\t]",
      "}",
    ].join("\n");

    assert.strictEqual(stringifyObject(o), expected);
  });
});
