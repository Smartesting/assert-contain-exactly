import assert from "assert";
import assertContainExactly from "./assertContainExactly";

describe("assertContainExactly", () => {
  it("throws an Error when actual in not eactly included in expected", () => {
    assert.throws(() => assertContainExactly(["a"], ["a", "b"]));
  });

  it("provides a helpful message when elements are missing", () => {
    assert.throws(
      () => assertContainExactly(["a"], ["a", "b"]),
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
      () => assertContainExactly(["a", "b"], ["a"]),
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
      () => assertContainExactly(["a"], ["b"]),
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
      () => assertContainExactly(actual, expected),
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
