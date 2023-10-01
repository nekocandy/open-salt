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
  {
    name: 'Code of Conduct',
    path: '/code-of-conduct',
  },
  {
    name: 'Readme',
    path: '/readme',
  },
  {
    name: 'Contributing',
    path: '/contributing',
  },
  {
    name: 'Badges',
    path: '/badges',
  },
]
</script>

<template>
  <div h-full flex flex-col items-center justify-between border-r-2 border-yellow-900 px-10 py-4 font-mono>
    <NuxtLink to="/dashboard" w-full flex flex-col justify-center gap-4 text-center>
      <div flex items-center justify-center rounded-md bg-yellow-200 py-12>
        <div i-game-icons-salt-shaker h-12 w-12 text-orange />
      </div>
      <span text-2xl font-black uppercase text-orange>Open Salt</span>
    </NuxtLink>

    <div flex flex-col items-center justify-center gap-4>
      <NuxtLink
        v-for="path in PATHS" :key="path.path" :to="path.path" class="hover:underline" cursor-pointer text-lg font-bold uppercase :class="{
          'bg-yellow-300': $route.path.startsWith(path.path),
        }"
      >
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
