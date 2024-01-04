const findABCD = require("./findABCD");

describe("findABCD Function", () => {
  test("should return A when A is in the string", () => {
    expect(findABCD("Here is an A")).toBe("A");
  });

  test("should return B when B is in the string", () => {
    expect(findABCD("Now we have a B")).toBe("B");
  });

  test("should return the first occurrence when multiple are present", () => {
    expect(findABCD("A and B are both here")).toBe("A");
  });

  test("should return undefined when there is no A-D", () => {
    expect(findABCD("No valid letter here")).toBeUndefined();
  });
});
