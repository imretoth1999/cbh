const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

exports.deterministicPartitionKey = (event) => {
  let candidate = TRIVIAL_PARTITION_KEY;

  if (event) {
    candidate = event.partitionKey || crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex");
  }

  if (typeof candidate !== "string") {
    candidate = JSON.stringify(candidate);
  }

  return candidate.length > MAX_PARTITION_KEY_LENGTH ? 
          crypto.createHash("sha3-512").update(candidate).digest("hex") : candidate;
};