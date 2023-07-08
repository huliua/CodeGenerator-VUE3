<template>
    <el-row :gutter="40">
        <el-col :span="10">
            <FileTreeVue @onClick="fileTreeClick" />
        </el-col>
        <el-divider direction="vertical" class="vertical" :borderStyle="'dashed'"></el-divider>
        <el-col :span="12">
            <TemplateContentVue ref="templateContent" />
        </el-col>
    </el-row>
</template>
<script setup>
import FileTreeVue from './FileTree.vue';
import TemplateContentVue from './TemplateContent.vue';
import { ref } from 'vue'
const templateContent = ref(null);
const fileTreeClick = function (data) {
    templateContent.value.show(data.id);
}
</script>
<style scoped>
.vertical {
    height: 31em;
}
</style>