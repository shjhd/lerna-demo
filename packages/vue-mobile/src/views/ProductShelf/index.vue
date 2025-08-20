<template>
  <div class="product-shelf">
    <!-- 一级导航 -->
    <div class="tabs-container">
      <van-tabs
        v-model:active="activeLevel1Tab"
        class="level1-tabs"
        :border="false"
        :line-width="16"
        :title-active-color="'#FF6026'"
        :title-inactive-color="'#333333'"
        :color="'#FF6026'"
        @change="handleLevel1TabChange"
      >
        <van-tab v-for="(channel, index) in salesChannels" :key="index" :title="channel.salesChannelName"></van-tab>
      </van-tabs>

      <!-- 二级导航 -->
      <van-tabs
        v-model:active="activeLevel2Tab"
        class="level2-tabs"
        :border="false"
        type="segment"
        @change="handleLevel2TabChange"
      >
        <van-tab v-for="(level2Tab, index) in currentLevel2Tabs" :key="index" :title="level2Tab.shelfFieldName"></van-tab>
      </van-tabs>

      <!-- 三级导航 -->
      <van-tabs
        v-model:active="activeLevel3Tab"
        class="level3-tabs"
        :border="false"
        type="segment"
        @change="handleLevel3TabChange"
      >
        <van-tab v-for="(level3Tab, index) in currentLevel3Tabs" :key="index" :title="level3Tab.shelfFieldName"></van-tab>
      </van-tabs>
    </div>

    <!-- 产品列表 -->
    <van-list
      v-model:loading="loading"
      v-model:error="error"
      :finished="finished"
      finished-text="没有更多了"
      loading-text="加载中..."
      @load="loadMoreProducts"
      :immediate-check="true"
      class="product-list"
    >
      <van-cell
        v-for="(product, index) in displayedProducts"
        :key="index"
        class="product-item"
        :border="false"
      >
        <template #default>
          <div class="product-content">
            <div class="product-image">
              <img :src="product.smallPictureUrl" :alt="product.exhibitName" class="product-img">
            </div>
            <div class="product-info">
              <h3 class="product-name">{{ product.exhibitName }}</h3>
              <p class="product-desc">{{ product.exhibitMarking }}</p>
              <div class="product-tags">
                <van-tag
                  v-for="(tag, tagIndex) in product.tags"
                  :key="tagIndex"
                  class="product-tag"
                  round
                >
                  {{ tag }}
                </van-tag>
              </div>
              <div class="price-actions">
                <div class="product-price">
                  <span class="price-number">{{ product.exhibitBaseAmt }}</span>
                  <span class="price-unit">{{ product.exhibitBaseAmtUnit }}</span>
                  <span class="price-reference">(参考价)</span>
                </div>
                <div class="product-actions">
                  <van-button class="plan-btn" size="mini" type="default" color="#ff6b00" round>计划书</van-button>
                  <van-button class="deploy-btn" size="mini" type="default" color="#ff6b00" round>立即投放</van-button>
                  <van-button class="buy-btn" size="mini" type="primary" color="#ff6b00" round>立即投保</van-button>
                </div>
              </div>
            </div>
          </div>
        </template>
      </van-cell>
    </van-list>

    <!-- 保险顾问 -->
    <van-cell class="insurance-advisor" :border="false">
      <div class="advisor-content">
        <div class="advisor-info">
          <div class="advisor-avatar">
            <img src="/src/assets/images/sample.jpeg" alt="保险顾问" class="avatar-img">
          </div>
          <div class="advisor-details">
            <p class="advisor-name">平安资深保险顾问</p>
            <p class="advisor-desc">真人1V1为您解答疑惑</p>
          </div>
        </div>
        <van-button class="consult-btn" type="primary" color="#ff6b00" size="small" round>免费咨询</van-button>
      </div>
    </van-cell>
  </div>
</template>

<script setup lang="ts">
// 导入优化 - 只导入需要的组件
import { ref, computed, onMounted, watch, nextTick } from 'vue';
import { Tabs, Tab, List, Cell, Button, Tag } from 'vant';
import httpClient from '/Users/miyokog/Documents/workspace/lerna-demo/packages/vue-mobile/src/utils/http-client';
import { productShelfMockData } from './mockData';

