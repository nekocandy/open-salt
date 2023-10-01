<script setup lang="ts">
import { parse } from 'marked'
import Badges from '~/assets/badges.txt'

const badgesData = ref('')

onMounted(async () => {
  badgesData.value = (await useFetch(Badges)).data.value as string
})
</script>

<template>
  <div mx-auto max-w-2xl>
    <h1>Badges</h1>
    <div prose v-html="parse(badgesData)" />
  </div>
</template>

<style scoped>

</style>
