# Snackbar

<SnackbarDemo style="margin: 2rem 0 2rem 0;" />

The snackbar store will display your own components as "snacks"/"toasts".

## Modal container

Import and add the `SnackContainer` in your `App.vue`:

```ts
import { SnackContainer } from "vue-haystack";
```

```vue
<template>
  <div>
    <router-view />
    <SnackContainer />
  </div>
</template>
```

## Snack

### Creating a snack

You will need to write your own snack components, as a very simple example (`MySnack.vue`):

```vue
<template>
  <div style="padding: 2rem; background-color: white">My snack content</div>
</template>
```

From withing a snack, you can call `useSnack()` that provides a `close` function. This also allows you to pass data if needed.

```ts
import { useSnack } from "vue-haystack";

const snack = useSnack();
snack.close();
// with data
snack.close({ foo: "bar" });
// you can explicitely type the data (this does not affect `onClose` unfortunately)
snack.close<{ foo: string }>({ foo: "bar" });
```

A snack also has a `timer` property that allows reading and manipulating the lifetime of the snack.

```ts
const snack = useSnack();
// remaining time
console.log(snack.timer.remainingTime.value);
// lifetime value between 1 and 0, you can use this to show a progress bar or something similar
console.log(snack.timer.progress.value);
// absolute lifetime
console.log(snack.timer.duration);

// pause timer
snack.timer.pause();
// resume timer
snack.timer.resume();
// stop/reset the timer
snack.timer.clear();
```

### Showing a snack

```ts
import { useSnackbar } from "vue-haystack";
import MySnack from "./MySnack.vue";

useSnackbar().push(MySnack);
```

`push` allows you to pass props, event listeners and modal options.

A snack receives a `time` option in milliseconds. It will be closed automatically after the specified time.

```ts
useSnackbar().push(
  MySnack,
  { foo: "bar" }, // props
  { log: (text: string) => console.log(text) }, // listeners
  { time: 2000 }, // options
);
```

`push` also returns an object with an `onClose` function to react to close events. If using typescript, set the generic type `onClose` so the `data` parameter is properly typed.

```ts
useSnackbar()
  .push(MySnack)
  .onClose<MyDataType>((data) => {
    if (data === undefined) {
      // data will be undefined if the modal is closed without data, e.g. when it is closed by clicking the overlay
      return;
    }
    console.log(data);
  });
```

## Customization

By default, the container uses flexbox to display snacks in the top right corner. You can override the styles of the container if you want to display them centered, for example:

```vue
<SnackContainer style="align-items: center;" />
```

You can also customize the component rendering of each snack in the `SnackContainer`.

```vue
<SnackContainer>
  <template #default="{snack, activeModal}">
    <component
      :is="snack.component"
      :key="snack.id"
      v-bind="snack.props"
      v-on="snack.listeners"
    />
  </template>
</SnackContainer>
```

If you need more control (e.g. custom animations), you can implement your own `SnackContainer`. The default component is relatively simple and can be used as [template](https://github.com/jshmrtn/vue-haystack/blob/master/src/snackbar/SnackContainer.vue).
