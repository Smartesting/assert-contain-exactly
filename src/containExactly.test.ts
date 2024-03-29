import assert from "assert";
import containExactly from "./containExactly";

describe("containExactly", () => {
  it("does not return missing or extra elements when arrays are identical", () => {
    const result = containExactly(["a", "b"], ["a", "b"]);

    assert.deepStrictEqual(result.missingElements, []);
    assert.deepStrictEqual(result.extraElements, []);
  });

  it("does not care about the order of the elements", () => {
    const result = containExactly(["a", "b"], ["b", "a"]);

    assert.deepStrictEqual(result.missingElements, []);
    assert.deepStrictEqual(result.extraElements, []);
  });

  it("adds to `missingElements` the ones that were in the `expected` argument but not in the `actual` one", () => {
    const result = containExactly(["a", "b"], ["a", "b", "c"]);

    assert.deepStrictEqual(result.missingElements, ["c"]);
    assert.deepStrictEqual(result.extraElements, []);
  });

  it("adds to `extraElements` the ones that were in the `actual` argument but not in the `expected` one", () => {
    const result = containExactly(["a", "b", "c"], ["a", "b"]);

    assert.deepStrictEqual(result.missingElements, []);
    assert.deepStrictEqual(result.extraElements, ["c"]);
  });

  it("can provides both extra and missing elements", () => {
    const result = containExactly(["a", "b"], ["b", "c"]);

    assert.deepStrictEqual(result.missingElements, ["c"]);
    assert.deepStrictEqual(result.extraElements, ["a"]);
  });

  it("works with objects too", () => {
    const result = containExactly(
      [
        {
          name: "item1",
        },
        {
          name: "item2",
        },
      ],
      [
        {
          name: "item3",
        },
        {
          name: "item2",
        },
      ]
    );

    assert.deepStrictEqual(result.missingElements, [
      {
        name: "item3",
      },
    ]);

    assert.deepStrictEqual(result.extraElements, [
      {
        name: "item1",
      },
    ]);
  });

  it("just provide a high level overview of the difference", () => {
    // We could expect some deeper inspection, but that's not available.
    const result = containExactly(
      [{ items: ["a", "b"] }],
      [{ items: ["b", "c"] }]
    );

    assert.deepStrictEqual(result.missingElements, [{ items: ["b", "c"] }]);
    assert.deepStrictEqual(result.extraElements, [{ items: ["a", "b"] }]);
  });
});
