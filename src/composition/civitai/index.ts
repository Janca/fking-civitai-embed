import { useFetch } from '@vueuse/core'
import { computed, ref, Ref } from 'vue'

export function useCivitaiModelApi(
    modelId: Ref<number>,
    selectedModelPreviewImageIndex: Ref<number> = ref(0),
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
        data
    } = useFetch<{ data: Ref<object> }>(
        modelApiRequestUrl as Ref<string>,
        {
            immediate,
            refetch: true,
            timeout: 10_000,
            beforeFetch({ url, options, cancel }) {
                if (url == null) {
                    cancel()
                }
            }
        }
    ).json()

    const name = computed(() => {
        const _name = data.value?.name
        const _versionInfo = showVersionInfo.value ? selectedModel.value?.name : null
        return _versionInfo ? `${_name} - ${_versionInfo}` : _name
    })

    const creatorName = computed(() => data.value?.creator?.username)
    const creatorAvatarImage = computed(() => data.value?.creator?.image)

    const versions = computed(() => data.value?.modelVersions)
    const versionCount = computed(() => versions.value?.length ?? 0)

    const statsTarget = computed(() => versionStats.value ? selectedModel?.value : data.value)

    const rating = computed(() => statsTarget.value?.stats.rating ?? -1)
    const ratings = computed(() => statsTarget.value?.stats.ratingCount ?? 0)

    const likes = computed(() => statsTarget.value?.stats?.favoriteCount ?? 0)
    const comments = computed(() => statsTarget.value?.stats?.commentCount ?? 0)
    const downloads = computed(() => statsTarget.value?.stats?.downloadCount ?? 0)

    const type = computed(() => data.value?.type ?? 'UNK')

    const selectedModel = computed(() => versions.value?.[versionIndex.value])

    const selectedModelUrl = computed(() => {
        const _selectedModel = selectedModel.value
        return _selectedModel ? `https://civitai.com/models/${_selectedModel.modelId}?modelVersionId=${_selectedModel.id}` : null
    })

    const _selectedModelImages: Ref<[any] | undefined> = computed(() => selectedModel.value?.images)
    const selectedModelImages = computed(() => _selectedModelImages.value?.filter(_image => _image.nsfw == 'None') ?? [])
    const selectedModelImageCount = computed(() => selectedModelImages.value?.length ?? 0)

    const selectedModelPreviewImageUrl = computed(() => selectedModelImages.value?.[selectedModelPreviewImageIndex.value]?.url?.replace(/\/width=\d+/, ''))

    return {
        abort,
        canAbort,

        error,

        execute,
        isFetching,

        data,

        name,
        type,

        creatorName,
        creatorAvatarImage,

        versions,
        versionCount,

        rating,
        ratings,
        likes,
        comments,
        downloads,

        selectedModel,
        selectedModelUrl,
        selectedModelImages,
        selectedModelPreviewImageUrl,
        selectedModelImageCount,
        selectedModelPreviewImageIndex
    }
}