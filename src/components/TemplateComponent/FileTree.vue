<template>
    <div>
        <el-divider content-position="left">文件结构</el-divider>
        <el-tree :data="dataSource" node-key="id" default-expand-all highlight-current :expand-on-click-node="false" :props="{class: myTreeNode}">
            <template #default="{ node, data }">
                <div class="custom-tree-node" @click="clickFunc(data)">
                    <span>{{ node.label }}</span>
                    <span>
                        <el-button plain class="tiny-button" type="primary" :icon="Plus" circle @click.stop="append(data)" />
                        <el-button plain class="tiny-button" type="danger" :icon="Minus" circle @click.stop="remove(node, data)" />
                    </span>
                </div>
            </template>
        </el-tree>
    </div>
</template>
  
<script setup>
import { Plus, Minus } from '@element-plus/icons-vue'
import { ref, defineEmits } from 'vue'
const emit = defineEmits(['onClick']);
const myTreeNode = () => {
    return 'myTreeNode';
}
const dataSource = ref([{
    id: 1,
    label: 'kcapplwh',
    children: [{
        id: '1-1',
        label: 'kcapplwh.js'
    }, {
        id: '1-2',
        label: 'kcapplwhBS.js'
    }, {
        id: '1-3',
        label: 'kcapplwhIndexPage.html'
    }]
}]);

let id = 2;
const append = (data) => {
    ElMessageBox.prompt('请输入文件或文件夹名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
    }).then(({ value }) => {
        const newChild = { id: id++, label: value, children: [] }
        if (!data.children) {
            data.children = []
        }
        data.children.push(newChild)
        dataSource.value = [...dataSource.value]
    }).catch(() => {

    })
}

const remove = (node, data) => {
    const parent = node.parent
    const children = parent.data.children || parent.data
    const index = children.findIndex((d) => d.id === data.id)
    children.splice(index, 1)
    dataSource.value = [...dataSource.value]
}

const clickFunc = function (data) {
    if (data.children && data.children.length > 0) {
        return;
    }
    emit('onClick', data);
}
</script>
  
<style>
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
    height: 30px;
}

/* 自定义按钮样式 */
.tiny-button {
    font-size: 10px;
    width: 14px;
    height: 14px;
}

/* 覆盖默认样式 */
.myTreeNode .el-tree-node__content {
    display: flex;
    align-items: center;
    height: 40px;
    cursor: pointer;
}
</style>
  