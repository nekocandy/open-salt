<script setup lang="ts">
const { $client } = useNuxtApp()
const repositoriesWithoutCodeOfConduct = await $client.githubRouter.getRepositoryWithoutCodeOfConduct.query()
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
      <h1 text-2xl font-bold>
        Repositories without Code of Conduct:
      </h1>

      <div grid grid-cols-4>
        <div v-for="repo in repositoriesWithoutCodeOfConduct" :key="repo.id">
          {{ repo.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
