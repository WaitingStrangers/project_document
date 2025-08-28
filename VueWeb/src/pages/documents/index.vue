<template>
    <div>
        报告胶片数据页面
        <div>筛选条件</div>
        <div>数据展示</div>
    </div>
    
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { docRouter } from "@/service/documents"

onMounted(async ()=>{
    //请求数据
    try{
        const getReportData = await docRouter.getallData();
        console.log(getReportData);
    }
});
</script>