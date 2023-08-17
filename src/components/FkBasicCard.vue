<script lang="ts" setup>

import { computed, useCssModule } from 'vue'

const props = defineProps<{
  tag?: string,
  blur?: boolean
}>()

const style = useCssModule()
const computedStyle = computed(() => {
  return {
    [style.FkCardIsBlurred]: props.blur
  }
})

</script>

<template>
  <div :class="[$style.FkCard, computedStyle]">
    <div v-if="props.tag" :class="[$style.FkCardTagContent]">
      <span :class="$style.FkCardTagText" v-text="props.tag"/>
    </div>
    <div :class="[$style.FkCardContent]">
      <slot/>
    </div>
  </div>
</template>

<style lang="scss" module>
@use 'sass:color';
@use 'src/styles/css-variables' as v;

.FkCard {
  position: relative;
  width: 100%;

  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.25rem;

  background: none v.$theme-card-background;
}

.FkCardIsBlurred {
  backdrop-filter: blur(32px);
  background: none v.$theme-card-background-transparent;
}

.FkCardTagContent {
  position: absolute;

  top: -1px;
  left: -1px;

  border: 1px solid rgba(255, 255, 255, 0.1);
  border-top-color: transparent;
  border-left-color: transparent;

  padding: 0 0.5rem;
  border-radius: 0.25rem;
}

.FkCardTagText {
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
  font-size: 0.75rem;
}

.FkCardContent {
  padding: 1rem;
}
</style>