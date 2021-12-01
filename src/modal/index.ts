import { computed } from "@vue/reactivity";
import { createItemStoreInstance } from "../genericStore";
import ModalContainerComp from "./ModalContainer.vue";
import ModalProviderComp from "./ModalProvider.vue";

export const {
  useStore: useModalStore,
  useItem: useModal,
  provideItem: provideModal,
  store: modalStore,
} = createItemStoreInstance(
  (base) => {
    let closeResolve: <T>(data?: T) => void;
    const closePromise = new Promise((resolve) => {
      closeResolve = resolve;
    });

    const item = {
      ...base,
      close: <T>(data?: T) => {
        closeResolve(data);
        modalStore.remove(base.id);
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
        return items.value.length > 0 ? items.value[items.value.length - 1] : null;
      }),
    };
  },
);

export const ModalContainer = ModalContainerComp;
export const ModalProvider = ModalProviderComp;
