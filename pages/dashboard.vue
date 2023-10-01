<script setup lang="ts">
const { data } = useAuth()
</script>

<template>
  <div flex flex-col gap-6>
    <div>
      <img w-full :src="`http://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=${data?.user.username}&theme=calm`" alt="">
    </div>

    <div flex gap-8>
      <img w-full :src="`http://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=${data?.user.username}&theme=calm`" alt="">
      <img w-full :src="`http://github-profile-summary-cards.vercel.app/api/cards/most-commit-language?username=${data?.user.username}&theme=calm`" alt="">
      <img w-full :src="`http://github-profile-summary-cards.vercel.app/api/cards/stats?username=${data?.user.username}&theme=calm`" alt="">
      <img w-full :src="`http://github-profile-summary-cards.vercel.app/api/cards/productive-time?username=${data?.user.username}&theme=calm&utcOffset=8`" alt="">
    </div>

    <img :src="`https://github-readme-activity-graph.vercel.app/graph?username=${data?.user.username}&theme=vue`" alt="">
  </div>
</template>

<style scoped>

</style>
