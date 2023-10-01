<script setup lang="ts">
</script>

<template>
  <div

    h-screen flex gap-4 overflow-y-hidden bg-yellow-100 font-mono
  >
    <div>
      <Sidebar />
    </div>

    <div flex-1 overflow-y-auto px-4 py-4>
      <slot />
    </div>
  </div>
</template>

<style scoped>

</style>
