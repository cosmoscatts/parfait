<script setup lang="ts"></script>

<template>
  <div of="x-auto y-hidden">
    <RouterLink
      v-for="tag in tags"
    />
  </div>
</template>
