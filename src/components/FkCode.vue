<script lang="ts" setup>

</script>

<template>
  <span :class="[$style.Code]"><slot/></span>
</template>

<style lang="scss" module>
.Code {
  display: inline-block;
  padding: 0 0.25rem;

  background: #1a1b1e;
  font-family: SFMono-Regular, Menlo, Monaco,
  Consolas, "Liberation Mono",
  "Courier New", monospace;

  font-size: 80%;
  font-weight: inherit;

  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.25rem;
}
</style>