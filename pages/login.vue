<script setup lang="ts">
definePageMeta({
  layout: 'login',
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: 'dashboard',
  },
})

const { signIn, status } = useAuth()

async function login() {
  if (status.value === 'authenticated')
    return navigateTo('/dashboard')

  await signIn('github')
}
</script>

<template>
  <div flex flex-col gap-8>
    <div flex flex-col gap-2 text-center>
      <div flex items-center justify-center rounded-md bg-yellow-200 py-12>
        <div i-game-icons-salt-shaker h-12 w-12 text-orange />
      </div>
      <span text-center text-2xl font-black uppercase text-orange>Open Salt</span>
    </div>

    <div flex flex-col items-center justify-center gap-8 rounded-md bg-orange bg-opacity-20 px-8 py-8 font-mono>
      <h1 text-md font-black uppercase>
        salt for your open source repos~
      </h1>
      <button flex items-center justify-center gap-2 rounded-md bg-white px-12 py-4 text-lg font-bold class="hover:bg-opacity-90" @click="login">
        <div i-simple-icons-github h-6 w-6 />
        Login with Github
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>
