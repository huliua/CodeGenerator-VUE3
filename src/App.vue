<script setup>
import { ref, onMounted, shallowRef } from 'vue'
import { Delete, MagicStick, Sunny, Moon } from '@element-plus/icons-vue'
import InfiniteCardList from '@/components/InfiniteCardList/index.vue';
import AddDialog from '@/components/AddDialog/index.vue';
import { useDark, useToggle } from '@vueuse/core'

const mainClass = ref('common-theme')

// 从localstorage中获取主题
const theme = window.localStorage.getItem('theme')
if (theme) {
  mainClass.value = theme;
}

// 数据主键字段
const primaryKey = "index";
// 数据加载默认页码为8
const pageSize = ref(50);
// 卡片组件按钮列表
const buttonList = ref([{
  name: '编辑',
  type: 'primary',
  icon: shallowRef(MagicStick),
  funcName: 'doEdit'
}, {
  name: '删除',
  type: 'danger',
  icon: shallowRef(Delete),
  funcName: 'doDelete'
}]);

/**
 * 处理按钮点击事件
 * @param {Object} param 事件触发对应
 * @param {String} param.funcName 响应触发按钮的事件名称
 * @param {String} param.primaryKey 对应的主键数据值
 */
const buttonClick = (param) => {
  console.log(param);
}

// 卡片列表组件实例
const infiniteCardList = ref();
/**
 * 加载表单数据
 * @param {Object} param 加载数据必要参数
 * @param {Number} param.pageNumber 当前页码
 * @param {Number} param.pageSize 每一页加载的数据量
 * @example { pageNumber: 1,pageSize: 10 }
 */
const loadData = (param) => {
  // 加载数据中
  infiniteCardList.value.changeIsLoading(true);
  for (let index = 1; index <= pageSize.value; index++) {
    infiniteCardList.value.datas.push({
      index: (param.pageNumber - 1) * param.pageSize + index,
      title: (param.pageNumber - 1) * param.pageSize + index,
    });
  }

  // 加载数据成功后，页码加1
  infiniteCardList.value.pageNumberUp();
  // 加载数据完毕
  setTimeout(function () {
    infiniteCardList.value.changeIsLoading(false);
  }, 2000);
}

// 添加模板
const addDialog = ref(null);
const showAdd = function () {
  addDialog.value.showDialog();
}

onMounted(() => {
  // 进入页面后加载数据
  loadData({
    pageNumber: 1,
    pageSize: pageSize.value
  });
});

// 白天/夜间模式切换
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <el-container :class="mainClass + ' fullscreen'">
    <!-- 头部 -->
    <el-header> 生成只因 </el-header>
    <!-- 主体 -->
    <el-main>

      <!-- 按钮列表 -->
      <el-row>
        <el-button type="primary" @click="showAdd">新增模板</el-button>
        <el-button @click="toggleDark()" :class="(isDark ? 'bg-color-blank' : 'bg-color-white') + ' my-switch-button'" round>
          <div :class="!isDark ? 'my-switch-left my-switch-icon' : 'my-switch-icon'">
            <el-icon v-show="!isDark">
              <Sunny />
            </el-icon>
            <el-icon v-show="isDark">
              <Moon />
            </el-icon>
          </div>
        </el-button>
      </el-row>

      <el-divider />

      <el-row>
        <!-- 卡片展示列表 -->
        <InfiniteCardList ref="infiniteCardList" :buttonList="buttonList" :primaryKey="primaryKey" :pageSize="pageSize"
          @onLoadData="loadData" @onBtnClick="buttonClick">
        </InfiniteCardList>
      </el-row>

      <AddDialog :title="'新增模板'" ref="addDialog"></AddDialog>

    </el-main>
    <!-- 底部 -->
    <el-footer>Footer</el-footer>
  </el-container>
</template>
<style>
.fullscreen {
  width: 100%;
  height: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 300px;
}

.card-header-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.my-switch-button {
  width: 60px;
  position: relative;
  background-color: var(--el-bg-color-page);
}

.my-switch-icon {
  position: absolute;
  border-radius: 50%;
  font-size: 18px;
  background-color: var(--el-bg-color);
  width: 18px;
  height: 18px;
}
.my-switch-left {
  left: 10px;
}
</style>
