<template>
    <div class="">
        <Doughnut :data="options" :options="data" />
    </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';
import { reactive } from 'vue';
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);



const props = defineProps({
    data:{
        type:Array,
        required:true,
        default: () => ([0,0,0])
    }
})

const options = reactive({
    labels: ['Ingresos', 'Gastos', 'Balance'],
  datasets: [
    {
      backgroundColor: ['#41B883', '#E46651', '#00D8FF'],
      data: props.data.map(Number),
    },
  ],
});

const data = reactive({
  responsive: true,
  maintainAspectRatio: false,
});
</script>

<style scoped>

</style>