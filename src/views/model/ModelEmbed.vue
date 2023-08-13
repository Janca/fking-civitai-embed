<script lang="ts" setup>

import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import Rating from '@/components/ModelCard/Rating.vue'
import Likes from '@/components/ModelCard/Likes.vue'
import Comments from '@/components/ModelCard/Comments.vue'
import Downloads from '@/components/ModelCard/Downloads.vue'
import { useCivitaiModelApi } from '@/composition/civitai'
import { useIntervalFn } from '@vueuse/core'
import { useBoolean } from '@/composition'

const route = useRoute()

const modelId = computed(() => parseInt(route.params.modelId as string ?? 0))
const previewImageIndex = computed(() => parseInt(route.query.image_idx as string ?? 0))

const hideTitle = useBoolean(route.query.hide_title as string | null)
const hideType = useBoolean(route.query.hide_type as string | null)
const hideUser = useBoolean(route.query.hide_user as string | null)
const hideStatistics = useBoolean(route.query.hide_stats as string | null)
const refreshEnabled = useBoolean(route.query.refresh as string | null)

const civitaiModel = useCivitaiModelApi(modelId, previewImageIndex, true)
const {
  error,
  isFetching,

  execute: refresh,

  modelName,
  modelType,

  modelUploader,
  modelUploaderProfileImage,

  modelVersions,

  modelRating,
  modelRatings,
  modelLikes,
  modelComments,
  modelDownloads,

  primaryModel,
  primarySFWModelImages,
  primarySFWModelPreviewImage,
  primarySFWModelImageCount
} = civitaiModel

onMounted(() => {
  if (refreshEnabled) {
    const {
      pause
    } = useIntervalFn(() => refresh(), 10_000)
  }
})

</script>

<template>
  <a target="_parent"
     :href="`https://civitai.com/models/${modelId}`"
     :class="[$style.Embed, {[$style.EmbedLoading]:isFetching}]">
    <div :class="$style.EmbedContent">
      <div :class="$style.PreviewImageWrapper">
        <div :class="$style.PreviewImage">
          <img alt="Model preview image" :src="primarySFWModelPreviewImage"/>
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
            <Rating :rating="modelRating" :ratings="modelRatings"/>
          </div>
          <div :class="$style.StatsWrapper" style="margin-left: auto">
            <Likes :likes="modelLikes"/>
          </div>
          <div :class="$style.StatsWrapper">
            <Comments :comments="modelComments"/>
          </div>
          <div :class="$style.StatsWrapper">
            <Downloads :downloads="modelDownloads"/>
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

  width: 16vmin;
  height: 16vmin;

  border-radius: 50%;
  border: 1.75vmin solid rgba(255, 255, 255, 0.31);
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

  border-radius: 2.5vmin;
  overflow: hidden;

  &:hover {
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

    background: linear-gradient(transparent 60%, rgba(0, 0, 0, 0.75)) transparent;
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

.ModelTypeWrapper {
  position: absolute;
  top: 0;

  padding: 2.5vmin;
}

.ModelType {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  font-weight: 500;
  font-size: 3.75vmin;

  height: 8.125vmin;
  padding: 0 3.333vmin;

  border-radius: 10vmin;
  border: 1px solid transparent;
  background: none rgba(0, 0, 0, 0.31);
}

.ModelMeta {
  display: flex;
  flex-flow: column nowrap;

  gap: 3.125vmin;
  width: 100%;

  position: absolute;
  bottom: 0;

  padding: 2.5vmin;
}

.Uploader {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 2.5vmin;

  font-weight: 500;
  font-size: 4.375vmin;
}

.ModelName {
  font-size: 6.25vmin;
  font-weight: 700;
}

.ModelStats {
  display: flex;
  flex-flow: row nowrap;

  gap: 1.25vmin;
  width: 100%;
}

.AvatarImage {
  width: 10vmin;
  height: 10vmin;

  display: flex;
  align-items: center;
  justify-content: center;

  overflow: hidden;

  border-radius: 2.5vmin;

  img {
    object-fit: cover;
    min-width: 100%;
    min-height: 100%;
  }
}

.StatsWrapper {
  width: min-content;
  height: 6.25vmin;

  display: flex;
  align-items: center;

  padding: {
    right: 1.5625vmin;
    left: 0.9375vmin;
  };

  background: none rgba(0, 0, 0, 0.31);
  border-radius: 1.25vmin;
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