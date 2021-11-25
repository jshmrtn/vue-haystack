import { App, ComponentPropsOptions, inject, markRaw, provide, Ref, ref } from "vue";
import { v4 as uuidv4 } from "uuid";

type ComponentBaseType = abstract new (...args: any) => any;

export interface ItemBase {
  /** The unique item id. Automatically generated */
  readonly id: string;
  /** The item component type, can be used with `<component :is="item.component" />` */
  component: InstanceType<ComponentBaseType>;
  /** The props that are passed to the component */
  props: ComponentPropsOptions | null;
  options: {} | null;
}

export const createItemStoreInstance = <
  CBase extends ComponentBaseType,
  I extends ItemBase,
  Res extends { [key: string]: any }
>(
  createItem: (item: ItemBase) => { item: I; useReturn?: Res },

  // enhanceItem: (item: ItemBase) => I,
  // getItemReturn: (item: I) => Res,
  defaultComponent?: CBase
) => {
  const items = ref<I[]>([]) as Ref<I[]>;

  const remove = (itemId: I["id"]) => {
    const index = items.value.findIndex((item) => item.id === itemId);
    if (index !== -1) {
      items.value.splice(index, 1);
    }
  };

  /**
   * Push an item to the collection
   * @param component The component
   * @param props Props to pass to the item component
   * @param options Additional options to configure the item behavior
   */
  const push = <T extends ComponentBaseType>(
    component: T,
    props: InstanceType<T>["$props"] | null = null,
    options: I["options"] = null
  ) => {
    const { item, useReturn } = createItem({
      id: uuidv4(),
      component: markRaw(component),
      props,
      options: {
        ...options,
      },
    });
    items.value.push(item);

    return useReturn;
  };

  /**
   * Show the default component
   * @param props Props to pass to the component
   * @param options Additional options to configure the item behavior
   */
  const pushDefault = (props: InstanceType<CBase>["$props"] | null = null, options: I["options"] = null) => {
    if (!defaultComponent) {
      throw new Error("No default component passed to the item store, cannot show item.");
    }
    return push(defaultComponent, props, options);
  };

  const store = {
    items,
    remove,
    push,
    pushDefault,
  };

  const GenericStoreSymbol = Symbol("genericstore");

  const provideStore = (app?: App) => {
    app ? app.provide(GenericStoreSymbol, store) : provide(GenericStoreSymbol, store);
    return store;
  };

  const useStore = () => {
    return inject(GenericStoreSymbol) as typeof store;
  };

  const ItemSymbol = Symbol("item");

  const provideItem = (item: I) => {
    provide(ItemSymbol, item);
    return item;
  };

  const useItem = () => {
    return inject(ItemSymbol) as I;
  };

  return {
    store,
    useStore,
    provideStore,
    useItem,
    provideItem,
  };
};
