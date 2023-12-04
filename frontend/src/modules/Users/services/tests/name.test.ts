import { describe, it, expect } from "vitest";
import { regExpName } from "../schema";

describe("Name Validation Regex", () => {
  it("should match valid names with spaces", () => {
    expect("John Doe").toMatch(regExpName);
    expect("Jean-Claude Van Damme").toMatch(regExpName);
    expect("John Doe 2nd").toMatch(regExpName);
  });

  it("should not match single-word names", () => {
    expect("Madonna").not.toMatch(regExpName);
  });

  it("should not match names without spaces", () => {
    expect("塞尔吉奥·阿圭罗").not.toMatch(regExpName); // Assuming no space
    expect("李小龍").not.toMatch(regExpName);
  });

  it("should match names with special characters and spaces", () => {
    expect("María José").toMatch(regExpName);
    expect("François Hollande").toMatch(regExpName);
    expect("José María Aznar").toMatch(regExpName);
  });
});
