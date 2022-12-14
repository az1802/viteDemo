<script setup lang="ts">
import ViewA from './ViewA.vue';
defineOptions({
  name: 'router-demo',
  inheritAttrs: false,
});

const count = ref(1);
const msg = ref('str');
function add() {
  count.value++;
}
</script>

<template>
  <div>routeer test</div>
  <button @click="add">add</button>
  <div>{{ count }}</div>
  <ViewA :msg="msg" />
</template>

<style lang="less" scoped></style>
