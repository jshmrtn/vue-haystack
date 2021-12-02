<template>
  <div>
    <slot :snack="item" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { provideSnack } from ".";
import { useSnack } from "./store";

export default defineComponent({
  name: "ModalProvider",
  components: {},
  props: {
    snack: {
      type: Object as PropType<ReturnType<typeof useSnack>>,
      required: true,
    },
  },
  setup: (props) => {
    const item = provideSnack(props.snack);
    return { item };
  },
});
</script>

<style module lang="scss"></style>