// 常量定义
const DEFAULT_PAGE_SIZE = 3;
const DEFAULT_SALES_CHANNEL = 'D';

// 类型定义
interface Product {
  smallPictureUrl: string;
  exhibitName: string;
  exhibitMarking: string;
  tags: string[];
  exhibitBaseAmt: string | number;
  exhibitBaseAmtUnit: string;
}

interface SalesChannel {
  salesChannel: string;
  salesChannelName: string;
}

interface Level3Tab {
  shelfFieldName: string;
  boothId: string;
}

interface Level2Tab {
  shelfFieldName: string;
  childrenFieldPo: Level3Tab[];
}

interface ShelfDataDetail {
  exhibitShelfFieldVoList: Level2Tab[];
  boothId2ExhibitsMap: Record<string, Product[]>;
}

interface ShelfData {
  salesChannels: SalesChannel[];
  salesChannel: string;
  detail: ShelfDataDetail;
}

// 响应式状态定义
const activeLevel1Tab = ref<number>(0);
const activeLevel2Tab = ref<number>(0);
const activeLevel3Tab = ref<number>(-1); // 初始化为-1表示未选中
const products = ref<Product[]>([]);
const shelfData = ref<ShelfData>({} as ShelfData);
const salesChannels = ref<SalesChannel[]>([]);
const isLoading = ref<boolean>(false);
const error = ref<boolean>(false);
const loading = ref(false);
const finished = ref(false);
const pageSize = ref(DEFAULT_PAGE_SIZE);
const currentPage = ref(1);
const displayedProducts = ref<Product[]>([]);

// 计算属性
const currentLevel2Tabs = computed(() => {
  return shelfData.value?.detail?.exhibitShelfFieldVoList || [];
});

const currentLevel3Tabs = computed(() => {
  const level2Tabs = currentLevel2Tabs.value;
  if (activeLevel2Tab.value >= 0 && activeLevel2Tab.value < level2Tabs.length) {
    return level2Tabs[activeLevel2Tab.value]?.childrenFieldPo || [];
  }
  return [];
});

const currentBoothId = computed(() => {
  const level3Tabs = currentLevel3Tabs.value;
  if (activeLevel3Tab.value >= 0 && activeLevel3Tab.value < level3Tabs.length) {
    return level3Tabs[activeLevel3Tab.value]?.boothId || '';
  }
  return '';
});

const currentSalesChannel = computed(() => {
  if (activeLevel1Tab.value >= 0 && activeLevel1Tab.value < salesChannels.value.length) {
    return salesChannels.value[activeLevel1Tab.value]?.salesChannel || '';
  }
  return '';
});

// 数据获取函数
const fetchShelfData = async (salesChannel: string, shouldUpdateActiveTab = true) => {
  isLoading.value = true;
  error.value = false;

  try {
    // 模拟接口请求
    await new Promise(resolve => setTimeout(resolve, 1000));
    shelfData.value = productShelfMockData.data || {} as ShelfData;
    salesChannels.value = shelfData.value?.salesChannels || [];

    // 更新选中的tab
    if (shouldUpdateActiveTab) {
      updateActiveLevel1Tab(salesChannel);
    }

    isLoading.value = false;
    updateSubTabs();
    nextTick(loadProducts);
  } catch (err) {
    console.error('Failed to fetch shelf data:', err);
    error.value = true;
    isLoading.value = false;

    // 出错时使用默认数据
    shelfData.value = productShelfMockData.data || {} as ShelfData;
    salesChannels.value = shelfData.value?.salesChannels || [];
    updateActiveLevel1Tab(DEFAULT_SALES_CHANNEL);
    updateSubTabs();
    nextTick(loadProducts);
  }
};

// Tab更新函数
const updateActiveLevel1Tab = (salesChannel: string) => {
  if (salesChannels.value.length === 0) {
    activeLevel1Tab.value = 0;
    return;
  }

  const channelIndex = salesChannels.value.findIndex(
    channel => channel.salesChannel === salesChannel
  );

  activeLevel1Tab.value = channelIndex !== -1 ? channelIndex : 0;
};

