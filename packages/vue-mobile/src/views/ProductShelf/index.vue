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
      >
        <van-tab title="保障"></van-tab>
        <van-tab title="储蓄"></van-tab>
        <van-tab title="养老"></van-tab>
        <van-tab title="全部"></van-tab>
      </van-tabs>

      <!-- 二级导航 -->
      <van-tabs
        v-model:active="activeLevel2Tab"
        class="level2-tabs"
        :border="false"
        type="segment"
      >
        <van-tab title="热销"></van-tab>
        <van-tab title="新品"></van-tab>
        <van-tab title="津贴"></van-tab>
        <van-tab title="津贴"></van-tab>
        <van-tab title="津贴"></van-tab>
        <van-tab title="津贴"></van-tab>
      </van-tabs>
    </div>

    <!-- 产品列表 -->
    <van-list
      class="product-list"
      :finished="finished"
      :loading="loading"
      @load="onLoad"
    >
      <van-cell
        v-for="(product, index) in products"
        :key="index"
        class="product-item"
        :border="false"
      >
        <template #default>
          <div class="product-content">
            <div class="product-image">
              <img :src="product.image" :alt="product.name" class="product-img">
            </div>
            <div class="product-info">
              <h3 class="product-name">{{ product.name }}</h3>
              <p class="product-desc">{{ product.description }}</p>
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
                  <span class="price-number">250</span>
                  <span class="price-unit">元</span>
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
                    type="primary"
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
  margin: 0; /* 去除间距 */
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
.buy-btn {
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
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.consult-btn {
  font-size: 12px;
  padding: 6px 15px;
  flex-shrink: 0;
  margin-left: 10px;
}
</style>

<script setup lang="ts">
import { ref } from 'vue';
import { Tab, Tabs, List, Cell, Button, Tag, Icon } from 'vant';

// 一级导航激活索引
const activeLevel1Tab = ref(0);
// 二级导航激活索引
const activeLevel2Tab = ref(0);
// 列表加载状态
const loading = ref(false);
const finished = ref(false);

// 产品数据
const products = ref([
  {
    name: 'e生保·百万医疗2024升级',
    description: '小口直选，医疗险领域的"第一大品"',
    image: '/src/assets/images/sample.jpeg',
    tags: ['标签', '标签'],
    price: '250元 (参考价)'
  },
  {
    name: '安欣保·20年保证续保',
    description: '保证续保20年，长期防风风向标',
    image: '/src/assets/images/sample.jpeg',
    tags: ['标签', '标签'],
    price: '250元 (参考价)'
  },
  {
    name: 'e生保·慢病医疗2024升级',
    description: '特定亚健康/慢病人群可投的百万医疗险',
    image: '/src/assets/images/sample.jpeg',
    tags: ['标签', '标签'],
    price: '250元 (参考价)'
  },
  {
    name: 'e生保·抗癌医疗险',
    description: '癌症高龄也可保，含105种抗癌特药',
    image: '/src/assets/images/sample.jpeg',
    tags: ['标签', '标签'],
    price: '250元 (参考价)'
  }
]);

// 模拟加载更多数据
const onLoad = () => {
  // 异步更新数据
  setTimeout(() => {
    // 加载完成
    loading.value = false;
    finished.value = true;
  }, 1000);
};
</script>