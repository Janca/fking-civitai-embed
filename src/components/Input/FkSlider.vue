<script lang="ts" setup>

import FkField from '@/components/Input/FkField.vue'
import { computed, useCssModule } from 'vue'

const props = defineProps<{
  label: String,
  unit?: String,

  disabled?: any,

  valueWidth?: String | Number,

  min?: Number,
  max?: Number,
  step?: Number,

  modelValue: Number
}>()

const emit = defineEmits(['update:modelValue'])

const computedClasses = computed(() => {
  const style = useCssModule()
  return {
    [style.SliderDisabledActive]: props.disabled
  }
})

</script>

<template>
  <FkField :class="[computedClasses]" :label="props.label">
    <template #label v-if="$slots.label">
      <slot name="label"/>
    </template>
    <span :class="[$style.SliderContent]">
      <input type="range"
             :class="[$style.Slider]"
             :min="props.min" :max="props.max"
             :step="props.step"
             :value="props.modelValue"
             @input="emit('update:modelValue', $event.target.value)"/>
      <span v-if="props.modelValue != null" :class="[$style.SliderValue]" :style="{'width':valueWidth}">
        {{ modelValue }}{{ unit }}
      </span>
    </span>
  </FkField>
</template>

<style lang="scss" module>
.SliderLabel {
}

.SliderDisabledActive {
  pointer-events: none;

  .SliderContent {
    opacity: 0.5;
  }
}

.LabelContent {
  display: block;
  margin-bottom: 0.5rem;
}

.SliderContent {
  display: flex;
  flex-flow: row nowrap;

  align-items: center;

  margin-top: 2px;
}

.SliderValue {
  padding: 0 0.25rem 0 0.5rem;

  font-weight: 500;
  font-size: 0.8rem;

  text-align: right;
  min-width: max(8ch, 5%);

  font-family: SFMono-Regular, Menlo, Monaco,
  Consolas, "Liberation Mono",
  "Courier New", monospace;

  border-radius: 0 0.25rem 0.25rem 0;
}

.Slider {
  position: relative;
  align-items: center;

  -webkit-appearance: none;
  width: 100%;

  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;

  &::before {
    position: absolute;

    left: 0;
    right: 0;

    margin: 0 0.325rem;
    border-radius: 0.75rem;

    content: "";
    height: 0.3rem;

    transition: background-color 0.3s ease;
    background: none rgb(255, 255, 255, 0.5);
  }

  &:hover::before {
    background: white;
  }

  &::-webkit-slider-thumb {
    cursor: pointer;
    background: none #1971c2;
    position: relative;
    -webkit-appearance: none;
    appearance: none;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;

    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.25);
      background-color: #1c7ed9;
    }

    &:active {
      transform: scale(1.15);
      background-color: #1767b3;
    }

    &:focus {
      outline: 0.2rem solid rgba(25, 113, 194, 0.3)
    }
  }
}
</style>