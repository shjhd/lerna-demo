<template>
  <div class="campaign-detail">
    <!-- 页面标题 -->
    <div class="page-header">
      <a-breadcrumb>
        <a-breadcrumb-item>首页</a-breadcrumb-item>
        <a-breadcrumb-item>投放记录管理</a-breadcrumb-item>
        <a-breadcrumb-item>投放记录详情</a-breadcrumb-item>
      </a-breadcrumb>
      <h1 class="page-title">投放记录详情</h1>
    </div>
    
    <!-- 详情内容 -->
    <div class="detail-content">
      <a-spin :spinning="loading">
        <div v-if="campaignDetail">
          <!-- 第一块：商品信息 -->
          <div class="detail-section">
            <h2 class="section-title">商品信息</h2>
            <div class="detail-item">
              <span class="detail-label">销售商品名称：</span>
              <div class="detail-value">
                <a-select 
                  v-model:value="campaignDetail.productName" 
                  :disabled="true" 
                  class="detail-select" 
                  :options="productOptions"
                  style="width: 100%"
                />
              </div>
            </div>
            <div class="detail-item">
              <span class="detail-label">销售方案编码：</span>
              <div class="detail-value">
                <a-input v-model:value="campaignDetail.salesPlanCode" :disabled="true" class="detail-input" />
              </div>
            </div>
          </div>

          <!-- 分割线 -->
          <a-divider />

          <!-- 第二块：渠道信息 -->
          <div class="detail-section">
            <h2 class="section-title">渠道信息</h2>
            <div class="detail-item">
              <span class="detail-label">渠道归属：</span>
              <div class="detail-value">
                <a-select 
                  v-model:value="campaignDetail.salesChannel" 
                  style="width: 100%" 
                  :options="channelOptions" 
                  :disabled="true"
                  class="detail-select"
                />
              </div>
            </div>
            <div class="detail-item">
              <span class="detail-label">特殊业务类型：</span>
              <div class="detail-value">
                <a-select 
                  v-model:value="campaignDetail.specialBusinessType" 
                  :disabled="true" 
                  class="detail-select" 
                  :options="specialBusinessTypeOptions"
                  style="width: 100%"
                />
              </div>
            </div>
            <div class="detail-item">
              <span class="detail-label">销售人员代码：</span>
              <div class="detail-value">
                <a-input v-model:value="campaignDetail.salesPersonCode" :disabled="true" class="detail-input" />
              </div>
            </div>
            <div class="detail-item">
              <span class="detail-label">销售人员姓名：</span>
              <div class="detail-value">
                <a-input v-model:value="campaignDetail.salesPersonName" :disabled="true" class="detail-input" />
              </div>
            </div>
          </div>

          <!-- 分割线 -->
          <a-divider />

          <!-- 第三块：投放有效期 -->
          <div class="detail-section">
            <h2 class="section-title">投放有效期</h2>
            <div class="detail-item">
              <span class="detail-label">投放开始时间：</span>
              <div class="detail-value">
                <a-date-picker 
                  v-model:value="campaignDetail.startTime" 
                  show-time 
                  format="YYYY-MM-DD HH:mm:ss" 
                  value-format="YYYY-MM-DD HH:mm:ss" 
                  placeholder="请选择开始时间" 
                  :disabled="true"
                  style="width: 100%"
                  class="detail-date-picker"
                />
              </div>
            </div>
            <div class="detail-item">
              <span class="detail-label">投放结束时间：</span>
              <div class="detail-value">
                <a-date-picker 
                  v-model:value="campaignDetail.endTime" 
                  show-time 
                  format="YYYY-MM-DD HH:mm:ss" 
                  value-format="YYYY-MM-DD HH:mm:ss" 
                  placeholder="请选择结束时间" 
                  :disabled="true"
                  style="width: 100%"
                  class="detail-date-picker"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div class="action-bar">
          <a-button @click="goBack" size="large">返回</a-button>
        </div>
      </a-spin>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import { getCampaignList } from '../api';
import type { Campaign } from '../types';
import { productOptions, specialBusinessTypeOptions } from '../mockData';

// 路由
const route = useRoute();
const router = useRouter();

// 数据
const campaignDetail = ref<Campaign | null>(null);
const loading = ref(false);

// 渠道选项
const channelOptions = [
  { value: 'life', label: '寿险' },
  { value: 'bank', label: '银行' },
  { value: 'property', label: '产险' },
  { value: 'pension', label: '养老险' },
  { value: 'health', label: '健康险直销' },
];

// 获取详情数据
const loadData = async () => {
  const id = route.params.id as string;
  console.log('Route ID:', id);
  
  if (!id) {
    message.error('参数错误');
    return;
  }
  
  loading.value = true;
  try {
    // 首先尝试从路由query参数获取数据
    const queryData = route.query.data;
    console.log('Query data:', queryData);
    
    if (queryData) {
      const decodedData = JSON.parse(decodeURIComponent(queryData as string));
      console.log('Decoded data:', decodedData);
      
      if (decodedData && decodedData.id === id) {
        console.log('Using data from route query');
        campaignDetail.value = decodedData;
        loading.value = false;
        return;
      }
    }
    
    console.log('Fetching data from API');
    // 如果路由query中没有数据，则使用原来的API获取方式
    const res = await getCampaignList({ pageNum: 1, pageSize: 100 });
    console.log('API response:', res);
    const detail = res.list.find(item => item.id === id);
    console.log('Found detail:', detail);
    
    if (detail) {
      campaignDetail.value = detail;
    } else {
      message.error('未找到相关数据');
    }
  } catch (error) {
    message.error('获取详情失败');
    console.error('Failed to get campaign detail:', error);
  } finally {
    loading.value = false;
  }
};

// 返回列表页
const goBack = () => {
  router.go(-1);
};

// 组件挂载时加载数据
onMounted(() => {
  loadData();
});
</script>

<style scoped>
.campaign-detail {
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

.detail-content {
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.detail-section {
  margin-bottom: 24px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #262626;
  margin-bottom: 16px;
}

.detail-item {
  display: flex;
  margin-bottom: 16px;
  padding: 8px 0;
  align-items: center;
}

.detail-label {
  font-weight: 500;
  color: #595959;
  width: 200px;
  flex-shrink: 0;
  text-align: right;
  margin-right: 16px;
}

.detail-value {
  width: 40%;
}

/* 优化输入框样式 */
.detail-input {
  font-weight: 500;
  color: #262626;
}

/* 优化选择框样式 */
.detail-select {
  font-weight: 500;
  color: #262626;
}

/* 优化日期选择器样式 */
.detail-date-picker {
  font-weight: 500;
  color: #262626;
}

/* 操作栏样式 */
.action-bar {
  margin-top: 24px;
  text-align: center;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .campaign-detail {
    padding: 16px;
  }
  
  .detail-content {
    padding: 16px;
  }
  
  .detail-item {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .detail-label {
    width: 100%;
    margin-bottom: 8px;
    text-align: left;
  }
  
  .detail-value {
    width: 100%;
  }
}
</style>