<script setup lang="ts">
import type { IEyeliner } from "../types/IEyeliner"

defineProps<{
  item: IEyeliner

}>()

const emit = defineEmits<{
  (e: 'select_item', item: IEyeliner): void

}>()

</script>

<template>
  <div class="flex w-full items-center justify-between mb-5">
    <div class="flex gap-3">
      <div class="flex flex-col">
        <img :src="item.img" alt="logo" />
        <p class="status-text">{{ item.status  }}</p>
        
      </div>
      
      {{ item.text }}
    </div>
    <div class="">
      <Button @click="emit('select_item', item)" icon="pi pi-check" label="Выбрать" severity="Primary" size="small"></Button>
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
</style>
