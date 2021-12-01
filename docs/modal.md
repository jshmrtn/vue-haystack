# Modals

The modal store will display your own components as modal dialogs.

<ModalDemo style="margin: 2rem 0 2rem 0;" />

## Modal container

Import the styles and add the `ModalContainer` in your `App.vue`:

```ts
import { ModalContainer } from "vue-haystack";
```

```vue
<template>
  <div>
    <router-view />
    <ModalContainer />
  </div>
</template>
```

## Modal

### Creating a modal

You will need to write your own modal components, as a very simple example (`MyModalComponent.vue`):

```vue
<template>
  <div style="padding: 2rem; background-color: white">My modal content</div>
</template>
```

From withing a modal, you can call `useModal()` that provides a `close` function. This also allows you to pass data if needed.

```ts
import { useModal } from "vue-haystack";

const modal = useModal();
modal.close();
// with data
modal.close({ foo: "bar" });
// you can explicitely type the data (this does not affect `onClose` unfortunately)
modal.close<{ foo: string }>({ foo: "bar" });
```

### Showing a modal

```ts
import { useModalStore } from "vue-haystack";
import MyModalComponent from "./MyModalComponent.vue";

useModalStore().push(MyModalComponent);
```

`push` allows you to pass props, event listeners and modal options, here is a full example:

```ts
modalStore.push(
  MyModalComponent,
  { foo: "bar" }, // props
  { log: (text: string) => console.log(text) }, // listeners
  { closeOnOverlayClick: true }, // options
);
```

`push` also returns an object with an `onClose` function to react to close events. If using typescript, set the generic type `onClose` so the `data` parameter is properly typed.

```ts
modalStore.push(MyModalComponent).onClose<MyDataType>((data) => {
  if (data === undefined) {
    // data will be undefined if the modal is closed without data, e.g. when it is closed by clicking the overlay
    return;
  }
  console.log(data);
});
```

## Customization

The model store will display the modal centered and with an overlay. The default overlay can be customized using the `overlay` slot.

```vue
<ModalContainer>
  <template #overlay>
    <div style="width: 100%; height: 100%; background-color: red;"></div>
  </template>
</ModalContainer>
```

You can also customize the component rendering. This is a bit more complicated but is rarely necessary. The default

```vue
<ModalContainer>
  <template #default="{modal, activeModal}">
    <component
      :is="modal.component"
      v-show="modal.id === activeModal?.id"
      :key="modal.id"
      v-bind="modal.props"
      v-on="modal.listeners"
    />
  </template>
</ModalContainer>
```

If you need more control (e.g. for animations), you can always implement your own `ModalContainer`. The default component is relatively simple and can be used as [template](https://github.com/jshmrtn/vue-haystack/blob/master/src/modal/ModalContainer.vue).
