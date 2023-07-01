<template>
    <el-form ref="formRef" :model="ruleForm" :rules="rules" label-width="0px" :size="'large'" status-icon>
        <el-divider content-position="left">模板内容</el-divider>
        <el-form-item label="" prop="content" required>
            <el-input v-model="ruleForm.content" type="textarea" rows="20"/>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="saveData(formRef)">保存</el-button>
            <el-button @click="resetForm(formRef)">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup>
import { ref, reactive, defineExpose } from 'vue';

const ruleForm = reactive({
    content: ''
});
const rules = reactive({
    content: [{
        required: true,
        message: '请输入模板内容',
        trigger: 'blur'
    }]
});
const formRef = ref(null);

/**
 * 显示
 */
const show = function (id) {
    // 清除表单
    resetForm(formRef.value);
    // 根据id获取模板数据
    ruleForm.content = id;
}
const saveData = function (formEl) {
    if (formEl == null) {
        return;
    }
    formEl.validate((valid) => {
        if (valid) {
            console.log(ruleForm);
        } else {
            console.log('保存失败！');
        }
    })
}
const resetForm = function (formEl) {
    if (formEl == null) {
        return;
    }
    formEl.resetFields();
}
defineExpose({
    show
});
</script>