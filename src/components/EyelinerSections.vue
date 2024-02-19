<script setup lang="ts">
import EyelinerItem from "./EyelinerItem.vue"
import type { IEyeliner } from "../types/IEyeliner"

interface IProps {
  eyeliner: {
    title: string,
    items:  IEyeliner[]
  }
 
}


defineProps<IProps>()

const emit = defineEmits<{
  (e: 'select_item', item: IEyeliner): void

}>()


const select_item = (item: IEyeliner) => {
  console.log(item)
  emit('select_item', item)
}

</script>

<template>
  <div class="flex flex-col w-full">
    <p class=" text-xl mb-5 text-center">
      {{ eyeliner.title }}
    </p>
  
        <EyelinerItem v-for="(item, index) of eyeliner.items" :key="index"  :item="item" @select_item="select_item"></EyelinerItem>

  </div>
</template>


<style scoped>
.active {
  color: rgb(0, 146, 15)
}
</style>
