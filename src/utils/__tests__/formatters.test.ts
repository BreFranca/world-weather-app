import { describe, it, expect } from "vitest";
import {
  capitalizeFirstLetter,
  formatDate,
  formatTemperature,
  formatTime,
} from "../formatters";

describe("formatters", () => {
  describe("capitalizeFirstLetter", () => {
    it("capitalizes first letter of lowercase string", () => {
      expect(capitalizeFirstLetter("hello world")).toBe("Hello world");
    });

    it("handles already capitalized strings", () => {
      expect(capitalizeFirstLetter("Hello world")).toBe("Hello world");
    });

    it("handles single character", () => {
      expect(capitalizeFirstLetter("a")).toBe("A");
    });

    it("handles empty string", () => {
      expect(capitalizeFirstLetter("")).toBe("");
    });

    it("handles strings with special characters", () => {
      expect(capitalizeFirstLetter("clear sky")).toBe("Clear sky");
    });

    it("preserves rest of the string case", () => {
      expect(capitalizeFirstLetter("hELLO wORLD")).toBe("HELLO wORLD");
    });
  });

  describe("formatDate", () => {
    it("formats unix timestamp to readable date", () => {
      // Jan 1, 2024 00:00:00 GMT
      const timestamp = 1704067200;
      const result = formatDate(timestamp);
      expect(result).toMatch(/Mon|Jan|1/);
    });

    it("handles different timestamps", () => {
      // Dec 25, 2024
      const timestamp = 1735084800;
      const result = formatDate(timestamp);
      expect(result).toBeTruthy();
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe("formatTemperature", () => {
    it("converts kelvin to celsius", () => {
      expect(formatTemperature(273.15)).toBe("0°C");
    });

    it("rounds to nearest integer", () => {
      expect(formatTemperature(293.7)).toBe("21°C");
    });

    it("handles negative temperatures", () => {
      expect(formatTemperature(263.15)).toBe("-10°C");
    });
  });

  describe("formatTime", () => {
    it("formats unix timestamp to time", () => {
      const timestamp = 1704067200;
      const result = formatTime(timestamp);
      expect(result).toBeTruthy();
      expect(result).toMatch(/\d{1,2}:\d{2}/);
    });

    it("handles different times", () => {
      const timestamp = 1704110400;
      const result = formatTime(timestamp);
      expect(result).toBeTruthy();
      expect(result.length).toBeGreaterThan(0);
    });
  });
});
