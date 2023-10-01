<script setup lang="ts">
import type { ILicenseData } from '~/lib/types/License'

defineProps<{
  repository: RepositoryData[0]
  licenseData: ILicenseData
}>()

const { $client } = useNuxtApp()

type RepositoryData = Awaited<ReturnType<typeof $client.githubRouter.getRepositoryWithoutLicense.query>>
</script>

<template>
  <div flex items-center gap-2 rounded-md bg-white px-4 py-2>
    <div i-tdesign-git-repository />
    {{ repository.name }}
  </div>
</template>

<style scoped>

</style>
