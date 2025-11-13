import { PropType } from 'vue'
export declare enum SearchTypeEnum {
  ITEM = 1,
  SLOT = 2
}
export interface SearchItem {
  prop: string
  span?: number
  placeholder?: string
  multiple?: boolean
  options?: any[]
  labelWidth?: string
  input?: any
  colProps?: any
  formItemProps?: any
  [keyname: string]: any
}
export interface CustomSlot {
  prop: string
  span?: number
  colProps?: any
  formItemProps?: any
  position?: number
  [keyname: string]: any
}
export interface SearchProps extends SearchItem, CustomSlot {
  type: SearchTypeEnum
}
export interface SearchModel {
  [key: string]: any
}
export declare const searchProps: {
  inline: {
    type: BooleanConstructor
    default: boolean
  }
  disabled: {
    type: BooleanConstructor
    default: boolean
  }
  labelWidth: {
    type: (StringConstructor | NumberConstructor)[]
    default: string
  }
  labelPosition: {
    type: StringConstructor
    default: string
  }
  size: {
    type: PropType<'' | 'large' | 'default' | 'small'>
    default: string
  }
  gutter: {
    type: (StringConstructor | NumberConstructor)[]
    default: number
  }
  span: {
    type: NumberConstructor
    default: number
  }
  submitBtnText: {
    type: StringConstructor
    default: string
  }
  resetBtnText: {
    type: StringConstructor
    default: string
  }
  slots: {
    type: {
      (arrayLength: number): CustomSlot[]
      (...items: CustomSlot[]): CustomSlot[]
      new (arrayLength: number): CustomSlot[]
      new (...items: CustomSlot[]): CustomSlot[]
      isArray(arg: any): arg is any[]
      readonly prototype: any[]
      from<T>(arrayLike: ArrayLike<T>): T[]
      from<T, U>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[]
      from<T>(iterable: Iterable<T> | ArrayLike<T>): T[]
      from<T, U>(
        iterable: Iterable<T> | ArrayLike<T>,
        mapfn: (v: T, k: number) => U,
        thisArg?: any
      ): U[]
      of<T>(...items: T[]): T[]
      fromAsync<T>(
        iterableOrArrayLike:
          | AsyncIterable<T>
          | Iterable<T | PromiseLike<T>>
          | ArrayLike<T | PromiseLike<T>>
      ): Promise<T[]>
      fromAsync<T, U>(
        iterableOrArrayLike: AsyncIterable<T> | Iterable<T> | ArrayLike<T>,
        mapFn: (value: Awaited<T>, index: number) => U,
        thisArg?: any
      ): Promise<Awaited<U>[]>
      readonly [Symbol.species]: ArrayConstructor
    }
    default: () => never[]
  }
  item: {
    type: {
      (arrayLength: number): SearchItem[]
      (...items: SearchItem[]): SearchItem[]
      new (arrayLength: number): SearchItem[]
      new (...items: SearchItem[]): SearchItem[]
      isArray(arg: any): arg is any[]
      readonly prototype: any[]
      from<T>(arrayLike: ArrayLike<T>): T[]
      from<T, U>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[]
      from<T>(iterable: Iterable<T> | ArrayLike<T>): T[]
      from<T, U>(
        iterable: Iterable<T> | ArrayLike<T>,
        mapfn: (v: T, k: number) => U,
        thisArg?: any
      ): U[]
      of<T>(...items: T[]): T[]
      fromAsync<T>(
        iterableOrArrayLike:
          | AsyncIterable<T>
          | Iterable<T | PromiseLike<T>>
          | ArrayLike<T | PromiseLike<T>>
      ): Promise<T[]>
      fromAsync<T, U>(
        iterableOrArrayLike: AsyncIterable<T> | Iterable<T> | ArrayLike<T>,
        mapFn: (value: Awaited<T>, index: number) => U,
        thisArg?: any
      ): Promise<Awaited<U>[]>
      readonly [Symbol.species]: ArrayConstructor
    }
    default: () => never[]
  }
}
