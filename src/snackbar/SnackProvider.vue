<template>
  <div>
    <slot :snack="snack" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { provideSnack, useSnack } from "./store";

export default defineComponent({
  name: "SnackProvider",
  components: {},
  props: {
    snack: {
      type: Object as PropType<ReturnType<typeof useSnack>>,
      required: true,
    },
  },
  setup: (props) => {
    provideSnack(props.snack);
    return {};
  },
});
</script>

<style module lang="scss"></style>
