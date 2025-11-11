export declare const MsSearchTable: {
    new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<Readonly<import('vue').ExtractPropTypes<{
        methodType: {
            type: () => import('./props').RequestMethodType;
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
            type: import('vue').PropType<import('../search/props').SearchModel>;
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
        "onUpdate:search"?: ((value: import('../search/props').SearchModel) => any) | undefined;
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
        "update:search": (value: import('../search/props').SearchModel) => void;
    }, import('vue').PublicProps, {
        url: string;
        render: Function;
        methodType: import('./props').RequestMethodType;
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
            type: () => import('./props').RequestMethodType;
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
            type: import('vue').PropType<import('../search/props').SearchModel>;
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
        "onUpdate:search"?: ((value: import('../search/props').SearchModel) => any) | undefined;
    }>, {
        handleSearch: (reset?: boolean) => Promise<void>;
    }, {}, {}, {}, {
        url: string;
        render: Function;
        methodType: import('./props').RequestMethodType;
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
        type: () => import('./props').RequestMethodType;
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
        type: import('vue').PropType<import('../search/props').SearchModel>;
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
    "onUpdate:search"?: ((value: import('../search/props').SearchModel) => any) | undefined;
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
    "update:search": (value: import('../search/props').SearchModel) => void;
}, string, {
    url: string;
    render: Function;
    methodType: import('./props').RequestMethodType;
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
});
export default MsSearchTable;
