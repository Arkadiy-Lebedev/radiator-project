<script setup lang="ts">
import type { IColor } from "../types/IColor"

defineProps<{
  item: IColor

}>()

const emit = defineEmits<{
  (e: 'select_color', item: IColor): void

}>()

</script>

<template>
  <div class="flex mb-5 ">
    <div class="flex gap-3 cursor-pointer" @click="emit('select_color', item)">
      <div class="color-box"  :style="{ backgroundColor: item.bg != '' ? item.bg : '',   
      backgroundImage: item.img != '' ? `url(${item.img})` : ''}">
              
      </div>
      <p class=" w-24 text-xs">{{ item.text }}</p>
      
    </div>
 


  </div>
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
