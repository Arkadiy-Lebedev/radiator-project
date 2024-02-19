<script setup lang="ts">
import type { IColor } from "../types/IColor"
import ColorItem from "./ColorItem.vue"

interface IProps {
  colors: {
    title: string,
    items: IColor[]
  }

}

defineProps<IProps>()

const emit = defineEmits<{
  (e: 'select_color', item: IColor): void

}>()


const select_color = (item: IColor) => {
  console.log(item)
  emit('select_color', item)
}

</script>

<template>
  <div class="flex flex-col w-full">
    <p class=" text-xl mb-5 text-center">
      {{ colors.title }}
    </p>
  
    <div class="flex flex-wrap gap-2">
      <ColorItem v-for="(item, index) of colors.items" :key="index"  :item="item" @select_color="select_color"></ColorItem>
    </div>
        

  </div>
</template>


<style scoped>
.active {
  color: rgb(0, 146, 15)
}
</style>
