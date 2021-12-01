<template>
  <div :class="$style.modal">
    <h1>Demo Modal</h1>
    <p>
      foo: <b>{{ foo }}</b>
    </p>
    <div :class="$style.buttons">
      <button @click="emitLog">Emit Log</button>
      <button @click="close">Close</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useModal } from "../../../src";

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
    const modal = useModal();

    const emitLog = () => {
      ctx.emit("log", props.foo);
    };

    const close = () => {
      modal.close<{ data: string }>({ data: props.foo });
    };
    return { close, emitLog };
  },
});
</script>

<style module lang="scss">
.modal {
  padding: 2rem;
  background-color: white;
  box-shadow: 0px 0.125rem 0.75rem -0.25rem rgba(0, 0, 0, 0.25);
  border-radius: 0.125rem;

  h1 {
    margin-top: 0;
  }

  .buttons {
    display: flex;
    gap: 1rem;
  }
}
</style>
