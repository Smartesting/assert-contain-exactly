import assert from "assert";
import assertIncludesExactly from "./assertIncludesExactly";

describe("assertIncludesExactly", () => {
  it("throws an Error when actual in not eactly included in expected", () => {
    assert.throws(() => assertIncludesExactly(["a"], ["a", "b"]));
  });

  it("provides a helpful message when elements are missing", () => {
    assert.throws(
      () => assertIncludesExactly(["a"], ["a", "b"]),
      new Error(
        [
          "Expected arrays to contain the same objects:",
          'Missing elements were: ["b"]',
        ].join("\n")
      )
    );
  });

  it("provides a helpful message when there are extra elements", () => {
    assert.throws(
      () => assertIncludesExactly(["a", "b"], ["a"]),
      new Error(
        [
          "Expected arrays to contain the same objects:",
          'Extra elements were: ["b"]',
        ].join("\n")
      )
    );
  });

  it("provides a helpful message showing both missing and extra element", () => {
    assert.throws(
      () => assertIncludesExactly(["a"], ["b"]),
      new Error(
        [
          "Expected arrays to contain the same objects:",
          'Missing elements were: ["b"]',
          'Extra elements were: ["a"]',
        ].join("\n")
      )
    );
  });

  it("provides a readable message with objects too", () => {
    const actual = [
      {
        name: "My first item",
      },
    ];

    const expected = [
      {
        name: "Another item",
      },
    ];
    assert.throws(
      () => assertIncludesExactly(actual, expected),
      new Error(
        [
          "Expected arrays to contain the same objects:",
          "Missing elements were: [",
          "\t{",
          '\t\tname: "Another item"',
          "\t}",
          "]",
          "Extra elements were: [",
          "\t{",
          '\t\tname: "My first item"',
          "\t}",
          "]",
        ].join("\n")
      )
    );
  });
});
