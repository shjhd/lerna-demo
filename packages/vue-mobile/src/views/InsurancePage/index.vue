<template>
  <div class="insurance-application">
    <!-- 步骤指示器 -->
    <div class="steps-container">
      <div class="step-item active">
        <div class="step-number">1</div>
        <div class="step-text">选择产品</div>
      </div>
      <div class="step-line active"></div>
      <div class="step-item active">
        <div class="step-number">2</div>
        <div class="step-text">选择投保模式</div>
      </div>
      <div class="step-line active"></div>
      <div class="step-item active">
        <div class="step-number">3</div>
        <div class="step-text">被保人信息</div>
      </div>
      <div class="step-line"></div>
      <div class="step-item">
        <div class="step-number">4</div>
        <div class="step-text">开放期设置</div>
      </div>
      <div class="step-line"></div>
      <div class="step-item">
        <div class="step-number">5</div>
        <div class="step-text">确认投保</div>
      </div>
    </div>

    <!-- 投保模式选择 -->
    <div class="section">
      <h2>2 选择投保模式</h2>
      <div class="mode-selector">
        <div class="mode-option active">
          清单上传
          <div class="checkmark"></div>
        </div>
        <div class="mode-option">
          手动录入
          <div class="checkmark"></div>
        </div>
      </div>
    </div>

    <!-- 被保人信息 -->
    <div class="section">
      <h2>3 被保人信息</h2>
      <div class="upload-btn-container">
        <van-button class="upload-btn" type="primary" size="small">
          <van-icon name="upload" class="upload-icon" /> 批量上传
        </van-button>
        <van-button class="template-btn" type="primary" size="small">
          <van-icon name="download" class="download-icon" /> 模板下载
        </van-button>
        <van-button class="collapse-btn" type="text" size="small">
          展开
          <van-icon name="chevron-down" class="collapse-icon" />
        </van-button>
      </div>

      <!-- 被保人列表 -->
      <div class="insured-list">
        <!-- 被保人项 1 -->
        <div class="insured-item selected">
          <div class="insured-info">
            <div class="insured-name">
              <span class="name">张平安</span>
              <span class="insured-tag">本人</span>
              <button class="edit-btn">
                <van-icon name="edit" class="edit-icon" />
              </button>
            </div>
            <div class="insured-selection">
              <p>已选 1万免赔额</p>
              <p>已选 VIP升级包 (特定疾病)</p>
            </div>
          </div>
          <div class="checkbox-container">
            <van-checkbox v-model="checked" checked class="van-checkbox" />
          </div>
        </div>

        <!-- 被保人项 2 -->
        <div class="insured-item">
          <div class="insured-info">
            <div class="insured-name">
              <span class="name">张平安</span>
              <span class="insured-tag">本人</span>
              <button class="edit-btn">
                <van-icon name="edit" class="edit-icon" />
              </button>
            </div>
            <div class="insured-selection">
              <p>已选 1万免赔额</p>
              <p>已选 VIP升级包 (特定疾病)</p>
            </div>
          </div>
          <div class="checkbox-container">
            <van-checkbox v-model="checked" class="van-checkbox" />
          </div>
        </div>
      </div>

      <!-- 添加被保人按钮 -->
      <button class="add-insured-btn" @click="addInsured">
        <van-icon name="plus" class="plus-icon" /> 添加被保人
      </button>
    </div>

    <!-- 开放期设置 -->
    <div class="section">
      <h2>4 开放期设置</h2>
      <div class="date-picker-container">
        <div class="date-picker-item">
          <label>开始日期</label>
          <div class="date-input">请选择日期</div>
        </div>
        <div class="date-picker-item">
          <label>结束日期</label>
          <div class="date-input">请选择日期</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 已经导入了Icon组件，无需修改
import { ref } from 'vue';
import { Button, Icon } from 'vant';
import { useRouter } from 'vue-router'; // 添加路由导入

