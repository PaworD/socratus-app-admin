import { VueConstructor } from 'vue'
import { BlockSkeleton, TableSkeleton } from './index'

export enum SkeletonType {
  Table = 'table',
  Block = 'block'
}

export const skeletonRegistry: Record<SkeletonType, VueConstructor> = {
  [SkeletonType.Table] : TableSkeleton,
  [SkeletonType.Block] : BlockSkeleton
}