<script lang="ts" setup>

import { computed, useCssModule } from 'vue'

const props = defineProps<{
  label?: String,
  hoverEffect?: Boolean
}>()

const computedClasses = computed(() => {
  const style = useCssModule()
  return {
    [style.FkFieldHoverEnabled]: props.hoverEffect
  }
})
</script>

<template>
  <div :class="[$style.FkField, computedClasses]">
    <label :class="[$style.FkFieldLabel]">
      <span :class="[$style.FkFieldLabelContent]">
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
.FkField {
  margin: 0.5rem 0 1rem 0;
}

.FkFieldHoverEnabled {
  .FkFieldInputContent {
    transition: background-color 0.3s ease;

    &:focus-within, &:hover {
      background: none #25262b;
    }
  }
}

.FkFieldLabel {
  display: block;
}

.FkFieldLabelContent {
  display: block;

  font-weight: 700;
  font-size: 1.125rem;
}

.FkFieldInputContent {
  display: block;

  color: #c1c2c5;

  padding: 0 0.5rem;

  border-radius: 0.25rem;
  border: 1px solid rgba(255, 255, 255, 0.1);

  background: none #1a1b1e;
  transition: background-color 0.3s ease;

  input {
    margin: 0;

    color: inherit;
    background: none transparent;

    outline: none;
    border: none;

    width: 100%;
    height: 2rem;

    -webkit-appearance: none;
  }
}
</style>