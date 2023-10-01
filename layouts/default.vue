<script setup lang="ts">
</script>

<template>
  <div

    h-screen
    flex gap-4
    bg-yellow-100
  >
    <div>
      <Sidebar />
    </div>

    <div flex-1 px-4 py-4>
      <slot />
    </div>
  </div>
</template>

<style scoped>

</style>
