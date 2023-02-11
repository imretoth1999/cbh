const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    expect(deterministicPartitionKey()).toBe("0");
  });

  it("Return the deterministic partition key when event is set with no partition", () => {
    const expectedKey = crypto.createHash("sha3-512").update(JSON.stringify({key: "value"})).digest("hex");
    expect(deterministicPartitionKey({key : "value"})).toBe(expectedKey);
  });

  it("Returns the partition key when the partitionKey is defined but it's a number", () => {
    expect(deterministicPartitionKey({ partitionKey: 42})).toBe("42");
  });

  it("Returns the partition key when the partitionKey is defined but it's an array", () => {
    expect(deterministicPartitionKey({ partitionKey: [4, 2]})).toBe("[4,2]");
  });

  it("Returns the partition key when and its length < MAX_PARTITION_KEY_LENGTH", () => {
    expect(deterministicPartitionKey({ partitionKey: "value" })).toBe("value");
  })

  it("Returns the deterministic partition key when and its length > MAX_PARTITION_KEY_LENGTH", () => {
    const expectedKey = crypto.createHash("sha3-512").update("0".repeat(257)).digest("hex");
    expect(deterministicPartitionKey({ partitionKey: "0".repeat(257) })).toBe(expectedKey);
  });
});
