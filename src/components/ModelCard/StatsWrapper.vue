<script lang="ts" setup>

import * as abbreviate from 'number-abbreviate'
import { computed } from 'vue'

const props = defineProps<{
  stat: number
}>()

const computedState = computed(() => abbreviate(props.stat ?? 0))

</script>

<template>
  <div :class="$style.StatsWrapper">
    <div v-if="$slots.default" :class="$style.StatsIcon">
      <slot/>
    </div>
    <div>
      {{ String(abbreviate(stat, 1)).toLocaleUpperCase() }}
    </div>
  </div>
</template>

<style lang="scss" module>
.StatsWrapper {
  pointer-events: none;

  display: flex;
  flex-flow: row nowrap;

  align-items: center;

  font-size: 3.75vmin;
  font-weight: 500;
}

.StatsIcon {
  display: flex;
  align-items: center;

  svg {
    width: 4.375vmin;
    height: 4.375vmin;
  }

  margin-right: 1.5625vmin;
}
</style>