const router = useRouter();
// 响应式状态
const activeStep = ref(3); // 当前激活的步骤
const selectedMode = ref(0); // 0: 清单上传, 1: 手动录入
const insuredPersons = ref([
  { id: 1, name: '张平安', relation: '本人', selectedOptions: ['1万免赔额', 'VIP升级包 (特定疾病)'], checked: true },
  { id: 2, name: '张平安', relation: '本人', selectedOptions: ['1万免赔额', 'VIP升级包 (特定疾病)'], checked: false }
]);

// 方法
const handleModeChange = (index: number) => {
  selectedMode.value = index;
};

const toggleInsured = (id: number) => {
  const person = insuredPersons.value.find(p => p.id === id);
  if (person) {
    person.checked = !person.checked;
  }
};

const addInsured = () => {
  // 添加被保人逻辑
  router.push('/add-person'); // 跳转到新增被保人页面
};
</script>

<style scoped>
/* 基础颜色变量 */
:root {
  /* 移除了第160-170行的颜色变量 */
}

/* 步骤指示器样式 */
.steps-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 12px; /* 减小内边距 */
  background-color: var(--card-background);
  border-radius: 10px; /* 减小圆角 */
  margin: 12px; /* 减小外边距 */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.step-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px; /* 减小字体大小 */
}

.step-number {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #EEEEEE;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
  font-size: 12px; /* 减小字体大小 */
  font-weight: 500;
}

.step-item.active .step-number {
  background-color: var(--primary-color);
  color: white;
}

.step-text {
  font-size: 12px; /* 减小字体大小 */
  color: var(--text-secondary);
}

.step-item.active .step-text {
  color: var(--primary-color);
  font-weight: 500;
}

.step-line {
  flex: 1;
  height: 2px;
  background-color: #EEEEEE;
  margin: 0 5px;
}

.step-line.active {
  background-color: var(--primary-color);
}

/* 章节样式 */
.section {
  margin: 12px; /* 减小外边距 */
  background-color: var(--card-background);
  border-radius: 10px; /* 减小圆角 */
  padding: 15px; /* 减小内边距 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

h2 {
  font-size: 16px; /* 减小字体大小 */
  color: var(--text-primary);
  margin-bottom: 15px; /* 减小下边距 */
  display: flex;
  align-items: center;
  font-weight: 600;
}

h2::before {
  content: '';
  display: inline-block;
  width: 5px; /* 减小宽度 */
  height: 18px; /* 减小高度 */
  background-color: #FF6026;
  margin-right: 6px; /* 减小右边距 */
  border-radius: 2px; /* 减小圆角 */
}

/* 投保模式选择 */
.mode-selector {
  display: flex;
  border: 1px solid #e0e0e0;
  border-radius: 6px; /* 减小圆角 */
  overflow: hidden;
}

.mode-option {
  flex: 1;
  padding: 10px; /* 减小内边距 */
  text-align: center;
  position: relative;
  cursor: pointer;
  font-size: 13px; /* 减小字体大小 */
}

/* 批量上传和模板下载按钮容器 */
.upload-btn-container {
  display: flex;
  gap: 8px; /* 减小间距 */
  margin-bottom: 12px; /* 减小下边距 */
  flex-wrap: wrap;
}

/* 批量上传按钮样式 */
::v-deep(.upload-btn) {
  background-color: #FF5722; /* 直接使用颜色值替代变量 */
  color: white;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.2s ease;
}

/* 模板下载按钮样式 */
::v-deep(.template-btn) {
  background-color: white;
  color: #FF5722; /* 直接使用颜色值替代变量 */
  border: 1px solid #FF5722; /* 直接使用颜色值替代变量 */
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.2s ease;
}

/* 展开按钮样式 */
.collapse-btn {
  margin-left: auto;
  color: #666666; /* 直接使用颜色值替代变量 */
  background-color: #F8F8F8; /* 直接使用颜色值替代变量 */
  border-radius: 6px;
  padding: 5px 10px;
  font-size: 13px;
  transition: all 0.2s ease;
}

