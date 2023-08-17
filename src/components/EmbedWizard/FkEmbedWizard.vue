<script lang="ts" setup>

import FkBasicCard from '@/components/FkBasicCard.vue'
import FkLogotype from '@/components/FkLogotype.vue'
</script>

<template>
  <div :class="[$style.FkEmbedWizard]">
    <div :class="[$style.FkEmbedWizardContent]">
      <div :class="[$style.FkEmbedWizardHeader]">
        <FkLogotype/>
      </div>
      <div :class="[$style.FkEmbedWizardForm]">
        <div v-if="$slots.header" :class="[$style.FkEmbedWizardFormHeader]">
          <slot name="header"/>
        </div>
        <div :class="[$style.FkEmbedWizardFormContent]">
          <slot/>
        </div>
      </div>
      <div :class="[$style.FkEmbedWizardPreview]">
        <FkBasicCard :class="[$style.FkEmbedWizardPreviewCard]" tag="Preview">

        </FkBasicCard>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.FkEmbedWizard {
  position: fixed;
  inset: 0;

  width: 100%;
  height: 100%;

  padding: 1rem;
  overflow-y: scroll;
}

.FkEmbedWizardContent {
  position: relative;
  margin: 0 auto;

  display: grid;
  grid-template:
    "header preview"
    "form preview";

  grid-template-rows: min-content auto;
  grid-template-columns: minmax(320px, 640px) minmax(960px, 1fr);

  gap: 1rem;

  height: 100%;

  width: 100%;
  max-width: 1920px;
}

@media screen and (max-width: 1348px) {
  .FkEmbedWizardContent {
    grid-template-areas:
      'header'
      'form'
      'preview';

    grid-template-rows: min-content min-content auto;
    grid-template-columns: 1fr;
  }

  .FkEmbedWizardForm {

  }
}

.FkEmbedWizardHeader {
  grid-area: header;
}

.FkEmbedWizardForm {
  width: 100%;
  height: 100%;

  justify-content: stretch;
  align-self: start;

  grid-area: form;
}

.FkEmbedWizardFormHeader {
  h1 {
    margin-top: 0;
  }
}

.FkEmbedWizardFormContent {

}

.FkEmbedWizardPreview {
  position: sticky;
  top: 0;

  width: 100%;
  padding-bottom: 1rem;

  justify-content: stretch;

  grid-area: preview;
  align-self: start;
}

.FkEmbedWizardPreviewCard {
  min-height: 512px;
}
</style>