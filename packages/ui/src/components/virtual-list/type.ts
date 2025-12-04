export interface MlVirtualListProps {
  /** 容器高度，默认 500px */
  height?: number
  /** 列表项高度（定高模式必传） */
  itemHeight?: number
  /** 列表项预估高度（不定高模式使用），默认 50px */
  estimatedItemHeight?: number
  /** 是否为等高列表，true=定高，false=不定高，默认 true */
  itemEqual?: boolean
  /** 预加载数量（上下各预加载几个） */
  preLoadCount?: number
  /** 距离底部多少像素时触发加载 */
  threshold?: number
  /** 数据源 */
  dataSource?: any[]
  /** 是否正在加载 */
  loading?: boolean
  /** 是否已加载完所有数据 */
  finished?: boolean
}
