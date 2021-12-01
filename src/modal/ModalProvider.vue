<template>
  <div>
    <slot :modal="item" />
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
    const item = provideModal(props.modal);
    return { item };
  },
});
</script>

<style module lang="scss"></style>
