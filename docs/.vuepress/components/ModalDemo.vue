<template>
  <div>
    <ModalContainer />
    <button @click="showModal">Show Demo Modal</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ModalContainer, useModalStore } from "../../../src";
import { useAlertStore } from "../demo/demoAlertStore";
import DemoModal from "./DemoModal.vue";

export default defineComponent({
  name: "ModalDemo",
  components: { ModalContainer },
  props: {},
  setup: (_props) => {
    const modalStore = useModalStore();
    const showModal = () =>
      modalStore
        .push(DemoModal, { foo: "asdf" }, { log: (text: string) => console.log(text) }, { closeOnOverlayClick: true })
        .onClose((data) => console.log(data));

    useAlertStore()
      .push(DemoModal)
      .onClose(() => {
        console.log("CLOSED");
      });

    return { showModal };
  },
});
</script>

<style module lang="scss">
button {
  cursor: pointer;
  appearance: none;
  border: none;
  border-radius: 3px;
  background-color: var(--c-brand);
  color: var(--c-bg);
  padding: 0.8rem 1.6rem;
  font-family: var(--font-family);
  font-size: 1rem;
  font-weight: 500;
  transition: background-color var(--t-color);
}
</style>
