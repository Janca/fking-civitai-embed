<script lang="ts" setup>
import { computed } from 'vue'

import StarIcon from '@/components/ModelCard/StarIcon.vue'

const props = defineProps<{
  rating: number | undefined,
  ratings: number | undefined
}>()

const starRating = computed(() => Math.round(props.rating ?? 0))
const strRatings = computed(() => props.ratings ?? 0)

</script>

<template>
  <div :class="$style.Rating">
    <div :class="$style.Stars">
      <StarIcon v-for="i in 5" :class="{[$style.Activated]:i <= starRating}"/>
    </div>
    <div v-text="strRatings"/>
  </div>
</template>

<style lang="scss" module>
.Rating {
  display: flex;
  flex-flow: row nowrap;

  align-items: center;

  font-size:  calc(3.75vmin * var(--ui-scale, 1));
  font-weight: 500;
}

.Stars {
  display: flex;
  flex-flow: row nowrap;

  margin-right:  calc(1.5625vmin * var(--ui-scale, 1));
}

.Activated {
  svg {
    stroke: rgb(240, 140, 0);
    fill: rgb(240, 140, 0);
  }
}
</style>