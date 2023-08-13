<script lang="ts" setup>

import StatsWrapper from '@/components/ModelCard/StatsWrapper.vue'

const props = defineProps<{
  downloads: number | undefined
}>()

</script>

<template>
  <StatsWrapper :stat="props.downloads ?? 0">
    <svg xmlns="http://www.w3.org/2000/svg"
         width="10%"
         height="10%"
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         stroke-width="2"
         stroke-linecap="round"
         stroke-linejoin="round">
      <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"/>
      <path d="M7 11l5 5l5 -5"/>
      <path d="M12 4l0 12"/>
    </svg>
  </StatsWrapper>
</template>

<style lang="scss" module>

</style>