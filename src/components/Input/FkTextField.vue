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
  <FkField :label="props.label" :hover-effect="true" :focus-effect="true">
    <template v-if="$slots.label" #label>
      <slot name="label"/>
    </template>
    <input :class="[$style.FkTextFieldInput]" type="text" @input="onInput($event.target.value)"/>
  </FkField>
</template>

<style lang="scss" module>
.FkTextFieldInput {
  font-weight: 500;
}
</style>