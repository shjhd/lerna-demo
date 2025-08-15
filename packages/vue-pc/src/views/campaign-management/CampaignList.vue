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
            <a-form-item label="商品名称" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
              <a-auto-complete
                v-model:value="searchForm.productName"
                :options="productNameOptions"
                placeholder="请输入商品名称"
                allow-clear
                style="width: 100%"
                @pressEnter="handleSearch"
                @search="onProductNameSearch"
              />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="销售方案编码" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
              <a-auto-complete
                v-model:value="searchForm.salesPlanCode"
                :options="salesPlanCodeOptions"
                placeholder="请输入销售方案编码"
                allow-clear
                style="width: 100%"
                @pressEnter="handleSearch"
                @search="onSalesPlanCodeSearch"
              />
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
            <a-form-item label="有效期" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
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
                <a-select-option :value="1">有效</a-select-option>
                <a-select-option :value="0">无效</a-select-option>
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
    
    <!-- 操作栏 - 已删除所有按钮 -->
    <div class="action-bar">
      <div class="action-buttons">
        <!-- 已移除所有操作按钮 -->
      </div>
    </div>
    
    <!-- 表格和分页容器 -->
    <div class="table-container">
      <!-- 表格 -->
      <a-table 
        :columns="columns" 
        :data-source="tableData" 
        :loading="loading" 
        :pagination="false"
        @change="handleTableChange"
        row-key="id"
        :scroll="{ x: 'max-content' }"
        class="bordered-table">
        <template #status="{ text }">
          <span class="status-dot" :class="{ 'status-active': text === 1, 'status-inactive': text === 0 }"></span>
          <span>{{ text === 1 ? '有效' : '无效' }}</span>
        </template>
        <template #action="{ record }">
          <!-- 只保留详情按钮 -->
          <a-button type="link" size="small" @click="handleDetail(record)">详情</a-button>
        </template>
      </a-table>
      
      <!-- 分页组件 -->
      <div class="pagination-bar">
        <div class="pagination-info">
          共 {{ pagination.total }} 条记录 第 {{ pagination.pageNum }}/{{ Math.ceil(pagination.total / pagination.pageSize) }} 页
        </div>
        <div class="pagination-controls">
          <a-pagination
            v-model:current="pagination.pageNum"
            v-model:page-size="pagination.pageSize"
            :total="pagination.total"
            show-size-changer
            show-quick-jumper
            :show-total="() => ''"
            @change="handlePageChange"
            @show-size-change="handlePageSizeChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import type {
  Campaign,
  CampaignSearchForm,
  PaginationParams
} from './types';
import { useRouter } from 'vue-router';
import mockData, { productNames, salesPlanCodes } from './mockData'; // 更新导入语句

// 路由
const router = useRouter();

// 搜索表单
const searchForm = reactive<CampaignSearchForm>({
  status: undefined // 确保初始化为undefined而不是空字符串
});

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
    width: 120,
    tooltip: (text: string) => text
  },
  {
    title: '销售方案编码',
    dataIndex: 'salesPlanCode',
    key: 'salesPlanCode',
    ellipsis: true,
    width: 120,
    tooltip: (text: string) => text
  },
  {
    title: '销售渠道',
    dataIndex: 'salesChannel',
    key: 'salesChannel',
    ellipsis: true,
    width: 100,
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
    title: '投放有效期',
    dataIndex: 'validPeriod',
    key: 'validPeriod',
    ellipsis: true,
    width: 160,
    tooltip: (text: string) => text
  },
  // 表格列定义中的状态列应该这样定义：
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    slots: { customRender: 'status' },
    width: 80
  },
  {
    title: '创建人',
    dataIndex: 'creator',
    key: 'creator',
    ellipsis: true,
    width: 100,
    tooltip: (text: string) => text
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    ellipsis: true,
    width: 150,
    tooltip: (text: string) => text
  },
  {
    title: '编辑人',
    dataIndex: 'editor',
    key: 'editor',
    ellipsis: true,
    width: 100,
    tooltip: (text: string) => text
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
    ellipsis: true,
    width: 150,
    tooltip: (text: string) => text
  },
  {
    title: '操作',
    key: 'action',
    slots: { customRender: 'action' },
    width: 80
  },
];

