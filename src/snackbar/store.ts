import { reactive } from "vue";
import { createItemStoreInstance } from "../genericStore";

export const snackTimer = (callback: () => void, duration: number = 0, updateInterval = 100) => {
  let startTime = new Date().getTime();
  let delay = duration;
  const remainingTime = reactive({ value: duration });
  const progress = reactive({ value: 1 });
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let remainderInterval: ReturnType<typeof setInterval> | null = null;

  const clear = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    if (remainderInterval) {
      clearInterval(remainderInterval);
      remainderInterval = null;
    }
  };

  const pause = () => {
    clear();
    delay = delay - (new Date().getTime() - startTime);
  };

  const resume = () => {
    if (duration <= 0) {
      return;
    }
    if (!timeout) {
      timeout = setTimeout(callback, delay);
    }
    startTime = new Date().getTime();
    if (!remainderInterval) {
      remainderInterval = setInterval(() => {
        const time = delay - (new Date().getTime() - startTime);
        remainingTime.value = time;
        progress.value = time / duration;
      }, updateInterval);
    }
  };

  resume();

  return {
    /** stop/reset the timer */
    clear,
    /** pause the timer */
    pause,
    /** resume the timer */
    resume,
    /** remaining lifetime */
    remainingTime,
    /** lifetime progress value counting from 1 to 0 */
    progress,
    /** total duration */
    duration,
  };
};

const store = createItemStoreInstance(
  (base) => {
    let closeResolve: <T>(data?: T) => void;
    const closePromise = new Promise((resolve) => {
      closeResolve = resolve;
    });

    const options = {
      time: 0,
      ...base.options,
    } as {
      time?: number;
    };

    const item = {
      ...base,
      close: <T>(data?: T) => {
        snackbarStore.remove(base.id);
        closeResolve(data);
        item.timer.clear();
      },
      timer: snackTimer(() => {
        item.close();
      }, options.time),
      options: options,
    };

    return {
      item,
      useReturn: {
        onClose: <T>(callback: (data?: T) => void) => {
          closePromise.then(callback as never);
          return item;
        },
      },
      options: item.options,
    };
  },
  (_items) => {
    return {
      log: () => {
        console.log(_items);
      },
    };
  },
);

export const { useStore: useSnackbar, useItem: useSnack, provideItem: provideSnack, store: snackbarStore } = store;
