import ModalContainerComponent from "./ModalContainer.vue";
import { useModalStore as useModalStoreFunc, useModal as useModalFunc } from "./store";

export const ModalContainer = ModalContainerComponent;
export const useModalStore = useModalStoreFunc;
export const useModal = useModalFunc;
