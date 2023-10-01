<script setup lang="ts">
import LicenseData from '~/assets/license.json'
import type { ILicenseData } from '~/lib/types/License'

const licenseData: ILicenseData[] = LicenseData as any
</script>

<template>
  <div flex flex-col gap-4>
    <h1 text-4xl font-black uppercase>
      Open Source Licenses:
    </h1>
    <div grid grid-cols-4 gap-4 overflow-y-auto>
      <LicenseCard v-for="license in licenseData" :key="license.title" :license-data="license" />
    </div>
  </div>
</template>

<style scoped></style>
