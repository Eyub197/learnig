import { expect, it, vi, beforeEach, afterEach, describe } from 'vitest';
import { log } from './log';

describe('logger', () => {
  describe("development", () => {

    it("logs to the console in development mode", () => {
      const logSpy = vi.fn()
      log("Hello", { mode: "production", productionCallback: logSpy })
      expect(logSpy).toHaveBeenCalledWith("Hello")
    })
  })

  describe("production", () => {
    beforeEach(() => {
      vi.stubEnv("MODE", "production")
    })

    afterEach(() => {
      vi.resetAllMocks()
    })
    it("should not call console.log in production", () => {
      const logSpy = vi.spyOn(console, "log")
      log("Hello")
      expect(logSpy).not.toHaveBeenCalledWith("Hello")
      expect(sendToServer).toHaveBeenCalled()
    })
  })
});
