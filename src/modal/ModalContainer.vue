<template>
  <div>
    <div :class="$style.modalContainer">
      <ModalProvider v-for="modal in modals" :key="modal.id" :modal="modal">
        <div
          v-show="modal.id === activeModal?.id"
          :class="[$style.overlay, { [$style.clickable]: modal.options?.closeOnOverlayClick }]"
          @click="overlayClick(modal)"
        >
          <slot name="overlay">
            <div :class="$style.layer"></div>
          </slot>
        </div>
        <slot :modal="modal" :active-modal="activeModal">
          <component
            :is="modal.component"
            v-show="modal.id === activeModal?.id"
            :key="modal.id"
            :class="$style.modal"
            v-bind="modal.props"
            v-on="modal.listeners"
          />
        </slot>
      </ModalProvider>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useModal } from ".";
import { useModalStore } from "./";
import ModalProvider from "./ModalProvider.vue";

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
      return modalStore.activeModal.value;
    });

    const overlayClick = (modal: ReturnType<typeof useModal>) => {
      if (modal.options?.closeOnOverlayClick) {
        modal.close();
      }
    };

    const modals = computed(() => {
      return modalStore.items.value;
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
  pointer-events: none;

  display: flex;
  justify-content: center;
  align-items: center;

  .overlay {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    pointer-events: all;

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
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    pointer-events: all;
  }
}
</style>
