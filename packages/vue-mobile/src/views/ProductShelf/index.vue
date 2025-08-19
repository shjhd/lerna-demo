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
        <van-tab v-for="(level1Tab, index) in level1Tabs" :key="index" :title="level1Tab.shelfFieldName"></van-tab>
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
      <div class="level3-tabs-container">
        <van-tabs
          v-model:active="activeLevel3Tab"
          class="level3-tabs"
          :border="false"
          :title-active-color="'#FF6026'"
          :title-inactive-color="'#333333'"
          :color="'#FF6026'"
          :scrollable="true"
          @change="handleLevel3TabChange"
        >
          <van-tab v-for="(level3Tab, index) in currentLevel3Tabs" :key="index" :title="level3Tab.shelfFieldName"></van-tab>
        </van-tabs>
      </div>
    </div>

    <!-- 产品列表 -->
    <van-list
      v-model:loading="loading"
      v-model:error="error"
      :finished="finished"
      finished-text="没有更多了"
      loading-text="加载中..."
      @load="onLoad"
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
                <!-- 修改价格显示结构 -->
                <div class="product-price">
                  <span class="price-number">{{ product.exhibitBaseAmt }}</span>
                  <span class="price-unit">{{ product.exhibitBaseAmtUnit }}</span>
                  <span class="price-reference">(参考价)</span>
                </div>
                <div class="product-actions">
                  <van-button
                    class="plan-btn"
                    size="mini"
                    type="default"
                    color="#ff6b00"
                    round
                  >
                    计划书
                  </van-button>
                  <van-button
                    class="deploy-btn"
                    size="mini"
                    type="default"
                    color="#ff6b00"
                    round
                  >
                    立即投放
                  </van-button>
                  <van-button
                    class="buy-btn"
                    size="mini"
                    type="primary"
                    color="#ff6b00"
                    round
                  >
                    立即投保
                  </van-button>
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
        <van-button class="consult-btn" type="primary" color="#ff6b00" size="small" round>
          免费咨询
        </van-button>
      </div>
    </van-cell>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { Tab, Tabs, List, Cell, Button, Tag, Icon } from 'vant';
import { productShelfMockData } from './mockData';

// 一级导航激活索引
const activeLevel1Tab = ref(0);
// 二级导航激活索引
const activeLevel2Tab = ref(0);
// 三级导航激活索引
const activeLevel3Tab = ref(0);
// 列表加载状态
const loading = ref(false);
const finished = ref(false);
const error = ref(false); // 错误状态
// 产品数据
const products = ref([]);
// 分页相关
const pageSize = ref(3); // 每页加载数量
const currentPage = ref(1); // 当前页码
const displayedProducts = ref([]); // 已显示的产品

// 获取一级tab数据
const level1Tabs = computed(() => {
  return productShelfMockData.data?.detail?.exhibitShelfFieldVoList || [];
});

// 获取当前二级tab数据
const currentLevel2Tabs = computed(() => {
  const currentLevel1Tab = level1Tabs.value[activeLevel1Tab.value];
  return currentLevel1Tab?.childrenFieldPo || [];
});

// 获取当前三级tab数据
const currentLevel3Tabs = computed(() => {
  const currentLevel2Tab = currentLevel2Tabs.value[activeLevel2Tab.value];
  return currentLevel2Tab?.childrenFieldPo || [];
});

// 获取当前选中的最底层tab的boothId
const currentBoothId = computed(() => {
  // 获取当前选中的各级tab
  const currentLevel1Tab = level1Tabs.value[activeLevel1Tab.value];
  const currentLevel2Tab = currentLevel2Tabs.value[activeLevel2Tab.value];
  const currentLevel3Tab = currentLevel3Tabs.value[activeLevel3Tab.value];

  // 优先取三级tab的boothId
  if (currentLevel3Tab?.boothId) {
    return currentLevel3Tab.boothId;
  }
  // 如果没有三级tab，取二级tab的boothId
  else if (currentLevel2Tab?.boothId) {
    return currentLevel2Tab.boothId;
  }
  // 如果只有一级tab，取一级tab的boothId
  else if (currentLevel1Tab?.boothId) {
    return currentLevel1Tab.boothId;
  }
  // 如果都没有，返回空字符串
  return '';
});

// 处理一级tab切换
function handleLevel1TabChange() {
  // 重置二级和三级tab到第一个
  activeLevel2Tab.value = 0;
  activeLevel3Tab.value = 0;
  // 重置分页
  resetPagination();
  // 加载对应产品数据
  loadProducts();
}

