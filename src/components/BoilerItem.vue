<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
    img: string,
    text: string,
    name:string
}>()

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
  <div class=" flex flex-col w-32 p-3 cursor-pointer" :class="{ active: name == text }">
    <div class="">
      <img class=" " :src="img" alt="logo" />   
    </div>
    <p class=" text-center text-sm mt-2">{{text}}</p>

  </div>
  

</template>


<style scoped>
.active{
  border: 1px solid rgb(158, 158, 158);
  border-radius: 2px;
  -webkit-box-shadow: -4px 5px 8px 0px rgba(34, 60, 80, 0.2);
-moz-box-shadow: -4px 5px 8px 0px rgba(34, 60, 80, 0.2);
box-shadow: -4px 5px 8px 0px rgba(34, 60, 80, 0.2);
}


</style>
