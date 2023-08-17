<script setup lang="ts">

import {onMounted, ref, watch, watchEffect} from "vue";

const props = defineProps<{
  src: string | undefined,
  alt?: string
}>()

const src = ref<string>()
const emits = defineEmits(['load', 'loadstart', 'error'])

watchEffect(() => {
  const _src = props.src
  if (_src) {
    emits('loadstart')
    const image = new Image()

    image.onerror = () => {
      src.value = undefined
      emits('load')

      image.remove()
    }

    image.onload = () => {
      src.value = _src
      emits('load')

      image.remove()
    }

    image.src = _src
  }
})

</script>

<template>
  <img :src="src" :alt="props.alt"/>
</template>

<style module lang="scss">

</style>