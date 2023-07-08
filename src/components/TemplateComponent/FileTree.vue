<template>
    <div>
        <el-divider content-position="left">文件结构</el-divider>
        <el-tree ref="treeRef" :data="dataSource" node-key="id" default-expand-all highlight-current
            :expand-on-click-node="false" :props="{ class: myTreeNode }">
            <template #default="{ node, data }">
                <div class="custom-tree-node" @click="clickFunc(node, data)">
                    <span>{{ node.label }}</span>
                    <span>
                        <el-button plain class="tiny-button" type="primary" :icon="Plus" circle
                            @click.stop="showDialog(data)" v-show="data.folder == true" />
                        <el-button plain class="tiny-button" type="danger" :icon="Minus" circle
                            @click.stop="remove(node, data)" />
                    </span>
                </div>
            </template>
        </el-tree>
        <el-row>
            <el-col :span="24"><el-button plain :icon="Plus" class="fullBtn" @click="showDialog"></el-button></el-col>
        </el-row>

        <!-- 新增弹出 -->
        <el-dialog v-model="dialogFormVisible" :title="dialogTitle">
            <el-form ref="addFormRef" :model="addForm" :rules="rules">
                <el-form-item label="名称" label-width="100px" prop="name">
                    <el-input v-model.trim="addForm.name" autocomplete="off" />
                </el-form-item>
                <el-form-item label="类型" label-width="100px" prop="type">
                    <el-radio-group v-model="addForm.type">
                        <el-radio label="folder">文件夹</el-radio>
                        <el-radio label="file">文件</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="addNode(addFormRef)">
                        保存
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
  
<script setup>
import { Plus, Minus } from '@element-plus/icons-vue'
import { ref, reactive, defineEmits } from 'vue'
const emit = defineEmits(['onClick']);
const myTreeNode = () => {
    return 'myTreeNode';
}
const treeRef = ref(null);
const dataSource = ref([{
    id: 1,
    label: 'kcapplwh',
    folder: true,
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

const remove = (node, data) => {
    const parent = node.parent
    const children = parent.data.children || parent.data
    const index = children.findIndex((d) => d.id === data.id)
    children.splice(index, 1)
    dataSource.value = [...dataSource.value]
}

const clickFunc = function (node, data) {
    if (data.folder == true) {
        return;
    }
    emit('onClick', data);
}

const addFormRef = ref(null);
const addNode = function (addFormRef) {
    addFormRef.validate((valid) => {
        if (!valid) {
            return;
        }
        const newNode = { id: Date.now(), label: addForm.value.name, folder: addForm.value.type === 'folder', children: [] }
        treeRef.value?.append(newNode, addForm.value?.parent);
        dialogFormVisible.value = false;
    })
}

// ---------dialog相关------------
const dialogTitle = ref('新增');
const addForm = ref({
    parent: '',
    name: '',
    type: ''
});
const rules = reactive({
    name: [
        {
            required: true,
            message: '请输入文件/文件夹名称',
            trigger: 'blur',
        },
        {
            min: 1,
            max: 40,
            message: '名称长度为1~40位字符！',
            trigger: 'blur'
        }
    ]
});
const dialogFormVisible = ref(false);

/**
 * 显示新增弹窗
 */
const showDialog = function (data) {
    addFormRef.value?.resetFields();
    dialogFormVisible.value = true;
    addForm.value.parent = data?.id;
    // 默认为file
    addForm.value.type = 'file';
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

.fullBtn {
    margin: 12px 2px;
    padding: 0;
    font-size: 18px;
    color: var(--el-border-color);
    width: 100%;
    border: 2px dashed var(--el-border-color);
}
</style>
  