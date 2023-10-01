<script setup lang="ts">
import type { ILicenseData } from '~/lib/types/License'

defineProps<{
  licenseData: ILicenseData
}>()
</script>

<template>
  <NuxtLink :to="`/license/info/${licenseData['spdx-id']}`" flex flex-col gap-4 rounded-md bg-yellow-200 px-4 py-4>
    <h1>{{ licenseData.title }}</h1>

    <p text-xs>
      {{
        licenseData.description
      }}
    </p>
  </NuxtLink>
</template>

<style scoped>

</style>
