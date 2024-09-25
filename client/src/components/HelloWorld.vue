<script setup lang="ts">
import {ref, watch} from 'vue'
import Graph from "../avanda/src";

Graph.setRequestConfig({
  headers:{
    Authorization: `Bearer ${'hello-wprd'}`
  },
  // withCredentials: true,
  baseURL: "http://localhost:8000"
})

let file = ref(null)

watch(file, async (newV) => {
  let user = await new Graph().service("User/get").where({id: 1}).post({
    full_name: 'adew',
    age: 90,
    picture: file
  })
  // console.log(u)
})

// // let blog = new Graph().service("Blog/get")
// let user = await new Graph().service('User/add').post({
//   full_name: 'razaq',
//   pic: Graph.File({})
// })

</script>

<template>
  hello world
  <input multiple type="file" @change="file = $event">

  {{user}}
</template>
