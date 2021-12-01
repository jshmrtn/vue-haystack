import { computed } from "vue";
import { createItemStoreInstance } from "../genericStore";

const store = createItemStoreInstance(
  (base) => {
    let closeResolve: <T>(data?: T) => void;
    const closePromise = new Promise((resolve) => {
      closeResolve = resolve;
    });

    const item = {
      ...base,
      close: <T>(data?: T) => {
        modalStore.remove(base.id);
        closeResolve(data);
      },
      options: {
        closeOnOverlayClick: true,
        ...base.options,
      },
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
  (items) => {
    return {
      activeModal: computed(() => {
        // return items.value.slice(-1)[0] || null;
        return items.value.length > 0 ? items.value[items.value.length - 1] : null;
      }),
    };
  },
);

export const { useStore: useModalStore, useItem: useModal, provideItem: provideModal, store: modalStore } = store;
