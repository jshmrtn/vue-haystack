import { ModalContainer } from "../../src/";
import { createModalStore } from "../../src/store";
import DemoModal from "./components/DemoModal.vue";
import ModalDemo from "./components/ModalDemo.vue";

export default ({ app }) => {
  app.use(createModalStore());
  app.component("ModalContainer", ModalContainer);
  app.component("DemoModal", DemoModal);
  app.component("ModalDemo", ModalDemo);
};
