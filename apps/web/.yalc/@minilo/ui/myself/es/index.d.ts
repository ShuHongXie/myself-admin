import { App } from 'vue';
export * from './components';
export declare const MsUIComponentsInstance: (({
    new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<Readonly<import('vue').ExtractPropTypes<{
        inline: {
            type: BooleanConstructor;
            default: boolean;
        };
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        labelWidth: {
            type: (StringConstructor | NumberConstructor)[];
            default: string;
        };
        labelPosition: {
            type: StringConstructor;
            default: string;
        };
        size: {
            type: import('vue').PropType<"" | "large" | "default" | "small">;
            default: string;
        };
        gutter: {
            type: (StringConstructor | NumberConstructor)[];
            default: number;
        };
        span: {
            type: NumberConstructor;
            default: number;
        };
        submitBtnText: {
            type: StringConstructor;
            default: string;
        };
        resetBtnText: {
            type: StringConstructor;
            default: string;
        };
        slots: {
            type: {
                (arrayLength: number): import('./components/search/props').CustomSlot[];
                (...items: import('./components/search/props').CustomSlot[]): import('./components/search/props').CustomSlot[];
                new (arrayLength: number): import('./components/search/props').CustomSlot[];
                new (...items: import('./components/search/props').CustomSlot[]): import('./components/search/props').CustomSlot[];
                isArray(arg: any): arg is any[];
                readonly prototype: any[];
                from<T>(arrayLike: ArrayLike<T>): T[];
                from<T, U>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
                from<T>(iterable: Iterable<T> | ArrayLike<T>): T[];
                from<T, U>(iterable: Iterable<T> | ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
                of<T>(...items: T[]): T[];
                fromAsync<T>(iterableOrArrayLike: AsyncIterable<T> | Iterable<T | PromiseLike<T>> | ArrayLike<T | PromiseLike<T>>): Promise<T[]>;
                fromAsync<T, U>(iterableOrArrayLike: AsyncIterable<T> | Iterable<T> | ArrayLike<T>, mapFn: (value: Awaited<T>, index: number) => U, thisArg?: any): Promise<Awaited<U>[]>;
                readonly [Symbol.species]: ArrayConstructor;
            };
            default: () => never[];
        };
        item: {
            type: {
                (arrayLength: number): import('./components/search/props').SearchItem[];
                (...items: import('./components/search/props').SearchItem[]): import('./components/search/props').SearchItem[];
                new (arrayLength: number): import('./components/search/props').SearchItem[];
                new (...items: import('./components/search/props').SearchItem[]): import('./components/search/props').SearchItem[];
                isArray(arg: any): arg is any[];
                readonly prototype: any[];
                from<T>(arrayLike: ArrayLike<T>): T[];
                from<T, U>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
                from<T>(iterable: Iterable<T> | ArrayLike<T>): T[];
                from<T, U>(iterable: Iterable<T> | ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
                of<T>(...items: T[]): T[];
                fromAsync<T>(iterableOrArrayLike: AsyncIterable<T> | Iterable<T | PromiseLike<T>> | ArrayLike<T | PromiseLike<T>>): Promise<T[]>;
                fromAsync<T, U>(iterableOrArrayLike: AsyncIterable<T> | Iterable<T> | ArrayLike<T>, mapFn: (value: Awaited<T>, index: number) => U, thisArg?: any): Promise<Awaited<U>[]>;
                readonly [Symbol.species]: ArrayConstructor;
            };
            default: () => never[];
        };
        modelValue: {
            type: import('vue').PropType<import('./components/search/props').SearchModel>;
        };
    }>> & Readonly<{
        onSubmit?: ((...args: any[]) => any) | undefined;
        onReset?: ((...args: any[]) => any) | undefined;
        "onUpdate:modelValue"?: ((value: import('./components/search/props').SearchModel) => any) | undefined;
    }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
        submit: (...args: any[]) => void;
        reset: (...args: any[]) => void;
        "update:modelValue": (value: import('./components/search/props').SearchModel) => void;
    }, import('vue').PublicProps, {
        size: "" | "large" | "default" | "small";
        span: number;
        labelWidth: string | number;
        inline: boolean;
        disabled: boolean;
        labelPosition: string;
        gutter: string | number;
        submitBtnText: string;
        resetBtnText: string;
        slots: import('./components/search/props').CustomSlot[];
        item: import('./components/search/props').SearchItem[];
    }, true, {}, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, {
        searchFormRef: ({
            $: import('vue').ComponentInternalInstance;
            $data: {};
            $props: Partial<{
                readonly disabled: boolean;
                readonly inline: boolean;
                readonly labelWidth: string | number;
                readonly labelPosition: "top" | "left" | "right";
                readonly inlineMessage: boolean;
                readonly showMessage: boolean;
                readonly requireAsteriskPosition: "left" | "right";
                readonly labelSuffix: string;
                readonly validateOnRuleChange: boolean;
                readonly scrollIntoViewOptions: boolean | Record<string, any>;
                readonly statusIcon: boolean;
                readonly hideRequiredAsterisk: boolean;
                readonly scrollToError: boolean;
            }> & Omit<{
                readonly labelWidth: string | number;
                readonly inline: boolean;
                readonly disabled: boolean;
                readonly labelPosition: "top" | "left" | "right";
                readonly requireAsteriskPosition: "left" | "right";
                readonly labelSuffix: string;
                readonly inlineMessage: boolean;
                readonly statusIcon: boolean;
                readonly showMessage: boolean;
                readonly validateOnRuleChange: boolean;
                readonly hideRequiredAsterisk: boolean;
                readonly scrollToError: boolean;
                readonly scrollIntoViewOptions: boolean | Record<string, any>;
                readonly size?: ("" | "large" | "default" | "small") | undefined;
                readonly model?: Record<string, any> | undefined;
                readonly rules?: Partial<Record<string, import('element-plus').FormItemRule | import('element-plus').FormItemRule[]>> | undefined;
                onValidate?: ((prop: import('element-plus').FormItemProp, isValid: boolean, message: string) => any) | undefined | undefined;
            } & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps, "labelWidth" | "inline" | "disabled" | "labelPosition" | "requireAsteriskPosition" | "labelSuffix" | "inlineMessage" | "statusIcon" | "showMessage" | "validateOnRuleChange" | "hideRequiredAsterisk" | "scrollToError" | "scrollIntoViewOptions">;
            $attrs: {
                [x: string]: unknown;
            };
            $refs: {
                [x: string]: unknown;
            };
            $slots: Readonly<{
                [name: string]: import('vue').Slot<any> | undefined;
            }>;
            $root: import('vue').ComponentPublicInstance | null;
            $parent: import('vue').ComponentPublicInstance | null;
            $host: Element | null;
            $emit: (event: "validate", prop: import('element-plus').FormItemProp, isValid: boolean, message: string) => void;
            $el: any;
            $options: import('vue').ComponentOptionsBase<Readonly<import('vue').ExtractPropTypes<{
                readonly model: ObjectConstructor;
                readonly rules: {
                    readonly type: import('vue').PropType<Partial<Record<string, import('element-plus').FormItemRule | import('element-plus').FormItemRule[]>>>;
                    readonly required: false;
                    readonly validator: ((val: unknown) => boolean) | undefined;
                    __epPropKey: true;
                };
                readonly labelPosition: {
                    readonly type: import('vue').PropType<"top" | "left" | "right">;
                    readonly required: false;
                    readonly validator: ((val: unknown) => boolean) | undefined;
                    __epPropKey: true;
                } & {
                    readonly default: "right";
                };
                readonly requireAsteriskPosition: {
                    readonly type: import('vue').PropType<"left" | "right">;
                    readonly required: false;
                    readonly validator: ((val: unknown) => boolean) | undefined;
                    __epPropKey: true;
                } & {
                    readonly default: "left";
                };
                readonly labelWidth: {
                    readonly type: import('vue').PropType<string | number>;
                    readonly required: false;
                    readonly validator: ((val: unknown) => boolean) | undefined;
                    __epPropKey: true;
                } & {
                    readonly default: "";
                };
                readonly labelSuffix: {
                    readonly type: import('vue').PropType<string>;
                    readonly required: false;
                    readonly validator: ((val: unknown) => boolean) | undefined;
                    __epPropKey: true;
                } & {
                    readonly default: "";
                };
                readonly inline: BooleanConstructor;
                readonly inlineMessage: BooleanConstructor;
                readonly statusIcon: BooleanConstructor;
                readonly showMessage: {
                    readonly type: import('vue').PropType<boolean>;
                    readonly required: false;
                    readonly validator: ((val: unknown) => boolean) | undefined;
                    __epPropKey: true;
                } & {
                    readonly default: true;
                };
                readonly validateOnRuleChange: {
                    readonly type: import('vue').PropType<boolean>;
                    readonly required: false;
                    readonly validator: ((val: unknown) => boolean) | undefined;
                    __epPropKey: true;
                } & {
                    readonly default: true;
                };
                readonly hideRequiredAsterisk: BooleanConstructor;
                readonly scrollToError: BooleanConstructor;
                readonly scrollIntoViewOptions: {
                    readonly type: import('vue').PropType<boolean | Record<string, any>>;
                    readonly required: false;
                    readonly validator: ((val: unknown) => boolean) | undefined;
                    __epPropKey: true;
                } & {
                    readonly default: true;
                };
                readonly size: {
                    readonly type: import('vue').PropType<"" | "large" | "default" | "small">;
                    readonly required: false;
                    readonly validator: ((val: unknown) => boolean) | undefined;
                    __epPropKey: true;
                };
                readonly disabled: BooleanConstructor;
            }>> & {
                onValidate?: ((prop: import('element-plus').FormItemProp, isValid: boolean, message: string) => any) | undefined;
            }, {
                validate: (callback?: import('element-plus').FormValidateCallback) => import('element-plus').FormValidationResult;
                validateField: (props?: import('element-plus').FormItemProp | import('element-plus').FormItemProp[], callback?: import('element-plus').FormValidateCallback) => import('element-plus').FormValidationResult;
                resetFields: (props?: import('element-plus').FormItemProp | import('element-plus').FormItemProp[]) => void;
                clearValidate: (props?: import('element-plus').FormItemProp | import('element-plus').FormItemProp[]) => void;
                scrollToField: (prop: import('element-plus').FormItemProp) => void;
                getField: (prop: import('element-plus').FormItemProp) => import('element-plus').FormItemContext | undefined;
                fields: import('vue').Reactive<import('element-plus').FormItemContext[]>;
            }, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
                validate: (prop: import('element-plus').FormItemProp, isValid: boolean, message: string) => void;
            }, string, {
                readonly disabled: boolean;
                readonly inline: boolean;
                readonly labelWidth: string | number;
                readonly labelPosition: "top" | "left" | "right";
                readonly inlineMessage: boolean;
                readonly showMessage: boolean;
                readonly requireAsteriskPosition: "left" | "right";
                readonly labelSuffix: string;
                readonly validateOnRuleChange: boolean;
                readonly scrollIntoViewOptions: boolean | Record<string, any>;
                readonly statusIcon: boolean;
                readonly hideRequiredAsterisk: boolean;
                readonly scrollToError: boolean;
            }, {}, string, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, import('vue').ComponentProvideOptions> & {
                beforeCreate?: (() => void) | (() => void)[];
                created?: (() => void) | (() => void)[];
                beforeMount?: (() => void) | (() => void)[];
                mounted?: (() => void) | (() => void)[];
                beforeUpdate?: (() => void) | (() => void)[];
                updated?: (() => void) | (() => void)[];
                activated?: (() => void) | (() => void)[];
                deactivated?: (() => void) | (() => void)[];
                beforeDestroy?: (() => void) | (() => void)[];
                beforeUnmount?: (() => void) | (() => void)[];
                destroyed?: (() => void) | (() => void)[];
                unmounted?: (() => void) | (() => void)[];
                renderTracked?: ((e: import('vue').DebuggerEvent) => void) | ((e: import('vue').DebuggerEvent) => void)[];
                renderTriggered?: ((e: import('vue').DebuggerEvent) => void) | ((e: import('vue').DebuggerEvent) => void)[];
                errorCaptured?: ((err: unknown, instance: import('vue').ComponentPublicInstance | null, info: string) => boolean | void) | ((err: unknown, instance: import('vue').ComponentPublicInstance | null, info: string) => boolean | void)[];
            };
            $forceUpdate: () => void;
            $nextTick: typeof import('vue').nextTick;
            $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (...args: [R, R, import('@vue/reactivity').OnCleanup]) => any : (...args: [any, any, import('@vue/reactivity').OnCleanup]) => any, options?: import('vue').WatchOptions): import('vue').WatchStopHandle;
        } & Readonly<{
            readonly disabled: boolean;
            readonly inline: boolean;
            readonly labelWidth: string | number;
            readonly labelPosition: "top" | "left" | "right";
            readonly inlineMessage: boolean;
            readonly showMessage: boolean;
            readonly requireAsteriskPosition: "left" | "right";
            readonly labelSuffix: string;
            readonly validateOnRuleChange: boolean;
            readonly scrollIntoViewOptions: boolean | Record<string, any>;
            readonly statusIcon: boolean;
            readonly hideRequiredAsterisk: boolean;
            readonly scrollToError: boolean;
        }> & Omit<Readonly<import('vue').ExtractPropTypes<{
            readonly model: ObjectConstructor;
            readonly rules: {
                readonly type: import('vue').PropType<Partial<Record<string, import('element-plus').FormItemRule | import('element-plus').FormItemRule[]>>>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            readonly labelPosition: {
                readonly type: import('vue').PropType<"top" | "left" | "right">;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            } & {
                readonly default: "right";
            };
            readonly requireAsteriskPosition: {
                readonly type: import('vue').PropType<"left" | "right">;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            } & {
                readonly default: "left";
            };
            readonly labelWidth: {
                readonly type: import('vue').PropType<string | number>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            } & {
                readonly default: "";
            };
            readonly labelSuffix: {
                readonly type: import('vue').PropType<string>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            } & {
                readonly default: "";
            };
            readonly inline: BooleanConstructor;
            readonly inlineMessage: BooleanConstructor;
            readonly statusIcon: BooleanConstructor;
            readonly showMessage: {
                readonly type: import('vue').PropType<boolean>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            } & {
                readonly default: true;
            };
            readonly validateOnRuleChange: {
                readonly type: import('vue').PropType<boolean>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            } & {
                readonly default: true;
            };
            readonly hideRequiredAsterisk: BooleanConstructor;
            readonly scrollToError: BooleanConstructor;
            readonly scrollIntoViewOptions: {
                readonly type: import('vue').PropType<boolean | Record<string, any>>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            } & {
                readonly default: true;
            };
            readonly size: {
                readonly type: import('vue').PropType<"" | "large" | "default" | "small">;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            readonly disabled: BooleanConstructor;
        }>> & {
            onValidate?: ((prop: import('element-plus').FormItemProp, isValid: boolean, message: string) => any) | undefined;
        }, "labelWidth" | "inline" | "disabled" | "labelPosition" | "requireAsteriskPosition" | "labelSuffix" | "inlineMessage" | "statusIcon" | "showMessage" | "validateOnRuleChange" | "hideRequiredAsterisk" | "scrollToError" | "scrollIntoViewOptions" | "validate" | "validateField" | "resetFields" | "clearValidate" | "scrollToField" | "getField" | "fields"> & import('vue').ShallowUnwrapRef<{
            validate: (callback?: import('element-plus').FormValidateCallback) => import('element-plus').FormValidationResult;
            validateField: (props?: import('element-plus').FormItemProp | import('element-plus').FormItemProp[], callback?: import('element-plus').FormValidateCallback) => import('element-plus').FormValidationResult;
            resetFields: (props?: import('element-plus').FormItemProp | import('element-plus').FormItemProp[]) => void;
            clearValidate: (props?: import('element-plus').FormItemProp | import('element-plus').FormItemProp[]) => void;
            scrollToField: (prop: import('element-plus').FormItemProp) => void;
            getField: (prop: import('element-plus').FormItemProp) => import('element-plus').FormItemContext | undefined;
            fields: import('vue').Reactive<import('element-plus').FormItemContext[]>;
        }> & {} & import('vue').ComponentCustomProperties & {} & {
            $slots: {
                default?(_: {}): any;
            };
        }) | null;
    }, HTMLDivElement, import('vue').ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import('vue').ExtractPropTypes<{
        inline: {
            type: BooleanConstructor;
            default: boolean;
        };
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        labelWidth: {
            type: (StringConstructor | NumberConstructor)[];
            default: string;
        };
        labelPosition: {
            type: StringConstructor;
            default: string;
        };
        size: {
            type: import('vue').PropType<"" | "large" | "default" | "small">;
            default: string;
        };
        gutter: {
            type: (StringConstructor | NumberConstructor)[];
            default: number;
        };
        span: {
            type: NumberConstructor;
            default: number;
        };
        submitBtnText: {
            type: StringConstructor;
            default: string;
        };
        resetBtnText: {
            type: StringConstructor;
            default: string;
        };
        slots: {
            type: {
                (arrayLength: number): import('./components/search/props').CustomSlot[];
                (...items: import('./components/search/props').CustomSlot[]): import('./components/search/props').CustomSlot[];
                new (arrayLength: number): import('./components/search/props').CustomSlot[];
                new (...items: import('./components/search/props').CustomSlot[]): import('./components/search/props').CustomSlot[];
                isArray(arg: any): arg is any[];
                readonly prototype: any[];
                from<T>(arrayLike: ArrayLike<T>): T[];
                from<T, U>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
                from<T>(iterable: Iterable<T> | ArrayLike<T>): T[];
                from<T, U>(iterable: Iterable<T> | ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
                of<T>(...items: T[]): T[];
                fromAsync<T>(iterableOrArrayLike: AsyncIterable<T> | Iterable<T | PromiseLike<T>> | ArrayLike<T | PromiseLike<T>>): Promise<T[]>;
                fromAsync<T, U>(iterableOrArrayLike: AsyncIterable<T> | Iterable<T> | ArrayLike<T>, mapFn: (value: Awaited<T>, index: number) => U, thisArg?: any): Promise<Awaited<U>[]>;
                readonly [Symbol.species]: ArrayConstructor;
            };
            default: () => never[];
        };
        item: {
            type: {
                (arrayLength: number): import('./components/search/props').SearchItem[];
                (...items: import('./components/search/props').SearchItem[]): import('./components/search/props').SearchItem[];
                new (arrayLength: number): import('./components/search/props').SearchItem[];
                new (...items: import('./components/search/props').SearchItem[]): import('./components/search/props').SearchItem[];
                isArray(arg: any): arg is any[];
                readonly prototype: any[];
                from<T>(arrayLike: ArrayLike<T>): T[];
                from<T, U>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
                from<T>(iterable: Iterable<T> | ArrayLike<T>): T[];
                from<T, U>(iterable: Iterable<T> | ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
                of<T>(...items: T[]): T[];
                fromAsync<T>(iterableOrArrayLike: AsyncIterable<T> | Iterable<T | PromiseLike<T>> | ArrayLike<T | PromiseLike<T>>): Promise<T[]>;
                fromAsync<T, U>(iterableOrArrayLike: AsyncIterable<T> | Iterable<T> | ArrayLike<T>, mapFn: (value: Awaited<T>, index: number) => U, thisArg?: any): Promise<Awaited<U>[]>;
                readonly [Symbol.species]: ArrayConstructor;
            };
            default: () => never[];
        };
        modelValue: {
            type: import('vue').PropType<import('./components/search/props').SearchModel>;
        };
    }>> & Readonly<{
        onSubmit?: ((...args: any[]) => any) | undefined;
        onReset?: ((...args: any[]) => any) | undefined;
        "onUpdate:modelValue"?: ((value: import('./components/search/props').SearchModel) => any) | undefined;
    }>, {}, {}, {}, {}, {
        size: "" | "large" | "default" | "small";
        span: number;
        labelWidth: string | number;
        inline: boolean;
        disabled: boolean;
        labelPosition: string;
        gutter: string | number;
        submitBtnText: string;
        resetBtnText: string;
        slots: import('./components/search/props').CustomSlot[];
        item: import('./components/search/props').SearchItem[];
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import('vue').ComponentOptionsBase<Readonly<import('vue').ExtractPropTypes<{
    inline: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    labelWidth: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    labelPosition: {
        type: StringConstructor;
        default: string;
    };
    size: {
        type: import('vue').PropType<"" | "large" | "default" | "small">;
        default: string;
    };
    gutter: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    span: {
        type: NumberConstructor;
        default: number;
    };
    submitBtnText: {
        type: StringConstructor;
        default: string;
    };
    resetBtnText: {
        type: StringConstructor;
        default: string;
    };
    slots: {
        type: {
            (arrayLength: number): import('./components/search/props').CustomSlot[];
            (...items: import('./components/search/props').CustomSlot[]): import('./components/search/props').CustomSlot[];
            new (arrayLength: number): import('./components/search/props').CustomSlot[];
            new (...items: import('./components/search/props').CustomSlot[]): import('./components/search/props').CustomSlot[];
            isArray(arg: any): arg is any[];
            readonly prototype: any[];
            from<T>(arrayLike: ArrayLike<T>): T[];
            from<T, U>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
            from<T>(iterable: Iterable<T> | ArrayLike<T>): T[];
            from<T, U>(iterable: Iterable<T> | ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
            of<T>(...items: T[]): T[];
            fromAsync<T>(iterableOrArrayLike: AsyncIterable<T> | Iterable<T | PromiseLike<T>> | ArrayLike<T | PromiseLike<T>>): Promise<T[]>;
            fromAsync<T, U>(iterableOrArrayLike: AsyncIterable<T> | Iterable<T> | ArrayLike<T>, mapFn: (value: Awaited<T>, index: number) => U, thisArg?: any): Promise<Awaited<U>[]>;
            readonly [Symbol.species]: ArrayConstructor;
        };
        default: () => never[];
    };
    item: {
        type: {
            (arrayLength: number): import('./components/search/props').SearchItem[];
            (...items: import('./components/search/props').SearchItem[]): import('./components/search/props').SearchItem[];
            new (arrayLength: number): import('./components/search/props').SearchItem[];
            new (...items: import('./components/search/props').SearchItem[]): import('./components/search/props').SearchItem[];
            isArray(arg: any): arg is any[];
            readonly prototype: any[];
            from<T>(arrayLike: ArrayLike<T>): T[];
            from<T, U>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
            from<T>(iterable: Iterable<T> | ArrayLike<T>): T[];
            from<T, U>(iterable: Iterable<T> | ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
            of<T>(...items: T[]): T[];
            fromAsync<T>(iterableOrArrayLike: AsyncIterable<T> | Iterable<T | PromiseLike<T>> | ArrayLike<T | PromiseLike<T>>): Promise<T[]>;
            fromAsync<T, U>(iterableOrArrayLike: AsyncIterable<T> | Iterable<T> | ArrayLike<T>, mapFn: (value: Awaited<T>, index: number) => U, thisArg?: any): Promise<Awaited<U>[]>;
            readonly [Symbol.species]: ArrayConstructor;
        };
        default: () => never[];
    };
    modelValue: {
        type: import('vue').PropType<import('./components/search/props').SearchModel>;
    };
}>> & Readonly<{
    onSubmit?: ((...args: any[]) => any) | undefined;
    onReset?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((value: import('./components/search/props').SearchModel) => any) | undefined;
}>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    submit: (...args: any[]) => void;
    reset: (...args: any[]) => void;
    "update:modelValue": (value: import('./components/search/props').SearchModel) => void;
}, string, {
    size: "" | "large" | "default" | "small";
    span: number;
    labelWidth: string | number;
    inline: boolean;
    disabled: boolean;
    labelPosition: string;
    gutter: string | number;
    submitBtnText: string;
    resetBtnText: string;
    slots: import('./components/search/props').CustomSlot[];
    item: import('./components/search/props').SearchItem[];
}, {}, string, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, import('vue').ComponentProvideOptions> & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & (new () => {
    $slots: Partial<Record<string, (_: {
        searchModel: import('./components/search/props').SearchModel | undefined;
    }) => any>>;
})) | ({
    new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<Readonly<import('vue').ExtractPropTypes<{
        methodType: {
            type: () => import('./components/search-table/props').RequestMethodType;
            default: string;
        };
        url: {
            type: StringConstructor;
            default: string;
        };
        responseDataField: {
            type: StringConstructor;
            default: string;
        };
        responseTotalField: {
            type: StringConstructor;
            default: string;
        };
        headers: {
            type: ObjectConstructor;
            default: () => {};
        };
        showPagination: {
            type: BooleanConstructor;
            default: boolean;
        };
        paramsHandler: {
            type: FunctionConstructor;
            default: null;
        };
        render: {
            type: FunctionConstructor;
            default: null;
        };
        searchProps: {
            type: ObjectConstructor;
            default: () => void;
        };
        tableProps: {
            type: ObjectConstructor;
            default: () => {
                border: boolean;
            };
        };
        columns: {
            type: {
                (arrayLength: number): any[];
                (...items: any[]): any[];
                new (arrayLength: number): any[];
                new (...items: any[]): any[];
                isArray(arg: any): arg is any[];
                readonly prototype: any[];
                from<T>(arrayLike: ArrayLike<T>): T[];
                from<T, U>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
                from<T>(iterable: Iterable<T> | ArrayLike<T>): T[];
                from<T, U>(iterable: Iterable<T> | ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
                of<T>(...items: T[]): T[];
                fromAsync<T>(iterableOrArrayLike: AsyncIterable<T> | Iterable<T | PromiseLike<T>> | ArrayLike<T | PromiseLike<T>>): Promise<T[]>;
                fromAsync<T, U>(iterableOrArrayLike: AsyncIterable<T> | Iterable<T> | ArrayLike<T>, mapFn: (value: Awaited<T>, index: number) => U, thisArg?: any): Promise<Awaited<U>[]>;
                readonly [Symbol.species]: ArrayConstructor;
            };
            default: () => never[];
        };
        search: {
            type: import('vue').PropType<import('./components/search/props').SearchModel>;
        };
    }>> & Readonly<{
        onReset?: ((...args: any[]) => any) | undefined;
        onSelect?: ((...args: any[]) => any) | undefined;
        "onSelect-all"?: ((...args: any[]) => any) | undefined;
        "onSelection-change"?: ((...args: any[]) => any) | undefined;
        "onCell-mouse-enter"?: ((...args: any[]) => any) | undefined;
        "onCell-mouse-leave"?: ((...args: any[]) => any) | undefined;
        "onCell-click"?: ((...args: any[]) => any) | undefined;
        "onCell-dblclick"?: ((...args: any[]) => any) | undefined;
        "onRow-click"?: ((...args: any[]) => any) | undefined;
        "onRow-contextmenu"?: ((...args: any[]) => any) | undefined;
        "onRow-dblclick"?: ((...args: any[]) => any) | undefined;
        "onHeader-click"?: ((...args: any[]) => any) | undefined;
        "onHeader-contextmenu"?: ((...args: any[]) => any) | undefined;
        "onSort-change"?: ((...args: any[]) => any) | undefined;
        "onFilter-change"?: ((...args: any[]) => any) | undefined;
        "onCurrent-change"?: ((...args: any[]) => any) | undefined;
        "onHeader-dragend"?: ((...args: any[]) => any) | undefined;
        "onExpand-change"?: ((...args: any[]) => any) | undefined;
        "onUpdate:search"?: ((value: import('./components/search/props').SearchModel) => any) | undefined;
    }>, {
        handleSearch: (reset?: boolean) => Promise<void>;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
        reset: (...args: any[]) => void;
        select: (...args: any[]) => void;
        "select-all": (...args: any[]) => void;
        "selection-change": (...args: any[]) => void;
        "cell-mouse-enter": (...args: any[]) => void;
        "cell-mouse-leave": (...args: any[]) => void;
        "cell-click": (...args: any[]) => void;
        "cell-dblclick": (...args: any[]) => void;
        "row-click": (...args: any[]) => void;
        "row-contextmenu": (...args: any[]) => void;
        "row-dblclick": (...args: any[]) => void;
        "header-click": (...args: any[]) => void;
        "header-contextmenu": (...args: any[]) => void;
        "sort-change": (...args: any[]) => void;
        "filter-change": (...args: any[]) => void;
        "current-change": (...args: any[]) => void;
        "header-dragend": (...args: any[]) => void;
        "expand-change": (...args: any[]) => void;
        "update:search": (value: import('./components/search/props').SearchModel) => void;
    }, import('vue').PublicProps, {
        url: string;
        render: Function;
        methodType: import('./components/search-table/props').RequestMethodType;
        responseDataField: string;
        responseTotalField: string;
        headers: Record<string, any>;
        showPagination: boolean;
        paramsHandler: Function;
        searchProps: Record<string, any>;
        tableProps: Record<string, any>;
        columns: any[];
    }, true, {}, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, {}, HTMLDivElement, import('vue').ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import('vue').ExtractPropTypes<{
        methodType: {
            type: () => import('./components/search-table/props').RequestMethodType;
            default: string;
        };
        url: {
            type: StringConstructor;
            default: string;
        };
        responseDataField: {
            type: StringConstructor;
            default: string;
        };
        responseTotalField: {
            type: StringConstructor;
            default: string;
        };
        headers: {
            type: ObjectConstructor;
            default: () => {};
        };
        showPagination: {
            type: BooleanConstructor;
            default: boolean;
        };
        paramsHandler: {
            type: FunctionConstructor;
            default: null;
        };
        render: {
            type: FunctionConstructor;
            default: null;
        };
        searchProps: {
            type: ObjectConstructor;
            default: () => void;
        };
        tableProps: {
            type: ObjectConstructor;
            default: () => {
                border: boolean;
            };
        };
        columns: {
            type: {
                (arrayLength: number): any[];
                (...items: any[]): any[];
                new (arrayLength: number): any[];
                new (...items: any[]): any[];
                isArray(arg: any): arg is any[];
                readonly prototype: any[];
                from<T>(arrayLike: ArrayLike<T>): T[];
                from<T, U>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
                from<T>(iterable: Iterable<T> | ArrayLike<T>): T[];
                from<T, U>(iterable: Iterable<T> | ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
                of<T>(...items: T[]): T[];
                fromAsync<T>(iterableOrArrayLike: AsyncIterable<T> | Iterable<T | PromiseLike<T>> | ArrayLike<T | PromiseLike<T>>): Promise<T[]>;
                fromAsync<T, U>(iterableOrArrayLike: AsyncIterable<T> | Iterable<T> | ArrayLike<T>, mapFn: (value: Awaited<T>, index: number) => U, thisArg?: any): Promise<Awaited<U>[]>;
                readonly [Symbol.species]: ArrayConstructor;
            };
            default: () => never[];
        };
        search: {
            type: import('vue').PropType<import('./components/search/props').SearchModel>;
        };
    }>> & Readonly<{
        onReset?: ((...args: any[]) => any) | undefined;
        onSelect?: ((...args: any[]) => any) | undefined;
        "onSelect-all"?: ((...args: any[]) => any) | undefined;
        "onSelection-change"?: ((...args: any[]) => any) | undefined;
        "onCell-mouse-enter"?: ((...args: any[]) => any) | undefined;
        "onCell-mouse-leave"?: ((...args: any[]) => any) | undefined;
        "onCell-click"?: ((...args: any[]) => any) | undefined;
        "onCell-dblclick"?: ((...args: any[]) => any) | undefined;
        "onRow-click"?: ((...args: any[]) => any) | undefined;
        "onRow-contextmenu"?: ((...args: any[]) => any) | undefined;
        "onRow-dblclick"?: ((...args: any[]) => any) | undefined;
        "onHeader-click"?: ((...args: any[]) => any) | undefined;
        "onHeader-contextmenu"?: ((...args: any[]) => any) | undefined;
        "onSort-change"?: ((...args: any[]) => any) | undefined;
        "onFilter-change"?: ((...args: any[]) => any) | undefined;
        "onCurrent-change"?: ((...args: any[]) => any) | undefined;
        "onHeader-dragend"?: ((...args: any[]) => any) | undefined;
        "onExpand-change"?: ((...args: any[]) => any) | undefined;
        "onUpdate:search"?: ((value: import('./components/search/props').SearchModel) => any) | undefined;
    }>, {
        handleSearch: (reset?: boolean) => Promise<void>;
    }, {}, {}, {}, {
        url: string;
        render: Function;
        methodType: import('./components/search-table/props').RequestMethodType;
        responseDataField: string;
        responseTotalField: string;
        headers: Record<string, any>;
        showPagination: boolean;
        paramsHandler: Function;
        searchProps: Record<string, any>;
        tableProps: Record<string, any>;
        columns: any[];
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import('vue').ComponentOptionsBase<Readonly<import('vue').ExtractPropTypes<{
    methodType: {
        type: () => import('./components/search-table/props').RequestMethodType;
        default: string;
    };
    url: {
        type: StringConstructor;
        default: string;
    };
    responseDataField: {
        type: StringConstructor;
        default: string;
    };
    responseTotalField: {
        type: StringConstructor;
        default: string;
    };
    headers: {
        type: ObjectConstructor;
        default: () => {};
    };
    showPagination: {
        type: BooleanConstructor;
        default: boolean;
    };
    paramsHandler: {
        type: FunctionConstructor;
        default: null;
    };
    render: {
        type: FunctionConstructor;
        default: null;
    };
    searchProps: {
        type: ObjectConstructor;
        default: () => void;
    };
    tableProps: {
        type: ObjectConstructor;
        default: () => {
            border: boolean;
        };
    };
    columns: {
        type: {
            (arrayLength: number): any[];
            (...items: any[]): any[];
            new (arrayLength: number): any[];
            new (...items: any[]): any[];
            isArray(arg: any): arg is any[];
            readonly prototype: any[];
            from<T>(arrayLike: ArrayLike<T>): T[];
            from<T, U>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
            from<T>(iterable: Iterable<T> | ArrayLike<T>): T[];
            from<T, U>(iterable: Iterable<T> | ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
            of<T>(...items: T[]): T[];
            fromAsync<T>(iterableOrArrayLike: AsyncIterable<T> | Iterable<T | PromiseLike<T>> | ArrayLike<T | PromiseLike<T>>): Promise<T[]>;
            fromAsync<T, U>(iterableOrArrayLike: AsyncIterable<T> | Iterable<T> | ArrayLike<T>, mapFn: (value: Awaited<T>, index: number) => U, thisArg?: any): Promise<Awaited<U>[]>;
            readonly [Symbol.species]: ArrayConstructor;
        };
        default: () => never[];
    };
    search: {
        type: import('vue').PropType<import('./components/search/props').SearchModel>;
    };
}>> & Readonly<{
    onReset?: ((...args: any[]) => any) | undefined;
    onSelect?: ((...args: any[]) => any) | undefined;
    "onSelect-all"?: ((...args: any[]) => any) | undefined;
    "onSelection-change"?: ((...args: any[]) => any) | undefined;
    "onCell-mouse-enter"?: ((...args: any[]) => any) | undefined;
    "onCell-mouse-leave"?: ((...args: any[]) => any) | undefined;
    "onCell-click"?: ((...args: any[]) => any) | undefined;
    "onCell-dblclick"?: ((...args: any[]) => any) | undefined;
    "onRow-click"?: ((...args: any[]) => any) | undefined;
    "onRow-contextmenu"?: ((...args: any[]) => any) | undefined;
    "onRow-dblclick"?: ((...args: any[]) => any) | undefined;
    "onHeader-click"?: ((...args: any[]) => any) | undefined;
    "onHeader-contextmenu"?: ((...args: any[]) => any) | undefined;
    "onSort-change"?: ((...args: any[]) => any) | undefined;
    "onFilter-change"?: ((...args: any[]) => any) | undefined;
    "onCurrent-change"?: ((...args: any[]) => any) | undefined;
    "onHeader-dragend"?: ((...args: any[]) => any) | undefined;
    "onExpand-change"?: ((...args: any[]) => any) | undefined;
    "onUpdate:search"?: ((value: import('./components/search/props').SearchModel) => any) | undefined;
}>, {
    handleSearch: (reset?: boolean) => Promise<void>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    reset: (...args: any[]) => void;
    select: (...args: any[]) => void;
    "select-all": (...args: any[]) => void;
    "selection-change": (...args: any[]) => void;
    "cell-mouse-enter": (...args: any[]) => void;
    "cell-mouse-leave": (...args: any[]) => void;
    "cell-click": (...args: any[]) => void;
    "cell-dblclick": (...args: any[]) => void;
    "row-click": (...args: any[]) => void;
    "row-contextmenu": (...args: any[]) => void;
    "row-dblclick": (...args: any[]) => void;
    "header-click": (...args: any[]) => void;
    "header-contextmenu": (...args: any[]) => void;
    "sort-change": (...args: any[]) => void;
    "filter-change": (...args: any[]) => void;
    "current-change": (...args: any[]) => void;
    "header-dragend": (...args: any[]) => void;
    "expand-change": (...args: any[]) => void;
    "update:search": (value: import('./components/search/props').SearchModel) => void;
}, string, {
    url: string;
    render: Function;
    methodType: import('./components/search-table/props').RequestMethodType;
    responseDataField: string;
    responseTotalField: string;
    headers: Record<string, any>;
    showPagination: boolean;
    paramsHandler: Function;
    searchProps: Record<string, any>;
    tableProps: Record<string, any>;
    columns: any[];
}, {}, string, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, import('vue').ComponentProvideOptions> & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & (new () => {
    $slots: Partial<Record<any, (_: {}) => any>> & Partial<Record<any, (_: {
        index: any;
        row: any;
    }) => any>> & {
        prefix?(_: {}): any;
        suffix?(_: {}): any;
    };
})))[];
export declare const MsUIComponentsName: string[];
declare const _default: {
    install: (app: App) => void;
};
export default _default;
