import { describe, expect, it } from "vitest";

import subject from "../src/domain/activity-date";

describe("The activity date", () => {
  describe("when parsing a date-only activity", () => {
    it("preserves its calendar date", () => {
      const activity = "2020-05-22";

      const date = subject.from(activity);

      expect(date.toString()).toEqual("2020-05-22");
    });
  });
});
