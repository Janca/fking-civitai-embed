import { useFetch } from '@vueuse/core'
import { computed, ref, Ref } from 'vue'

export function useCivitaiModelApi(modelId: Ref<number>, previewImageIndex: Ref<number> = ref(0), immediate: boolean = false) {
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

    const modelName = computed(() => modelData.value?.name)

    const modelUploader = computed(() => modelData.value?.creator?.username)
    const modelUploaderProfileImage = computed(() => modelData.value?.creator?.image)

    const modelVersions = computed(() => modelData.value?.modelVersions)

    const modelRating = computed(() => modelData.value?.stats.rating ?? -1)
    const modelRatings = computed(() => modelData.value?.stats.ratingCount ?? 0)

    const modelLikes = computed(() => modelData.value?.stats?.favoriteCount ?? 0)
    const modelComments = computed(() => modelData.value?.stats?.commentCount ?? 0)
    const modelDownloads = computed(() => modelData.value?.stats?.downloadCount ?? 0)

    const modelType = computed(() => modelData.value?.type ?? 'UNK')

    const primaryModel = computed(() => modelVersions.value?.[0])

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
        primarySFWModelImageCount,
        previewImageIndex
    }
}