// 加载数据
const loadData = async () => {
  loading.value = true;
  try {
    // Mock数据实现
    let filteredData = mockData; // 使用导入的mock数据
    
    // 根据搜索条件过滤数据
    if (searchForm.productName) {
      // 使用模糊搜索过滤商品名称
      filteredData = filteredData.filter(item => 
        item.productName.toLowerCase().includes(searchForm.productName!.toLowerCase())
      );
    }
    
    if (searchForm.salesPlanCode) {
      // 使用模糊搜索过滤销售方案编码
      filteredData = filteredData.filter(item => 
        item.salesPlanCode.toLowerCase().includes(searchForm.salesPlanCode!.toLowerCase())
      );
    }
    
    if (searchForm.salesChannel) {
      filteredData = filteredData.filter(item => item.salesChannel === searchForm.salesChannel);
    }
    
    // 移除对投保方式和特殊业务类型的过滤
    
    // 在loadData函数中的状态过滤逻辑部分进行如下修改：
    // 修复状态过滤逻辑：只有当状态筛选条件存在时才进行过滤
    if (searchForm.status !== undefined && searchForm.status !== null) {
      // 确保状态值是数字类型进行比较
      const statusValue = typeof searchForm.status === 'string' ? parseInt(searchForm.status, 10) : searchForm.status;
      filteredData = filteredData.filter(item => item.status === statusValue);
    }
    
    if (searchForm.validPeriod && Array.isArray(searchForm.validPeriod) && searchForm.validPeriod.length === 2) {
      // 简单的时间范围过滤逻辑
      const [startTime, endTime] = searchForm.validPeriod;
      // 实际项目中应该使用moment或dayjs进行日期比较
      // filteredData = filteredData.filter(item => {
      //   const [itemStart, itemEnd] = item.validPeriod.split(' ~ ');
      //   return itemStart >= startTime && itemEnd <= endTime;
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

// 分页变化处理
const handlePageChange = (page: number) => {
  pagination.pageNum = page;
  loadData();
};

// 每页条数变化处理
const handlePageSizeChange = (current: number, size: number) => {
  pagination.pageNum = 1; // 重置到第一页
  pagination.pageSize = size;
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

// 初始加载数据
onMounted(() => {
  loadData();
});

// 自动补全选项
const productNameOptions = ref<{ value: string }[]>([]);
const salesPlanCodeOptions = ref<{ value: string }[]>([]);

// 商品名称搜索处理
const onProductNameSearch = (searchText: string) => {
  if (!searchText) {
    productNameOptions.value = [];
    return;
  }
  
  // 根据输入文本过滤商品名称
  const filteredOptions = productNames
    .filter(name => name.toLowerCase().includes(searchText.toLowerCase()))
    .map(name => ({ value: name }));
    
  productNameOptions.value = filteredOptions;
};

// 销售方案编码搜索处理
const onSalesPlanCodeSearch = (searchText: string) => {
  if (!searchText) {
    salesPlanCodeOptions.value = [];
    return;
  }
  
  // 根据输入文本过滤销售方案编码
  const filteredOptions = salesPlanCodes
    .filter(code => code.toLowerCase().includes(searchText.toLowerCase()))
    .map(code => ({ value: code }));
    
  salesPlanCodeOptions.value = filteredOptions;
};
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
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 16px;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

/* 表格容器 */
.table-container {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  overflow: hidden;
}

/* 有边框表格 */
.bordered-table {
  border: 1px solid #f0f0f0;
  border-radius: 8px 8px 0 0;
}

.bordered-table .ant-table-content {
  border-radius: 8px 8px 0 0;
}

.bordered-table .ant-table-thead > tr > th {
  background: #fafafa;
  border-bottom: 1px solid #f0f0f0;
  font-weight: 600;
  color: #262626;
  border-right: 1px solid #f0f0f0;
}

.bordered-table .ant-table-thead > tr > th:last-child {
  border-right: none;
}

.bordered-table .ant-table-tbody > tr > td {
  border-bottom: 1px solid #f0f0f0;
  border-right: 1px solid #f0f0f0;
}

.bordered-table .ant-table-tbody > tr > td:last-child {
  border-right: none;
}

.bordered-table .ant-table-tbody > tr:last-child > td {
  border-bottom: none;
}

.bordered-table .ant-table-tbody > tr:hover > td {
  background: #f5f5f5;
}

/* 分页栏 */
.pagination-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  border-top: 1px solid #f0f0f0;
  background: #fff;
}

.pagination-info {
  font-size: 14px;
  color: #666;
}

.pagination-controls {
  display: flex;
  align-items: center;
}

.pagination-controls :deep(.ant-pagination) {
  margin: 0;
}

.pagination-controls :deep(.ant-pagination-prev),
.pagination-controls :deep(.ant-pagination-next),
.pagination-controls :deep(.ant-pagination-item) {
  min-width: 36px;
  height: 36px;
  line-height: 36px;
  border-radius: 4px;
  margin-right: 6px;
  border: 1px solid #d9d9d9;
}

.pagination-controls :deep(.ant-pagination-prev:hover),
.pagination-controls :deep(.ant-pagination-next:hover),
.pagination-controls :deep(.ant-pagination-item:hover) {
  border-color: #1890ff;
}

.pagination-controls :deep(.ant-pagination-item-active) {
  background: #1890ff;
  border-color: #1890ff;
}

.pagination-controls :deep(.ant-pagination-item-active a) {
  color: #fff;
}

.pagination-controls :deep(.ant-pagination-options) {
  margin-left: 16px;
}
.status-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 8px;
}

.status-active {
  background-color: #52c41a; /* 绿色 */
}

.status-inactive {
  background-color: #ff4d4f; /* 红色 */
}
</style>
