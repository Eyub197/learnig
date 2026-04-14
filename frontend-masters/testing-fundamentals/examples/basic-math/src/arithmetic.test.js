import { describe, it, expect } from 'vitest';
import { add, subtract, multiply, divide } from './arithmetic.js';

describe('add', () => {
  it("should add 2 positive numbers", () => {
    expect(add(2, 2)).toBe(4)
  })

  it("shuold add two negative numnbers", () => {
    expect(add(-2, -2)).toBe(-4)
  })

  it("should parse strings into numbers", () => {
    expect(add("2", "2")).toBe(4)
  })

  it("should get real angry if you give it a first argmunet that cannot be parsed into a number", () => {
    expect(() => (add("foo", 2))).toThrow("is not a number")
  })

  it("should get real angry if you give it a second argument that cannot be parsed into a number", () => {
    expect(() => (add(2, "foo"))).toThrow("is not a number")
  })

  it("should get convert boolean values to there numeric versions", () => {
    expect(add(true, true)).toBe(2)
  })

  it("should get real angry if you give it a first argument undefined", () => {
    expect(() => (add(undefined, 1))).toThrow("is not defined")
  })

  it("should get real angry if you give it a second argument undefined", () => {
    expect(() => (add(2, undefined))).toThrow("is not defined")
  })

  it("should convert null to 0", () => {
    expect(add(1, null)).toBe(1)
  })

  it("should get real angry if you give it a first argument an object", () => {
    expect(() => (add({}, 1))).toThrow("should not be a object")
  })

  it("should get real angry if you give it a second argumnet an object", () => {
    expect(() => (add(1, {}))).toThrow("should not be a object")
  })

  it("should get real angry if you give it a first argument an array", () => {
    expect(() => (add([], 1))).toThrow("should not be a array")
  })

  it("should get real angry if you give it a second argumnet an array", () => {
    expect(() => (add(1, []))).toThrow("should not be a array")
  })

  it("should get real angry if you give it a first argument an function", () => {
    expect(() => (add(function() { }, 1))).toThrow("should not be a function")
  })

  it("should get real angry if you give it a second argumnet an function", () => {
    expect(() => (add(1, function() { }))).toThrow("should not be a function")
  })

  it("should get real angry if you give it a first argument a promise", () => {
    expect(() => (add(new Promise((resolve) => resolve()), 1))).toThrow("should not be a promise")
  })

  it("should get real angry if you give it a second argument a promise", () => {
    expect(() => (add(1, new Promise((resolve) => resolve())))).toThrow("should not be a promise")
  })
});

describe('subtract', () => {
  it("shoud subtract 2 poitive numbers", () => {
    expect(subtract(4, 2)).toBe(2)
  })
});

describe('multiply', () => {
  it("should mutiply 2 postive numbers", () => {
    expect(multiply(2, 2)).toBe(4)
  })
});

describe('divide', () => {
  it("should divide 2 postive numbers", () => {
    expect(divide(4, 2)).toBe(2)
  })

  it("should get real angry if you give it a 0 as a first argument", () => {
    expect(() => (divide(0, 5))).toThrow("should not be 0")
  })

  it("should get real angry if you give it a 0 as a second argument", () => {
    expect(() => (divide(2, 0))).toThrow("should not be 0")
  })

});