/* 被保人列表样式 */
.insured-list {
  margin-top: 12px; /* 减小上边距 */
  border-radius: 8px; /* 减小圆角 */
  overflow: hidden;
  background-color: var(--card-background);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

/* 被保人项样式 */
.insured-item {
  padding: 12px; /* 减小内边距 */
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s ease;
}

/* 被保人信息样式 */
.insured-info {
  flex: 1;
}

.insured-name {
  font-size: 15px; /* 减小字体大小 */
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 4px; /* 减小下边距 */
  display: flex;
  align-items: center;
  gap: 6px; /* 减小间距 */
}

.insured-tag {
  background-color: rgba(255, 87, 34, 0.1); /* 直接使用颜色值替代变量 */
  color: #FF5722; /* 直接使用颜色值替代变量 */
  font-size: 11px;
  padding: 1px 6px;
  border-radius: 10px;
}

.insured-selection {
  margin-top: 6px; /* 减小上边距 */
  font-size: 13px; /* 减小字体大小 */
  color: var(--text-secondary);
  line-height: 1.4;
}

.insured-selection p {
  margin: 0;
  line-height: 1.5;
}

/* 编辑按钮样式 */
.edit-btn {
  background-color: transparent;
  border: none;
  color: var(--text-tertiary);
  font-size: 13px; /* 减小字体大小 */
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 3px; /* 减小间距 */
}

/* 复选框容器样式 */
.checkbox-container {
  display: flex;
  align-items: center;
  margin-left: 8px; /* 减小左边距 */
}

/* 添加被保人按钮样式 */
.add-insured-btn {
  width: 100%;
  height: 45px;
  margin-top: 12px;
  background-color: transparent;
  border: 2px dashed #FF5722; /* 直接使用颜色值替代变量 */
  color: #FF5722; /* 直接使用颜色值替代变量 */
  font-size: 15px;
  font-weight: 500;
  border-radius: 22px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
}

.plus-icon {
  color: #FF5722; /* 直接使用颜色值替代变量 */
  margin-right: 6px;
  font-size: 18px;
}

/* 开放期设置 */
.date-picker-container {
  display: flex;
  flex-direction: column;
  gap: 12px; /* 减小间距 */
}

.date-picker-item {
  display: flex;
  flex-direction: column;
  gap: 6px; /* 减小间距 */
}

.date-picker-item label {
  font-size: 14px; /* 减小字体大小 */
  color: var(--text-primary);
  font-weight: 500;
}

.date-input {
  padding: 10px; /* 减小内边距 */
  border: 1px solid var(--border-color);
  border-radius: 6px; /* 减小圆角 */
  font-size: 14px; /* 减小字体大小 */
  color: var(--text-secondary);
  background-color: var(--background-color);
  cursor: pointer;
}

/* 底部按钮 */
.bottom-buttons {
  display: flex;
  gap: 12px; /* 减小间距 */
  padding: 12px; /* 减小内边距 */
  padding-bottom: 25px; /* 减小下边距 */
  background-color: white;
  border-top: 1px solid var(--border-color);
  position: sticky;
  bottom: 0;
  z-index: 10;
}

::v-deep(.prev-btn) {
  flex: 1;
  border-radius: 10px !important; /* 减小圆角 */
  height: 45px; /* 减小高度 */
  font-size: 15px !important; /* 减小字体大小 */
  font-weight: 500;
  background-color: var(--background-color) !important;
  color: var(--text-secondary) !important;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
}

::v-deep(.next-btn) {
  flex: 1;
  border-radius: 10px !important; /* 减小圆角 */
  height: 45px; /* 减小高度 */
  font-size: 15px !important; /* 减小字体大小 */
  font-weight: 500;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark)) !important;
  box-shadow: 0 4px 12px rgba(255, 96, 38, 0.25);
  transition: all 0.2s ease;
}
</style>