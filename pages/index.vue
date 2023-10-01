<script setup lang="ts">
const { signIn, status, signOut } = useAuth()

async function login() {
  if (status.value === 'authenticated')
    await signOut()

  await signIn('github')
}
</script>

<template>
  <div class="h-screen flex items-center justify-center bg-zinc-900 font-mono text-white">
    <button @click="login">
      Login with WitHub
    </button>
  </div>
</template>

<style scoped>

</style>
