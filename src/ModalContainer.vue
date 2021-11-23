<template>
  <div>
    <div v-if="modals.length > 0" :class="$style.modalContainer">
      <ModalProvider v-show="modal.id === activeModal?.id" v-for="modal in modals" :key="modal.id" :modal="modal">
        <div
          :class="[$style.overlay, { [$style.clickable]: modal.options?.cancelOnOverlayClick }]"
          @click="overlayClick(modal)"
        >
          <slot>
            <div :class="$style.layer"></div>
          </slot>
        </div>
        <slot :modal="modal">
          <component :is="modal.component" :class="$style.modal" v-bind="modal.props" />
        </slot>
      </ModalProvider>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useModalStore } from "./";
import ModalProvider from "./ModalProvider.vue";
import { ModalConfig } from "./store";

export default defineComponent({
  name: "ModalContainer",
  components: { ModalProvider },
  props: {
    showOverlay: {
      type: Boolean,
      default: true,
    },
  },
  setup: (_props) => {
    const modalStore = useModalStore();

    const activeModal = computed(() => {
      return modalStore.modals.value.length > 0 ? modalStore.modals.value[modalStore.modals.value.length - 1] : null;
    });

    const overlayClick = (modal: ModalConfig) => {
      if (modal.options?.cancelOnOverlayClick) {
        modal.cancel();
      }
    };

    const modals = computed(() => {
      return modalStore.modals.value;
    });

    return { modals, activeModal, overlayClick };
  },
});
</script>

<style module lang="scss">
.modalContainer {
  z-index: 500;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  .overlay {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    .layer {
      background-color: rgba(45, 51, 60, 0.25);
      width: 100%;
      height: 100%;
    }

    &.clickable:hover {
      cursor: pointer;
    }
  }

  .modal {
    position: relative;
  }
}
</style>
