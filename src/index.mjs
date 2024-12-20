const asyncFunct = async () => {
  return new Promise((resolve, reject) => {
    reject("rejected");
  });
};

const delayFunct = async (delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
};

const retry = async (funtn, retries, delay, finalError) => {
  try {
    const res = await funtn();
    return res;
  } catch (error) {
    if (retries === 0) return new Error(finalError);
    await delayFunct(delay);
    return retry(funtn, retries - 1, delay, finalError);
  }
};

retry(asyncFunct, (retries = 3), (delay = 5000), (finalError = "Failed"))
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
