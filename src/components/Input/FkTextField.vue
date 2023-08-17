<script lang="ts" setup>

import FkField from '@/components/Input/FkField.vue'

const props = defineProps<{
  label?: String,
  modelValue?: String
}>()

const emit = defineEmits(['update:modelValue'])

function onInput(value: any) {
  emit('update:modelValue', value)
}

</script>

<template>
  <FkField :class="[$style.FkTextFieldInput]" :label="props.label" :hover-effect="true" :focus-effect="true">
    <template v-if="$slots.default" #label>
      <slot/>
    </template>
    <input type="text" @input="onInput($event.target.value)"/>
  </FkField>
</template>

<style lang="scss" module>
.FkTextFieldInput {
  label span:nth-child(2) {
    padding: 0 0.25rem;
  }

  input {
    font-weight: 500;
  }
}
</style>