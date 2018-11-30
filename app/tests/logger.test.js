import PearLogger from "../logger";

test("PearLogger works", () => {
  const testLogger = new PearLogger("test");
  testLogger.log({
    action: "test"
  });
});
