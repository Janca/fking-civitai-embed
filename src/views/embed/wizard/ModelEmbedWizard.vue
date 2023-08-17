<script lang="ts" setup>
import FkCode from '@/components/FkCode.vue'
import FkEmbedWizard from '@/components/EmbedWizard/FkEmbedWizard.vue'
import FkTextField from '@/components/Input/FkTextField.vue'
import FkSlider from '@/components/Input/FkSlider.vue'
import {coercedRef} from '@/composition'
import {useCivitaiModel, useCivitaiModelEmbed} from '@/composition/civitai'
import {toRefs} from 'vue'
import FkSwitch from '@/components/Input/FkSwitch.vue'
import FkSwitchGroup from '@/components/Input/FkSwitchGroup.vue'
import FkImage from "@/components/FkImage.vue";

const inputSliderWidth = coercedRef(320, 128, 1024)
const inputSliderHeight = coercedRef(412, 128, 1024)

const inputSliderModelVersionIndex = coercedRef(0, 0, Number.MAX_SAFE_INTEGER)
const inputSliderModelPreviewImageIndex = coercedRef(0, 0, Number.MAX_SAFE_INTEGER)

const inputSliderUIScale = coercedRef(1.0, 0.25, 2.0)
const inputSliderInactiveUIOpacity = coercedRef(1.0, 0.0, 1.0)

const civitaiModelEmbed = useCivitaiModelEmbed({
  modelId: 2107,
  selectedModelVersionIndex: inputSliderModelVersionIndex,
  selectedModelPreviewImageIndex: inputSliderModelPreviewImageIndex
})

const {
  modelId,
  selectedPreviewImageUrl
} = civitaiModelEmbed

</script>

<template>
  <FkEmbedWizard>
    <template #header>
      <h1>Introduction</h1>
      <p>
        Create an embed directly to your CivitAI model on any website allowing
        <FkCode>iframe</FkCode>
        .
        Show off your model with an eye-catching, zero-effort card element.
      </p>
      <p>
        To begin, enter a valid, SFW model URL. Then use the
        <FkCode>Copy source code</FkCode>
        button to copy the
        <FkCode>iframe</FkCode>
        HTML to clipboard.
      </p>
      <p>
        Hosted on GitHub pages, and using the API provided by CivitAI directly from within the browser,
        the embedded
        <FkCode>iframe</FkCode>
        has zero-dependencies between you and the data you want.
      </p>
    </template>

    <div :class="[$style.ModelEmbedWizardFormModelUrlInput]">
      <FkTextField>
        <h2>Model URL</h2>
      </FkTextField>
    </div>
    <div :class="[$style.ModelEmbedWizardFormConfiguration]">
      <h2>Configuration</h2>
      <div :class="[$style.ModelEmbedWizardFormConfigurationSection]">
        <FkSlider v-model="inputSliderModelVersionIndex"
                  :min="0" :max="0"
                  label="Model Version"/>
        <FkSlider v-model="inputSliderModelPreviewImageIndex"
                  :min="0" :max="0"
                  label="Model Preview Image"/>
      </div>
      <div :class="[$style.ModelEmbedWizardFormConfigurationSection]">
        <FkSlider v-model="inputSliderWidth"
                  :min="128" :max="1024"
                  unit="px" label="Width"/>
        <FkSlider v-model="inputSliderHeight"
                  :min="128" :max="1024"
                  unit="px" label="Height"/>
      </div>
      <div :class="[$style.ModelEmbedWizardFormConfigurationSection]">
        <FkSlider v-model="inputSliderUIScale"
                  :min="0.25" :max="2.0" :step="0.05"
                  label="UI Scale"/>
        <FkSlider v-model="inputSliderInactiveUIOpacity"
                  :min="0.0" :max="1.0" :step="0.05"
                  label="UI Inactive Opacity"/>
      </div>
      <div :class="[$style.ModelEmbedWizardFormConfigurationSection]">
        <h3>Enable Features</h3>
        <FkSwitchGroup>
          <FkSwitch label="Refresh Periodically"/>
          <FkSwitch label="Show Version Information"/>
          <FkSwitch label="Use Version Statistics"/>
        </FkSwitchGroup>
      </div>
      <div :class="[$style.ModelEmbedWizardFormConfigurationSection]">
        <h3>Hide Features</h3>
        <FkSwitchGroup>
          <FkSwitch label="Hide Statistics"/>
          <FkSwitch label="Hide Title"/>
          <FkSwitch label="Hide Type"/>
          <FkSwitch label="Hide User"/>
        </FkSwitchGroup>
      </div>
      <div :class="[$style.ModelEmbedWizardFormConfigurationSection]">
        <h3>Accessibility</h3>
        <FkSwitchGroup>
          <FkSwitch label="Reduced Motion"/>
        </FkSwitchGroup>
      </div>
    </div>
  </FkEmbedWizard>
</template>

<style lang="scss" module>
.ModelEmbedWizardFormModelUrlInput {

}

.ModelEmbedWizardFormConfiguration {

}

.ModelEmbedWizardFormConfigurationSection {
  margin: 1rem 0 2rem 0;

  h1, h2, h3, h4, h5, h6 {
    margin-bottom: 0;

    & + * {
      margin-top: 0.125rem;
    }
  }
}
</style>