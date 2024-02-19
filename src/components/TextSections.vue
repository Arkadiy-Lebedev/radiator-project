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
  <p class=" text-indigo-800  hover:text-indigo-600 cursor-pointer underline" :class="{ active: title == section.text }" >
  
     {{ section.text }} 
    </p>  
</template>


<style scoped>


.active{
color:rgb(0, 146, 15)
}
</style>
