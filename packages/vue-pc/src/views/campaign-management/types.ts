// 投放记录搜索表单
export interface CampaignSearchForm {
  productName?: string;
  salesPlanCode?: string;
  salesChannel?: string;
  insuranceMethod?: string;
  specialBusinessType?: string;
  validPeriod?: any[]; // 时间范围选择器的值
  startTime?: string; // 起始时间
  endTime?: string; // 结束时间
  status?: string;
}

// 分页参数
export interface PaginationParams {
  pageNum: number;
  pageSize: number;
}

// 投放记录项
export interface Campaign {
  id: string;
  productName: string;
  salesPlanCode: string;
  salesChannel: string;
  insuranceMethod: string;
  specialBusinessType: string;
  validPeriod: string;
  status: number;
  statusText: string;
}

// 投放记录列表响应
export interface CampaignListResponse {
  total: number;
  list: Campaign[];
}