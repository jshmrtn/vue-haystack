<template>
  <div>
    <ModalContainer />
    <button @click="showModal">Show Demo Modal</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useModalStore, ModalContainer } from "../../../src";
import DemoModal from "./DemoModal.vue";

export default defineComponent({
  name: "ModalDemo",
  components: { ModalContainer },
  props: {},
  setup: (_props) => {
    const modalStore = useModalStore();
    const showModal = () => modalStore.show(DemoModal, { foo: "bar" }).onClose((data) => console.log(data));

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
