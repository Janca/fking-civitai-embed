<script lang="ts" setup>

import {computed, toRefs} from "vue";
import {useNumberAbbreviation} from "@/composition";
import {get} from "@vueuse/core";

const props = defineProps<{
  stat: number | undefined
}>()

const {
  stat
} = toRefs(props)

const strStat = useNumberAbbreviation(stat)

</script>

<template>
  <div :class="$style.StatsWrapper">
    <div v-if="$slots.default" :class="$style.StatsIcon">
      <slot/>
    </div>
    <div>{{ strStat }}</div>
  </div>
</template>

<style lang="scss" module>
.StatsWrapper {
  pointer-events: none;

  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  height: calc(6.25vmin * var(--ui-scale, 1));

  padding: {
    right: calc(1.5625vmin * var(--ui-scale, 1));
    left: calc(0.9375vmin * var(--ui-scale, 1));
  };

  background: none rgba(0, 0, 0, 0.31);
  border-radius: calc(1.25vmin * var(--ui-scale, 1));
  line-height: 1;

  font-size: calc(3.75vmin * var(--ui-scale, 1));
  font-weight: 500;

  backdrop-filter: blur(32px) saturate(1.25) brightness(1.25);
}

.StatsIcon {
  display: flex;
  align-items: center;

  svg {
    width: calc(4.375vmin * var(--ui-scale, 1));
    height: calc(4.375vmin * var(--ui-scale, 1));
  }

  margin-right: calc(1.5625vmin * var(--ui-scale, 1));
}
</style>