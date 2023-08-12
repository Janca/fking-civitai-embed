<script lang="ts" setup>

import { computed, onMounted, ref, Ref } from 'vue'
import { useIntervalFn } from '@vueuse/core'
import { useRoute } from 'vue-router'
import { getProperty } from 'dot-prop'

import Rating from '@/components/ModelCard/Rating.vue'
import Likes from '@/components/ModelCard/Likes.vue'
import Comments from '@/components/ModelCard/Comments.vue'
import Downloads from '@/components/ModelCard/Downloads.vue'

const route = useRoute()
const loading = ref(true)

const modelId = computed(() => route.params.modelId)

const modelData = ref()

const modelName = computed(() => getProperty(modelData.value, 'name'))

const modelUploader = computed(() => getProperty(modelData.value, 'creator.username'))
const modelUploaderProfileImage = computed(() => getProperty(modelData.value, 'creator.image'))

const modelVersions = computed(() => getProperty(modelData.value, 'modelVersions'))

const modelRating = computed(() => getProperty(modelData.value, 'stats.rating', -1) as number)
const modelRatings = computed(() => getProperty(modelData.value, 'stats.ratingCount', 0) as number)

const modelLikes = computed(() => getProperty(modelData.value, 'stats.favoriteCount', 0) as number)
const modelComments = computed(() => getProperty(modelData.value, 'stats.commentCount', 0) as number)
const modelDownloads = computed(() => getProperty(modelData.value, 'stats.downloadCount', 0) as number)

const modelType = computed(() => getProperty(modelData.value, 'type', 'UNK') as string)

const primaryModel = computed(() => {
  const _modelVersions = modelVersions.value
  return _modelVersions ? _modelVersions[0] : undefined
})

const primaryModelImages: Ref<[any] | undefined> = computed(() => getProperty(primaryModel.value, 'images'))
const primaryModelPreviewImage = computed(() => {
  const _images = primaryModelImages.value
  if (_images == undefined) {
    return undefined
  }

  for (const _image of _images) {
    if (_image['nsfw'] == 'None') {
      return _image.url
    }
  }

  return undefined
})

function fetchModelData() {
  loading.value = true
  const _modelId = modelId.value

  if (_modelId && parseInt(_modelId as string ?? 0) >= 0) {
    return fetch(`https://civitai.com/api/v1/models/${modelId.value}`).then(response => response.json())
        .then(json => {
          modelData.value = json
          return json
        }).then(() => loading.value = false)
  }

  return {}
}

onMounted(() => {
  fetchModelData()
  const {
    pause, resume, isActive
  } = useIntervalFn(fetchModelData, 10_000)
})

</script>

<template>
  <a target="_parent"
     :href="`https://civitai.com/models/${modelId}`"
     :class="[$style.Embed, {[$style.EmbedLoading]:loading}]">
    <div :class="$style.EmbedContent">
      <div :class="$style.PreviewImageWrapper">
        <div :class="$style.PreviewImage">
          <img alt="Model preview image" :src="primaryModelPreviewImage"/>
        </div>
      </div>
      <div :class="$style.ModelTypeWrapper">
        <div :class="$style.ModelType">
          {{ modelType.replace('TextualInversion', 'Embedding') }}
        </div>
      </div>
      <div :class="$style.ModelMeta">
        <div :class="$style.Uploader">
          <div :class="$style.AvatarImage">
            <img alt="User profile image" :src="modelUploaderProfileImage"/>
          </div>
          <div v-text="modelUploader"/>
        </div>
        <div :class="$style.ModelName" v-text="modelName"/>
        <div :class="$style.ModelStats">
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