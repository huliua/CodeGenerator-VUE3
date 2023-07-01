import { defineStore } from "pinia";
import { ref } from "vue";

export const useCounterStore = defineStore("counter", () => {
    // 定义数据
    const count = ref(0);

    // 定义数据修改方法
    const increase = function() {
        count.value++;
    }

    // 返回对象
    return {
        count,
        increase
    }
})