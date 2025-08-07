// https://github.com/vuejs/pinia/issues/2098
/// <reference types="vite/client" />
declare module 'pinia' {
  export function acceptHMRUpdate(initialUseStore: any | StoreDefinition, hot: any): any
}

export {}
