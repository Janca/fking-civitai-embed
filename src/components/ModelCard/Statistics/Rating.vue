<script lang="ts" setup>
import {computed, toRefs} from 'vue'

import StarIcon from '@/components/ModelCard/Statistics/StarIcon.vue'
import FkStat from "@/components/ModelCard/Statistics/FkStat.vue";

const props = defineProps<{
  rating: number | undefined,
  ratings: number | undefined
}>()

const {
  rating,
  ratings
} = toRefs(props)

</script>

<template>
  <FkStat :stat="ratings">
    <div :class="$style.Rating">
      <div :class="$style.Stars">
        <StarIcon v-for="i in 5" :class="{[$style.Activated]:i <= Math.round(rating ?? 0)}"/>
      </div>
    </div>
  </FkStat>
</template>

<style lang="scss" module>
.Rating {
  display: flex;
  flex-flow: row nowrap;

  align-items: center;

  font-size: calc(3.75vmin * var(--ui-scale, 1));
  font-weight: 500;
}

.Stars {
  display: flex;
  flex-flow: row nowrap;
}

.Activated {
  svg {
    //stroke: rgb(240, 140, 0);
    fill: rgb(240, 140, 0);
  }
}
</style>