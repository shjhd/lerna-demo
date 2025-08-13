<template>
  <div class="campaign-management">
    <!-- 页面标题 -->
    <div class="page-header">
      <a-breadcrumb>
        <a-breadcrumb-item>首页</a-breadcrumb-item>
        <a-breadcrumb-item>投放记录管理</a-breadcrumb-item>
        <a-breadcrumb-item>投放记录列表</a-breadcrumb-item>
      </a-breadcrumb>
      <h1 class="page-title">投放记录列表</h1>
    </div>
    
    <!-- 搜索表单 -->
    <div class="search-form">
      <a-form :model="searchForm" layout="horizontal" @finish="handleSearch">
        <a-row :gutter="24">
          <a-col :span="6">
            <a-form-item label="销售商品名称" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
              <a-input v-model:value="searchForm.productName" placeholder="请输入" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="销售方案编码" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
              <a-input v-model:value="searchForm.salesPlanCode" placeholder="请输入" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="销售渠道" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
              <a-select v-model:value="searchForm.salesChannel" placeholder="请选择" allow-clear style="width: 100%">
                <a-select-option value="life">寿险</a-select-option>
                <a-select-option value="bank">银行</a-select-option>
                <a-select-option value="property">产险</a-select-option>
                <a-select-option value="pension">养老险</a-select-option>
                <a-select-option value="health">健康险直销</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="投保方式" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
              <a-select v-model:value="searchForm.insuranceMethod" placeholder="请选择" allow-clear style="width: 100%">
                <a-select-option value="online">线上投保</a-select-option>
                <a-select-option value="offline">线下投保</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="6">
            <a-form-item label="特殊业务类型" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
              <a-select v-model:value="searchForm.specialBusinessType" placeholder="请选择" allow-clear style="width: 100%">
                <a-select-option value="type1">类型1</a-select-option>
                <a-select-option value="type2">类型2</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="投放有效期" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
              <a-range-picker 
                v-model:value="searchForm.validPeriod" 
                show-time 
                format="YYYY-MM-DD HH:mm:ss" 
                valueFormat="YYYY-MM-DD HH:mm:ss" 
                style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="状态" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
              <a-select v-model:value="searchForm.status" placeholder="请选择" allow-clear style="width: 100%">
                <a-select-option value="1">有效</a-select-option>
                <a-select-option value="0">无效</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <div style="display: flex; justify-content: end; height: 100%; padding-bottom: 4px;">
              <a-button type="primary" html-type="submit" :loading="loading">
                查询
              </a-button>
              <a-button style="margin-left: 8px" @click="handleReset">
                重置
              </a-button>
            </div>
          </a-col>
        </a-row>
      </a-form>
    </div>
    
    <!-- 操作栏 -->
    <div class="action-bar">
      <div class="action-buttons">
        <a-button type="primary" @click="handleAdd">
          <template #icon>
            <PlusOutlined />
          </template>
          新增
        </a-button>
      </div>
      <div class="table-info">
        <span class="total-info">
          共 {{ pagination.total }} 条记录
        </span>
      </div>
    </div>
    
    <!-- 表格 -->
    <div class="table-container">
      <a-table 
        :columns="columns" 
        :data-source="tableData" 
        :loading="loading" 
        :pagination="pagination"
        @change="handleTableChange"
        row-key="id">
        <template #status="{ text }">
          <a-tag :color="text === 1 ? 'green' : 'red'">
            {{ text === 1 ? '有效' : '无效' }}
          </a-tag>
        </template>
        <template #action="{ record }">
          <a-button type="link" size="small" @click="handleDetail(record)">详情</a-button>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import type {
  Campaign,
  CampaignSearchForm,
  CampaignListResponse,
  PaginationParams
} from './types';
import {
  getCampaignList,
  terminateCampaign
} from './api';
import { useRouter } from 'vue-router';

// 路由
const router = useRouter();

// 搜索表单
const searchForm = reactive<CampaignSearchForm>({});

// 表格数据
const tableData = ref<Campaign[]>([]);
const loading = ref(false);
const pagination = reactive<PaginationParams & { total: number }>({
  pageNum: 1,
  pageSize: 10,
  total: 0
});

