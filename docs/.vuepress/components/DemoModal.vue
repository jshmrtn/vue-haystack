<template>
  <div :class="$style.modal">
    <h1>Demo Modal</h1>
    <p>
      foo: <b>{{ foo }}</b>
    </p>
    <button @click="emitLog">Log</button>
    <button @click="showModal">Open inner modal</button>
    <button @click="close">Close</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useModal, useModalStore } from "../../../src";
import DemoModal from "./DemoModal.vue";

export default defineComponent({
  name: "DemoModal",
  components: {},
  props: {
    foo: {
      type: String,
      required: true,
    },
  },
  emits: ["log"],
  setup: (props, ctx) => {
    const modalStore = useModalStore();
    const modal = useModal();
    const showModal = () => modalStore.push(DemoModal, { foo: "Inner modal" });

    const emitLog = () => {
      ctx.emit("log", props.foo);
    };

    const close = () => {
      modal.close<{ data: string }>({ data: props.foo });
    };
    return { close, showModal, emitLog };
  },
});
</script>

<style module lang="scss">
.modal {
  padding: 1.5rem;
  background-color: white;
  box-shadow: 0px 0.125rem 0.75rem -0.25rem rgba(0, 0, 0, 0.25);
  border-radius: 0.125rem;
}
</style>
