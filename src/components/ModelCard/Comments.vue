<script lang="ts" setup>

import StatsWrapper from '@/components/ModelCard/StatsWrapper.vue'
import { computed } from 'vue'

const props = defineProps<{
  comments: number
}>()

const strComments = computed(() => props.comments ?? 0)

</script>

<template>
  <StatsWrapper :stat="props.comments">
    <svg xmlns="http://www.w3.org/2000/svg"
         width="100%"
         height="100%"
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         stroke-width="2"
         stroke-linecap="round"
         stroke-linejoin="round"
         class="tabler-icon tabler-icon-message-circle-2">
      <path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1"/>
    </svg>
  </StatsWrapper>
</template>

<style lang="scss" module>

</style>