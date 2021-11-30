import { App } from "vue";
import { ModalContainer, provideModalStore } from "../../src";
import DemoModal from "./components/DemoModal.vue";
import ModalDemo from "./components/ModalDemo.vue";
import { provideAlertStore } from "./demo/demoAlertStore";

export default ({ app }: { app: App }) => {
  provideAlertStore(app);

  provideModalStore(app);
  app.component("ModalContainer", ModalContainer);
  app.component("DemoModal", DemoModal);
  app.component("ModalDemo", ModalDemo);
};
