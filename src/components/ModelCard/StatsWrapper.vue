<script lang="ts" setup>

import * as abbreviate from 'number-abbreviate'
import { computed } from 'vue'

const props = defineProps<{
  stat: Number
}>()

const computedState = computed(() => abbreviate(props.stat ?? 0, 1).toString().toLocaleUpperCase())

</script>

<template>
  <div :class="$style.StatsWrapper">
    <div v-if="$slots.default" :class="$style.StatsIcon">
      <slot/>
    </div>
    <div>
      {{ computedState }}
    </div>
  </div>
</template>

<style lang="scss" module>
.StatsWrapper {
  pointer-events: none;

  display: flex;
  flex-flow: row nowrap;

  align-items: center;

  font-size:  calc(3.75vmin * var(--ui-scale, 1));
  font-weight: 500;
}

.StatsIcon {
  display: flex;
  align-items: center;

  svg {
    width:  calc(4.375vmin * var(--ui-scale, 1));
    height:  calc(4.375vmin * var(--ui-scale, 1));
  }

  margin-right:  calc(1.5625vmin * var(--ui-scale, 1));
}
</style>