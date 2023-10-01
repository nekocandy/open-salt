<script setup lang="ts">
import type { ILicenseData } from '~/lib/types/License'

const props = defineProps<{
  repository: RepositoryData[0]
  licenseData: ILicenseData
}>()

const { $client } = useNuxtApp()

type RepositoryData = Awaited<ReturnType<typeof $client.githubRouter.getRepositoryWithoutLicense.query>>

async function addLicense() {
  // eslint-disable-next-line no-alert
  const toContinue = confirm(`Are you sure you want to add the ${props.licenseData.title} license to ${props.repository.name}?`)
  if (!toContinue)
    return

  await $client.githubRouter.addFile.mutate({
    repositoryName: props.repository.name,
    contents: props.licenseData.text,
    filePath: 'LICENSE',
    message: 'docs: add license | added from website',
  })

  // eslint-disable-next-line no-alert
  alert(`Successfully added the ${props.licenseData.title} license to ${props.repository.name}`)
}
</script>

<template>
  <button w-full flex items-center gap-2 rounded-md bg-white px-4 py-2 @click="addLicense">
    <div i-tdesign-git-repository />
    {{ repository.name }}
  </button>
</template>

<style scoped>

</style>
