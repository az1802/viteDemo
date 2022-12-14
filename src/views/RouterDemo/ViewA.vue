<script setup lang="ts">
defineProps<{
  msg: string;
}>();
</script>

<template>
  <div>msg---{{ msg }}</div>
</template>

<style lang="less" scoped></style>
