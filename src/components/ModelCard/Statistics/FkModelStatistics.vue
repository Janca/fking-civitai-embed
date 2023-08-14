<script setup lang="ts">

import {useNumberAbbreviation} from "@/composition";
import Rating from "@/components/ModelCard/Statistics/Rating.vue"
import Likes from "@/components/ModelCard/Statistics/Likes.vue";
import Comments from "@/components/ModelCard/Statistics/Comments.vue";
import Downloads from "@/components/ModelCard/Statistics/Downloads.vue";
import {toRefs} from "vue";

const props = defineProps<{
  rating: number,
  ratings: number,
  likes: number,
  comments: number,
  downloads: number
}>()

const {
  rating,
  ratings,
  likes,
  comments,
  downloads
} = toRefs(props)

</script>

<template>
  <div :class="[$style.FkStatistics]">
    <div :class="[$style.FkStatisticsContent]">
      <Rating :ratings="ratings" :rating="rating"/>
    </div>
    <div :class="[$style.FkStatisticsContent]">
      <Likes :likes="likes"/>
      <Comments :comments="comments"/>
      <Downloads :downloads="downloads"/>
    </div>
  </div>
</template>

<style module lang="scss">
.FkStatistics {
  display: flex;
  flex-flow: row nowrap;

  justify-content: space-between;

  width: 100%;
}

.FkStatisticsContent {
  display: flex;
  flex-flow: row nowrap;
  gap: calc(1.25vmin * var(--ui-scale, 1));
}
</style>