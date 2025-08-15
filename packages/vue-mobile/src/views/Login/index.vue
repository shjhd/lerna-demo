<template>
  <div class="login-container">
    <div class="login-content">
      <h2 class="login-title">欢迎登录</h2>
      
      <div class="form-item">
        <label class="label-text">手机号</label>
        <div class="input-wrapper">
          <van-field
            v-model="formData.phone"
            placeholder="请输入手机号"
            type="tel"
            class="input-field"
            maxlength="11"
            @input="handlePhoneInput"
          />
        </div>
      </div>
      
      <div class="form-item">
        <label class="label-text">短信验证码</label>
        <div class="input-wrapper verify-code-wrapper">
          <van-field
            v-model="formData.code"
            placeholder="请输入短信验证码"
            class="input-field verify-code-input"
          />
          <van-button
            class="send-btn"
            :disabled="sendingCode || countdown > 0"
            @click="sendVerificationCode"
            :loading="sendingCode"
          >
            {{ countdown > 0 ? `${countdown}秒` : (sendingCode ? '发送中...' : '发送') }}
          </van-button>
        </div>
      </div>
      
      <van-button
        class="login-btn"
        :disabled="loading"
        @click="handleLogin"
        :loading="loading"
      >
        登录
      </van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { showToast } from 'vant';
import { Button as VanButton, Field as VanField } from 'vant';

const router = useRouter();
const loading = ref(false);
const sendingCode = ref(false);
const countdown = ref(0);

const formData = reactive<{ phone: string; code: string }>({
  phone: '',
  code: '',
});

// 处理手机号输入，确保不超过11位
const handlePhoneInput = (value: string) => {
  if (value.length > 11) {
    formData.phone = value.slice(0, 11);
  }
};

// 发送验证码
const sendVerificationCode = () => {
  if (!formData.phone) {
    showToast('请输入手机号');
    return;
  }

  // 简单的手机号验证
  const phoneReg = /^1[3-9]\d{9}$/;
  if (!phoneReg.test(formData.phone)) {
    showToast('请输入正确的手机号');
    return;
  }

  sendingCode.value = true;

  // 模拟发送验证码请求
  setTimeout(() => {
    sendingCode.value = false;
    countdown.value = 60;
    showToast('验证码发送成功');

    // 倒计时
    const timer = setInterval(() => {
      countdown.value--;
      if (countdown.value <= 0) {
        clearInterval(timer);
      }
    }, 1000);
  }, 1500);
};

// 处理登录
const handleLogin = () => {
  if (!formData.phone) {
    showToast('请输入手机号');
    return;
  }

  if (!formData.code) {
    showToast('请输入验证码');
    return;
  }

  loading.value = true;

  // 模拟登录请求
  setTimeout(() => {
    loading.value = false;
    showToast('登录成功');
    router.push('/');
  }, 1500);
};
</script>
<style scoped>
.login-container {
  height: 100vh;
  background: linear-gradient(179deg, #FEF1EA 0%, #FEFEFE 100%);
  display: flex;
  justify-content: center;
  padding: 50px 20px 0;
  box-sizing: border-box;
}

.login-content {
  width: 100%;
}

.login-title {
  font-size: 28px;
  color: #333333;
  text-align: left;
  margin: 0 0 40px 0;
  font-weight: 600;
}

.form-item {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  background-color: #ffffff;
  padding: 0 15px;
  border-radius: 8px;
}

.label-text {
  font-size: 15px;
  color: #666666;
  width: 80px; /* 从90px减小到70px */
  font-weight: 500;
  margin-right: 10px;
  background-color: #ffffff;
}

.input-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  height: 48px;
  background-color: #ffffff;
  padding: 0;
  box-sizing: border-box;
  /* 移除之前的line-height设置 */
}

.input-field {
  flex: 1;
  height: 100%;
  border: none;
  outline: none;
  font-size: 16px;
  color: #333333;
  background-color: #ffffff;
  /* 使用flexbox确保文字垂直居中 */
  display: flex;
  align-items: center;
}

.verify-code-wrapper {
  padding: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
}

.verify-code-input {
  flex: 1;
  height: 100%;
}

.send-btn {
  width: 40px; /* 从90px减小到75px */
  height: 100%;
  text-align: right;
  color: #ff7d00;
  background-color: transparent;
  font-size: 14px;
  padding: 0;
  border: none;
}

.send-btn::after {
  border: none;
}

.send-btn:active {
  background-color: transparent;
  opacity: 0.7;
}

.login-btn {
  width: 80%;
  height: 50px;
  background: linear-gradient(90deg, #ff7d00 0%, #ff9a3c 100%);
  color: #ffffff;
  border-radius: 25px;
  font-size: 17px;
  font-weight: bold;
  margin: 20px auto 0;
  display: block;
  box-shadow: 0 4px 10px rgba(255, 125, 0, 0.3);
  /* 添加以下样式去除边框 */
  border: none;
}

.login-btn::after {
  border: none;
  border-radius: 25px;
}

.login-btn:active {
  transform: translateY(1px);
  box-shadow: 0 2px 6px rgba(255, 125, 0, 0.3);
}

/* 覆盖vant默认样式 */
.van-input__control {
  background-color: transparent;
}

.van-button--loading .van-button__text {
  color: #ffffff;
}

/* 响应式调整 */
@media (max-width: 360px) {
  .label-text {
    width: 60px; /* 从80px减小到60px */
    font-size: 14px;
  }
  
  .login-title {
    font-size: 26px;
  }
  
  .send-btn {
    width: 70px; /* 从80px减小到70px */
    font-size: 13px;
  }
  
  .login-btn {
    width: 90%;
  }
}
</style>
