<script setup lang="ts">
import { parse } from 'marked'

const badgesData = await useFetch('/api/badges')
</script>

<template>
  <div mx-auto max-w-2xl>
    <div prose v-html="parse(badgesData.data.value as string)" />
  </div>
</template>

<style scoped>

</style>
