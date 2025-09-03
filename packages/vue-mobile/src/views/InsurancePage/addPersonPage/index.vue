<template>
  <div class="add-person-page">
    <van-nav-bar title="添加被保人" left-arrow @click="onBack" />
    
    <!-- 顶部标签页 -->
    <div class="tab-container">
      <div class="tab-item">被保人</div>
      <div class="tab-item">张平安</div>
      <div class="tab-item active">张一生</div>
    </div>
    
    <!-- 表单内容 - 全部使用vant的Field组件 -->
    <div class="form-container">
      <!-- 被保人姓名 - 只读显示 -->
      <van-field
        label="被保人姓名"
        value="张一生"
        readonly
        class="form-field"
      />

      <!-- 和我的关系 - 使用vant选择器 -->
      <van-field
        label="和我的关系"
        :value="relationship"
        is-link
        @click="showRelationshipPopup"
        class="form-field"
      />

      <!-- 证件类型与号码 - 选择器和输入框的结合 -->
      <van-field
        label="护照"
        v-model="idNumber"
        placeholder="请输入护照号码"
        class="form-field"
      />

      <!-- 性别 - 使用vant单选组件 -->
      <van-field label="性别" class="form-field">
        <template #input>
          <van-radio-group v-model="gender" class="custom-radio-group">
            <van-radio value="男" class="custom-radio">男</van-radio>
            <van-radio value="女" class="custom-radio">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <!-- 有无社保 - 使用vant单选组件 -->
      <van-field label="有无社保" class="form-field">
        <template #input>
          <van-radio-group v-model="socialSecurity" class="custom-radio-group">
            <van-radio value="有社保" class="custom-radio">有社保</van-radio>
            <van-radio value="无社保" class="custom-radio">无社保</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <!-- 常住省市 -->
      <van-field
        label="常住省市"
        :value="residenceProvince"
        is-link
        @click="showProvincePopup"
        class="form-field"
      />

      <!-- 常住区/县 -->
      <van-field
        label="常住区/县"
        :value="residenceCity"
        is-link
        @click="showCityPopup"
        class="form-field"
      />

      <!-- 详细地址 -->
      <van-field
        label="详细地址"
        v-model="address"
        placeholder="请输入详细地址"
        class="form-field"
      />

      <!-- 基础产品 -->
      <van-field label="基础产品" class="form-field">
        <template #input>
          <van-radio-group v-model="plan" class="custom-plan-group">
            <van-radio value="计划1" class="custom-plan">计划1</van-radio>
            <van-radio value="计划2" class="custom-plan">计划2</van-radio>
            <van-radio value="计划3" class="custom-plan">计划3</van-radio>
          </van-radio-group>
        </template>
      </van-field>
    </div>
    
    <!-- 按钮区域 -->
    <div class="btn-container">
      <van-button
        class="secondary-btn"
        type="default"
        plain
      >
        添加附加被保人
      </van-button>

      <van-button
        class="primary-btn"
        type="default"
      >
        保存提交
      </van-button>
    </div>

    <!-- 关系选择弹窗 -->
    <van-popup
        v-model:show="relationshipPopupVisible"
        position="bottom"
        round
      >
        <van-picker
          :columns="relationshipOptions"
          value-key="label"
          :default-index="0"
          @confirm="onRelationshipConfirm"
          @cancel="relationshipPopupVisible = false"
        />
      </van-popup>

      <!-- 证件类型选择弹窗 -->
      <van-popup
        v-model:show="idTypePopupVisible"
        position="bottom"
        round
      >
        <van-picker
          :columns="idTypeOptions"
          value-key="label"
          :default-index="1"
          @confirm="onIdTypeConfirm"
          @cancel="idTypePopupVisible = false"
        />
      </van-popup>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { showToast } from 'vant';
import { Popup, Picker, RadioGroup, Radio, Field, Button, NavBar } from 'vant';

const router = useRouter();

// 响应式数据
const relationship = ref('父母');
const residenceProvince = ref('上海市');
const residenceCity = ref('徐汇区');
const idType = ref('护照');
const idNumber = ref('Q345345345');
const gender = ref('男');
const socialSecurity = ref('有社保');
const address = ref('上海市徐汇区凯滨路269号');
const plan = ref('计划2');

// 弹窗控制
const relationshipPopupVisible = ref(false);
const idTypePopupVisible = ref(false);

