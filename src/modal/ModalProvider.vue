<template>
  <div>
    <slot :modal="modal" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { provideModal, useModal } from "./store";

export default defineComponent({
  name: "ModalProvider",
  components: {},
  props: {
    modal: {
      type: Object as PropType<ReturnType<typeof useModal>>,
      required: true,
    },
  },
  setup: (props) => {
    provideModal(props.modal);
    return {};
  },
});
</script>

<style module lang="scss"></style>
