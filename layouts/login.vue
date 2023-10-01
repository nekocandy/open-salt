<script setup lang="ts">
import BackgroundImage from '~/assets/bg.jpg'
</script>

<template>
  <div

    :style="{
      // backgroundImage: `url(${BackgroundImage})`,
    }"

    h-screen flex items-center justify-center bg-yellow-100 bg-cover bg-center bg-no-repeat
  >
    <slot />
  </div>
</template>

<style scoped>

</style>
