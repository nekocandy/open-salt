<script setup lang="ts">
import LicenseData from '~/assets/license.json'
import type { ILicenseData } from '~/lib/types/License'

const clipboard = useClipboard()
const { $client } = useNuxtApp()
const route = useRoute()
const license = route.params.license

const repositoriesWithoutLicense = await $client.githubRouter.getRepositoryWithoutLicense.query()

const data = LicenseData.filter(
// @ts-expect-error - I don't know why this is happening
  (licenseData: ILicenseData) => licenseData['spdx-id'] === license,
)[0] as unknown as ILicenseData

async function copyToClipboard() {
  await clipboard.copy(data.text)
}
</script>

<template>
  <div grid grid-cols-12 w-full gap-4 pr-6>
    <div col-span-8 w-full flex flex-col gap-4>
      <div flex flex-col gap-1>
        <h1 text-4xl font-black uppercase>
          {{ data.title }}
        </h1>

        <h3 font-bold text-gray-500>
          {{ data['spdx-id'] }}
        </h3>
      </div>

      <div text-lg font-sans>
        {{ data.description }}
      </div>

      <div grid grid-cols-3 gap-6>
        <div flex flex-col gap-2>
          <h1 text-lg font-black uppercase>
            Permissions:
          </h1>
          <div flex flex-col gap-0>
            <div v-for=" permission in data.permissions" :key="permission" flex items-center gap-2>
              <div h-4 w-4 rounded-full bg-green />
              {{ permission }}
            </div>
          </div>
        </div>

        <div flex flex-col gap-2>
          <h1 text-lg font-black uppercase>
            Conditions:
          </h1>
          <div flex flex-col gap-0>
            <div v-for=" condition in data.conditions" :key="condition" flex items-center gap-2>
              <div h-4 w-4 rounded-full bg-blue />
              {{ condition }}
            </div>
          </div>
        </div>

        <div flex flex-col gap-2>
          <h1 text-lg font-black uppercase>
            Limitations:
          </h1>
          <div flex flex-col gap-0>
            <div v-for=" limitation in data.limitations" :key="limitation" flex items-center gap-2>
              <div h-4 w-4 rounded-full bg-red />
              {{ limitation }}
            </div>
          </div>
        </div>
      </div>

      <div border-b-2 border-stone-400 />

      <div overflow-y-auto whitespace-pre-line rounded-md bg-yellow-200 px-4 py-6 text-center>
        {{ data.text }}
      </div>
    </div>

    <div col-span-4 w-full flex flex-col gap-4>
      <button flex items-center justify-center gap-2 rounded-md bg-blue px-4 py-2 text-nowrap text-black @click="copyToClipboard">
        <div i-mi-copy h-6 w-6 />
        Copy License to Clipboard
      </button>

      <div border-b-2 border-stone-400 />

      <div flex flex-col gap-4>
        <h1 font-bold uppercase>
          Note:
        </h1>

        <div>
          {{ data.note || 'No note provided.' }}
        </div>
      </div>

      <div border-b-2 border-stone-400 />

      <div v-if="repositoriesWithoutLicense.length" flex flex-col gap-2>
        <div flex flex-col gap-1 pb-2>
          <h1 text-xl font-bold uppercase>
            Repositories Without License:
          </h1>

          <span text-sm>
            click here to add license directly to repository
          </span>
        </div>
        <div v-for="repository of repositoriesWithoutLicense" :key="repository.id">
          <LicenseRepositoryAddCard :repository="repository" :license-data="data" />
        </div>
      </div>

      <div border-b-2 border-stone-400 />
    </div>
  </div>
</template>

<style scoped>

</style>
