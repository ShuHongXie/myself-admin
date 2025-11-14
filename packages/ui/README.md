```js
// 本地环境package.json中exports配置
const exports = {
  '.': {
    types: './src/index.ts',
    import: './src/index.ts',
    require: './src/index.ts',
    default: './src/index.ts'
  },

  '.': {
    types: './build/es/index.d.ts',
    import: './build/es/index.mjs',
    require: './build/lib/index.js'
  }
}
```

```js
// 打包时package.json中exports配置
const exports = {
  '.': {
    types: './minilo/es/index.d.ts',
    import: './minilo/dist/index.full.min.mjs',
    require: './minilo/dist/index.full.min.mjs'
  },
  './es/_': {
    types: './minilo/es/index.d.ts',
    import: './minilo/es/components/_/index.mjs'
  },
  './styles': {
    import: './minilo/dist/index.css',
    default: './minilo/dist/index.css'
  },
  './theme-chalk/_': {
    import: './minilo/theme-chalk/_.css',
    default: './minilo/theme-chalk/_.css'
  },
  './components/_': {
    import: './minilo/es/components/_',
    default: './minilo/es/components/_'
  }
}
```
