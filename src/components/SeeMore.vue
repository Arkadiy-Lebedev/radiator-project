<script setup lang="ts">
import { ref } from 'vue'

const value = ref<string>("Показать еще")

const toggle = () => {
  if (value.value == "Показать еще") {
    value.value = "Свернуть"
  } else {
    value.value = "Показать еще"
  } 

}

</script>

<template>
  <p @click="toggle" class="text-indigo-800  hover:text-indigo-600 cursor-pointer underline">{{ value }}</p>

</template>


<style scoped>
.status-text{
      display: inline;
    padding: 0.2em 0.6em 0.3em;
    font-size: 75%;
    font-weight: 700;
    line-height: 1;
    color: #fff;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 0.25em;
        background-color: #5cb85c;
        
}

.color-box{
  border: 1px solid #808080;
    border-radius: 5px;
    height: 50px;
    width: 80px;
}


</style>
