import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";
import { afterEach, beforeEach, vi } from "vitest";
Object.assign(globalThis, { TextEncoder, TextDecoder });

beforeEach(() => {
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});