// 表格列定义
const columns = [
  {
    title: '销售商品名称',
    dataIndex: 'productName',
    key: 'productName',
    ellipsis: true,
    width: 150,
    tooltip: (text: string) => text
  },
  {
    title: '销售方案编码',
    dataIndex: 'salesPlanCode',
    key: 'salesPlanCode',
    ellipsis: true,
    width: 150,
    tooltip: (text: string) => text
  },
  {
    title: '销售渠道',
    dataIndex: 'salesChannel',
    key: 'salesChannel',
    ellipsis: true,
    width: 120,
    customRender: ({ text }: { text: string }) => {
      const channelMap: Record<string, string> = {
        'life': '寿险',
        'bank': '银行',
        'property': '产险',
        'pension': '养老险',
        'health': '健康险直销'
      };
      return channelMap[text] || text;
    }
  },
  {
    title: '投保方式',
    dataIndex: 'insuranceMethod',
    key: 'insuranceMethod',
    ellipsis: true,
    width: 120,
    customRender: ({ text }: { text: string }) => {
      const methodMap: Record<string, string> = {
        'online': '线上投保',
        'offline': '线下投保'
      };
      return methodMap[text] || text;
    }
  },
  {
    title: '特殊业务类型',
    dataIndex: 'specialBusinessType',
    key: 'specialBusinessType',
    ellipsis: true,
    width: 120,
    customRender: ({ text }: { text: string }) => {
      const typeMap: Record<string, string> = {
        'type1': '类型1',
        'type2': '类型2'
      };
      return typeMap[text] || text;
    }
  },
  {
    title: '投放有效期',
    dataIndex: 'validPeriod',
    key: 'validPeriod',
    ellipsis: true,
    width: 200,
    tooltip: (text: string) => text
  },
  {
    title: '状态',
    key: 'status',
    slots: { customRender: 'status' },
    width: 100
  },
  {
    title: '操作',
    key: 'action',
    slots: { customRender: 'action' },
    width: 180
  },
];

// Mock数据
const mockData: Campaign[] = [
  {
    id: '1',
    productName: '商品A',
    salesPlanCode: 'SPC001',
    salesChannel: 'life',
    insuranceMethod: 'online',
    specialBusinessType: 'type1',
    validPeriod: '2023-01-01 00:00:00 ~ 2023-12-31 23:59:59',
    status: 1,
    statusText: '有效'
  },
  {
    id: '2',
    productName: '商品B',
    salesPlanCode: 'SPC002',
    salesChannel: 'bank',
    insuranceMethod: 'offline',
    specialBusinessType: 'type2',
    validPeriod: '2023-06-01 00:00:00 ~ 2024-05-31 23:59:59',
    status: 0,
    statusText: '无效'
  },
  {
    id: '3',
    productName: '商品C',
    salesPlanCode: 'SPC003',
    salesChannel: 'property',
    insuranceMethod: 'online',
    specialBusinessType: 'type1',
    validPeriod: '2022-01-01 00:00:00 ~ 2022-12-31 23:59:59',
    status: 0,
    statusText: '无效'
  }
];

// 加载数据
const loadData = async () => {
  // 检查是否有搜索条件
  const hasSearchParams = Object.values(searchForm).some(value => {
    if (value === undefined || value === null || value === '') return false;
    if (Array.isArray(value) && value.length === 0) return false;
    return true;
  });

  // 如果没有搜索条件且不是首次加载，则不发起请求
  if (!hasSearchParams && pagination.pageNum !== 1) {
    return;
  }

  loading.value = true;
  try {
    // 使用mock数据
    // 在实际项目中，这里会调用API
    // const params = {
    //   ...searchForm,
    //   ...pagination
    // };
    // // 处理时间范围
    // if (params.validPeriod && Array.isArray(params.validPeriod) && params.validPeriod.length === 2) {
    //   params.startTime = params.validPeriod[0].format('YYYY-MM-DD HH:mm:ss');
    //   params.endTime = params.validPeriod[1].format('YYYY-MM-DD HH:mm:ss');
    //   delete params.validPeriod;
    // }
    // const res = await getCampaignList(params);
    // tableData.value = res.list;
    // pagination.total = res.total;
    
    // Mock数据实现
    // 简单的过滤逻辑，实际项目中应该在服务端处理
    let filteredData = mockData;
    
    // 根据搜索条件过滤数据
    if (searchForm.productName) {
      filteredData = filteredData.filter(item => item.productName.includes(searchForm.productName!));
    }
    
    if (searchForm.salesPlanCode) {
      filteredData = filteredData.filter(item => item.salesPlanCode.includes(searchForm.salesPlanCode!));
    }
    
    if (searchForm.salesChannel) {
      filteredData = filteredData.filter(item => item.salesChannel === searchForm.salesChannel);
    }
    
    if (searchForm.insuranceMethod) {
      filteredData = filteredData.filter(item => item.insuranceMethod === searchForm.insuranceMethod);
    }
    
    if (searchForm.specialBusinessType) {
      filteredData = filteredData.filter(item => item.specialBusinessType === searchForm.specialBusinessType);
    }
    
    if (searchForm.status) {
      filteredData = filteredData.filter(item => item.status.toString() === searchForm.status);
    }
    
    if (searchForm.validPeriod && Array.isArray(searchForm.validPeriod) && searchForm.validPeriod.length === 2) {
      // 简单的时间范围过滤逻辑
      const [startTime, endTime] = searchForm.validPeriod;
      // 这里只是一个示例，实际的时间范围过滤应该更复杂
      // filteredData = filteredData.filter(item => {
      //   return moment(item.validPeriod.split(' ~ ')[0]).isSameOrAfter(startTime) && 
      //          moment(item.validPeriod.split(' ~ ')[1]).isSameOrBefore(endTime);
      // });
    }
    
    // 分页处理
    const startIndex = (pagination.pageNum - 1) * pagination.pageSize;
    const endIndex = startIndex + pagination.pageSize;
    tableData.value = filteredData.slice(startIndex, endIndex);
    pagination.total = filteredData.length;
    
    // 模拟API延迟
    await new Promise(resolve => setTimeout(resolve, 500));
  } catch (error) {
    message.error('获取投放记录列表失败');
    console.error('Failed to get campaign list:', error);
  } finally {
    loading.value = false;
  }
};

