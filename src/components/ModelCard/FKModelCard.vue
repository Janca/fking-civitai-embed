<script setup lang="ts">

import { useCivitaiModelApi2 } from '@/composition/civitai/_index'
import { computed, nextTick, ref, useCssModule, watch } from 'vue'
import FkModelStatistics from '@/components/ModelCard/Statistics/FkModelStatistics.vue'

const props = withDefaults(
    defineProps<{
      modelId?: number,
      modelVersionId?: number,
      selectedVersionIndex?: number,
      selectedPreviewImageIndex?: number
    }>(),
    {
      modelId: -1,
      modelVersionId: -1,
      selectedVersionIndex: 0,
      selectedPreviewImageIndex: 0
    }
)

const civitaiModel = useCivitaiModelApi2()

const {
  isFetching,
  isErroneous,
  isValid,

  execute: refresh,

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

  selectedVersionIndex,
  selectedModelVersionPreviewImageIndex,

  selectedModelVersionCivitaiUrl,
  selectedModelVersionPreviewImageUrl,

  selectedModelVersionRating,
  selectedModelVersionRatings,
  selectedModelVersionDownloads
} = civitaiModel

const imageLoading = ref(true)
const isLoading = computed(() => isFetching.value || imageLoading.value)

const style = useCssModule()

const computedClasses = computed(() => {
  return {
    [style.FkModelCardIsLoading]: isLoading.value
  }
})

watch(props, () => {
  modelId.value = props.modelId
  modelVersionId.value = props.modelVersionId

  selectedVersionIndex.value = props.selectedVersionIndex
  selectedModelVersionPreviewImageIndex.value = props.selectedPreviewImageIndex
}, { immediate: true })

</script>

<template>
  <div :class="[$style.FKModelCard, computedClasses]">
    <transition name="fade">
      <a v-if="isValid" :class="[$style.FkModelCardContent]" :href="selectedModelVersionCivitaiUrl">
        <div :class="[$style.FkModelCardPreviewContent]">
          <div :class="[$style.FkModelCardPreviewImageWrapper]">
            <img :class="[$style.FkModelCardPreviewImage]"
                 :src="selectedModelVersionPreviewImageUrl"
                 @loadstart="imageLoading = true"
                 @load="imageLoading = false"
                 :alt="`model preview image for '${name}'.`"/>
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
            <div :class="[$style.FkModelCardUIModelStatisticContent]">
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
      <div v-else-if="isErroneous" :class="[$style.FkModelCardRetryContent]">
        <button :class="[$style.FkModelCardRetryButton]">
          <svg width="100%" height="100%" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path fill="white"
                  d="M14.9547098,7.98576084 L15.0711,7.99552 C15.6179,8.07328 15.9981,8.57957 15.9204,9.12636 C15.6826,10.7983 14.9218,12.3522 13.747,13.5654 C12.5721,14.7785 11.0435,15.5888 9.37999,15.8801 C7.7165,16.1714 6.00349,15.9288 4.48631,15.187 C3.77335,14.8385 3.12082,14.3881 2.5472,13.8537 L1.70711,14.6938 C1.07714,15.3238 3.55271368e-15,14.8776 3.55271368e-15,13.9867 L3.55271368e-15,9.99998 L3.98673,9.99998 C4.87763,9.99998 5.3238,11.0771 4.69383,11.7071 L3.9626,12.4383 C4.38006,12.8181 4.85153,13.1394 5.36475,13.3903 C6.50264,13.9466 7.78739,14.1285 9.03501,13.9101 C10.2826,13.6916 11.4291,13.0839 12.3102,12.174 C13.1914,11.2641 13.762,10.0988 13.9403,8.84476 C14.0181,8.29798 14.5244,7.91776 15.0711,7.99552 L14.9547098,7.98576084 Z M11.5137,0.812976 C12.2279,1.16215 12.8814,1.61349 13.4558,2.14905 L14.2929,1.31193 C14.9229,0.681961 16,1.12813 16,2.01904 L16,6.00001 L12.019,6.00001 C11.1281,6.00001 10.6819,4.92287 11.3119,4.29291 L12.0404,3.56441 C11.6222,3.18346 11.1497,2.86125 10.6353,2.60973 C9.49736,2.05342 8.21261,1.87146 6.96499,2.08994 C5.71737,2.30841 4.57089,2.91611 3.68976,3.82599 C2.80862,4.73586 2.23802,5.90125 2.05969,7.15524 C1.98193,7.70202 1.47564,8.08224 0.928858,8.00448 C0.382075,7.92672 0.00185585,7.42043 0.0796146,6.87364 C0.31739,5.20166 1.07818,3.64782 2.25303,2.43465 C3.42788,1.22148 4.95652,0.411217 6.62001,0.119916 C8.2835,-0.171384 9.99651,0.0712178 11.5137,0.812976 Z"/>
          </svg>
        </button>
      </div>
    </transition>
    <div :class="[$style.FkModelCardLoaderContent]">
      <div :class="[$style.FkModelCardLoaderSpinner]"/>
    </div>
  </div>
