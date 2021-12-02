<template>
  <div :class="$style.snackContainer">
    <transition-group
      :leave-active-class="$style.leaveActive"
      :enter-from-class="$style.enterFrom"
      :leave-to-class="$style.leaveTo"
      appear
    >
      <SnackProvider v-for="snack in snacks" :key="snack.id" :class="$style.snackProvider" :snack="snack">
        <slot :snack="snack">
          <component
            :is="snack.component"
            :key="snack.id"
            :class="$style.snack"
            v-bind="snack.props"
            v-on="snack.listeners"
          />
        </slot>
      </SnackProvider>
    </transition-group>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import SnackProvider from "./SnackProvider.vue";
import { useSnackbar } from "./store";

export default defineComponent({
  name: "SnackContainer",
  components: { SnackProvider },
  setup: (_props) => {
    const store = useSnackbar();

    const snacks = computed(() => {
      return store.items.value;
    });

    return { snacks };
  },
});
</script>

<style module lang="scss">
.snackContainer {
  z-index: 600;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-end;
  gap: 1rem;
  pointer-events: none;

  .snackProvider {
    transition: all 0.2s;

    .snack {
      pointer-events: all;
    }
  }
}

.leaveActive {
  position: absolute;
}

.enterFrom {
  transform: translateX(250px);
  opacity: 0;
}

.leaveTo {
  opacity: 0;
  transform: translateX(250px);
}
</style>
