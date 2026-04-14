export const add = (a, b) => {
  if (typeof a === "string") a = Number(a)
  if (typeof b === "string") b = Number(b)

  if (Number.isNaN(a)) throw new Error("The first argument is not a number")
  if (Number.isNaN(b)) throw new Error("The second argument is not a number")

  if (typeof a === "undefined") throw new Error("The first argument is not defined")
  if (typeof b === "undefined") throw new Error("The second argument is not defined")

  if (a === null) a = 0
  if (b === null) b = 0

  if (Array.isArray(a)) throw new Error("The first argument should not be a array")
  if (Array.isArray(b)) throw new Error("The second argument should not be a array")

  if (a instanceof Promise) throw new Error("The first argument should not be a promise")
  if (b instanceof Promise) throw new Error("The second argument should not be a promise")

  if (typeof a === "object") throw new Error("The first argument should not be a object")
  if (typeof b === "object") throw new Error("The second argument should not be a object")

  if (typeof a === "function") throw new Error("The first argument should not be a function")
  if (typeof b === "function") throw new Error("The second argument should not be a function")


  return a + b
};

export const subtract = (a, b) => {
  if (typeof a === "string") a = Number(a)
  if (typeof b === "string") b = Number(b)

  if (Number.isNaN(a)) throw new Error("The first argument is not a number")
  if (Number.isNaN(b)) throw new Error("The second argument is not a number")

  if (typeof a === "undefined") throw new Error("The first argument is not defined")
  if (typeof b === "undefined") throw new Error("The second argument is not defined")

  if (a === null) a = 0
  if (b === null) b = 0

  if (Array.isArray(a)) throw new Error("The first argument should not be a array")
  if (Array.isArray(b)) throw new Error("The second argument should not be a array")

  if (a instanceof Promise) throw new Error("The first argument should not be a promise")
  if (b instanceof Promise) throw new Error("The second argument should not be a promise")

  if (typeof a === "object") throw new Error("The first argument should not be a object")
  if (typeof b === "object") throw new Error("The second argument should not be a object")

  if (typeof a === "function") throw new Error("The first argument should not be a function")
  if (typeof b === "function") throw new Error("The second argument should not be a function")


  return a / b
};

export const multiply = (a, b) => {
  if (typeof a === "string") a = Number(a)
  if (typeof b === "string") b = Number(b)

  if (Number.isNaN(a)) throw new Error("The first argument is not a number")
  if (Number.isNaN(b)) throw new Error("The second argument is not a number")

  if (typeof a === "undefined") throw new Error("The first argument is not defined")
  if (typeof b === "undefined") throw new Error("The second argument is not defined")

  if (a === null) a = 0
  if (b === null) b = 0

  if (Array.isArray(a)) throw new Error("The first argument should not be a array")
  if (Array.isArray(b)) throw new Error("The second argument should not be a array")

  if (a instanceof Promise) throw new Error("The first argument should not be a promise")
  if (b instanceof Promise) throw new Error("The second argument should not be a promise")

  if (typeof a === "object") throw new Error("The first argument should not be a object")
  if (typeof b === "object") throw new Error("The second argument should not be a object")

  if (typeof a === "function") throw new Error("The first argument should not be a function")
  if (typeof b === "function") throw new Error("The second argument should not be a function")

  return a * b
};

export const divide = (a, b) => {
  if (a === 0) throw new Error("The first argument should not be 0")
  if (b === 0) throw new Error("The second argument should not be 0")

  if (typeof a === "string") a = Number(a)
  if (typeof b === "string") b = Number(b)

  if (Number.isNaN(a)) throw new Error("The first argument is not a number")
  if (Number.isNaN(b)) throw new Error("The second argument is not a number")

  if (typeof a === "undefined") throw new Error("The first argument is not defined")
  if (typeof b === "undefined") throw new Error("The second argument is not defined")

  if (a === null) a = 0
  if (b === null) b = 0

  if (Array.isArray(a)) throw new Error("The first argument should not be a array")
  if (Array.isArray(b)) throw new Error("The second argument should not be a array")

  if (a instanceof Promise) throw new Error("The first argument should not be a promise")
  if (b instanceof Promise) throw new Error("The second argument should not be a promise")

  if (typeof a === "object") throw new Error("The first argument should not be a object")
  if (typeof b === "object") throw new Error("The second argument should not be a object")

  if (typeof a === "function") throw new Error("The first argument should not be a function")
  if (typeof b === "function") throw new Error("The second argument should not be a function")

  return a / b
};