// 选择器选项
const relationshipOptions = [
  { label: '父母' },
  { label: '子女' },
  { label: '配偶' }
];

const idTypeOptions = [
  { label: '身份证' },
  { label: '护照' },
  { label: '出生证' },
  { label: '港澳通行证' },
  { label: '驾驶证' },
  { label: '军人证' }
];

// 方法
const onBack = () => {
  router.go(-1);
};

const showRelationshipPopup = () => {
  relationshipPopupVisible.value = true;
};

const onRelationshipConfirm = (value) => {
  relationship.value = value[0].label;
  relationshipPopupVisible.value = false;
};

const showIdTypePopup = () => {
  idTypePopupVisible.value = true;
};

const onIdTypeConfirm = (value) => {
  idType.value = value[0].label;
  idTypePopupVisible.value = false;
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
  padding-bottom: 80px;
}

/* 标签页样式 */
.tab-container {
  display: flex;
  padding: 15px 0;
  background-color: #fff;
  border-bottom: 1px solid #f5f5f5;
}

.tab-item {
  flex: 1;
  text-align: center;
  padding: 8px 0;
  font-size: 15px;
  color: #666;
  position: relative;
}

.tab-item.active {
  color: #FF5722;
  font-weight: 600;
  letter-spacing: 0.3px;
}

.tab-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 25%;
  right: 25%;
  height: 3px;
  background-color: #FF5722;
  border-radius: 2px;
}

/* 表单样式 */
.form-container {
  background-color: white;
  margin-bottom: 10px;
}

.form-field {
  --border-color: #f5f5f5;
  --border-top: 1px solid var(--border-color);
  --border-bottom: 1px solid var(--border-color);
  --field-padding: 12px 16px;
}

.form-field:not(:first-child) {
  --border-top: none;
}

.van-field__label {
  width: 100px;
  text-align: left;
  color: #333;
  font-size: 15px;
}

.van-field__value {
  color: #333;
  font-size: 15px;
}

/* 自定义单选框样式 */
.custom-radio-group {
  display: flex;
  gap: 15px;
}

.custom-radio {
  padding: 8px 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  position: relative;
  background-color: white;
  overflow: hidden;
}

.custom-radio.van-radio--checked {
  border-color: #FF5722;
  color: #FF5722;
  background-color: #FFF0EA;
}

.custom-radio.van-radio--checked::after {
  content: '';
  position: absolute;
  right: 0;
  bottom: 0;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 0 16px 16px;
  border-color: transparent transparent #FF5722 transparent;
}

.custom-radio.van-radio--checked::before {
  content: '✓';
  position: absolute;
  right: 3px;
  bottom: 1px;
  font-size: 10px;
  color: white;
  font-weight: bold;
}

/* 隐藏vant默认的单选圆圈 */
.custom-radio .van-radio__icon {
  display: none;
}

/* 基础产品选择样式 */
.custom-plan-group {
  display: flex;
  gap: 10px;
}

.custom-plan {
  padding: 8px 15px;
  border: 1px solid #E0E0E0;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  position: relative;
  background-color: white;
  overflow: hidden;
}

.custom-plan.van-radio--checked {
  border-color: #FF5722;
  color: #FF5722;
  background-color: #FFF0EA;
}

.custom-plan.van-radio--checked::after {
  content: '';
  position: absolute;
  right: 0;
  bottom: 0;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 0 16px 16px;
  border-color: transparent transparent #FF5722 transparent;
}

.custom-plan.van-radio--checked::before {
  content: '✓';
  position: absolute;
  right: 3px;
  bottom: 1px;
  font-size: 10px;
  color: white;
  font-weight: bold;
}

/* 隐藏vant默认的单选圆圈 */
.custom-plan .van-radio__icon {
  display: none;
}

/* 按钮样式 */
.btn-container {
  display: flex;
  padding: 15px;
  padding-bottom: 30px;
  background-color: #fff;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  justify-content: space-between;
}

.primary-btn {
  background-color: #FF5722;
  color: #fff;
  border-radius: 6px;
  height: 48px;
  line-height: 48px;
  font-size: 16px;
  font-weight: 500;
  border: none;
  flex: 1;
  margin-left: 10px;
}

.secondary-btn {
  background-color: transparent;
  color: #FF5722;
  border: 1px dashed #FF5722;
  border-radius: 6px;
  height: 48px;
  line-height: 46px;
  font-size: 16px;
  flex: 1;
}
</style>
