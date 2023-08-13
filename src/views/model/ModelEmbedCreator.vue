<script lang="ts" setup>
import { computed, ref } from 'vue'
import { toReactive, useBrowserLocation, useClipboard } from '@vueuse/core'
import Code from '@/components/Code.vue'
import FkSlider from '@/components/Input/FkSlider.vue'
import FkTextField from '@/components/Input/FkTextField.vue'
import { useCivitaiModelApi } from '@/composition/civitai'

const width = ref(320)
const height = ref(412)
const imageIdxInput = ref(1)

const modelImageMin = ref(1)
const modelImageMax = ref(1)

const embedFrame = ref()
const modelUrlInput = ref()

const loading = ref(false)

const location = useBrowserLocation()
const {
  origin
} = toReactive(location)

const iframeSrcUrl = computed(() => {
  const _modelId = modelId.value
  const queries = new URLSearchParams({
    image_idx: String(imageIdx.value),
    refresh: '0'
  })

  if (_modelId && _modelId >= 1) {
    return `${origin}/${_modelId}?${queries}`
  }
})

const modelId = computed(() => {
  const _url: string | undefined = modelUrlInput.value
  return _url ? parseInt(_url.match('https://civitai.com/models/(\\d+)')?.[1] || '-1') : -1
})

const imageIdx = computed(() => (imageIdxInput.value ?? 1) - 1)

const {
  primarySFWModelImageCount
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

</script>

<template>
  <div :class="$style.EmbedWrapper">
    <div :class="$style.EmbedCreatorWrapper">
      <div style="margin-bottom:0.5rem">
        <h1 style="margin-top:0">CIVIT<span style="color:#1971c2">AI</span> Embed Card</h1>
        <h2>Introduction</h2>
        <div style="font-weight:500">
          <p>
            Create an embed directly to your CivitAI model on any website allowing
            <Code>&lt;iframe&gt;</Code>.
            <br/>
            Show off your model with an eye-catching, zero-effort card element.
          </p>
          <p>
            To begin, enter a valid, SFW model URL below. Your preview is show on the right, then use
            the <Code>Copy source code</Code> button to copy the <Code>iframe</Code> HTML to clipboard.
          </p>
        </div>

        <FkTextField v-model="modelUrlInput">
          <template #label>
            <h2 style="margin-bottom:0">Model URL</h2>
          </template>
        </FkTextField>
        <div>
          <h2>Configure</h2>
          <FkSlider label="Model Preview Image"
                    :min="1" :max="Math.max(1, primarySFWModelImageCount)"
                    value-width="min(72px, max(32px,10%))"
                    v-model="imageIdxInput"/>
          <FkSlider label="Width"
                    :min="128" :max="1024"
                    :step="4" unit="px"
                    value-width="min(72px, max(32px,10%))"
                    v-model="width"/>
          <FkSlider label="Height"
                    :min="128" :max="1024"
                    :step="4" unit="px"
                    value-width="min(72px, max(32px,10%))"
                    v-model="height"/>
        </div>
      </div>
    </div>
    <div :class="[$style.CreatorSection]">
      <div :class="$style.EmbedPreviewContent">
        <div :class="$style.Chip">Preview</div>
        <div :class="$style.EmbedPreview" :style="{width:`${width}px`}">
          <iframe :src="iframeSrcUrl"
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

  width: 100%;
  padding: 1rem;
}

@media screen and (max-width: 1128px) {
  .EmbedWrapper {
    flex-flow: column nowrap;
  }
}

.EmbedCreatorWrapper {
  display: flex;
  flex-flow: column nowrap;

  color: #c1c2c5;

  width: 100%;
}

.CreatorSection {
  display: flex;
  flex-flow: column nowrap;

  width: 100%;
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
</style>