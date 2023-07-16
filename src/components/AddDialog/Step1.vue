<template>
    <el-form ref="formRef" :model="ruleForm" :rules="rules" label-width="120px" :size="'large'" status-icon>
        <el-divider content-position="left">一、基础信息</el-divider>
        <el-form-item label="模板名称" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入模板名称" />
        </el-form-item>
        <el-form-item label="模板描述" prop="description">
            <el-input v-model="ruleForm.description" type="textarea" placeholder="请输入模板描述" />
        </el-form-item>
        <el-form-item label="是否启用" prop="enable">
            <el-switch v-model="ruleForm.enable" />
        </el-form-item>
    </el-form>
    <!-- 新增模板字段 -->
    <el-divider content-position="left">二、模板字段</el-divider>
    <el-row>
        <el-col>
            <el-form style="margin-top: 22px;" ref="fieldFormRef" :model="fieldForm" label-width="120px" :size="'large'">
                <div class="border" v-for="(field, index) in fieldForm.fields" :key="index">
                    <el-form-item label="字段标识" :rules="filedFormRules.field" :prop="`fields[${index}].field`">
                        <el-input v-model.trim="field.field" placeholder="请输入字段标识" />
                    </el-form-item>
                    <el-form-item label="字段名" :rules="filedFormRules.fieldName" :prop="`fields[${index}].fieldName`">
                        <el-input v-model.trim="field.fieldName" placeholder="请输入字段中文名称" />
                    </el-form-item>
                </div>
            </el-form>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="22" :offset="1">
            <el-button plain :icon="Plus" class="fullBtn" @click="addFields"></el-button>
        </el-col>
    </el-row>
</template>
  
<script setup>
import { ref, reactive } from 'vue'
import { Plus } from '@element-plus/icons-vue'
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

// ------------添加字段--------------
const fieldFormRef = ref(null);
const fieldForm = ref({
    fields: []
})
const filedFormRules = ref({
    field: [{
        required: true,
        trigger: 'blur',
        message: '请输入字段标识！'
    }],
    fieldName: [{
        required: true,
        trigger: 'blur',
        message: '请输入字段名称！'
    }]
});
const addFields = function () {
    fieldForm.value.fields.push({
        field: '',
        fieldName: ''
    })
}

const saveData = function () {
    if (!formRef.value) {
        return;
    }
    if (!fieldFormRef.value) {
        return;
    }
    Promise.all([formRef, fieldFormRef].map((refItem) => {
        return refItem.value.validate();
    })).then(() => {
        // 执行保存

        // 触发保存成功事件
        emit('save-success');
    }).catch((err) => {
        console.warn("form validate error:", err);
    });
}
const resetData = function () {
    if (!formRef.value) {
        return;
    }
    formRef?.value.resetFields();
    if (!fieldFormRef.value) {
        return;
    }
    fieldFormRef?.value.resetFields();
    fieldForm.value.fields = [];
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

.border {
    border: 1px solid var(--el-border-color);
    margin-top: 22px;
    padding-top: 22px;
}
</style>