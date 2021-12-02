import { App } from "vue";
import { ModalContainer, SnackContainer } from "../../src";
import DemoModal from "./components/DemoModal.vue";
import DemoSnack from "./components/DemoSnack.vue";
import ModalDemo from "./components/ModalDemo.vue";
import SnackbarDemo from "./components/SnackbarDemo.vue";

export default ({ app }: { app: App }) => {
  app.component("ModalContainer", ModalContainer);
  app.component("SnackContainer", SnackContainer);

  app.component("DemoModal", DemoModal);
  app.component("ModalDemo", ModalDemo);

  app.component("DemoSnack", DemoSnack);
  app.component("SnackbarDemo", SnackbarDemo);
};
