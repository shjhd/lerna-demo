// 投放记录管理API服务

import httpInstance from '@/api/index'
import type {
  Campaign,
  CampaignSearchForm,
  CampaignListResponse,
  PaginationParams
} from './types'

/**
 * 获取投放记录列表
 */
export async function getCampaignList(
  params: CampaignSearchForm & PaginationParams
): Promise<CampaignListResponse> {
  return await httpInstance.post('/campaign/list', params)
}

/**
 * 终止投放记录
 */
export async function terminateCampaign(
  id: string
): Promise<boolean> {
  return await httpInstance.post('/campaign/terminate', { id })
}