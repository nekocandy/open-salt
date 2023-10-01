<script setup lang="ts">
definePageMeta({
  auth: false,
})
const { status } = useAuth()

if (status.value === 'authenticated')
  navigateTo('/dashboard')
else
  navigateTo('/login')
</script>

<template>
  <div />
</template>

<style scoped>

</style>
