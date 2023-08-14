<script setup lang="ts">

import {useCivitaiModelApi2} from "@/composition/civitai"
import {onMounted} from "vue"
import {useNumberAbbreviation} from "@/composition";
import FkModelStatistics from "@/components/ModelCard/Statistics/FkModelStatistics.vue";

const {
  modelId,
  modelVersionId,

  name,
  creatorName,
  creatorAvatarUrl,

  type,

  rating,
  ratings,

  likes,
  comments,
  downloads,

  selectedModelVersionCivitaiUrl,
  selectedModelVersionPreviewImageUrl,

  selectedModelVersionRating,
  selectedModelVersionRatings,
  selectedModelVersionDownloads
} = useCivitaiModelApi2()

onMounted(() => {
  modelId.value = 2107
})

</script>

<template>
  <div :class="[$style.FKModelCard]">
    <a :class="[$style.FkModelCardContent]" :href="selectedModelVersionCivitaiUrl">
      <div :class="[$style.FkModelCardPreviewContent]">
        <div :class="[$style.FkModelCardPreviewImageWrapper]">
          <img :class="[$style.FkModelCardPreviewImage]"
               :src="selectedModelVersionPreviewImageUrl"
               alt="Model preview image"/>
        </div>
      </div>
      <div :class="[$style.FkModelCardUIContent]">
        <div :class="[$style.FkModelCardUITypeContent]">
          {{ type }}
        </div>
        <div :class="[$style.FkModelCardUIModelMetaContent]">
          <div :class="[$style.FkModelCardUIModelMetaCreatorContent]">
            <div :class="[$style.FkModelCardUIModelMetaCreatorAvatarContent]">
              <img :class="[$style.FkModelCardUIModelMetaCreatorAvatarImage]"
                   :src="creatorAvatarUrl"
                   :alt="`Profile image of ${creatorName}`"/>
            </div>
            <div :class="[$style.FkModelCardUIModelMetaCreatorName]">
              {{ creatorName }}
            </div>
          </div>
          <div :class="[$style.FkModelCardUIModelMetaName]">
            {{ name }}
          </div>
          <div>
            <FkModelStatistics
                :ratings="ratings"
                :rating="rating"
                :comments="comments"
                :downloads="downloads"
                :likes="likes"/>
          </div>
        </div>
      </div>
    </a>
  </div>
</template>

<style module lang="scss">
@use 'src/styles/css-variables' as v;

.FKModelCard {
  --ui-scale: 1.0;

  position: fixed;
  inset: 0;

  background: none transparent;

  height: 100%;
  width: 100%;
}

.FkModelCardContent {
  display: block;

  position: relative;

  width: 100%;
  height: 100%;
}

.FkModelCardPreviewContent {
  position: absolute;
  inset: 0;

  width: 100%;
  height: 100%;
}

.FkModelCardPreviewImageWrapper {
  position: relative;

  display: flex;
  overflow: hidden;

  align-items: center;
  justify-content: center;

  height: 100%;

  &::after {
    content: '';

    position: absolute;
    inset: 0;

    width: 100%;
    height: 100%;

    background: linear-gradient(transparent 60%, rgba(0, 0, 0, 0.75)) transparent;
  }

  &:hover {
    .FkModelCardPreviewImage {
      transform: scale(1.05);
    }
  }
}

.FkModelCardPreviewImage {
  object-fit: cover;

  min-width: 100%;
  min-height: 100%;

  transition: transform v.$transition-duration v.$transition-timing-fn;
}

.FkModelCardPreviewLink {
  position: absolute;
  inset: 0;

  width: 100%;
  height: 100%;
}

.FkModelCardUIContent {
  position: absolute;
  inset: 0;

  width: 100%;
  height: 100%;

  pointer-events: none;

  color: white;
}

.FkModelCardUITypeContent {
  position: absolute;

  top: 0;
  left: 0;
}

.FkModelCardUIModelMetaContent {
  position: absolute;

  display: flex;
  flex-flow: column nowrap;

  gap: calc(3.125vmin * var(--ui-scale, 1));
  width: 100%;

  padding: calc(2.5vmin * var(--ui-scale, 1));

  left: 0;
  right: 0;
  bottom: 0;
}

.FkModelCardUIModelMetaCreatorContent {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  gap: calc(2.5vmin * var(--ui-scale, 1));
}

.FkModelCardUIModelMetaCreatorName {
  font-weight: 500;
  font-size: calc(4.375vmin * var(--ui-scale, 1));
}

.FkModelCardUIModelMetaCreatorAvatarContent {
  width: calc(10vmin * var(--ui-scale, 1));
  height: calc(10vmin * var(--ui-scale, 1));

  display: flex;
  align-items: center;
  justify-content: center;

  overflow: hidden;

  border-radius: calc(2.5vmin * var(--ui-scale, 1));
}

.FkModelCardUIModelMetaCreatorAvatarImage {
  object-fit: cover;

  min-width: 100%;
  max-width: 100%;
}

.FkModelCardUIModelMetaName {
  font-size: calc(6.25vmin * var(--ui-scale, 1));
  font-weight: 700;
}
</style>