---
home: true
heroText: Vue Modal System
tagline:
actions:
  - text: Quick Start
    link: /#quick-start
    type: primary
footer: MIT Licensed | Copyright © 2021-present JOSHMARTIN GmbH
---

# Quick start

```sh
npm i vue-modal-system
```

Import and add the `ModalContainer` in your `App.vue`:

```ts
import { ModalContainer } from "vue-modal-system";
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
import { useModalStore } from "vue-modal-system";
import MyModalComponent from "./MyModalComponent.vue";

useModalStore().show(MyModalComponent, { foo: "bar" });
```

<ModalDemo style="margin: 2rem 0 2rem 0;" />
