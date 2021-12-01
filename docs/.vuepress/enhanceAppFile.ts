import { App } from "vue";
import { ModalContainer } from "../../src";
import DemoModal from "./components/DemoModal.vue";
import ModalDemo from "./components/ModalDemo.vue";

export default ({ app }: { app: App }) => {
  app.component("ModalContainer", ModalContainer);
  app.component("DemoModal", DemoModal);
  app.component("ModalDemo", ModalDemo);
};
