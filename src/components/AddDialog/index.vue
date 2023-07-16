<template>
  <el-dialog v-model="dialogFormVisible" :title="title" :fullscreen="fullscreen">
    <el-steps :active="activeStep" align-center :process-status="processStatus" finish-status="success">
      <el-step title="Step 1" description="填写模板基本信息" />
      <el-step title="Step 2" description="设置生成模板" />
      <el-step title="Step 3" description="设置完成" />
    </el-steps>
    <el-divider :borderStyle="'dashed'" />
    <div class="mainContent">
      <div v-show="activeStep == 0">
        <Step1 ref="step1Ref" @save-success="onSaveSuccess" />
      </div>
      <div v-show="activeStep == 1">
        <Step2 />
      </div>
      <el-result v-show="activeStep == 2" icon="success" title="保存成功！" sub-title="赶快试试用这个模板来生成代码吧！" />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button v-show="activeStep != endStep" type="warning" @click="dialogFormVisible = false">取消</el-button>
        <el-button v-show="activeStep != startStep" @click="handlePre"> 上一步 </el-button>
        <el-button type="primary" @click="handleNext">
          {{ activeStep == endStep ? '完成' : '下一步' }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, defineProps, defineExpose, watch } from 'vue'
import Step1 from '@/components/AddDialog/Step1.vue'
import Step2 from '@/components/TemplateComponent/index.vue'
defineProps({
  title: String,
  fullscreen: {
    trpe: Boolean,
    default: true
  }
})

// 当前弹框是否显示
const dialogFormVisible = ref(false)
// 开始、结束对应的步骤
const startStep = ref(0);
const endStep = ref(2);
// 当前的步骤
const activeStep = ref(0);
// 当前步骤的状态
const processStatus = ref('process');

/**
 * 处理下一步按钮点击事件
 */
const step1Ref = ref(null)
const handleNext = function () {
  // 步骤一
  if (activeStep.value == 0) {
    step1Ref.value.saveData()
  }
  // 步骤二
  if (activeStep.value == 1) {
    activeStep.value++;
    return
  }
  // 完成
  if (activeStep.value == endStep.value) {
    dialogFormVisible.value = false
  }
}

/**
 * 步骤1保存成功之后的回调函数
 */
const onSaveSuccess = function () {
  activeStep.value++
}

/**
 * 处理上一步按钮点击事件
 */
const handlePre = function () {
  activeStep.value--
}

/**
 * 显示弹框
 */
const showDialog = function () {
  dialogFormVisible.value = true

  // 重置数据
  activeStep.value = 0
  if (step1Ref.value) {
    step1Ref?.value.resetData()
  }
}

// 当前步骤改变时，触发当前状态的变化
watch(activeStep, function (newValue) {
  if (newValue == endStep.value) {
    processStatus.value = 'success';
  } else {
    processStatus.value = 'process';
  }
});

defineExpose({
  showDialog
})
</script>

<style scoped></style>
