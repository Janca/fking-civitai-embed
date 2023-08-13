<script lang="ts" setup>

import FkField from '@/components/Input/FkField.vue'

const props = defineProps<{
  label?: String,
  modelValue?: Boolean
}>()

const emit = defineEmits(['update:modelValue'])

function onInput(checked: boolean) {
  emit('update:modelValue', checked)
}

</script>

<template>
  <FkField :class="[$style.FkSwitch]" :hover-effect="true">
    <span :class="[$style.FkSwitchLabel]" v-if="$slots.default || props.label">
      <slot>
        {{ props.label }}
      </slot>
    </span>
    <span :class="[$style.FkSwitchControl]">
      <input type="checkbox" :checked="modelValue" @input="onInput($event.target.checked)"/>
      <span :class="[$style.FkSwitchThumbContainer]">
        <span :class="[$style.FkSwitchThumb]"></span>
      </span>
    </span>
  </FkField>
</template>

<style lang="scss" module>
.FkSwitch {
  cursor: pointer;
  position: relative;

  margin: 2rem 0 1rem 0;

  display: flex;
  flex-flow: row nowrap;

  align-items: center;

  width: 100%;

  label {
    cursor: pointer;
  }

  input:checked + .FkSwitchThumbContainer {
    background-color: #1971c2;

    .FkSwitchThumb {
      transform: translateX(0.9rem);
      background-color: white;
    }
  }
}

.FkSwitchLabel {
  font-size: 1rem;
  font-weight: 500;
}

.FkSwitchControl {
  margin: 0.2rem 0;
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: 0.2rem 0.5rem;
}

.FkSwitchThumbContainer {
  position: absolute;
  display: flex;

  flex-flow: row nowrap;
  align-items: center;

  right: 0;

  width: 2.6rem;
  height: 1.6rem;

  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.25rem;

  background-color: #141517;
  transition: background-color 0.3s ease;
}

.FkSwitchThumb {
  display: block;

  width: 1.2rem;
  height: 1.2rem;

  margin: 0 0.2rem;

  border-radius: 0.2rem;
  background-color: rgba(255, 255, 255, 0.5);

  transition: all 0.3s ease;
}
</style>