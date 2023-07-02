<script setup>
import { ref, defineProps, defineEmits, defineExpose, watch } from 'vue';

// 触发多久显示toolTip，单位毫秒
const toolTipShowAfter = ref(1000);
const emit = defineEmits(['onLoadData', 'onBtnClick']);
const props = defineProps({
  buttonList: Array, // 按钮列表
  primaryKey: String, // 主键
  pageSize: Number // 每页数据量
});

// 加载数据
const isLoading = ref(false); // 是否正在加载数据
const pageNumber = ref(1); // 页码
const datas = ref([]);
const loadData = function () {
  emit('onLoadData', {
    pageSize: props.pageSize,
    pageNumber: pageNumber.value
  });
}
const pageNumberUp = function () {
  pageNumber.value++;
}
const changeIsLoading = function (newValue) {
  isLoading.value = newValue;
}

// 处理按钮点击事件
const btnClick = function (funcName, primaryKey) {
  emit('onBtnClick', { funcName, primaryKey });
}

// 暴露数据给父组件
defineExpose({ datas, pageNumberUp, changeIsLoading });

// 显示加载中动画
let loadingObj = void 0;
watch(isLoading, function (newValue) {
  if (newValue == true) {
    loadingObj = ElLoading.service({
      lock: true,
      text: 'Loading',
      background: 'rgba(0, 0, 0, 0.7)',
    });
  } else {
    loadingObj?.close();
  }
})
</script>
<template>
  <el-space class="mainContent" wrap :size="22" v-infinite-scroll="loadData" :infinite-scroll-disabled="isLoading" :infinite-scroll-distance="0">
    <el-card class="box-card" v-for="item in datas" :key="item[primaryKey]">
      <template #header>
        <div class="card-header">
          <span>{{ item.title }}</span>
          <div class="card-header-buttons">
            <el-tooltip v-for="btn in buttonList" :key="btn.name" class="box-item" effect="dark" :content="btn.name"
              placement="top" :show-after="toolTipShowAfter">
              <el-button link :type="btn.type" :icon="btn.icon" @click="btnClick(btn.funcName, item[primaryKey])" />
            </el-tooltip>
          </div>
        </div>
      </template>
      <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
    </el-card>
  </el-space>
</template>

<style scoped>
.mainContent {
  width: 98%;
  height: auto;
}
</style>