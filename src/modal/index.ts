import { computed } from "@vue/reactivity";
import { createItemStoreInstance } from "../genericStore";
import ModalContainerComp from "./ModalContainer.vue";
import ModalProviderComp from "./ModalProvider.vue";

export const {
  useStore: useModalStore,
  provideStore: provideModalStore,
  useItem: useModal,
  provideItem: provideModal,
  store: modalStore,
} = createItemStoreInstance(
  (base) => {
    let closeResolve: (data: unknown) => void;
    const closePromise = new Promise((resolve) => {
      closeResolve = resolve;
    });

    const item = {
      ...base,
      close: <T>(data?: T) => {
        closeResolve(data);
        modalStore.remove(base.id);
      },
      options: base.options as { closeOnOverlayClick: boolean } | null,
    };

    return {
      item,
      useReturn: {
        onClose: (callback: (data: any) => void) => {
          closePromise.then(callback);
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
