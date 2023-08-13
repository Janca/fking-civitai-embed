<script lang="ts" setup>
import { computed, onMounted, Ref, ref, watch } from 'vue'
import { debouncedRef, toReactive, useBrowserLocation, useClipboard } from '@vueuse/core'
import FkSlider from '@/components/Input/FkSlider.vue'
import FkTextField from '@/components/Input/FkTextField.vue'
import { useCivitaiModelApi } from '@/composition/civitai'
import FkSwitch from '@/components/Input/FkSwitch.vue'
import FkSwitchGroup from '@/components/Input/FkSwitchGroup.vue'
import Code from '@/components/Code.vue'

const width = ref(320)
const height = ref(412)
const imageIdxInput = ref(1)
const versionIdxInput = ref(1)

const _metadataScaleInput = ref(1.0)
const metadataScaleInput = computed({
  get: () => _metadataScaleInput.value.toFixed(2),
  set: (value: number | string) => _metadataScaleInput.value = typeof value == 'number' ? value : parseFloat(value)
})

const _uiOpacityInput = ref(1.0)
const uiOpacityInput = computed({
  get: () => _uiOpacityInput.value.toFixed(2),
  set: (value: number | string) => _uiOpacityInput.value = typeof value == 'number' ? value : parseFloat(value)
})

const _showVersionInfo = ref(false)
const showVersionInfo: Ref<boolean> = computed({
  get: () => _showVersionInfo.value && !hideTitle.value,
  set: (value: boolean) => _showVersionInfo.value = value
})

const _versionStats = ref(false)
const versionStats: Ref<boolean> = computed({
  get: () => _versionStats.value && !hideStats.value,
  set: (value: boolean) => _versionStats.value = value
})

const reducedMotion = ref(false)
const refreshPeriodically = ref(false)

const hideUser = ref(false)
const hideTitle = ref(false)
const hideType = ref(false)
const hideStats = ref(false)

const enabledGallery = ref(false)

const embedFrame = ref()
const modelUrlInput = ref()

const loading = ref(false)

const location = useBrowserLocation()
const {
  origin
} = toReactive(location)

const iframeSrcUrl = computed(() => {
  const _modelId = modelId?.value

  if (_modelId && _modelId >= 1) {
    const queries = new URLSearchParams({
      reduced_motion: String(reducedMotion.value),
      inactive_ui_alpha: String(uiOpacityInput.value),
      meta_scale: String(metadataScaleInput.value),
      version_info: String(showVersionInfo.value),
      version_stats: String(versionStats.value),
      version_idx: String(versionIdx.value),
      image_idx: String(imageIdx.value),
      hide_user: String(hideUser.value),
      hide_title: String(hideTitle.value),
      hide_stats: String(hideStats.value),
      hide_type: String(hideType.value),
      refresh: String(refreshPeriodically.value)
    })

    return `${origin}/${_modelId}?${queries}`
  }

  return undefined
})

const versionId = computed(() => {
  const _url: string | undefined = modelUrlInput.value
  return _url ? parseInt(_url.match('https://civitai.com/models.+modelVersionId=(\\d+)')?.[1] || '-1') : -1
})

const modelId = computed(() => {
  const _url: string | undefined = modelUrlInput.value
  return _url ? parseInt(_url.match('https://civitai.com/models/(\\d+)')?.[1] || '-1') : -1
})

const debouncedModelEmbedUrl = debouncedRef(iframeSrcUrl, 300)

const imageIdx = computed(() => (imageIdxInput.value ?? 1) - 1)
const versionIdx = computed(() => (versionIdxInput.value ?? 0) - 1)

const {
  isFetching,
  versions,
  versionCount,
  selectedModel,
  selectedModelImageCount
} = useCivitaiModelApi(modelId)

const source = ref('')
const {
  text, copy
} = useClipboard({ source })

function copySource() {
  const _embed: HTMLElement = embedFrame.value
  if (_embed) {
    copy(_embed.outerHTML)
  }
}

onMounted(() => {
  watch(selectedModel, () => {
    const _versionId = versionId.value ?? -1
    const _selectedVersionIdx = _versionId !== -1 ? versions.value?.findIndex((_v: any) => _v.id == _versionId) ?? -1 : -1

    if (_selectedVersionIdx !== -1) {
      versionIdxInput.value = _selectedVersionIdx + 1
    } else {
      versionIdxInput.value = 1
    }
  })
})

</script>

