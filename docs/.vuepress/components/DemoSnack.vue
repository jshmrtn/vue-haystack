<template>
  <div :class="$style.snack" @mouseenter="onMouseenter" @mouseleave="onMouseleave">
    <div :class="$style.content">
      <p>{{ text }}</p>
      <button @click="close">Close</button>
    </div>
    <div :class="$style.progress" :style="remainingTime"></div>
  </div>
</template>

<script lang="ts">
import { computed, CSSProperties, defineComponent } from "vue";
import { useSnack } from "../../../src";

export default defineComponent({
  name: "DemoSnack",
  components: {},
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  setup: (props) => {
    const snack = useSnack();

    const remainingTime = computed(() => {
      return {
        "--progress": snack.timer.progress.value,
      } as CSSProperties;
    });

    const close = () => {
      snack.close<{ data: string }>({ data: props.text });
    };

    const onMouseenter = () => {
      snack.timer.pause();
    };

    const onMouseleave = () => {
      snack.timer.resume();
    };

    return { close, remainingTime, onMouseenter, onMouseleave };
  },
});
</script>

<style module lang="scss">
.snack {
  background-color: white;
  box-shadow: 0px 0.125rem 0.75rem -0.25rem rgba(0, 0, 0, 0.25);
  border-radius: 0.125rem;

  .content {
    padding: 0.5rem 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  p {
    margin: 0;
  }

  button {
    padding: 0.5rem;
  }

  .progress {
    background-color: var(--c-brand);
    width: calc(100% * var(--progress));
    height: 2px;
    transition: width 0.1s linear;
  }
}
</style>
