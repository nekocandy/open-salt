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
  <div flex flex-col items-center justify-center gap-8 rounded-md bg-white bg-opacity-20 px-8 py-8 font-mono>
    <h1 text-3xl font-black uppercase>
      Open Source~
    </h1>

    <button flex items-center justify-center gap-2 rounded-md bg-white px-12 py-4 text-lg font-bold class="hover:bg-opacity-90" @click="login">
      <div i-simple-icons-github h-6 w-6 />
      Login with Github
    </button>
  </div>
</template>

<style scoped>

</style>
