<template>
  <div :class="$style.modal">
    <h1>Demo Modal</h1>
    <p>
      foo: <b>{{ foo }}</b>
    </p>
    <button @click="showModal">asdf</button>
    <button @click="close">Close</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useModalStore, useModal } from "../../../src";
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
  setup: (props) => {
    const modalStore = useModalStore();
    const modal = useModal();
    const showModal = () =>
      modalStore.show(DemoModal, { foo: "asdfa sdfa sdfasdasdf asdf asdf asdf asdf asdfasdfasdff" });

    const close = () => {
      modal.close({ data: props.foo });
    };
    return { close, showModal };
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