</template>

<style module lang="scss">
@use 'src/styles/css-variables' as v;

.FKModelCard {
  --ui-scale: 1.0;

  position: fixed;
  inset: 0;

  background: none transparent;

  border-radius: calc(2.5vmin * var(--ui-scale, 1));
  overflow: hidden;

  height: 100%;
  width: 100%;
}

.FkModelCardContent {
  display: block;
  position: relative;

  width: 100%;
  height: 100%;
}

.FkModelCardIsLoading {
  .FkModelCardLoaderContent {
    opacity: 1;
  }
}

.FkModelCardLoaderContent {
  pointer-events: none;

  opacity: 0;

  position: absolute;
  inset: 0;

  display: flex;

  align-items: center;
  justify-content: center;

  background: #1a1b1e;

  width: 100%;
  height: 100%;

  transition: opacity v.$transition-duration v.$transition-timing-fn;
}

.FkModelCardLoaderSpinner {
  position: relative;
  width: calc(16vmin * var(--ui-scale, 1));
  height: calc(16vmin * var(--ui-scale, 1));

  border-radius: 50%;
  border: calc(1.75vmin * var(--ui-scale, 1)) solid v.$theme-primary-darker;
  border-left-color: v.$theme-primary;

  animation: FkSpinner 1.2s linear infinite;
}

.FkModelCardRetryContent {
  @extend .FkModelCardLoaderContent;
}

.FkModelCardRetryButton {
  cursor: pointer;

  -webkit-appearance: none;
  border: none;
  outline: none;

  padding: calc(1.5vmin * var(--ui-scale, 1.0));

  border-radius: 50%;
  background: none v.$theme-primary;

  width: 8vmin;
  height: 8vmin;

  display: flex;
  flex-flow: row nowrap;

  align-items: center;
  justify-content: center;

  transition: background-color v.$transition-duration v.$transition-timing-fn;

  svg {
    width: 4vmin;
    height: 4vmin;
  }

  &:hover {
    background-color: v.$theme-primary-lighter;
  }

  &:active {
    background-color: v.$theme-primary-darker;
  }
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

  margin: calc(2.5vmin * var(--ui-scale, 1));

  font-weight: 500;

  font-size: calc(3.75vmin * var(--ui-scale, 1));
  padding: 0 calc(3.333vmin * var(--ui-scale, 1));

  border-radius: calc(10vmin * var(--ui-scale, 1));
  border: 1px solid transparent;

  backdrop-filter: blur(32px) saturate(1.25) brightness(1.25);
  background: none rgba(0, 0, 0, 0.31);

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

.FkModelCardUIModelStatisticContent {

}

@keyframes FkSpinner {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>