const updateSubTabs = () => {
  if (shelfData.value?.detail?.exhibitShelfFieldVoList?.length > 0) {
    activeLevel2Tab.value = 0;

    const currentLevel2Tab = shelfData.value.detail.exhibitShelfFieldVoList[activeLevel2Tab.value];
    activeLevel3Tab.value = currentLevel2Tab?.childrenFieldPo?.length > 0 ? 0 : -1;
  } else {
    activeLevel2Tab.value = 0;
    activeLevel3Tab.value = -1;
  }
};

// Tab切换处理
const handleLevel1TabChange = () => {
  updateSubTabs();
  resetPagination();
  fetchShelfData(currentSalesChannel.value);
};

const handleLevel2TabChange = () => {
  const level2Tabs = currentLevel2Tabs.value;
  if (activeLevel2Tab.value >= 0 && activeLevel2Tab.value < level2Tabs.length) {
    const currentLevel2Tab = level2Tabs[activeLevel2Tab.value];
    activeLevel3Tab.value = currentLevel2Tab?.childrenFieldPo?.length > 0 ? 0 : -1;
  } else {
    activeLevel3Tab.value = -1;
  }

  resetPagination();
  loadProducts();
};

const handleLevel3TabChange = () => {
  resetPagination();
  loadProducts();
};

// 分页和产品加载
const resetPagination = () => {
  currentPage.value = 1;
  displayedProducts.value = [];
  finished.value = false;
};

const loadProducts = () => {
  const boothId = currentBoothId.value;
  products.value = boothId
    ? (shelfData.value?.detail?.boothId2ExhibitsMap?.[boothId] || [])
    : [];

  resetPagination();
  loadMoreProducts();
};

const loadMoreProducts = () => {
  if (finished.value || loading.value || !currentBoothId.value) {
    loading.value = false;
    return;
  }

  loading.value = true;

  const start = (currentPage.value - 1) * pageSize.value;
  const end = currentPage.value * pageSize.value;
  const newProducts = products.value.slice(start, end);

  displayedProducts.value.push(...newProducts);

  if (end >= products.value.length || newProducts.length === 0) {
    finished.value = true;
  } else {
    currentPage.value++;
  }

  loading.value = false;
};

// 组件生命周期
onMounted(() => {
  fetchShelfData(DEFAULT_SALES_CHANNEL, true);
});

// 监听销售渠道变化
watch(salesChannels, () => {
  if (salesChannels.value.length > 0 && activeLevel1Tab.value >= salesChannels.value.length) {
    activeLevel1Tab.value = 0;
  }
});
</script>

<style scoped>
/* 添加页面容器样式 */
.product-shelf {
  width: 100%;
  overflow-x: hidden;
}

