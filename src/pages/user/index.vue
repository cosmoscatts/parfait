<script setup lang="ts">
// import UserModal from './components/UserModal.vue'
import UserSearchForm from './components/UserSearchForm.vue'
</script>

<template>
  <div>
    <a-card title="查询用户">
      <UserSearchForm :role-options="[]" />
    </a-card>
  </div>
</template>
