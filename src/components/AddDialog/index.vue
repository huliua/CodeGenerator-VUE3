<template>
    <el-dialog v-model="dialogFormVisible" :title="title" :fullscreen="fullscreen">
        <el-steps :active="activeStep" align-center finish-status="success">
            <el-step title="Step 1" description="填写模板基本信息" />
            <el-step title="Step 2" description="设置生成模板" />
            <el-step title="Step 3" description="设置完成" />
        </el-steps>
        <div class="mainContent">
            <Step1 v-show="activeStep == 0" ref="step1Ref" @save-success="onSaveSuccess"></Step1>
            <Step2 v-show="activeStep == 1" ref="step2Ref" @save-success="onSaveSuccess"></Step2>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="warning" @click="dialogFormVisible = false">取消</el-button>
                <el-button v-show="activeStep != 0" @click="handlePre">
                    上一步
                </el-button>
                <el-button type="primary" @click="handleNext">
                    {{ activeStep == 2 ? '完成' : '下一步' }}
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref, defineProps, defineExpose } from 'vue';
import Step1 from '@/components/AddDialog/Step1.vue';
import Step2 from '@/components/TemplateComponent/index.vue';
defineProps({
    title: String,
    fullscreen: {
        trpe: Boolean,
        default: true
    }
});

// 表单是否显示
const dialogFormVisible = ref(false);
// 当前的步骤
const activeStep = ref(0);

/**
 * 处理下一步按钮点击事件
 */
const step1Ref = ref(null);
const step2Ref = ref(null);
const handleNext = function () {
    // 步骤一
    if (activeStep.value == 0) {
        step1Ref.value.saveData();
    }
    // 步骤二
    if (activeStep.value == 1) {
        step2Ref.value.saveData();
    }
    // 完成
    if (activeStep.value == 2) {
        dialogFormVisible.value = false;
        return;
    }
}

const onSaveSuccess = function () {
    activeStep.value++;
}

/**
 * 处理上一步按钮点击事件
 */
const handlePre = function () {
    activeStep.value--;
}

/**
 * 显示弹框
 */
const showDialog = function () {
    dialogFormVisible.value = true;

    // 重置数据
    activeStep.value = 0;
    if (step1Ref.value) {
        step1Ref?.value.resetData();
    }
}

defineExpose({
    showDialog
})
</script>

<style scoped>

</style>