import { v4 as uuidv4 } from "uuid";
import { ComponentPropsOptions, inject, markRaw, provide, Ref, ref } from "vue";

type ComponentBaseType = abstract new (...args: any) => any;

export interface ItemBase<OptionsType> {
  /** The unique item id. Automatically generated */
  readonly id: string;
  /** The item component type, can be used with `<component :is="item.component" />` */
  component: InstanceType<ComponentBaseType>;
  /** The props that are passed to the component */
  props: ComponentPropsOptions | null;
  /** The props that are passed to the component */
  listeners: { [key: string]: (...params: any[]) => unknown };
  options: OptionsType | null;
}

export const createItemStoreInstance = <
  CBase extends ComponentBaseType,
  I extends ItemBase<O>,
  Res extends { [key: string]: unknown },
  O extends { [key: string]: unknown } | null,
  Extend extends { [key: string]: unknown },
>(
  createItem: (item: ItemBase<O>) => { item: I; useReturn: Res },
  extendStore: (items: Ref<I[]>) => Extend = () => ({} as Extend),
  defaultComponent?: CBase,
) => {
  const items = ref<I[]>([]) as Ref<I[]>;

  const remove = (itemId: I["id"]) => {
    const index = items.value.findIndex((item) => item.id === itemId);
    if (index === -1) {
      return;
    }
    items.value.splice(index, 1);
  };

  /**
   * Push an item to the collection
   * @param component The component
   * @param props Props to pass to the item component
   * @param options Additional options to configure the item behavior
   */
  const push = <T extends ComponentBaseType>(
    component: T,
    props?: InstanceType<T>["$props"],
    listeners?: ItemBase<O>["listeners"],
    options?: I["options"],
  ) => {
    const { item, useReturn } = createItem({
      id: uuidv4(),
      component: markRaw(component),
      props: props || {},
      listeners: listeners || {},
      options: options || null,
    });
    items.value.push(item);

    return useReturn;
  };

  const rawStore = {
    items,
    remove,
    push,
  };

  const store: typeof rawStore & Extend = {
    ...rawStore,
    ...extendStore(items),
  };

  const useStore = () => {
    return store;
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
    useItem,
    provideItem,
  };
};
