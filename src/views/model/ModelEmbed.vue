<script lang="ts" setup>

import { computed, onMounted, ref, useCssModule } from 'vue'
import { useRoute } from 'vue-router'

import Rating from '@/components/ModelCard/Rating.vue'
import Likes from '@/components/ModelCard/Likes.vue'
import Comments from '@/components/ModelCard/Comments.vue'
import Downloads from '@/components/ModelCard/Downloads.vue'
import { useCivitaiModelApi } from '@/composition/civitai'
import { useIntervalFn } from '@vueuse/core'
import { useBoolean } from '@/composition'

const route = useRoute()

const modelId = computed(() => parseInt(route.params.modelId as string ?? '0'))
const versionIndex = computed(() => parseInt(route.query.version_idx as string ?? '0'))
const previewImageIndex = computed(() => parseInt(route.query.image_idx as string ?? '0'))
const uiScale = computed(() => parseFloat(route.query.meta_scale as string ?? '1.0'))
const uiInactiveAlpha = computed(() => parseFloat(route.query.inactive_ui_alpha as string ?? '1.0'))

const hideTitle = useBoolean(route.query.hide_title as string | null)
const hideType = useBoolean(route.query.hide_type as string | null)
const hideUser = useBoolean(route.query.hide_user as string | null)
const hideStatistics = useBoolean(route.query.hide_stats as string | null)
const refreshEnabled = useBoolean(route.query.refresh as string | null)

const showVersionInfo = useBoolean(route.query.version_info as string | null)
const versionStats = useBoolean(route.query.version_stats as string | null)

const civitaiModel = useCivitaiModelApi(
    modelId,
    previewImageIndex,
    versionIndex,
    showVersionInfo,
    versionStats,
    true
)

const {
  error,
  isFetching,

  execute: refresh,

  modelName,
  modelType,

  modelUploader,
  modelUploaderProfileImage,

  versions,

  rating,
  ratings,
  likes,
  comments,
  downloads,

  primaryModel,
  primarySFWModelImages,
  primarySFWModelPreviewImage,
  primarySFWModelImageCount
} = civitaiModel

const imageLoading = ref(true)

const loading = computed(() => isFetching.value || imageLoading.value)

onMounted(() => {
  if (refreshEnabled) {
    const {
      pause
    } = useIntervalFn(() => refresh(), 120_000)
  }
})

const style = useCssModule()
const computedStyle = computed(() => {
  return {
    ['--ui-inactive-alpha']: uiInactiveAlpha.value ?? 1.0,
    ['--ui-scale']: uiScale.value ?? 1.0
  }
})

</script>

<template>
  <a target="_blank"
     :style="computedStyle"
     :href="`https://civitai.com/models/${modelId}`"
     :class="[$style.Embed, {[$style.EmbedLoading]:loading}]">
    <div :class="$style.EmbedContent">
      <div :class="$style.PreviewImageWrapper">
        <div :class="$style.PreviewImage">
          <img alt="Model preview image"
               :src="primarySFWModelPreviewImage"
               @loadstart="imageLoading = true"
               @load="imageLoading = false"/>
        </div>
      </div>
      <div :class="$style.ModelTypeWrapper" v-if="!hideType">
        <div :class="$style.ModelType">
          {{ modelType.replace('TextualInversion', 'Embedding') }}
        </div>
      </div>
      <div :class="$style.ModelMeta">
        <div :class="$style.Uploader" v-if="!hideUser">
          <div :class="$style.AvatarImage">
            <img alt="User profile image" :src="modelUploaderProfileImage"/>
          </div>
          <div v-text="modelUploader"/>
        </div>
        <div :class="$style.ModelName" v-text="modelName" v-if="!hideTitle"/>
        <div :class="$style.ModelStats" v-if="!hideStatistics">
          <div :class="$style.StatsWrapper">
            <Rating :rating="rating" :ratings="ratings"/>
          </div>
          <div :class="$style.StatsWrapper" style="margin-left: auto">
            <Likes :likes="likes"/>
          </div>
          <div :class="$style.StatsWrapper">
            <Comments :comments="comments"/>
          </div>
          <div :class="$style.StatsWrapper">
            <Downloads :downloads="downloads"/>
          </div>
        </div>
      </div>
    </div>
    <div :class="$style.LoaderContent">
      <div :class="$style.Loader"/>
    </div>
  </a>
