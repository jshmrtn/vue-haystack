<template>
  <div>
    <ModalContainer />
    <button @click="showModal">Show Demo Modal</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ModalContainer, useModalStore } from "../../../src";
import DemoModal from "./DemoModal.vue";

export default defineComponent({
  name: "ModalDemo",
  components: { ModalContainer },
  props: {},
  setup: (_props) => {
    const modalStore = useModalStore();
    const showModal = () =>
      modalStore
        .push(
          DemoModal,
          { foo: "Modal content" },
          { log: (text: string) => console.log("log emittet", text) },
          { closeOnOverlayClick: true },
        )
        .onClose<string>((data) => console.log("onClose", data));

    return { showModal };
  },
});
</script>

<style module lang="scss"></style>
