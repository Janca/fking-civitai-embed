<script lang="ts" setup>

</script>

<template>
  <div :class="$style.Star">
    <svg xmlns="http://www.w3.org/2000/svg"
         width="100%" height="100%" viewBox="0 0 24 24"
         fill="rgba(255,255,255,.3)"
         stroke="transparent"
         stroke-width="2"
         stroke-linecap="round"
         stroke-linejoin="round">
      <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"/>
    </svg>
  </div>
</template>

<style lang="scss" module>
.Star {
  display: flex;

  width:  calc(4.375vmin * var(--ui-scale, 1));
  height:  calc(4.375vmin * var(--ui-scale, 1));
}
</style>