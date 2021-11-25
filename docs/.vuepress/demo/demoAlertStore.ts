import { createItemStoreInstance } from "../../../src/genericStore";

export const {
  useStore: useAlertStore,
  provideStore: provideAlertStore,
  useItem: useAlert,
  provideItem: provideAlert,
} = createItemStoreInstance(
  (base) => {
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
    };
  }
  // (item) => {
  //   const itemReturn = {
  //     onClose: (callback: (data: any) => void) => {
  //       callback({});
  //       return item;
  //     },
  //   };
  //   return itemReturn;
  // }
);
