<template>
  <div>
    <SnackContainer style="margin: 70px 1rem" />
    <button @click="showSnack">Show Snack</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { SnackContainer, useSnackbar } from "../../../src";
import DemoSnack from "./DemoSnack.vue";

export default defineComponent({
  name: "SnackbarDemo",
  components: { SnackContainer },
  props: {},
  setup: (_props) => {
    const snackbar = useSnackbar();
    const counter = ref(0);
    const showSnack = () => {
      counter.value++;
      snackbar
        .push(
          DemoSnack,
          { text: `My snack ${counter.value}` },
          { log: (text: string) => console.log("log emittet", text) },
          { time: 5000 },
        )
        .onClose<string>((data) => console.log("onClose", data));
    };

    return { showSnack };
  },
});
</script>

<style module lang="scss"></style>
