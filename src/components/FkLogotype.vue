<script lang="ts" setup>

</script>

<template>
  <div>
    <h1 :class="[$style.FkLogotype]">
      <span :class="[$style.FkLogotypeContent]">
        <span>
          <span :class="[$style.FkFKText]">
            <span :class="[$style.FkFKTextFChar]">F</span>
            <span>K</span>
          </span>
          <span>CIVIT</span>
          <span :class="[$style.FkAIText]">AI</span>
        </span>
      </span>
    </h1>
    <span :class="[$style.FkSecondaryText]">CIVITAI EMBED CREATOR</span>
  </div>
</template>

<style lang="scss" module>
@use 'src/styles/css-variables' as v;

.FkLogotype {
  margin: 0;
  line-height: 1;

  span {
    display: inline-flex;
  }
}

.FkLogotypeContent {
  text-transform: uppercase;
  flex-flow: row nowrap;
  gap: 0.5ch;
}

.FkFKText {
  color: v.$theme-secondary;
}

.FkFKTextFChar {
  transform: scaleX(-1.0);
  margin-right: -0.5ch;
}

.FkFKTextKChar {
  font-weight: 900;
}

.FkAIText {
  color: v.$theme-primary;
}

.FkSecondaryText {
  text-transform: capitalize;
  font-size: 1rem;
  font-weight: 500;
  color: v.$theme-secondary-text;
}
</style>