/* 导航区域容器 - 渐变背景 */
.tabs-container {
  background: linear-gradient(to bottom, #FFE6CC, #ffffff);
  padding-top: 10px;
  padding-bottom: 10px;
}

/* 一级导航样式 - 使用深度选择器穿透scoped隔离 */
::v-deep(.level1-tabs) {
  background-color: transparent;
}

::v-deep(.level1-tabs .van-tab) {
  font-size: 15px;
  padding: 10px 0;
  color: #333333;
  font-weight: 500;
}

::v-deep(.level1-tabs .van-tab.van-tab--active) {
  font-weight: bold;
  color: #FF6026;
}

/* 短下划线样式 - 居中显示 */
::v-deep(.level1-tabs .van-tabs__line) {
  background-color: #FF6026;
  width: 16px;
  left: auto;
  right: auto;
  transform: translateX(-50%);
  margin-left: 0;
}

/* 移除所有分割线 */
::v-deep(.level1-tabs .van-hairline--top-bottom) {
  border: none;
}

/* 为.van-tabs__nav添加背景色透明 */
::v-deep(.level1-tabs .van-tabs__nav) {
  background-color: transparent;
}

/* 二级导航样式 - 椭圆形，与图片匹配的红色背景 */
::v-deep(.level2-tabs) {
  background-color: transparent;
  margin: 8px 15px 5px;
}

::v-deep(.level2-tabs .van-tab) {
  font-size: 14px;
  padding: 6px 25px;
  border-radius: 50px;
  margin: 0 5px;
  background-color: #ffffff;
  border: none;
  min-width: auto;
  width: auto;
  color: #333333;
  font-weight: 500;
}

::v-deep(.level2-tabs .van-tab.van-tab--active) {
  background-color: #FF6026;
  color: #ffffff;
  font-weight: bold;
  border: none;
}

/* 为.van-tabs__nav添加背景色透明 */
::v-deep(.level2-tabs .van-tabs__nav) {
  background-color: transparent;
}

/* 移除底部边框 */
::v-deep(.level2-tabs .van-tabs__wrap) {
  border: none;
}

/* 三级导航样式 - 与图片匹配的样式 */
::v-deep(.level3-tabs) {
  background-color: transparent;
  margin: 5px 15px 8px;
}

/* 三级导航样式 - 增强优先级并调整样式 */
::v-deep(.level3-tabs .van-tab) {
  font-size: 13px !important;
  padding: 4px 15px !important;
  border-radius: 50px !important;
  margin: 0 3px !important;
  background-color: #ffffff !important;
  border: 1px solid #FFE6CC !important;
  min-width: auto !important;
  width: auto !important;
  color: #333333 !important;
}

::v-deep(.level3-tabs .van-tab.van-tab--active) {
  background-color: #ffffff !important;
  color: #FF6026 !important;
  font-weight: 500 !important;
  border: 1px solid #FF6026 !important;
}

/* 为.van-tabs__nav添加背景色透明 */
::v-deep(.level3-tabs .van-tabs__nav) {
  background-color: transparent;
}

/* 移除底部边框 */
::v-deep(.level3-tabs .van-tabs__wrap) {
  border: none;
}

/* 产品列表样式 - 非卡片式 */
.product-list {
  background-color: #ffffff;
  padding: 0 15px;
  margin: 0;
}

.product-item {
  padding: 15px 0;
  border-bottom: 1px solid #f0f0f0;
  background-color: #ffffff;
  &:last-child {
    border-bottom: none;
  }
  .product-content {
    display: flex;
  }
  .product-image {
    width: 80px;
    height: 80px;
    margin-right: 12px;
    flex-shrink: 0;
    .product-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 8px;
    }
  }
  .product-info {
    flex: 1;
    overflow: hidden;
    text-align: left;
  }
}

/* 文字区域 - 所有文本单行显示并省略 */
.product-name {
  font-size: 16px;
  font-weight: bold;
  margin: 0;
  color: #333333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.product-desc {
  font-size: 11px;
  color: #999999;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.product-tags {
  margin: 5px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  .product-tag {
    margin-right: 5px;
  }
}

/* 标签背景色设置为#FF6026透明度0.08 */
::v-deep(.product-tag) {
  background-color: rgba(255, 96, 38, 0.08);
  border: none;
  color: #FF6026;
}

/* 价格和按钮栏左右展示 */
.price-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
}

/* 价格显示样式 */
.product-price {
  font-weight: bold;
  color: #ff6b00;
  display: flex;
  align-items: baseline;
}

.price-number {
  font-size: 18px;
}

.price-unit {
  font-size: 13px;
  margin-left: 2px;
}

.price-reference {
  font-size: 11px;
  margin-left: 4px;
  color: #999999;
  font-weight: normal;
}

.product-actions {
  display: flex;
  gap: 6px;
}

.plan-btn,
.deploy-btn,
.buy-btn {
  font-size: 11px;
  padding: 2px;
}

/* 保险顾问样式 */
.insurance-advisor {
  margin: 15px;
  background-color: #fff8f0;
  border-radius: 10px;
  padding: 15px;
  box-sizing: border-box;
}

.advisor-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.advisor-info {
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
}

.advisor-avatar {
  width: 50px;
  height: 50px;
  margin-right: 10px;
  flex-shrink: 0;
}

.advisor-avatar .avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.advisor-details {
  min-width: 0;
}

.advisor-name {
  font-size: 14px;
  font-weight: bold;
  margin: 0 0 3px 0;
  color: #333333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.advisor-desc {
  font-size: 12px;
  color: #999999;
}

/* 调整按钮样式 */
.consult-btn {
  min-width: 80px;
}
</style>