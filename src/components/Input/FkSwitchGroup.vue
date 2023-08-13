<script lang="ts" setup>

</script>

<template>
  <div :class="[$style.FkSwitchGroup]">
    <slot/>
  </div>
</template>

<style lang="scss" module>
.FkSwitchGroup {
  margin: 1rem 0;

  > * {
    margin: 0 !important;

    &:not(:last-child) {
      label {
        > [class^="FkField_FkFieldInputContent"] {
          border-bottom: unset;

          border-bottom-right-radius: 0;
          border-bottom-left-radius: 0;
        }
      }
    }

    &:not(:first-child) {
      label {
        > [class^="FkField_FkFieldInputContent"] {
          border-top-right-radius: 0;
          border-top-left-radius: 0;
        }
      }
    }
  }
}
</style>