import { v4 as uuidv4 } from "uuid";
import { App, ComponentPropsOptions, inject, markRaw, provide, ref } from "vue";

type ComponentBaseType = abstract new (...args: any) => any;

export interface ModalConfig {
  /** The unique modal id. Do not touch */
  readonly id: string;
  /** The modal component type, can be used with `<component :is="modalConfig.component" />` */
  component: InstanceType<ComponentBaseType>;
  /** The props that are passed to the modal component */
  props: ComponentPropsOptions | null;
  options: {
    /** Close the modal when the overlay is clicked */
    cancelOnOverlayClick: boolean;
  } | null;
  /** Close the modal with data */
  close: (data: any) => void;
  /** Close the modal without data */
  cancel: () => void;
}

export interface ModalCallbacks {
  /** Close callback with closing data */
  onClose: <T>(callback: (data: T) => void) => ModalCallbacks;
  /** Cancel callback */
  onCancel: (callback: () => void) => ModalCallbacks;
  /** Returns a promise that resolves data when the modal is closed */
  closed: <T>() => Promise<T>;
  /** Returns a promise that resolves when the modal is cancelled */
  cancelled: () => Promise<void>;
}

const createModalStoreInstance = () => {
  const modals = ref([] as ModalConfig[]);

  const close = (modalId: ModalConfig["id"]) => {
    const index = modals.value.findIndex((modal) => modal.id === modalId);
    if (index !== -1) {
      modals.value.splice(index, 1);
    }
  };

  /**
   * Show a modal
   * @param component The modal component
   * @param props Props to pass to the modal component
   * @param options Additional options to configure the modal behavior
   * @returns
   */
  const show = <T extends ComponentBaseType>(
    component: T,
    props: InstanceType<T>["$props"] | null = null,
    options: ModalConfig["options"] = null
  ) => {
    let closeResolve: (data: unknown) => void;
    const closePromise = new Promise((resolve) => {
      closeResolve = resolve;
    });

    let cancelResolve: () => void;
    const cancelPromise = new Promise<void>((resolve) => {
      cancelResolve = resolve;
    });

    const res: ModalCallbacks = {
      onClose: <P>(callback: (data: P) => void) => {
        closePromise.then(callback as (data: unknown) => void);
        return res;
      },
      onCancel: (callback) => {
        cancelPromise.then(callback);
        return res;
      },
      closed: <T>() => closePromise as Promise<T>,
      cancelled: () => cancelPromise,
    };

    const modalConfig: ModalConfig = {
      id: uuidv4(),
      component: markRaw(component),
      props,
      options: {
        cancelOnOverlayClick: true,
        ...options,
      },
      close: <P>(data: P) => {
        closeResolve(data);
        close(modalConfig.id);
      },
      cancel: () => {
        cancelResolve();
        close(modalConfig.id);
      },
    };
    modals.value.push(modalConfig);

    return res;
  };

  const store = {
    modals,
    close,
    show,
  };

  return store;
};

export type ModalStore = ReturnType<typeof createModalStoreInstance>;

const ModalStoreSymbol = Symbol("modalstore");

/** Create a modal store. Call this in your main file: `app.use(createModalStore())` */
export const createModalStore = () => {
  return {
    install(app: App) {
      const store = createModalStoreInstance();
      app.provide(ModalStoreSymbol, store);
    },
  };
};

/** Inject the modal store */
export const useModalStore = () => {
  const store = inject(ModalStoreSymbol);
  if (!store) {
    throw new Error(
      "Modal store could not be injected. Did you forget to create one? Call `app.use(createModalStore())`"
    );
  }
  return store as ModalStore;
};

const ModalSymbol = Symbol("modal");

export const provideModal = (modal: ModalConfig) => {
  provide(ModalSymbol, modal);
  return modal;
};

/** Inject the current modal. Use this within your modal component to call close/cancel functions */
export const useModal = () => {
  return inject(ModalSymbol) as ModalConfig;
};
