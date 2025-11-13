import { SearchModel } from './props'
declare function __VLS_template(): {
  attrs: Partial<{}>
  slots: Partial<Record<string, (_: { searchModel: SearchModel | undefined }) => any>>
  refs: {
    searchFormRef:
      | ({
          $: import('vue').ComponentInternalInstance
          $data: {}
          $props: Partial<{
            readonly disabled: boolean
            readonly inline: boolean
            readonly labelWidth: string | number
            readonly labelPosition: 'top' | 'left' | 'right'
            readonly inlineMessage: boolean
            readonly showMessage: boolean
            readonly requireAsteriskPosition: 'left' | 'right'
            readonly labelSuffix: string
            readonly validateOnRuleChange: boolean
            readonly scrollIntoViewOptions: boolean | Record<string, any>
            readonly statusIcon: boolean
            readonly hideRequiredAsterisk: boolean
            readonly scrollToError: boolean
          }> &
            Omit<
              {
                readonly labelWidth: string | number
                readonly inline: boolean
                readonly disabled: boolean
                readonly labelPosition: 'top' | 'left' | 'right'
                readonly requireAsteriskPosition: 'left' | 'right'
                readonly labelSuffix: string
                readonly inlineMessage: boolean
                readonly statusIcon: boolean
                readonly showMessage: boolean
                readonly validateOnRuleChange: boolean
                readonly hideRequiredAsterisk: boolean
                readonly scrollToError: boolean
                readonly scrollIntoViewOptions: boolean | Record<string, any>
                readonly size?: ('' | 'large' | 'default' | 'small') | undefined
                readonly model?: Record<string, any> | undefined
                readonly rules?:
                  | Partial<
                      Record<
                        string,
                        import('element-plus').FormItemRule | import('element-plus').FormItemRule[]
                      >
                    >
                  | undefined
                onValidate?:
                  | ((
                      prop: import('element-plus').FormItemProp,
                      isValid: boolean,
                      message: string
                    ) => any)
                  | undefined
                  | undefined
              } & import('vue').VNodeProps &
                import('vue').AllowedComponentProps &
                import('vue').ComponentCustomProps,
              | 'labelWidth'
              | 'inline'
              | 'disabled'
              | 'labelPosition'
              | 'requireAsteriskPosition'
              | 'labelSuffix'
              | 'inlineMessage'
              | 'statusIcon'
              | 'showMessage'
              | 'validateOnRuleChange'
              | 'hideRequiredAsterisk'
              | 'scrollToError'
              | 'scrollIntoViewOptions'
            >
          $attrs: {
            [x: string]: unknown
          }
          $refs: {
            [x: string]: unknown
          }
          $slots: Readonly<{
            [name: string]: import('vue').Slot<any> | undefined
          }>
          $root: import('vue').ComponentPublicInstance | null
          $parent: import('vue').ComponentPublicInstance | null
          $host: Element | null
          $emit: (
            event: 'validate',
            prop: import('element-plus').FormItemProp,
            isValid: boolean,
            message: string
          ) => void
          $el: any
          $options: import('vue').ComponentOptionsBase<
            Readonly<
              import('vue').ExtractPropTypes<{
                readonly model: ObjectConstructor
                readonly rules: {
                  readonly type: import('vue').PropType<
                    Partial<
                      Record<
                        string,
                        import('element-plus').FormItemRule | import('element-plus').FormItemRule[]
                      >
                    >
                  >
                  readonly required: false
                  readonly validator: ((val: unknown) => boolean) | undefined
                  __epPropKey: true
                }
                readonly labelPosition: {
                  readonly type: import('vue').PropType<'top' | 'left' | 'right'>
                  readonly required: false
                  readonly validator: ((val: unknown) => boolean) | undefined
                  __epPropKey: true
                } & {
                  readonly default: 'right'
                }
                readonly requireAsteriskPosition: {
                  readonly type: import('vue').PropType<'left' | 'right'>
                  readonly required: false
                  readonly validator: ((val: unknown) => boolean) | undefined
                  __epPropKey: true
                } & {
                  readonly default: 'left'
                }
                readonly labelWidth: {
                  readonly type: import('vue').PropType<string | number>
                  readonly required: false
                  readonly validator: ((val: unknown) => boolean) | undefined
                  __epPropKey: true
                } & {
                  readonly default: ''
                }
                readonly labelSuffix: {
                  readonly type: import('vue').PropType<string>
                  readonly required: false
                  readonly validator: ((val: unknown) => boolean) | undefined
                  __epPropKey: true
                } & {
                  readonly default: ''
                }
                readonly inline: BooleanConstructor
                readonly inlineMessage: BooleanConstructor
                readonly statusIcon: BooleanConstructor
                readonly showMessage: {
                  readonly type: import('vue').PropType<boolean>
                  readonly required: false
                  readonly validator: ((val: unknown) => boolean) | undefined
                  __epPropKey: true
                } & {
                  readonly default: true
                }
                readonly validateOnRuleChange: {
                  readonly type: import('vue').PropType<boolean>
                  readonly required: false
                  readonly validator: ((val: unknown) => boolean) | undefined
                  __epPropKey: true
                } & {
                  readonly default: true
                }
                readonly hideRequiredAsterisk: BooleanConstructor
                readonly scrollToError: BooleanConstructor
                readonly scrollIntoViewOptions: {
                  readonly type: import('vue').PropType<boolean | Record<string, any>>
                  readonly required: false
                  readonly validator: ((val: unknown) => boolean) | undefined
                  __epPropKey: true
                } & {
                  readonly default: true
                }
                readonly size: {
                  readonly type: import('vue').PropType<'' | 'large' | 'default' | 'small'>
                  readonly required: false
                  readonly validator: ((val: unknown) => boolean) | undefined
                  __epPropKey: true
                }
                readonly disabled: BooleanConstructor
              }>
            > & {
              onValidate?:
                | ((
                    prop: import('element-plus').FormItemProp,
                    isValid: boolean,
                    message: string
                  ) => any)
                | undefined
            },
            {
              validate: (
                callback?: import('element-plus').FormValidateCallback
              ) => import('element-plus').FormValidationResult
              validateField: (
                props?: import('element-plus').FormItemProp | import('element-plus').FormItemProp[],
                callback?: import('element-plus').FormValidateCallback
              ) => import('element-plus').FormValidationResult
              resetFields: (
                props?: import('element-plus').FormItemProp | import('element-plus').FormItemProp[]
              ) => void
              clearValidate: (
                props?: import('element-plus').FormItemProp | import('element-plus').FormItemProp[]
              ) => void
              scrollToField: (prop: import('element-plus').FormItemProp) => void
              getField: (
                prop: import('element-plus').FormItemProp
              ) => import('element-plus').FormItemContext | undefined
              fields: import('vue').Reactive<import('element-plus').FormItemContext[]>
            },
            unknown,
            {},
            {},
            import('vue').ComponentOptionsMixin,
            import('vue').ComponentOptionsMixin,
            {
              validate: (
                prop: import('element-plus').FormItemProp,
                isValid: boolean,
                message: string
              ) => void
            },
            string,
            {
              readonly disabled: boolean
              readonly inline: boolean
              readonly labelWidth: string | number
              readonly labelPosition: 'top' | 'left' | 'right'
              readonly inlineMessage: boolean
              readonly showMessage: boolean
              readonly requireAsteriskPosition: 'left' | 'right'
              readonly labelSuffix: string
              readonly validateOnRuleChange: boolean
              readonly scrollIntoViewOptions: boolean | Record<string, any>
              readonly statusIcon: boolean
              readonly hideRequiredAsterisk: boolean
              readonly scrollToError: boolean
            },
            {},
            string,
            {},
            import('vue').GlobalComponents,
            import('vue').GlobalDirectives,
            string,
            import('vue').ComponentProvideOptions
          > & {
            beforeCreate?: (() => void) | (() => void)[]
            created?: (() => void) | (() => void)[]
            beforeMount?: (() => void) | (() => void)[]
            mounted?: (() => void) | (() => void)[]
            beforeUpdate?: (() => void) | (() => void)[]
            updated?: (() => void) | (() => void)[]
            activated?: (() => void) | (() => void)[]
            deactivated?: (() => void) | (() => void)[]
            beforeDestroy?: (() => void) | (() => void)[]
            beforeUnmount?: (() => void) | (() => void)[]
            destroyed?: (() => void) | (() => void)[]
            unmounted?: (() => void) | (() => void)[]
            renderTracked?:
              | ((e: import('vue').DebuggerEvent) => void)
              | ((e: import('vue').DebuggerEvent) => void)[]
            renderTriggered?:
              | ((e: import('vue').DebuggerEvent) => void)
              | ((e: import('vue').DebuggerEvent) => void)[]
            errorCaptured?:
              | ((
                  err: unknown,
                  instance: import('vue').ComponentPublicInstance | null,
                  info: string
                ) => boolean | void)
              | ((
                  err: unknown,
                  instance: import('vue').ComponentPublicInstance | null,
                  info: string
                ) => boolean | void)[]
          }
          $forceUpdate: () => void
          $nextTick: typeof import('vue').nextTick
          $watch<T extends string | ((...args: any) => any)>(
            source: T,
            cb: T extends (...args: any) => infer R
              ? (...args: [R, R, import('@vue/reactivity').OnCleanup]) => any
              : (...args: [any, any, import('@vue/reactivity').OnCleanup]) => any,
            options?: import('vue').WatchOptions
          ): import('vue').WatchStopHandle
        } & Readonly<{
          readonly disabled: boolean
          readonly inline: boolean
          readonly labelWidth: string | number
          readonly labelPosition: 'top' | 'left' | 'right'
          readonly inlineMessage: boolean
          readonly showMessage: boolean
          readonly requireAsteriskPosition: 'left' | 'right'
          readonly labelSuffix: string
          readonly validateOnRuleChange: boolean
          readonly scrollIntoViewOptions: boolean | Record<string, any>
          readonly statusIcon: boolean
          readonly hideRequiredAsterisk: boolean
          readonly scrollToError: boolean
        }> &
          Omit<
            Readonly<
              import('vue').ExtractPropTypes<{
                readonly model: ObjectConstructor
                readonly rules: {
                  readonly type: import('vue').PropType<
                    Partial<
                      Record<
                        string,
                        import('element-plus').FormItemRule | import('element-plus').FormItemRule[]
                      >
                    >
                  >
                  readonly required: false
                  readonly validator: ((val: unknown) => boolean) | undefined
                  __epPropKey: true
                }
                readonly labelPosition: {
                  readonly type: import('vue').PropType<'top' | 'left' | 'right'>
                  readonly required: false
                  readonly validator: ((val: unknown) => boolean) | undefined
                  __epPropKey: true
                } & {
                  readonly default: 'right'
                }
                readonly requireAsteriskPosition: {
                  readonly type: import('vue').PropType<'left' | 'right'>
                  readonly required: false
                  readonly validator: ((val: unknown) => boolean) | undefined
                  __epPropKey: true
                } & {
                  readonly default: 'left'
                }
                readonly labelWidth: {
                  readonly type: import('vue').PropType<string | number>
                  readonly required: false
                  readonly validator: ((val: unknown) => boolean) | undefined
                  __epPropKey: true
                } & {
                  readonly default: ''
                }
                readonly labelSuffix: {
                  readonly type: import('vue').PropType<string>
                  readonly required: false
                  readonly validator: ((val: unknown) => boolean) | undefined
                  __epPropKey: true
                } & {
                  readonly default: ''
                }
                readonly inline: BooleanConstructor
                readonly inlineMessage: BooleanConstructor
                readonly statusIcon: BooleanConstructor
                readonly showMessage: {
                  readonly type: import('vue').PropType<boolean>
                  readonly required: false
                  readonly validator: ((val: unknown) => boolean) | undefined
                  __epPropKey: true
                } & {
                  readonly default: true
                }
                readonly validateOnRuleChange: {
                  readonly type: import('vue').PropType<boolean>
                  readonly required: false
                  readonly validator: ((val: unknown) => boolean) | undefined
                  __epPropKey: true
                } & {
                  readonly default: true
                }
                readonly hideRequiredAsterisk: BooleanConstructor
                readonly scrollToError: BooleanConstructor
                readonly scrollIntoViewOptions: {
                  readonly type: import('vue').PropType<boolean | Record<string, any>>
                  readonly required: false
                  readonly validator: ((val: unknown) => boolean) | undefined
                  __epPropKey: true
                } & {
                  readonly default: true
                }
                readonly size: {
                  readonly type: import('vue').PropType<'' | 'large' | 'default' | 'small'>
                  readonly required: false
                  readonly validator: ((val: unknown) => boolean) | undefined
                  __epPropKey: true
                }
                readonly disabled: BooleanConstructor
              }>
            > & {
              onValidate?:
                | ((
                    prop: import('element-plus').FormItemProp,
                    isValid: boolean,
                    message: string
                  ) => any)
                | undefined
            },
            | 'labelWidth'
            | 'inline'
            | 'disabled'
            | 'labelPosition'
            | 'requireAsteriskPosition'
            | 'labelSuffix'
            | 'inlineMessage'
            | 'statusIcon'
            | 'showMessage'
            | 'validateOnRuleChange'
            | 'hideRequiredAsterisk'
            | 'scrollToError'
            | 'scrollIntoViewOptions'
            | 'validate'
            | 'validateField'
            | 'resetFields'
            | 'clearValidate'
            | 'scrollToField'
            | 'getField'
            | 'fields'
          > &
          import('vue').ShallowUnwrapRef<{
            validate: (
              callback?: import('element-plus').FormValidateCallback
            ) => import('element-plus').FormValidationResult
            validateField: (
              props?: import('element-plus').FormItemProp | import('element-plus').FormItemProp[],
              callback?: import('element-plus').FormValidateCallback
            ) => import('element-plus').FormValidationResult
            resetFields: (
              props?: import('element-plus').FormItemProp | import('element-plus').FormItemProp[]
            ) => void
            clearValidate: (
              props?: import('element-plus').FormItemProp | import('element-plus').FormItemProp[]
            ) => void
            scrollToField: (prop: import('element-plus').FormItemProp) => void
            getField: (
              prop: import('element-plus').FormItemProp
            ) => import('element-plus').FormItemContext | undefined
            fields: import('vue').Reactive<import('element-plus').FormItemContext[]>
          }> & {} & import('vue').ComponentCustomProperties & {} & {
            $slots: {
              default?(_: {}): any
            }
          })
      | null
  }
  rootEl: HTMLDivElement
}
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>
declare const __VLS_component: import('vue').DefineComponent<
  import('vue').ExtractPropTypes<{
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
      type: import('vue').PropType<'' | 'large' | 'default' | 'small'>
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
        (arrayLength: number): import('./props').CustomSlot[]
        (...items: import('./props').CustomSlot[]): import('./props').CustomSlot[]
        new (arrayLength: number): import('./props').CustomSlot[]
        new (...items: import('./props').CustomSlot[]): import('./props').CustomSlot[]
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
        (arrayLength: number): import('./props').SearchItem[]
        (...items: import('./props').SearchItem[]): import('./props').SearchItem[]
        new (arrayLength: number): import('./props').SearchItem[]
        new (...items: import('./props').SearchItem[]): import('./props').SearchItem[]
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
    modelValue: {
      type: import('vue').PropType<SearchModel>
    }
  }>,
  {},
  {},
  {},
  {},
  import('vue').ComponentOptionsMixin,
  import('vue').ComponentOptionsMixin,
  {
    submit: (...args: any[]) => void
    reset: (...args: any[]) => void
    'update:modelValue': (value: SearchModel) => void
  },
  string,
  import('vue').PublicProps,
  Readonly<
    import('vue').ExtractPropTypes<{
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
        type: import('vue').PropType<'' | 'large' | 'default' | 'small'>
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
          (arrayLength: number): import('./props').CustomSlot[]
          (...items: import('./props').CustomSlot[]): import('./props').CustomSlot[]
          new (arrayLength: number): import('./props').CustomSlot[]
          new (...items: import('./props').CustomSlot[]): import('./props').CustomSlot[]
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
          (arrayLength: number): import('./props').SearchItem[]
          (...items: import('./props').SearchItem[]): import('./props').SearchItem[]
          new (arrayLength: number): import('./props').SearchItem[]
          new (...items: import('./props').SearchItem[]): import('./props').SearchItem[]
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
      modelValue: {
        type: import('vue').PropType<SearchModel>
      }
    }>
  > &
    Readonly<{
      onSubmit?: ((...args: any[]) => any) | undefined
      onReset?: ((...args: any[]) => any) | undefined
      'onUpdate:modelValue'?: ((value: SearchModel) => any) | undefined
    }>,
  {
    size: '' | 'large' | 'default' | 'small'
    span: number
    labelWidth: string | number
    inline: boolean
    disabled: boolean
    labelPosition: string
    gutter: string | number
    submitBtnText: string
    resetBtnText: string
    slots: import('./props').CustomSlot[]
    item: import('./props').SearchItem[]
  },
  {},
  {},
  {},
  string,
  import('vue').ComponentProvideOptions,
  true,
  {
    searchFormRef:
      | ({
          $: import('vue').ComponentInternalInstance
          $data: {}
          $props: Partial<{
            readonly disabled: boolean
            readonly inline: boolean
            readonly labelWidth: string | number
            readonly labelPosition: 'top' | 'left' | 'right'
            readonly inlineMessage: boolean
            readonly showMessage: boolean
            readonly requireAsteriskPosition: 'left' | 'right'
            readonly labelSuffix: string
            readonly validateOnRuleChange: boolean
            readonly scrollIntoViewOptions: boolean | Record<string, any>
            readonly statusIcon: boolean
            readonly hideRequiredAsterisk: boolean
            readonly scrollToError: boolean
          }> &
            Omit<
              {
                readonly labelWidth: string | number
                readonly inline: boolean
                readonly disabled: boolean
                readonly labelPosition: 'top' | 'left' | 'right'
                readonly requireAsteriskPosition: 'left' | 'right'
                readonly labelSuffix: string
                readonly inlineMessage: boolean
                readonly statusIcon: boolean
                readonly showMessage: boolean
                readonly validateOnRuleChange: boolean
                readonly hideRequiredAsterisk: boolean
                readonly scrollToError: boolean
                readonly scrollIntoViewOptions: boolean | Record<string, any>
                readonly size?: ('' | 'large' | 'default' | 'small') | undefined
                readonly model?: Record<string, any> | undefined
                readonly rules?:
                  | Partial<
                      Record<
                        string,
                        import('element-plus').FormItemRule | import('element-plus').FormItemRule[]
                      >
                    >
                  | undefined
                onValidate?:
                  | ((
                      prop: import('element-plus').FormItemProp,
                      isValid: boolean,
                      message: string
                    ) => any)
                  | undefined
                  | undefined
              } & import('vue').VNodeProps &
                import('vue').AllowedComponentProps &
                import('vue').ComponentCustomProps,
              | 'labelWidth'
              | 'inline'
              | 'disabled'
              | 'labelPosition'
              | 'requireAsteriskPosition'
              | 'labelSuffix'
              | 'inlineMessage'
              | 'statusIcon'
              | 'showMessage'
              | 'validateOnRuleChange'
              | 'hideRequiredAsterisk'
              | 'scrollToError'
              | 'scrollIntoViewOptions'
            >
          $attrs: {
            [x: string]: unknown
          }
          $refs: {
            [x: string]: unknown
          }
          $slots: Readonly<{
            [name: string]: import('vue').Slot<any> | undefined
          }>
          $root: import('vue').ComponentPublicInstance | null
          $parent: import('vue').ComponentPublicInstance | null
          $host: Element | null
          $emit: (
            event: 'validate',
            prop: import('element-plus').FormItemProp,
            isValid: boolean,
            message: string
          ) => void
          $el: any
          $options: import('vue').ComponentOptionsBase<
            Readonly<
              import('vue').ExtractPropTypes<{
                readonly model: ObjectConstructor
                readonly rules: {
                  readonly type: import('vue').PropType<
                    Partial<
                      Record<
                        string,
                        import('element-plus').FormItemRule | import('element-plus').FormItemRule[]
                      >
                    >
                  >
                  readonly required: false
                  readonly validator: ((val: unknown) => boolean) | undefined
                  __epPropKey: true
                }
                readonly labelPosition: {
                  readonly type: import('vue').PropType<'top' | 'left' | 'right'>
                  readonly required: false
                  readonly validator: ((val: unknown) => boolean) | undefined
                  __epPropKey: true
                } & {
                  readonly default: 'right'
                }
                readonly requireAsteriskPosition: {
                  readonly type: import('vue').PropType<'left' | 'right'>
                  readonly required: false
                  readonly validator: ((val: unknown) => boolean) | undefined
                  __epPropKey: true
                } & {
                  readonly default: 'left'
                }
                readonly labelWidth: {
                  readonly type: import('vue').PropType<string | number>
                  readonly required: false
                  readonly validator: ((val: unknown) => boolean) | undefined
                  __epPropKey: true
                } & {
                  readonly default: ''
                }
                readonly labelSuffix: {
                  readonly type: import('vue').PropType<string>
                  readonly required: false
                  readonly validator: ((val: unknown) => boolean) | undefined
                  __epPropKey: true
                } & {
                  readonly default: ''
                }
                readonly inline: BooleanConstructor
                readonly inlineMessage: BooleanConstructor
                readonly statusIcon: BooleanConstructor
                readonly showMessage: {
                  readonly type: import('vue').PropType<boolean>
                  readonly required: false
                  readonly validator: ((val: unknown) => boolean) | undefined
                  __epPropKey: true
                } & {
                  readonly default: true
                }
                readonly validateOnRuleChange: {
                  readonly type: import('vue').PropType<boolean>
                  readonly required: false
                  readonly validator: ((val: unknown) => boolean) | undefined
                  __epPropKey: true
                } & {
                  readonly default: true
                }
                readonly hideRequiredAsterisk: BooleanConstructor
                readonly scrollToError: BooleanConstructor
                readonly scrollIntoViewOptions: {
                  readonly type: import('vue').PropType<boolean | Record<string, any>>
                  readonly required: false
                  readonly validator: ((val: unknown) => boolean) | undefined
                  __epPropKey: true
                } & {
                  readonly default: true
                }
                readonly size: {
                  readonly type: import('vue').PropType<'' | 'large' | 'default' | 'small'>
                  readonly required: false
                  readonly validator: ((val: unknown) => boolean) | undefined
                  __epPropKey: true
                }
                readonly disabled: BooleanConstructor
              }>
            > & {
              onValidate?:
                | ((
                    prop: import('element-plus').FormItemProp,
                    isValid: boolean,
                    message: string
                  ) => any)
                | undefined
            },
            {
              validate: (
                callback?: import('element-plus').FormValidateCallback
              ) => import('element-plus').FormValidationResult
              validateField: (
                props?: import('element-plus').FormItemProp | import('element-plus').FormItemProp[],
                callback?: import('element-plus').FormValidateCallback
              ) => import('element-plus').FormValidationResult
              resetFields: (
                props?: import('element-plus').FormItemProp | import('element-plus').FormItemProp[]
              ) => void
              clearValidate: (
                props?: import('element-plus').FormItemProp | import('element-plus').FormItemProp[]
              ) => void
              scrollToField: (prop: import('element-plus').FormItemProp) => void
              getField: (
                prop: import('element-plus').FormItemProp
              ) => import('element-plus').FormItemContext | undefined
              fields: import('vue').Reactive<import('element-plus').FormItemContext[]>
            },
            unknown,
            {},
            {},
            import('vue').ComponentOptionsMixin,
            import('vue').ComponentOptionsMixin,
            {
              validate: (
                prop: import('element-plus').FormItemProp,
                isValid: boolean,
                message: string
              ) => void
            },
            string,
            {
              readonly disabled: boolean
              readonly inline: boolean
              readonly labelWidth: string | number
              readonly labelPosition: 'top' | 'left' | 'right'
              readonly inlineMessage: boolean
              readonly showMessage: boolean
              readonly requireAsteriskPosition: 'left' | 'right'
              readonly labelSuffix: string
              readonly validateOnRuleChange: boolean
              readonly scrollIntoViewOptions: boolean | Record<string, any>
              readonly statusIcon: boolean
              readonly hideRequiredAsterisk: boolean
              readonly scrollToError: boolean
            },
            {},
            string,
            {},
            import('vue').GlobalComponents,
            import('vue').GlobalDirectives,
            string,
            import('vue').ComponentProvideOptions
          > & {
            beforeCreate?: (() => void) | (() => void)[]
            created?: (() => void) | (() => void)[]
            beforeMount?: (() => void) | (() => void)[]
            mounted?: (() => void) | (() => void)[]
            beforeUpdate?: (() => void) | (() => void)[]
            updated?: (() => void) | (() => void)[]
            activated?: (() => void) | (() => void)[]
            deactivated?: (() => void) | (() => void)[]
            beforeDestroy?: (() => void) | (() => void)[]
            beforeUnmount?: (() => void) | (() => void)[]
            destroyed?: (() => void) | (() => void)[]
            unmounted?: (() => void) | (() => void)[]
            renderTracked?:
              | ((e: import('vue').DebuggerEvent) => void)
              | ((e: import('vue').DebuggerEvent) => void)[]
            renderTriggered?:
              | ((e: import('vue').DebuggerEvent) => void)
              | ((e: import('vue').DebuggerEvent) => void)[]
            errorCaptured?:
              | ((
                  err: unknown,
                  instance: import('vue').ComponentPublicInstance | null,
                  info: string
                ) => boolean | void)
              | ((
                  err: unknown,
                  instance: import('vue').ComponentPublicInstance | null,
                  info: string
                ) => boolean | void)[]
          }
          $forceUpdate: () => void
          $nextTick: typeof import('vue').nextTick
          $watch<T extends string | ((...args: any) => any)>(
            source: T,
            cb: T extends (...args: any) => infer R
              ? (...args: [R, R, import('@vue/reactivity').OnCleanup]) => any
              : (...args: [any, any, import('@vue/reactivity').OnCleanup]) => any,
            options?: import('vue').WatchOptions
          ): import('vue').WatchStopHandle
        } & Readonly<{
          readonly disabled: boolean
          readonly inline: boolean
          readonly labelWidth: string | number
          readonly labelPosition: 'top' | 'left' | 'right'
          readonly inlineMessage: boolean
          readonly showMessage: boolean
          readonly requireAsteriskPosition: 'left' | 'right'
          readonly labelSuffix: string
          readonly validateOnRuleChange: boolean
          readonly scrollIntoViewOptions: boolean | Record<string, any>
          readonly statusIcon: boolean
          readonly hideRequiredAsterisk: boolean
          readonly scrollToError: boolean
        }> &
          Omit<
            Readonly<
              import('vue').ExtractPropTypes<{
                readonly model: ObjectConstructor
                readonly rules: {
                  readonly type: import('vue').PropType<
                    Partial<
                      Record<
                        string,
                        import('element-plus').FormItemRule | import('element-plus').FormItemRule[]
                      >
                    >
                  >
                  readonly required: false
                  readonly validator: ((val: unknown) => boolean) | undefined
                  __epPropKey: true
                }
                readonly labelPosition: {
                  readonly type: import('vue').PropType<'top' | 'left' | 'right'>
                  readonly required: false
                  readonly validator: ((val: unknown) => boolean) | undefined
                  __epPropKey: true
                } & {
                  readonly default: 'right'
                }
                readonly requireAsteriskPosition: {
                  readonly type: import('vue').PropType<'left' | 'right'>
                  readonly required: false
                  readonly validator: ((val: unknown) => boolean) | undefined
                  __epPropKey: true
                } & {
                  readonly default: 'left'
                }
                readonly labelWidth: {
                  readonly type: import('vue').PropType<string | number>
                  readonly required: false
                  readonly validator: ((val: unknown) => boolean) | undefined
                  __epPropKey: true
                } & {
                  readonly default: ''
                }
                readonly labelSuffix: {
                  readonly type: import('vue').PropType<string>
                  readonly required: false
                  readonly validator: ((val: unknown) => boolean) | undefined
                  __epPropKey: true
                } & {
                  readonly default: ''
                }
                readonly inline: BooleanConstructor
                readonly inlineMessage: BooleanConstructor
                readonly statusIcon: BooleanConstructor
                readonly showMessage: {
                  readonly type: import('vue').PropType<boolean>
                  readonly required: false
                  readonly validator: ((val: unknown) => boolean) | undefined
                  __epPropKey: true
                } & {
                  readonly default: true
                }
                readonly validateOnRuleChange: {
                  readonly type: import('vue').PropType<boolean>
                  readonly required: false
                  readonly validator: ((val: unknown) => boolean) | undefined
                  __epPropKey: true
                } & {
                  readonly default: true
                }
                readonly hideRequiredAsterisk: BooleanConstructor
                readonly scrollToError: BooleanConstructor
                readonly scrollIntoViewOptions: {
                  readonly type: import('vue').PropType<boolean | Record<string, any>>
                  readonly required: false
                  readonly validator: ((val: unknown) => boolean) | undefined
                  __epPropKey: true
                } & {
                  readonly default: true
                }
                readonly size: {
                  readonly type: import('vue').PropType<'' | 'large' | 'default' | 'small'>
                  readonly required: false
                  readonly validator: ((val: unknown) => boolean) | undefined
                  __epPropKey: true
                }
                readonly disabled: BooleanConstructor
              }>
            > & {
              onValidate?:
                | ((
                    prop: import('element-plus').FormItemProp,
                    isValid: boolean,
                    message: string
                  ) => any)
                | undefined
            },
            | 'labelWidth'
            | 'inline'
            | 'disabled'
            | 'labelPosition'
            | 'requireAsteriskPosition'
            | 'labelSuffix'
            | 'inlineMessage'
            | 'statusIcon'
            | 'showMessage'
            | 'validateOnRuleChange'
            | 'hideRequiredAsterisk'
            | 'scrollToError'
            | 'scrollIntoViewOptions'
            | 'validate'
            | 'validateField'
            | 'resetFields'
            | 'clearValidate'
            | 'scrollToField'
            | 'getField'
            | 'fields'
          > &
          import('vue').ShallowUnwrapRef<{
            validate: (
              callback?: import('element-plus').FormValidateCallback
            ) => import('element-plus').FormValidationResult
            validateField: (
              props?: import('element-plus').FormItemProp | import('element-plus').FormItemProp[],
              callback?: import('element-plus').FormValidateCallback
            ) => import('element-plus').FormValidationResult
            resetFields: (
              props?: import('element-plus').FormItemProp | import('element-plus').FormItemProp[]
            ) => void
            clearValidate: (
              props?: import('element-plus').FormItemProp | import('element-plus').FormItemProp[]
            ) => void
            scrollToField: (prop: import('element-plus').FormItemProp) => void
            getField: (
              prop: import('element-plus').FormItemProp
            ) => import('element-plus').FormItemContext | undefined
            fields: import('vue').Reactive<import('element-plus').FormItemContext[]>
          }> & {} & import('vue').ComponentCustomProperties & {} & {
            $slots: {
              default?(_: {}): any
            }
          })
      | null
  },
  HTMLDivElement
>
declare const _default: __VLS_WithTemplateSlots<
  typeof __VLS_component,
  __VLS_TemplateResult['slots']
>
export default _default
type __VLS_WithTemplateSlots<T, S> = T & {
  new (): {
    $slots: S
  }
}