// 搜索
const handleSearch = () => {
  pagination.pageNum = 1;
  loadData();
};

// 重置搜索
const handleReset = () => {
  Object.keys(searchForm).forEach(key => {
    (searchForm as any)[key] = undefined;
  });
  pagination.pageNum = 1;
  loadData();
};

// 表格变化处理
const handleTableChange = (pag: any) => {
  pagination.pageNum = pag.current;
  pagination.pageSize = pag.pageSize;
  loadData();
};

// 查看详情
const handleDetail = (record: Campaign) => {
  // 通过路由query参数传递数据到详情页
  router.push({
    path: `/campaign-detail/${record.id}`,
    query: { data: encodeURIComponent(JSON.stringify(record)) }
  });
};

// 新增投放
const handleAdd = () => {
  router.push('/campaign-add');
};

// 初始加载数据
onMounted(() => {
  loadData();
});
</script>

<style scoped>
.campaign-management {
  padding: 24px;
  background: #f5f5f5;
  min-height: 100vh;
}

.page-header {
  margin-bottom: 24px;
}

.page-header .ant-breadcrumb {
  margin-bottom: 8px;
}

.page-title {
  margin: 0;
  font-size: 24px;
  font-weight: 500;
  color: #262626;
}

.search-form {
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

/* 添加表单项label样式 */
.search-form .ant-form-item-label {
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.search-form .ant-form-item {
  margin-bottom: 16px;
}

.action-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.table-info {
  display: flex;
  align-items: center;
  gap: 16px;
  color: #666;
  font-size: 14px;
}

.total-info {
  color: #999;
}

.table-container {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  overflow: hidden;
}

.table-container .ant-table {
  border-radius: 8px;
}

.table-container .ant-table-thead > tr > th {
  background: #fafafa;
  border-bottom: 1px solid #f0f0f0;
  font-weight: 600;
  color: #262626;
}

.table-container .ant-table-tbody > tr > td {
  border-bottom: 1px solid #f0f0f0;
}

.table-container .ant-table-tbody > tr:hover > td {
  background: #f5f5f5;
}

/* 查询按钮容器 */
.search-form .button-container {
  display: flex;
  align-items: flex-end;
  height: 100%;
  padding-bottom: 4px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .campaign-management {
    padding: 16px;
  }
  
  .search-form {
    padding: 16px;
  }
  
  .search-form .ant-form {
    flex-direction: column;
  }
  
  .search-form .ant-form-item {
    width: 100%;
  }
  
  .action-bar {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 16px;
  }
  
  .action-buttons {
    flex-wrap: wrap;
  }
  
  .table-container {
    overflow-x: auto;
  }
}

/* 自定义滚动条 */
.table-container ::-webkit-scrollbar {
  height: 6px;
}

.table-container ::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.table-container ::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.table-container ::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* 加载状态优化 */
.ant-spin-container {
  min-height: 200px;
}
</style>