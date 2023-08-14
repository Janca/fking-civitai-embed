<script lang="ts" setup>

import FkStat from '@/components/ModelCard/Statistics/FkStat.vue'

const props = defineProps<{
  likes: number|undefined
}>()

</script>

<template>
  <FkStat :stat="props.likes">
    <div :class="[$style.Heart]">
      <svg xmlns="http://www.w3.org/2000/svg"
           width="100%"
           height="100%"
           viewBox="0 0 24 24"
           fill="none"
           stroke="white"
           stroke-width="2"
           stroke-linecap="round"
           stroke-linejoin="round">
        <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"/>
      </svg>
    </div>
  </FkStat>
</template>

<style lang="scss" module>
.Heart {
  margin-top: 0.5vmin;
}

.HeartActivated {
  svg {
    stroke: rgb(250, 82, 82);
    fill: rgb(250, 82, 82);
  }
}
</style>