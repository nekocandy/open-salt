<script setup lang="ts">
const { data } = useAuth()

interface IPath {
  name: string
  path: string
  icon?: string
}

const PATHS: IPath[] = [
  {
    name: 'License',
    path: '/license',
  },
]
</script>

<template>
  <div h-full flex flex-col items-center justify-between px-4 py-4 font-mono>
    <div>
      better OpenSauce
    </div>

    <div>
      <NuxtLink v-for="path in PATHS" :key="path.path" class="hover:underline" cursor-pointer text-lg font-bold uppercase>
        {{ path.name }}
      </NuxtLink>
    </div>

    <div flex items-center justify-center gap-2>
      <img h-8 w-8 rounded-full :src="data?.user.image || 'https://pycz.dev/oink.svg'" alt="">
      <div flex flex-col gap-1 text-xs>
        <div>
          {{ data?.user.name }}
        </div>

        <div v-if="data?.user.name !== data?.user.username" text-gray-700>
          {{ data?.user.username }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
