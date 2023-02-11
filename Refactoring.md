# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

My thoughts while looking to the code were the following:
- we have too many if else conditions, can I maybe refactor them in a one line if ?
- I don't like that we declare the canditate as an empty variable, maybe I can give it an initial value?
- The constants are in the export and I don't like it this way, I will move them to the top since they are not modified in any way in the exported function

The following code has been simplified to only a single if. We want to verify if the event exists, and based on the data inside the event we want to either return the partition key or the crypto hash.
The variable data was redundant and I moved the JSON.stringify inside the update function.
```js
  if (event) {
    if (event.partitionKey) {
      candidate = event.partitionKey;
    } else {
      const data = JSON.stringify(event);
      candidate = crypto.createHash("sha3-512").update(data).digest("hex");
    }
  }

```
The following code was into one single if. There is no need to verify if the candidate variable is not null since if it is null, it won't pass the typeof condition. Since we verify that the candidate exists, the worst case scenario being that we give it the value TRIVIAL_PARTITION_KEY, I moved the TRIVIAL_PARTITION_KEY as the initial value.

```js
if (candidate) {
    if (typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
    }
  } else {
    candidate = TRIVIAL_PARTITION_KEY;
  }

```

The following code was moved into a one line if since we can simply the code and handle all cases with one return. I moved the both values to be returned to the following line because the code line was starting to be way too long.

```js
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }
  return candidate;
```

I belive this code to be way more readable than before because:
- We don't have variables that are not modified in any way inside the function. We moved them to the top to not overcomplicate the function
- We removed a lot of redunant if else conditions and moved them to one line ifs which make them more readable and shorter to read
- We declare a variable with an initial value. this way we handle by default the condition where we have no event