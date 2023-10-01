<script setup lang="ts">
import BackgroundImage from '~/assets/bg.jpg'
</script>

<template>
  <div

    :style="{
      // backgroundImage: `url(${BackgroundImage})`,
    }"

    h-screen flex flex-col gap-4 bg-yellow-100 bg-cover bg-center bg-no-repeat
    px-4 py-4
  >
    <div />

    <div flex-1>
      <slot />
    </div>
  </div>
</template>

<style scoped>

</style>
