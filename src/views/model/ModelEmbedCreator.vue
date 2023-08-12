<script lang="ts" setup>
import { computed, ref } from 'vue'
import { toReactive, useBrowserLocation, useClipboard } from '@vueuse/core'

const width = ref(320)
const height = ref(412)

const embedFrame = ref()
const modelUrlText = ref()

const location = useBrowserLocation()
const {
  origin
} = toReactive(location)

const iframeSrcUrl = computed(() => {
  const _modelId = modelId.value
  if (_modelId && _modelId >= 1) {
    return `${origin}/${_modelId}`
  }
})

const modelId = computed(() => {
  const _url: string | undefined = modelUrlText.value
  if (_url) {
    const matches = _url.match('https://civitai.com/models/(\\d+)')
    if (matches) {
      return parseInt(matches[1])
    }
  }

  return -1
})

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
        <label style="margin-bottom:2rem; display:block;">
          <span style="font-size:1.5rem">Model URL</span>
          <input name="modelUrl" autocomplete="off"
                 v-model.trim="modelUrlText"/>
        </label>

        <h2>Introduction</h2>
        <p style="font-weight:500">
          Create an embed directly to your CivitAI model on any website allowing
          <code :class="$style.Code">&lt;iframe&gt;</code>.
          <br/>
          Show off your model with an eye-catching, zero-effort card element.
          <br/>
          <br/>
          To begin, enter a valid, SFW model URL below. Your preview is show on the right, then use
          the <code :class="$style.Code">Copy Source Code</code> button to copy the iframe embed to clipboard.
        </p>
      </div>
    </div>
    <div :class="$style.EmbedPreviewWrapper">
      <div :class="$style.Chip">Preview</div>
      <div :class="$style.EmbedPreview" :style="{width:`${width}px`}">
        <iframe :src="iframeSrcUrl"
                :width="width"
                :height="height"
                ref="embedFrame"
                allowtransparency="true"
                style="border-radius:8px; overflow: hidden"/>
        <button :class="$style.CopySourceBtn" @click="copySource">
          <span>Copy source code</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.Code {
  display: inline-block;
  padding: 0 0.25rem;

  background: #1a1b1e;

  font-size: 80%;
  font-weight: inherit;

  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.25rem;
}

.EmbedWrapper {
  display: flex;
  flex-flow: row nowrap;
  gap: 1rem;

  width: 100%;
  padding: 1rem;
}

.EmbedCreatorWrapper {
  display: flex;
  flex-flow: column nowrap;

  color: #c1c2c5;

  width: 100%;

  label {
    font-size: 1.125rem;
    font-weight: 700;
  }

  label, label input {
    width: 100%;
  }

  label input {
    color: #c1c2c5;
    outline: none;

    height: 36px;
    padding: 0 0.5rem;

    border-radius: 0.25rem;
    border: 1px solid rgba(255, 255, 255, 0.1);

    background: none #1a1b1e;
    transition: background-color 0.3s ease;

    &:focus, &:hover {
      background: none #25262b;
    }
  }
}

.EmbedPreviewWrapper {
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