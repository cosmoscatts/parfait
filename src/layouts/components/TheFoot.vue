<script setup lang="ts">
import { appMeta } from '~/config'

const { footCopyRight } = appMeta
</script>

<template>
  <div flex-center font-bold text-14px>
    {{ footCopyRight }}
  </div>
</template>

