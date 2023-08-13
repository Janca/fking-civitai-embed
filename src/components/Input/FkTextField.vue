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
  <FkField :label="props.label" :hover-effect="true">
    <template v-if="$slots.label" #label>
      <slot name="label"/>
    </template>
    <input type="text" @input="onInput($event.target.value)"/>
  </FkField>
</template>

<style lang="scss" module>

</style>