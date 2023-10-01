<script setup lang="ts">
import CodeOfConduct from '~/assets/CoC.txt'

const { $client } = useNuxtApp()
const repositoriesWithoutCodeOfConduct = $client.githubRouter.getRepositoryWithoutCodeOfConduct.useLazyQuery()

onMounted(() => {
  repositoriesWithoutCodeOfConduct.refresh()
})

async function addCoC(repositoryName: string) {
  const cocData = await useFetch(CodeOfConduct)
  const mutationData = await $client.githubRouter.addFile.mutate({
    repositoryName,
    // @ts-expect-error typing issue
    contents: cocData.data.value || 'no-data',
    filePath: 'CODE_OF_CONDUCT.md',
    message: 'docs: add code of conduct | added from website',
  })

  if (mutationData)
    repositoriesWithoutCodeOfConduct.refresh()

  // eslint-disable-next-line no-alert
  alert(`added code of conduct to ${repositoryName}`)
}
</script>

<template>
  <div flex flex-col gap-4>
    <h1 text-4xl font-black uppercase>
      Code of Conduct:
    </h1>

    <div flex flex-col gap-4 rounded-md bg-yellow-200 px-12 py-6 text-center text-2xl font-extrabold font-sans text-gray-700>
      <q>
        A code of conduct that isn’t (or can’t be) enforced is worse than no code of conduct at all: it sends the message that the values in the code of conduct aren’t actually important or respected in your community.
      </q>

      <span text-right>
        ~Ada Initiative
      </span>
    </div>

    <div flex flex-col gap-4>
      <div flex-col gap-2>
        <h1 text-2xl font-bold>
          Your Repositories without Code of Conduct:
        </h1>

        <h1 font-sans>
          click to add Code Of Conduct to the repository
        </h1>
      </div>

      <div v-if="repositoriesWithoutCodeOfConduct.status.value === 'success' " grid grid-cols-4 gap-4>
        <button v-for="repo in repositoriesWithoutCodeOfConduct.data.value" :key="repo.id" flex items-center gap-3 rounded-md bg-white px-4 py-4 @click="addCoC(repo.name)">
          <div i-iconoir-repository />
          {{ repo.full_name }}

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
