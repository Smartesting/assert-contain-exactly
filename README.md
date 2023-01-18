# @smartesting/assert-contain-exactly

[![Node.js CI](https://github.com/Smartesting/assert-contain-exactly/actions/workflows/node.js.yml/badge.svg)](https://github.com/Smartesting/assert-contain-exactly/actions/workflows/node.js.yml)

Simple test helper ensuring a list contains exactly the expected elements, without taking care of order. It is strongly inspired by [Rspec's `contain_exactly` matcher](https://relishapp.com/rspec/rspec-expectations/docs/built-in-matchers/contain-exactly-matcher).

## Install

```shell
npm i --save-dev @smartesting/assert-contain-exactly
```

## Usage

```typescript
import assertContainExactly from "@smartesting/assert-contain-exactly";

const expected = ["a", "b", "c"];
const actual = getItems();
assertContainExactly(actual, expected);
```

When the arrays `actual` and `expected`, nothing happens. Otherwise, an exception is thrown and the message should help you spot the differences between the two arrays:

```
Error: Expected arrays to contain the same objects.
Missing elements were: [
  {
    id: "session-2",
    buildId: "13"
  }
]
Extra elements were: [
  {
    id: "session-B",
    buildId: "13"
  }
]
    at assertIncludesExactly (...)

```

## Notes

This code is meant to be used for testing purposes. The algorithm is not that smart not designed to handle arrays with hundred of items.
