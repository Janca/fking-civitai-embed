<script lang="ts" setup>

import { computed, useCssModule } from 'vue'

const props = defineProps<{
  label?: String,
  hoverEffect?: Boolean,
  focusEffect?: Boolean
}>()

const computedClasses = computed(() => {
  const style = useCssModule()
  return {
    [style.FkFieldHoverEnabled]: props.hoverEffect,
    [style.FkFieldFocusEnabled]: props.focusEffect
  }
})
</script>

<template>
  <div :class="[$style.FkField, computedClasses]">
    <label :class="[$style.FkFieldLabel]">
      <span :class="[$style.FkFieldLabelContent]" v-if="$slots.label || props.label">
        <slot name="label">
          {{ props.label }}
        </slot>
      </span>
      <span :class="$style.FkFieldInputContent">
        <slot/>
      </span>
    </label>
  </div>
</template>

<style lang="scss" module>
@use 'src/styles/css-variables' as v;

.FkField {
  margin: 0.5rem 0 1rem 0;
  width: 100%;
}

.FkFieldHoverEnabled {
  .FkFieldInputContent {
    &:hover {
      background: none v.$theme-card-background-lighter;
    }
  }
}

.FkFieldFocusEnabled {
  .FkFieldInputContent {
    &:focus-within {
      background: none v.$theme-card-background-lighter;
    }
  }
}

.FkFieldLabel {
  width: 100%;
  display: block;
}

.FkFieldLabelContent {
  display: block;

  font-weight: 700;
  font-size: 1.135rem;
}

.FkFieldInputContent {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  > * {
    flex: 1 1 auto;
  }

  width: 100%;

  color: v.$theme-body-text;

  padding: 0 0.5rem;

  border-radius: 0.25rem;
  border: 1px solid rgba(255, 255, 255, 0.1);

  background: none v.$theme-card-background;

  transition-duration: v.$transition-duration;
  transition-timing-function: v.$transition-timing-fn;
  transition-property: background-color, outline-color, outline-width;

  input {
    margin: 0;

    color: inherit;
    background: none transparent;

    outline: none;
    border: none;

    width: 100%;
    height: 2rem;
    font-weight: 500;

    -webkit-appearance: none;
  }
}
</style>