<template>
  <div :class="$style.EmbedWrapper">
    <div :class="$style.EmbedCreatorWrapper">
      <div style="margin-bottom:0.5rem; max-width:512px; margin-left:auto;">
        <div>
          <h1 style="margin-top:0">CIVIT<span style="color:#1971c2">AI</span> Embed Card</h1>
          <h2>Introduction</h2>
          <div style="font-weight:500">
            <p>
              Create an embed directly to your CivitAI model on any website allowing
              <Code>iframe</Code>.
              Show off your model with an eye-catching, zero-effort card element.
            </p>
            <p>
              To begin, enter a valid, SFW model URL. Then use the <Code>Copy source code</Code>
              button to copy the <Code>iframe</Code> HTML to clipboard.
            </p>
            <p>
              Hosted on GitHub pages, and using the API provided by CivitAI directly from within the browser,
              the embedded <Code>iframe</Code> has zero-dependencies between you and the data you want.
            </p>
          </div>
        </div>
        <div>
          <FkTextField v-model="modelUrlInput">
            <template #label>
              <h2 style="margin-bottom:0; font-size:1.5rem">Model URL</h2>
            </template>
          </FkTextField>
        </div>
        <div>
          <h2>Configure</h2>
          <FkSlider label="Model Version"
                    :min="1" :max="Math.max(1, versionCount)"
                    value-width="min(72px, max(32px,10%))"
                    :disabled="isFetching"
                    v-model="versionIdxInput"/>
          <FkSlider label="Model Preview Image"
                    :min="1" :max="Math.max(1, selectedModelImageCount)"
                    value-width="min(72px, max(32px,10%))"
                    :disabled="isFetching"
                    v-model="imageIdxInput"/>

          <FkSlider label="Width"
                    :min="128" :max="1024"
                    :step="4" unit="px"
                    value-width="min(72px, max(32px,10%))"
                    :disabled="isFetching"
                    v-model="width"/>
          <FkSlider label="Height"
                    :min="128" :max="1024"
                    :step="4" unit="px"
                    value-width="min(72px, max(32px,10%))"
                    :disabled="isFetching"
                    v-model="height"/>

          <FkSlider label="UI Scale"
                    :min="0.25" :max="2.0"
                    :step="0.05"
                    value-width="min(72px, max(32px,10%))"
                    :disabled="isFetching"
                    v-model="metadataScaleInput"/>
          <FkSlider label="Inactive UI Opacity"
                    :min="0.0" :max="1.0"
                    :step="0.05"
                    value-width="min(72px, max(32px,10%))"
                    :disabled="isFetching"
                    v-model="uiOpacityInput"/>


          <div :class="[$style.Features]">
            <h3>Enable Features</h3>
            <FkSwitchGroup>
              <FkSwitch v-model="refreshPeriodically" :disabled="isFetching" label="Refresh Periodically"/>
              <FkSwitch v-model="showVersionInfo" :disabled="hideTitle || isFetching" label="Show Version Information"/>
              <FkSwitch v-model="versionStats" :disabled="hideStats || isFetching" label="Use Version Statistics"/>
              <!--          <FkSwitch v-model="enabledGallery" label="Image Gallery"/>-->
            </FkSwitchGroup>
          </div>

          <div :class="[$style.Features]">
            <h3>Hide Features</h3>
            <FkSwitchGroup>
              <FkSwitch v-model="hideStats" :disabled="isFetching" label="Hide Statistics"/>
              <FkSwitch v-model="hideTitle" :disabled="isFetching" label="Hide Title"/>
              <FkSwitch v-model="hideType" :disabled="isFetching" label="Hide Type"/>
              <FkSwitch v-model="hideUser" :disabled="isFetching" label="Hide User"/>
            </FkSwitchGroup>
          </div>

          <div :class="[$style.Features]">
            <h3>Accessibility</h3>
            <FkSwitchGroup>
              <FkSwitch v-model="reducedMotion" :disabled="isFetching" label="Reduced Motion"/>
            </FkSwitchGroup>
          </div>
        </div>
      </div>
    </div>
    <div :class="[$style.CreatorSection]">
      <div :class="$style.EmbedPreviewContent">
        <div :class="$style.Chip">Preview</div>
        <div :class="$style.EmbedPreview" :style="{width:`${width}px`}">
          <iframe :src="debouncedModelEmbedUrl"
                  :width="width"
                  :height="height"
                  ref="embedFrame"
                  allowtransparency="true"
                  style="border-radius:8px; overflow: hidden; border:none; outline:none; -webkit-appearance:none"/>
        </div>
      </div>
      <div style="margin-top:1rem">
        <button :class="$style.CopySourceBtn" @click="copySource">
          <span>Copy source code</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.EmbedWrapper {
  display: flex;
  flex-flow: row nowrap;
  gap: 1rem;

  padding: 1rem;

  width: 100%;
  position: relative;
}

@media screen and (max-width: 1256px) {
  .EmbedWrapper {
    flex-flow: column nowrap;

    .EmbedCreatorWrapper {
      > div {
        max-width: unset !important;
      }
    }

    .CreatorSection {
      top: unset;
      position: unset;
    }
  }
}

.EmbedCreatorWrapper {
  display: flex;
  flex-flow: column nowrap;

  color: #c1c2c5;

  width: 100%;
}

.CreatorSection {
  top: 1rem;
  position: sticky;

  display: flex;
  flex-flow: column nowrap;

  height: min-content;
  width: 100%;
}

.CreatorNav {
  ul {
    list-style: none;

    li {
      display: inline-flex;
    }
  }
}

.EmbedPreviewContent {
  display: flex;
  flex-flow: row nowrap;

  position: relative;

  justify-content: center;

  padding: 2.6rem;
  width: 100%;

  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.25rem;

  background: none #1a1b1e;

  iframe {
    border: none;
    outline: none;

    -webkit-appearance: none;
  }
}

.Chip {
  position: absolute;

  top: -1px;
  left: -1px;

  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;

  font-size: 0.75rem;

  border: 1px solid rgba(255, 255, 255, 0.1);
  border-top-color: transparent;
  border-left-color: transparent;

  padding: 0.15rem 0.5rem;

  border-radius: 0.25rem;
}

.EmbedPreview {
  display: flex;
  flex-flow: column wrap;
  align-content: stretch;

  gap: 0.5rem;
}

.CopySourceBtn {
  -webkit-appearance: none;
  outline: none;
  color: white;

  width: 100%;

  font-weight: 600;
  font-size: 0.875rem;

  padding: 0.5rem;
  border-radius: 0.25rem;

  background-color: #1971c2;
  transition: background-color 0.3s ease;

  border: 1px solid transparent;
  cursor: pointer;

  &:hover {
    background-color: #1c7ed9;
  }

  &:active {
    background-color: #1767b3;
  }

  &:focus {
    outline: 0.2rem solid rgba(25, 113, 194, 0.3)
  }
}

.Features {
  h3 {
    margin-bottom: 0;
  }

  h3 + * {
    margin-top: 0.25rem;
  }
}
</style>