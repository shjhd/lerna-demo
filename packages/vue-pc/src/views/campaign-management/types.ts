// 投放记录搜索表单
export interface CampaignSearchForm {
  productName?: string;
  salesPlanCode?: string;
  salesChannel?: string;
  validPeriod?: any[]; // 时间范围选择器的值
  startTime?: string; // 起始时间
  endTime?: string; // 结束时间
  status?: number; // 修改为number类型
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
  validPeriod: string;
  status: number;
  creator: string; // 创建人
  createTime: string; // 创建时间
  editor: string; // 编辑人
  updateTime: string; // 更新时间
  startTime?: string; // 投放开始时间
  endTime?: string; // 投放结束时间
  salesPersonCode?: string; // 销售人员代码
  salesPersonName?: string; // 销售人员姓名
  specialBusinessType?: string; // 特殊业务类型
}

// 投放记录列表响应
export interface CampaignListResponse {
  total: number;
  list: Campaign[];
}