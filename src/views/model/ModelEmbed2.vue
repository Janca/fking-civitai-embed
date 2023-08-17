<script lang="ts" setup>

import FKModelCard from '@/components/ModelCard/FKModelCard.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const {
  modelId: _modelId
} = route.params

const {
  modelVersionId: _modelVersionId,
  selectedVersionIndex: _selectedVersionIndex,
  selectedPreviewImageIndex: _selectedPreviewImageIndex
} = route.query

const modelId = computed(() => typeof _modelId == 'string' ? parseInt(_modelId) : -1)
const modelVersionId = computed(() => typeof _modelVersionId == 'string' ? parseInt(_modelVersionId) : -1)

const selectedVersionIndex = computed(() => typeof _selectedVersionIndex == 'string' ? parseInt(_selectedVersionIndex) : 0)
const selectedPreviewImageIndex = computed(() => typeof _selectedPreviewImageIndex == 'string' ? parseInt(_selectedPreviewImageIndex) : 0)

</script>

<template>
  <FKModelCard
      :model-id="modelId"
      :model-version-id="modelVersionId"
      :selected-version-index="selectedVersionIndex"
      :selected-preview-image-index="selectedPreviewImageIndex"/>
</template>

<style lang="scss" module>

</style>