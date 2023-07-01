<template>
    <el-form ref="formRef" :model="ruleForm" :rules="rules" label-width="120px" :size="'large'" status-icon>
        <el-form-item label="Activity name" prop="name">
            <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="Activity zone" prop="region">
            <el-select v-model="ruleForm.region" placeholder="Activity zone">
                <el-option label="Zone one" value="shanghai" />
                <el-option label="Zone two" value="beijing" />
            </el-select>
        </el-form-item>
        <el-form-item label="Activity time" required>
            <el-col class="relative" :span="8">
                <el-form-item prop="date1">
                    <el-date-picker v-model="ruleForm.date1" type="date" label="Pick a date" placeholder="Pick a date"
                        style="width: 100%" />
                </el-form-item>
            </el-col>
            <el-col class="text-center" :span="8">
                <span class="text-gray-500">-</span>
            </el-col>
            <el-col class="relative" :span="8">
                <el-form-item prop="date2">
                    <el-time-picker v-model="ruleForm.date2" label="Pick a time" placeholder="Pick a time"
                        style="width: 100%" />
                </el-form-item>
            </el-col>
        </el-form-item>
        <el-form-item label="Instant delivery" prop="delivery">
            <el-switch v-model="ruleForm.delivery" />
        </el-form-item>
        <el-form-item label="Activity type" prop="type">
            <el-checkbox-group v-model="ruleForm.type">
                <el-checkbox label="Online activities" name="type" />
                <el-checkbox label="Promotion activities" name="type" />
                <el-checkbox label="Offline activities" name="type" />
                <el-checkbox label="Simple brand exposure" name="type" />
            </el-checkbox-group>
        </el-form-item>
        <el-form-item label="Resources" prop="resource">
            <el-radio-group v-model="ruleForm.resource">
                <el-radio label="Sponsorship" />
                <el-radio label="Venue" />
            </el-radio-group>
        </el-form-item>
        <el-form-item label="Activity form" prop="desc">
            <el-input v-model="ruleForm.desc" type="textarea" />
        </el-form-item>
    </el-form>
</template>
  
<script setup>
import { ref, reactive, defineExpose, defineEmits } from 'vue'

const ruleForm = reactive({
    name: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
});
const rules = reactive({
    date1: [
        {
            type: 'date',
            required: false,
            message: 'Please pick a date',
            trigger: 'change',
        },
    ],
    date2: [
        {
            type: 'date',
            required: false,
            message: 'Please pick a time',
            trigger: 'change',
        },
    ],
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