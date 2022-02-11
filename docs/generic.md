# Custom store

If you want to create your own system with special items or store behavior, you can write your own store. The generic store does the heavy lifting for you.

All the built-in systems use the generic store, take a look [at the source](https://github.com/jshmrtn/vue-haystack/tree/master/src/modal) as well.

## Creating a Store

To create a store, call `createItemStoreInstance` with two callbacks, the first to set up your item (`createItem`) instances, the second to extend the store as a whole (`extendStore`).

This is a skeleton that should help you get started (`myStore.ts`):

```ts
import { createItemStoreInstance } from "vue-haystack";

const store = createItemStoreInstance(
  // `base` contains all the mandatory item properties (id, component, props, listeners, options)
  (base) => {
    const options = {
      // add custom options for your items
      ...base.options,
    };

    const item = {
      ...base,
      // define custom properties that will be available in your component (return of `useMyItem`)
      options: options,
    };

    return {
      item: {
        ...base,
        options: options,
      },
      useReturn: {
        // define custom properties that will be available on the push functions (return of `useMyStore().push()`)
      },
      options: item.options,
    };
  },
  (_items) => {
    // extend the store here to provide custom push functions for example
    return {};
  },
);

export const { useStore: useMyStore, useItem: useMyItem, provideItem: provideMyItem, store: myStore } = store;
```

## Components

A system usually relies on two components, a `Container` and a `Provider`.

### Container component

The container will be responsible for displaying all your items (e.g. `Modal`, `Toast`, ...) on the screen. This is where you define where to show them, how many at the same time, in what order and define animations. A minimal container may look like this:

```vue
<template>
  <div>
    <MyProvider v-for="item in items" :key="item.id" :item="item">
      </div>
        <component
          :is="item.component"
          :key="item.id"
          v-bind="item.props"
          v-on="item.listeners"
        />
    </MyProvider>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import MyProvider from "./MyProvider.vue";
import { useMyStore } from "./myStore";

export default defineComponent({
  name: "MyContainer",
  components: { MyProvider },
  setup: () => {
    const myStore = useMyStore();

    const items = computed(() => {
      return myStore.items.value;
    });

    return { items };
  },
});
</script>
```

### Provider component

As you can see, `MyContainer` relies on the `MyProvider` component. The only responsibility of the `Provider` is to provide an item instance to your custom item components. The implementation is very simple and should not look much different than this:

```vue
<template>
  <div>
    <slot :item="item" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { provideMyItem, useMyItem } from "./myStore";

export default defineComponent({
  name: "MyProvider",
  components: {},
  props: {
    item: {
      type: Object as PropType<ReturnType<typeof useMyItem>>,
      required: true,
    },
  },
  setup: (props) => {
    provideMyItem(props.item);
    return {};
  },
});
</script>
```

### Item components

These are the components you can push into your store and display in your container, so can take basically any shape. You can access the item instance using your `useMyItem()` function:

```vue
<template>
  <div>MyItem: {{ foo }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useMyItem } from "./myStore";

export default defineComponent({
  name: "MyExampleItem",
  components: {},
  props: {
    foo: {
      type: String,
      required: true,
    },
  },
  setup: () => {
    const myItem = useMyItem();

    return {};
  },
});
</script>
```

## Using your custom store

As with the built-in stores, use your container component in a template, for example your `App.vue`:

```ts
import { MyContainer } from "./MyContainer.vue";
```

```vue
<template>
  <div>
    <router-view />
    <MyContainer />
  </div>
</template>
```

Then wherever you want to instantiate your items:

```ts
import { useMyStore } from "./myStore";
import MyExampleItem from "./MyExampleItem.vue";

useMyStore().push(
  MyExampleItem /* item component */,
  { foo: "propValue" /* props */ },
  {
    /* listeners */
  },
  {
    /* options */
  },
);
```
