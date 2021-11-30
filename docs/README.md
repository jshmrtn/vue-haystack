---
home: true
heroText: Vue Haystack 🧱
tagline: Lightweight and flexible system for modal dialogs, snackbars, toasts, ...
actions:
  - text: Quick Start
    link: /#quick-start
    type: primary
footer: MIT Licensed | Copyright © 2021-present JOSHMARTIN GmbH
---

## Quick start using the modal store

```sh
npm i vue-haystack
```

Provide the store in your `main.ts` file:

```ts
import { createApp } from "vue";
import { provideModalStore } from "vue-haystack";

const app = createApp();
provideModalStore(app);
```

Import and add the `ModalContainer` in your `App.vue`:

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

Create your modal component and let the modal service render it:

```ts
import { useModalStore } from "vue-haystack";
import MyModalComponent from "./MyModalComponent.vue";

useModalStore().show(MyModalComponent, { foo: "bar" });
```

<ModalDemo style="margin: 2rem 0 2rem 0;" />
