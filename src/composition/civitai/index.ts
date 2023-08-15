import { BeforeFetchContext, ReadonlyRefOrGetter, useFetch } from '@vueuse/core'
import { computed, isReadonly, isRef, MaybeRef, ref, Ref, WritableComputedRef } from 'vue'

export type CivitaiModel = {
    id: number,
    name: string,
    description: string,
    type: 'Checkpoint' | 'TextualInversion' | 'Hypernetwork' | 'AestheticGradient' | 'LORA' | 'Controlnet' | 'Poses' | string,
    nsfw: boolean,
    tags: string[],

    creator: {
        image: string,
        username: string
    },

    stats: {
        commentCount: number,
        downloadCount: number,
        favoriteCount: number,
        rating: number,
        ratingCount: number
    },

    modelVersions: {
        id: number,
        modelId: number,
        name: string,
        images: {
            hash: string,
            nsfw: string | 'Soft' | 'Mature' | 'X' | 'None',
            url: string,
            width: number,
            height: number
        }[],
        stats: {
            downloadCount: number,
            rating: number,
            ratingCount: number
        }
    }[]
}

function writableRef<T = unknown>(_ref: ReadonlyRefOrGetter<T> | MaybeRef<T>): Ref<T> | WritableComputedRef<T> {
    if (isRef(_ref)) {
        if (isReadonly(_ref)) {
            const _r: Ref<T> = ref(_ref.value) as Ref<T>
            return computed({
                get: () => _r.value,
                set: (value) => _r.value = value
            })
        }

        return _ref
    } else if (_ref instanceof Function) {
        return writableRef(computed(_ref))
    } else {
        return writableRef(() => _ref)
    }
}

export function useCivitaiModelApi2(
    _modelId: Ref<number> = ref(-1),
    _modelVersionId: Ref<number> = ref(-1),
    _selectedVersionIndex: Ref<number> = ref(-1),
    _selectedModelVersionPreviewImageIndex: Ref<number> = ref(-1),
    fetchOptions?: { immediate: boolean }
) {
    const modelId: Ref<number> = writableRef(_modelId)
    const modelVersionId: Ref<number> = writableRef(_modelId)

    function getVersionIdFromIndex(index: number, _v?: CivitaiModel['modelVersions']): number | -1 {
        const _versions = _v ?? versions.value
        return index >= 0 ? _versions?.[index]?.id ?? -1 : -1
    }

    function getVersionIndexFromId(id: number, _v?: CivitaiModel['modelVersions']): number | -1 {
        const _versions = _v ?? versions.value
        return id > 0 ? _versions?.findIndex(it => it.id == id) ?? -1 : -1
    }

    const selectedVersionIndex = computed({
        get: () => _selectedVersionIndex.value,
        set: (value) => {
            const _versionCount = versionCount.value
            const _value = Math.max(0, Math.min(value, _versionCount - 1))

            _selectedVersionIndex.value = _value
            _modelVersionId.value = getVersionIdFromIndex(_value)
        }
    })

    const modelApiUrl = computed(() => {
        const _mid = _modelId.value
        return (_mid ? _mid > 0 ? `https://civitai.com/api/v1/models/${_mid}` : null : null) as string
    })

    function cancelInvalidRequest({ url, options, cancel }: BeforeFetchContext) {
        if (url == null) {
            cancel()
        }
    }

    const {
        abort,
        canAbort,

        execute,
        isFetching,

        error,
        data
    } = useFetch(modelApiUrl, {
        immediate: fetchOptions?.immediate,
        refetch: true,
        timeout: 10_000,
        beforeFetch: cancelInvalidRequest
    }).json<CivitaiModel>()

    const isErroneous = computed(() => error == null)
    const isValid = computed(() => data.value != null && !isErroneous.value)

    const name = computed(() => data.value?.name)

    const creatorName = computed(() => data.value?.creator.username)
    const creatorAvatarUrl = computed(() => data.value?.creator.image)

    const typeMap: { [key: string]: string } = {
        'TextualInversion': 'Embedding',
        'AestheticGradient': 'Aesthetic Gradient'
    }

    const type = computed(() => {
        const _type = data.value?.type ?? 'UNK'
        if (_type in typeMap) {
            return typeMap[_type]
        }

        return _type
    })

    const versions = computed(() => data.value?.modelVersions)
    const versionCount = computed(() => versions.value?.length ?? 0)

    const rating = computed(() => data.value?.stats.rating)
    const ratings = computed(() => data.value?.stats.ratingCount)
    const likes = computed(() => data.value?.stats.favoriteCount)
    const comments = computed(() => data.value?.stats.commentCount)
    const downloads = computed(() => data.value?.stats.downloadCount)

    const selectedModelVersion = computed(() => data.value?.modelVersions?.[_selectedVersionIndex.value])
    const selectedModelVersionImages = computed(() => selectedModelVersion.value?.images.filter(it => it.nsfw == 'Soft' || it.nsfw == 'None'))
    const selectedModelVersionImageCount = computed(() => selectedModelVersionImages.value?.length ?? 0)

    const selectedModelVersionRating = computed(() => selectedModelVersion.value?.stats.rating)
    const selectedModelVersionRatings = computed(() => selectedModelVersion.value?.stats.ratingCount)
    const selectedModelVersionDownloads = computed(() => selectedModelVersion.value?.stats.downloadCount ?? 0)

    const selectedModelVersionPreviewImageUrl = computed(() => selectedModelVersionImages.value?.[_selectedModelVersionPreviewImageIndex.value]?.url?.replace(/\/width=\d+/, ''))

    const selectedModelVersionCivitaiUrl = computed(() => {
        const _mid = _modelId.value
        const _selectedModelVersionId = modelVersionId.value

        const civitaiUrl = `https://civitai.com/models/${_mid}`
        return _selectedModelVersionId > 0 ? `${civitaiUrl}?modelVersionId=${_selectedModelVersionId}` : civitaiUrl
    })

    return {
        abort,
        canAbort,

        execute,
        isFetching,

        error,
        isErroneous,

        data,
        isValid,

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

        selectedModelVersion,
        selectedModelVersionCivitaiUrl,

        selectedVersionIndex,

        selectedModelVersionRating,
        selectedModelVersionRatings,
        selectedModelVersionDownloads,
        selectedModelVersionImages,

        selectedModelVersionPreviewImageIndex: _selectedModelVersionPreviewImageIndex,
        selectedModelVersionPreviewImageUrl
    }
}

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

    const isValid = computed(() => data.value != null)

    return {
        abort,
        canAbort,

        error,

        execute,
        isFetching,

        data,
        isValid,

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