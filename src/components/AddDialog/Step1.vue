<template>
    <el-form ref="formRef" :model="ruleForm" :rules="rules" label-width="120px" :size="'large'" status-icon>
        <el-form-item label="模板名称" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入模板名称"/>
        </el-form-item>
        <el-form-item label="模板描述" prop="description">
            <el-input v-model="ruleForm.description" type="textarea" placeholder="请输入模板描述" />
        </el-form-item>
        <el-form-item label="是否启用" prop="enable">
            <el-switch v-model="ruleForm.enable" />
        </el-form-item>
    </el-form>
</template>
  
<script setup>
import { ref, reactive, defineExpose, defineEmits } from 'vue'

const ruleForm = reactive({
    name: '',
    description: '',
    enable: true
});
const rules = reactive({
    name: [
        {
            required: true,
            message: '请输入模板名称',
            trigger: 'blur',
        },
        {
            min: 3,
            max: 15,
            message: '名称长度为3~15位字符！',
            trigger: 'blur'
        }
    ]
});

const emit = defineEmits(['save-success']);
/**
 * 保存数据
 */
const formRef = ref(null);
const saveData = function () {
    if (!formRef.value) {
        return;
    }
    formRef.value.validate((valid) => {
        if (!valid) {
            return;
        }
        // 执行保存

        // 触发保存成功事件
        emit('save-success');
    })
}

const resetData = function () {
    if (!formRef.value) {
        return;
    }
    formRef?.value.resetFields();
}

defineExpose({
    saveData,
    resetData
})
</script>
<style scoped>
.text-center {
    text-align: center;
}

.relative {
    position: relative;
}
</style>