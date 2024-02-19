<script setup lang="ts">
defineProps<{
  section: {
     img: string,
    text: string
  },
  title: string
}>()

</script>

<template>
  <div :class="{ active: title == section.text }" class="pb-1 cursor-pointer">
     <img :src="section.img" alt="logo" />   
    </div>  
</template>


<style scoped>
.active{
  
  border-bottom: 2px solid rgb(0, 97, 0);
}
</style>
