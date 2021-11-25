<template>
  <slot :modal="modal" />
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ModalConfig, provideModal } from "./store";

export default defineComponent({
  name: "ModalProvider",
  components: {},
  props: {
    modal: {
      type: Object as PropType<ModalConfig>,
      required: true,
    },
  },
  setup: (props) => {
    const modal = provideModal(props.modal);
    return { modal };
  },
});
</script>

<style module lang="scss"></style>
