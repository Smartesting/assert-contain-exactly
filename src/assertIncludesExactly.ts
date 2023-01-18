import includesExactly from "./includesExactly";
import stringifyObject from "./stringifyObject";

export default function assertIncludesExactly<T>(
  actual: ReadonlyArray<T>,
  expected: ReadonlyArray<T>
) {
  const { missingElements, extraElements } = includesExactly(actual, expected);
  if (missingElements.length > 0 || extraElements.length > 0) {
    const message = ["Expected arrays to contain the same objects:"];

    if (missingElements.length > 0) {
      message.push(
        `Missing elements were: ${stringifyObject(missingElements)}`
      );
    }

    if (extraElements.length > 0) {
      message.push(`Extra elements were: ${stringifyObject(extraElements)}`);
    }

    throw new Error(message.join("\n"));
  }
}
