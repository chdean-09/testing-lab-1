import { match } from "../../src/index";

describe("Apostrophe Template Checker", () => {
  // tests wildcard apostrophes after the word
  it("should match if the string starts with 'test'", () => {
    expect(match("test*", "testing")).toBe(true)
  });

  it("should match if the string starts with 'test'", () => {
    expect(match("test*", "test")).toBe(true)
  });

  it("should match if the string starts with 'test'", () => {
    expect(match("test*", "tes")).toBe(false)
  });

  it("should match if the string starts with 'test'", () => {
    expect(match("test*", " testtest")).toBe(false)
  });

  // tests inbetween wildcard apostrophes
  it("should match if the string contains 'hello' inbetween", () => {
    expect(match("*hello*", "hELLo")).toBe(true)
  });

  it("should match if the string contains 'hello' inbetween", () => {
    expect(match("*hello*", "helloHELLOhello")).toBe(true)
  });

  it("should match if the string contains 'hello' inbetween", () => {
    expect(match("*hello*", "hellohaa")).toBe(true)
  });

  it("should match if the string contains 'hello' inbetween", () => {
    expect(match("*hello*", "3534hello")).toBe(true)
  });

  it("should match if the string contains 'hello' inbetween", () => {
    expect(match("*hello*", "he+llo")).toBe(false)
  });

  it("should match if the string contains 'hello' inbetween", () => {
    expect(match("*hello*", "he+l3l4o")).toBe(false)
  });

  it("should match if the string contains 'hello' inbetween", () => {
    expect(match("*hello*", "heIIo")).toBe(false)
  });

  // tests wildcard apostrophes before the word
  it("should match if the string ends in '7263'", () => {
    expect(match("*7263", "7263")).toBe(true)
  });

  it("should match if the string ends in '7263'", () => {
    expect(match("*7263", "--s217263")).toBe(true)
  });

  it("should match if the string ends in '7263'", () => {
    expect(match("*7263", "72637263")).toBe(true)
  });

  it("should match if the string ends in '7263'", () => {
    expect(match("*7263", "--s2s7263!")).toBe(false)
  });

  it("should match if the string ends in '7263'", () => {
    expect(match("*7263", "7263 ")).toBe(false)
  });

  it("should match if the string ends in '7263'", () => {
    expect(match("*7263", "263")).toBe(false)
  });

  // combining the wildcard apostrophes
  it("should match if string matches the wildcards", () => {
    expect(match("=*this*is*[00|", "=thisis[00|")).toBe(true)
  });

  it("should match if string matches the wildcards", () => {
    expect(match("=*this*is*[00|", "=--=this!!isNOT[00|")).toBe(true)
  });

  it("should match if string matches the wildcards", () => {
    expect(match("=*this*is*[00|", "=== this this is is SHOULD WORK BTW [00|")).toBe(true)
  });

  it("should match if string matches the wildcards", () => {
    expect(match("=*this*is*[00|", "=isthis[00|")).toBe(false)
  });

  it("should match if string matches the wildcards", () => {
    expect(match("=*this*is*[00|", "-=thisis[00|-")).toBe(false)
  });

  it("should match if string matches the wildcards", () => {
    expect(match("=*this*is*[00|", "=this[00|")).toBe(false)
  });

  it("should match if string matches the wildcards", () => {
    expect(match("=*this*is*[00|", "=thsthsis[00|")).toBe(false)
  });
})