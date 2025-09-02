import { QueryBuilder } from 'typeorm'
import { paginate, IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate'

// 定义转换后的分页结果类型（全局复用）
export interface TransformedPagination<T> {
  result: any // 原 items
  total: number // 原 meta.totalItems
  currentPage: number // 原 meta.currentPage
  pageSize: number // 原 meta.itemsPerPage
}

/**
 * 全局分页工具：自动转换分页结果格式
 * @param queryBuilder TypeORM 查询构建器
 * @param options 分页参数（page, limit）
 * @returns 转换后的分页结果
 */
export async function paginateTransform<T>(
  queryBuilder: any,
  options: IPaginationOptions
): Promise<TransformedPagination<T>> {
  // 调用原始 paginate 方法
  const originalResult: Pagination<T> = await paginate<T>(queryBuilder, options)

  // 转换格式
  return {
    result: originalResult.items,
    total: originalResult.meta.totalItems as number,
    currentPage: originalResult.meta.currentPage,
    pageSize: originalResult.meta.itemsPerPage
  }
}
