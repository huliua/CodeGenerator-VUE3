<script setup>
import { ref, defineProps, defineEmits, defineExpose, watch, onMounted } from 'vue'

// 触发多久显示toolTip，单位毫秒
const toolTipShowAfter = ref(1000)
const emit = defineEmits(['onLoadData', 'onBtnClick'])
defineProps({
  buttonList: Array, // 按钮列表
  primaryKey: String // 主键
})

// 加载数据
const total = ref(152) // 数据总量
const isLoading = ref(false) // 是否正在加载数据
const pageNumber = ref(1) // 页码
const pageSize = ref(10) // 每页数量
const datas = ref([])
const loadData = function () {
  const em = emit('onLoadData', {
    pageSize: pageSize.value,
    pageNumber: pageNumber.value
  })
  console.log(em)
}
const handleSizeChange = function (newSize) {
  pageSize.value = newSize
}
const handleCurrentChange = function (newPageNumber) {
  pageNumber.value = newPageNumber
}
const changeIsLoading = function (newValue) {
  isLoading.value = newValue
}

// 处理按钮点击事件
const btnClick = function (funcName, primaryKey) {
  emit('onBtnClick', { funcName, primaryKey })
}

// 暴露数据给父组件
defineExpose({ datas, changeIsLoading })

// 显示加载中动画
let loadingObj = void 0
watch(isLoading, function (newValue) {
  if (newValue == true) {
    loadingObj = ElLoading.service({
      lock: true,
      text: 'Loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
  } else {
    loadingObj?.close()
  }
})

watch([pageNumber, pageSize], () => {
  loadData()
})
onMounted(() => {
  loadData()
})
</script>
<template>
  <el-space class="mainContent" wrap :size="22">
    <el-card class="box-card" v-for="item in datas" :key="item[primaryKey]">
      <template #header>
        <div class="card-header">
          <span>{{ item.title }}</span>
          <div class="card-header-buttons">
            <el-tooltip
              v-for="btn in buttonList"
              :key="btn.name"
              class="box-item"
              effect="dark"
              :content="btn.name"
              placement="top"
              :show-after="toolTipShowAfter"
            >
              <el-button
                link
                :type="btn.type"
                :icon="btn.icon"
                @click="btnClick(btn.funcName, item[primaryKey])"
              />
            </el-tooltip>
          </div>
        </div>
      </template>
      <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
    </el-card>
  </el-space>
  <el-divider border-style="dotted" />
  <el-row>
    <el-col :span="18">
      <el-pagination
        :small="true"
        :background="true"
        :disabled="isLoading"
        layout="prev, pager, next, jumper, total, sizes"
        :page-sizes="[10, 20, 50, 100]"
        :total="total"
        :current-page="pageNumber"
        :current-size="pageSize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-col>
  </el-row>
</template>

<style scoped>
.mainContent {
  width: 98%;
  height: auto;
}
</style>
