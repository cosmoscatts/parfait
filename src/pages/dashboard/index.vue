<script setup lang="ts">
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Salary',
    dataIndex: 'salary',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
]
</script>

<template>
  <div style="height: 1800px;" w-full border="1 red">
    <a-table :columns="columns" :data="[]" />
    <span v-for="i in 7" :key="i">{{
      i
    }}</span>
  </div>
</template>
