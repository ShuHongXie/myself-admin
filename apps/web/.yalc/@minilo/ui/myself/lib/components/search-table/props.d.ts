export declare enum RequestMethodType {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete'
}
export declare const searchTableProps: {
  methodType: {
    type: () => RequestMethodType
    default: string
  }
  url: {
    type: StringConstructor
    default: string
  }
  responseDataField: {
    type: StringConstructor
    default: string
  }
  responseTotalField: {
    type: StringConstructor
    default: string
  }
  headers: {
    type: ObjectConstructor
    default: () => {}
  }
  showPagination: {
    type: BooleanConstructor
    default: boolean
  }
  paramsHandler: {
    type: FunctionConstructor
    default: null
  }
  render: {
    type: FunctionConstructor
    default: null
  }
  searchProps: {
    type: ObjectConstructor
    default: () => void
  }
  tableProps: {
    type: ObjectConstructor
    default: () => {
      border: boolean
    }
  }
  columns: {
    type: {
      (arrayLength: number): any[]
      (...items: any[]): any[]
      new (arrayLength: number): any[]
      new (...items: any[]): any[]
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
