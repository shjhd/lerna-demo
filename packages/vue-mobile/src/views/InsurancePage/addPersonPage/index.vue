<template>
  <div class="add-person-page">
    <van-nav-bar title="添加被保人" left-arrow @click="onBack" />
    
    <!-- 完全重构Tab区域 -->
    <div class="tab-container">
      <div class="tab-item">被保人</div>
      <div class="tab-item">张平安</div>
      <div class="tab-item active">张一生</div>
    </div>
    
    <!-- 原有表单内容保持不变 -->
    <div class="form-content">
      <van-field
        label="被保人姓名"
        v-model="insuredName"
        placeholder="请输入姓名"
        class="form-field"
      />

      <van-field
        label="和我的关系"
        v-model="relationship"
        placeholder="请选择"
        readonly
        @click="showRelationshipPopup"
        class="form-field"
      />

      <van-field
        label="证件类型"
        v-model="idType"
        placeholder="请选择"
        readonly
        @click="showIdTypePopup"
        class="form-field"
      />

      <van-field
        label="证件号码"
        v-model="idNumber"
        placeholder="请输入证件号码"
        class="form-field"
      />

      <div class="form-section">
        <span class="section-label">性别</span>
        <van-radio-group v-model="gender" class="radio-group">
          <van-radio name="male" class="radio-option">男</van-radio>
          <van-radio name="female" class="radio-option">女</van-radio>
        </van-radio-group>
      </div>

      <div class="form-section">
        <span class="section-label">有无社保</span>
        <van-radio-group v-model="hasSocialSecurity" class="radio-group">
          <van-radio name="yes" class="radio-option">有社保</van-radio>
          <van-radio name="no" class="radio-option">无社保</van-radio>
        </van-radio-group>
      </div>

      <van-field
        label="常住省市"
        v-model="residenceProvince"
        placeholder="请选择"
        readonly
        @click="showProvincePopup"
        class="form-field"
      />

      <van-field
        label="常住区/县"
        v-model="residenceCity"
        placeholder="请选择"
        readonly
        @click="showCityPopup"
        class="form-field"
      />

      <van-field
        label="详细地址"
        v-model="address"
        placeholder="请输入详细地址"
        class="form-field"
      />

      <div class="form-section">
        <span class="section-label">基础产品</span>
        <van-radio-group v-model="selectedPlan" class="plan-radio-group">
          <van-radio name="plan1" class="plan-option">计划1</van-radio>
          <van-radio name="plan2" class="plan-option">计划2</van-radio>
          <van-radio name="plan3" class="plan-option">计划3</van-radio>
        </van-radio-group>
      </div>
    </div>
    
    <!-- 按钮区域 -->
    <div class="button-group">
      <van-button
        class="add-additional-btn"
        type="default"
        plain
      >
        添加附加被保人
      </van-button>

      <van-button
        class="save-btn"
        type="default"
      >
        保存提交
      </van-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { showToast } from 'vant';

const router = useRouter();

// 响应式数据
const activeTab = ref(0);
const insuredName = ref('');
const relationship = ref('父母');
const idType = ref('护照');
const idNumber = ref('');
const gender = ref('male');
const hasSocialSecurity = ref('yes');
const residenceProvince = ref('上海市');
const residenceCity = ref('徐汇区');
const address = ref('');
const selectedPlan = ref('plan2');

// 方法
const handleBack = () => {
  router.go(-1);
};

const showRelationshipPopup = () => {
  showToast('选择关系');
};

const showIdTypePopup = () => {
  showToast('选择证件类型');
};

const showProvincePopup = () => {
  showToast('选择省市');
};

const showCityPopup = () => {
  showToast('选择区/县');
};
</script>

<style scoped>
.add-person-page {
  background-color: #F5F5F5;
  min-height: 100vh;
}

/* 导航栏样式 */
.nav-bar {
  background-color: white;
  color: #333333;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

/* 标签页样式 */
.person-tabs {
  background-color: white;
  margin-top: 10px;
}

.van-tab--active {
  color: #FF5722;
}

.van-tabs__line {
  background-color: #FF5722;
  width: 30px !important;
}

/* 表单样式 */
.tab-content {
  padding: 15px;
}

.form-field {
  background-color: white;
  margin-bottom: 1px;
  --field-label-color: #333333;
  --field-input-color: #333333;
  --field-placeholder-color: #999999;
}

.form-section {
  background-color: white;
  padding: 15px;
  margin-bottom: 1px;
}

.section-label {
  color: #333333;
  font-size: 14px;
  margin-bottom: 10px;
  display: block;
}

/* 单选框样式 */
.radio-group {
  display: flex;
  gap: 20px;
}

.plan-radio-group {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 10px;
}

.van-radio {
  display: flex;
  align-items: center;
}

.van-radio__label {
  color: #333333;
}

.van-radio--checked .van-radio__label {
  color: #FF5722;
}

.van-radio__icon--checked {
  background-color: #FF5722 !important;
  border-color: #FF5722 !important;
}

.plan-option {
  flex: 0 0 auto;
  padding: 8px 15px;
  border: 1px solid #E0E0E0;
  border-radius: 4px;
}

.plan-radio-group .van-radio--checked {
  border-color: #FF5722;
  background-color: rgba(255, 87, 34, 0.1);
}

/* 按钮样式 */
.button-group {
  padding: 15px;
  position: fixed;
  bottom: 0;
 left: 0;
  width: 100%;
 display: flex;
 padding: 15px;
 background-color: #fff;
 padding-bottom: 30px; /* 增加底部内边距避免遮挡 */
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  gap: 10px;
}

.add-additional-btn {
  flex: 1;
  height: 45px;
  border-radius: 6px;
  border: 1px dashed #FF5722;
  color: #FF5722;
  background-color: transparent;
}

.save-btn {
  flex: 1;
  height: 45px;
  border-radius: 6px;
  background-color: #FF5722;
  color: white;
}

/* 新增Tab样式 */
.custom-tabs {
  display: flex;
  height: 44px;
  border-bottom: 1px solid #f0f0f0;
}
/* 基础Tab容器样式 */
.tab-container {
  display: flex;
  padding: 15px 0;
  background-color: #fff;
  border-bottom: 1px solid #f5f5f5;
}

/* Tab项通用样式 */
.tab-item {
  flex: 1;
  text-align: center;
  padding: 8px 0;
 font-size: 15px;
  color: #666;
  position: relative;
}

/* 选中状态样式 */
.tab-item.active {
  color: #FF5722;
  font-weight: 500;
}

/* 橙色下划线样式 */
.tab-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 24px;
  height: 3px;
  background-color: #FF5722;
  border-radius: 2px;
}

/* 修复表单内容与Tab间距 */
.form-content {
  padding: 15px;
}
</style>