// 处理二级tab切换
function handleLevel2TabChange() {
  // 重置三级tab到第一个
  activeLevel3Tab.value = 0;
  // 重置分页
  resetPagination();
  // 加载对应产品数据
  loadProducts();
}

// 处理三级tab切换
function handleLevel3TabChange() {
  // 重置分页
  resetPagination();
  // 加载对应产品数据
  loadProducts();
}

// 重置分页
function resetPagination() {
  currentPage.value = 1;
  displayedProducts.value = [];
  finished.value = false;
}

// 加载产品数据
function loadProducts() {
  const boothId = currentBoothId.value;
  if (boothId) {
    products.value = productShelfMockData.data?.boothId2ExhibitsMap?.[boothId] || [];
  } else {
    products.value = [];
  }
  
  // 重置已显示的产品
  displayedProducts.value = [];
  currentPage.value = 1;
  finished.value = false;
  
  // 加载第一页数据
  loadMoreProducts();
}

// 下拉加载更多数据
function onLoad() {
  // 延迟加载，模拟网络请求
  setTimeout(() => {
    try {
      loadMoreProducts();
    } catch (err) {
      error.value = true;
    }
  }, 800);
}

// 加载更多产品
function loadMoreProducts() {
  // 如果已经加载完所有数据或没有boothId，直接返回
  if (finished.value || !currentBoothId.value) {
    loading.value = false;
    return;
  }
  
  const start = (currentPage.value - 1) * pageSize.value;
  const end = currentPage.value * pageSize.value;
  const newProducts = products.value.slice(start, end);
  
  // 添加新加载的产品到已显示列表
  displayedProducts.value = [...displayedProducts.value, ...newProducts];
  
  // 检查是否还有更多数据
  if (end >= products.value.length || newProducts.length === 0) {
    finished.value = true;
  } else {
    currentPage.value++;
  }
  
  // 重置加载状态
  loading.value = false;
}

// 初始加载产品数据
onMounted(() => {
  loadProducts();
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
}

/* 一级导航样式 - 使用深度选择器穿透scoped隔离 */
::v-deep(.level1-tabs) {
  background-color: transparent;
}

::v-deep(.level1-tabs .van-tab) {
  font-size: 14px;
  padding: 12px 0;
  color: #333333;
}

::v-deep(.level1-tabs .van-tab.van-tab--active) {
  font-weight: bold;
  color: #FF6026;
}

/* 短下划线样式 - 居中显示 */
::v-deep(.level1-tabs .van-tabs__line) {
  background-color: #FF6026;
  width: 16px; /* 缩短至16px */
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

/* 二级导航样式 - 椭圆形 */
::v-deep(.level2-tabs) {
  background-color: transparent;
  margin: 10px 15px;
}

::v-deep(.level2-tabs .van-tab) {
  font-size: 14px;
  padding: 6px 20px; /* 修改padding为20px */
  border-radius: 50px;
  margin: 0 5px;
  background-color: #ffffff; /* 未选中时背景改为白色 */
  border: none; /* 移除边框 */
  min-width: auto; /* 宽度自适应 */
  width: auto; /* 宽度自适应 */
}

::v-deep(.level2-tabs .van-tab.van-tab--active) {
  background-color: #FF6026;
  color: #ffffff;
  font-weight: normal;
  border: none; /* 选中时也移除边框 */
}

/* 为.van-tabs__nav添加背景色透明 */
::v-deep(.level2-tabs .van-tabs__nav) {
  background-color: transparent;
}

/* 移除底部边框 */
::v-deep(.level2-tabs .van-tabs__wrap) {
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
    text-align: left; /* 右边文案居左显示 */
  }
}

/* 文字区域 - 所有文本单行显示并省略 */
.product-name {
  font-size: 16px;
  font-weight: bold;
  margin: 0; /* 去除间距 */
  color: #333333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.product-desc {
  font-size: 11px; /* 副标题字体大小改为11px */
  color: #999999;
  margin: 0; /* 去除间距 */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.product-tags {
  margin: 5px 0; /* 调整间距 */
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
  color: #FF6026; /* 标签字体颜色改为#FF6026 */
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
  font-size: 18px; /* 250字体大小改为18px */
}

.price-unit {
  font-size: 13px; /* 元字体大小改为13px */
  margin-left: 2px;
}

.price-reference {
  font-size: 11px; /* 参考价字体大小改为11px */
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
buy-btn {
  font-size: 11px; /* 按钮字体大小改为11px */
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