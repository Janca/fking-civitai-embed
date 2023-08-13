import { useFetch } from '@vueuse/core'
import { computed, ref, Ref } from 'vue'

export function useCivitaiModelApi(
    modelId: Ref<number>,
    previewImageIndex: Ref<number> = ref(0),
    versionIndex: Ref<number> = ref(0),
    showVersionInfo: Ref<boolean> = ref(false),
    versionStats: Ref<boolean> = ref(false),
    immediate: boolean = false
) {
    const modelApiRequestUrl = computed(() => {
        const _modelId = modelId.value
        if (_modelId <= 0) {
            return undefined
        } else return `https://civitai.com/api/v1/models/${_modelId}`
    })

    const {
        abort,
        canAbort,
        execute,
        isFetching,
        error,
        data: modelData
    } = useFetch<{ data: Ref<object> }>(
        modelApiRequestUrl as Ref<string>,
        {
            immediate,
            refetch: true,
            timeout: 10_000,
            async beforeFetch({ url, options, cancel }) {
                if (url == null) {
                    cancel()
                }
            }
        }
    ).json()

    const modelName = computed(() => {
        const _name = modelData.value?.name
        if (showVersionInfo.value) {
            const _versionInfo = primaryModel.value?.name
            if (_versionInfo != null) {
                return `${_name} - ${_versionInfo}`
            }
        }

        return _name
    })

    const modelUploader = computed(() => modelData.value?.creator?.username)
    const modelUploaderProfileImage = computed(() => modelData.value?.creator?.image)

    const versions = computed(() => modelData.value?.modelVersions)
    const modelVersionCount = computed(() => versions.value?.length ?? 0)

    const statsTarget = computed(() => versionStats.value ? primaryModel?.value : modelData.value)

    const rating = computed(() => statsTarget.value?.stats.rating ?? -1)
    const ratings = computed(() => statsTarget.value?.stats.ratingCount ?? 0)

    const likes = computed(() => statsTarget.value?.stats?.favoriteCount ?? 0)
    const comments = computed(() => statsTarget.value?.stats?.commentCount ?? 0)
    const downloads = computed(() => statsTarget.value?.stats?.downloadCount ?? 0)

    const modelType = computed(() => modelData.value?.type ?? 'UNK')

    const primaryModel = computed(() => versions.value?.[versionIndex.value])

    const primaryModelImages: Ref<[any] | undefined> = computed(() => primaryModel.value?.images)
    const primarySFWModelImages = computed(() => primaryModelImages.value?.filter(_image => _image.nsfw == 'None') ?? [])
    const primarySFWModelImageCount = computed(() => primarySFWModelImages.value?.length ?? 0)
    const primarySFWModelPreviewImage = computed(() => primarySFWModelImages.value?.[previewImageIndex.value]?.url?.replace(/\/width=\d+/, ''))

    return {
        abort,
        canAbort,

        error,

        execute,
        isFetching,

        modelData,

        modelName,
        modelType,

        modelUploader,
        modelUploaderProfileImage,

        versions,
        versionCount: modelVersionCount,

        rating: rating,
        ratings: ratings,
        likes: likes,
        comments: comments,
        downloads: downloads,

        primaryModel,
        primarySFWModelImages,
        primarySFWModelPreviewImage,
        primarySFWModelImageCount,
        previewImageIndex
    }
}