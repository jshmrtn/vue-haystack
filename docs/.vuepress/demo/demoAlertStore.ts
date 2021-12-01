import { createItemStoreInstance } from "../../../src/genericStore";

export const {
  useStore: useAlertStore,
  useItem: useAlert,
  provideItem: provideAlert,
} = createItemStoreInstance((base) => {
  let closeResolve: (data: unknown) => void;
  const closePromise = new Promise((resolve) => {
    closeResolve = resolve;
  });

  const item = {
    ...base,
    close: () => {
      closeResolve({});
    },
  };

  return {
    item,
    useReturn: {
      onClose: (callback: (data: any) => void) => {
        closePromise.then(callback);
        return item;
      },
    },
    options: {},
  };
});
