function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function tryMultipleTimes<T>(callback: MaybeAsyncCallback<T>, times = 2, retryTime = 1000) {
  let result: T;
  let counter = 0;

  const succeed: SucceedCallback<T> = (executionResult: T) => {
    result = executionResult;
    throw { name: "succeed" };
  };

  const failed: FailedCallback = (reason?: string) => {
    throw { name: "failed", message: reason ?? "A fail occured in tryMultipleTimes()" };
  };

  while (counter++ < times) {
    try {
      if (callback[Symbol.toStringTag] === "AsyncFunction") {
        await callback(succeed, failed);
      } else {
        callback(succeed, failed);
      }
    } catch (obj) {
      if (obj.name === "succeed") {
        return {
          status: "succeed",
          result,
        };
      }

      console.warn(obj.message);
    }

    counter < times && (await sleep(retryTime));
  }

  return {
    status: "failed",
  };
}

export default tryMultipleTimes;

type SucceedCallback<T> = (result: T) => void;
type FailedCallback = (reason?: string) => void;
type Callback<T> = (succeed: SucceedCallback<T>, failed: FailedCallback) => void;
type AsyncCallback<T> = (succeed: SucceedCallback<T>, failed: FailedCallback) => Promise<void>;
type MaybeAsyncCallback<T> = Callback<T> | AsyncCallback<T>;
