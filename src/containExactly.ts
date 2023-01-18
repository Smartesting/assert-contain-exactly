export default function containExactly<T>(
  actual: ReadonlyArray<T>,
  expected: ReadonlyArray<T>
): {
  missingElements: ReadonlyArray<T>;
  extraElements: ReadonlyArray<T>;
} {
  const jsonActual = actual.map((item) => JSON.stringify(item));
  const jsonExpected = expected.map((item) => JSON.stringify(item));

  return {
    missingElements: findMissing(jsonActual, jsonExpected).map(
      (item) => JSON.parse(item) as T
    ),
    extraElements: findMissing(jsonExpected, jsonActual).map(
      (item) => JSON.parse(item) as T
    ),
  };
}

function findMissing(
  actual: ReadonlyArray<string>,
  expected: ReadonlyArray<string>
): ReadonlyArray<string> {
  return expected.filter((item) => !actual.includes(item));
}