</template>

<style lang="scss" module>
.Embed {
  cursor: pointer;
  background: none transparent;
  position: absolute;
  inset: 0;

  text-decoration: none;

  width: 100%;
  height: 100%;
}

.EmbedLoading {
  .EmbedContent {
    opacity: 0;
  }

  .LoaderContent {
    opacity: 1;
  }
}

.LoaderContent {
  pointer-events: none;
  transition: opacity 0.3s linear;

  opacity: 0;
  position: absolute;
  inset: 0;

  width: 100%;
  height: 100%;

  display: flex;
  flex-flow: row nowrap;

  align-items: center;
  justify-content: center;
}

.Loader {
  position: relative;

  width: calc(16vmin * var(--ui-scale, 1));
  height: calc(16vmin * var(--ui-scale, 1));

  border-radius: 50%;
  border: calc(1.75vmin * var(--ui-scale, 1)) solid rgba(255, 255, 255, 0.31);
  border-left-color: #1971c2;

  animation: loader 1.2s linear infinite;
}

.EmbedContent {
  pointer-events: all;
  transition: opacity 0.3s 0.15s linear;
  position: relative;

  width: 100%;
  height: 100%;

  color: white;

  border-radius: calc(2.5vmin * var(--ui-scale, 1));
  overflow: hidden;

  &:hover {
    --ui-inactive-alpha: 1.10;

    .PreviewImage img {
      transform: scale(1.05);
    }
  }
}

.PreviewImageWrapper {
  height: 100%;

  &::after {
    content: "";
    position: absolute;
    inset: 0;

    width: 100%;
    height: 100%;

    background: linear-gradient(transparent 60%, rgba(0, 0, 0, min(0.75, var(--ui-inactive-alpha, 1.0)))) transparent;
  }
}

.PreviewImage {
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;

  overflow: hidden;

  img {
    transition: transform 0.4s ease;
    object-fit: cover;
    min-width: 100%;
    min-height: 100%;
  }
}

.ModelTypeWrapper, .ModelMeta {
  transition: opacity 0.3s ease;
  opacity: var(--ui-inactive-alpha, 1.0);
}

.ModelTypeWrapper {
  position: absolute;
  top: 0;

  padding: calc(2.5vmin * var(--ui-scale, 1));
}

.ModelType {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  font-weight: 500;
  font-size: calc(3.75vmin * var(--ui-scale, 1));

  height: calc(8.125vmin * var(--ui-scale, 1));
  padding: 0 calc(3.333vmin * var(--ui-scale, 1));

  border-radius: calc(10vmin * var(--ui-scale, 1));
  border: 1px solid transparent;
  background: none rgba(0, 0, 0, 0.31);
}

.ModelMeta {
  display: flex;
  flex-flow: column nowrap;

  gap: calc(3.125vmin * var(--ui-scale, 1));
  width: 100%;

  position: absolute;
  bottom: 0;

  padding: calc(2.5vmin * var(--ui-scale, 1));
}

.Uploader {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: calc(2.5vmin * var(--ui-scale, 1));

  font-weight: 500;
  font-size: calc(4.375vmin * var(--ui-scale, 1));
}

.ModelName {
  font-size: calc(6.25vmin * var(--ui-scale, 1));
  font-weight: 700;
}

.ModelStats {
  display: flex;
  flex-flow: row nowrap;

  gap: calc(1.25vmin * var(--ui-scale, 1));
  width: 100%;
}

.AvatarImage {
  width: calc(10vmin * var(--ui-scale, 1));
  height: calc(10vmin * var(--ui-scale, 1));

  display: flex;
  align-items: center;
  justify-content: center;

  overflow: hidden;

  border-radius: calc(2.5vmin * var(--ui-scale, 1));

  img {
    object-fit: cover;
    min-width: 100%;
    min-height: 100%;
  }
}

.StatsWrapper {
  width: min-content;
  height: calc(6.25vmin * var(--ui-scale, 1));

  display: flex;
  align-items: center;

  padding: {
    right: calc(1.5625vmin * var(--ui-scale, 1));
    left: calc(0.9375vmin * var(--ui-scale, 1));
  };

  background: none rgba(0, 0, 0, 0.31);
  border-radius: calc(1.25vmin * var(--ui-scale, 1));
  line-height: 1;
}

@keyframes loader {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>