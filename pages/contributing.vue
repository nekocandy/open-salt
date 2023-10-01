<script setup lang="ts">
import ContributionGuidelines from '~/assets/Contribution.txt'

const { $client } = useNuxtApp()
const repositoriesWithoutContributingGuidelines = $client.githubRouter.getRepositoryWithoutFile.useLazyQuery({
  filePath: 'CONTRIBUTING.md',
})

onMounted(() => {
  repositoriesWithoutContributingGuidelines.refresh()
})

async function addCoC(repositoryName: string) {
  const contributionData = await useFetch(ContributionGuidelines)
  const mutationData = await $client.githubRouter.addFile.mutate({
    repositoryName,
    // @ts-expect-error typing issue
    contents: contributionData.data.value || 'no-data',
    filePath: 'CONTRIBUTING.md',
    message: 'docs: add contributing guidelines | added from website',
  })

  if (mutationData)
    repositoriesWithoutContributingGuidelines.refresh()

  // eslint-disable-next-line no-alert
  alert(`added contributing guidelines to ${repositoryName}`)
}
</script>

<template>
  <div flex flex-col gap-4>
    <h1 text-4xl font-black uppercase>
      Contribution Guidelines
    </h1>

    <div flex flex-col gap-4>
      <div flex-col gap-2>
        <h1 text-2xl font-bold>
          Your Repositories without Contribution Guidelines:
        </h1>

        <h1 font-sans>
          click to add Contribution Guidelines to the repository
        </h1>
      </div>

      <div v-if="repositoriesWithoutContributingGuidelines.status.value === 'success' " grid grid-cols-4 gap-4>
        <button
          v-for="repo in repositoriesWithoutContributingGuidelines.data.value" :key="
            // @ts-expect-error typing issue
            repo.id
          " flex items-center gap-3 rounded-md bg-white px-4 py-4 @click="
            // @ts-expect-error typing issue
            addCoC(repo.name)
          "
        >
          <div i-iconoir-repository />

          {{
            // @ts-expect-error typing issue
            repo.name
          }}

          <div i-tabler-plus />
        </button>
      </div>

      <div v-else>
        Loading...
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
