import {computed, isRef, MaybeRef, reactive, ref, watch} from 'vue'
import {useFetch} from "@vueuse/core";
import {useBooleanRef, useRef} from "@/composition";

type CivitaiModel = {
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

type UseFetchCivitaiModel = {
    modelId: MaybeRef<number | undefined>
}

type UseCivitaiModel = {
    modelId?: MaybeRef<number | undefined>,
    modelVersionId?: MaybeRef<number | undefined>
}

type UseCivitaiModelEmbed = {
    selectedModelVersionIndex?: MaybeRef<number | undefined>,
    selectedModelPreviewImageIndex?: MaybeRef<number | undefined>

    showVersionInfo?: MaybeRef<boolean | undefined>,
    showVersionStatistics?: MaybeRef<boolean | undefined>
} & UseCivitaiModel

function useFetchCivitaiModel(init?: UseFetchCivitaiModel) {
    const {
        modelId: _modelId = ref(-1)
    } = init ?? {}

    const modelId = isRef(_modelId) ? _modelId : ref(_modelId)
    const modelApiRequestUrl = computed(() => {
        const _modelId = modelId.value ?? -1
        return (_modelId > 0 ? `https://civitai.com/api/v1/models/${modelId.value}` : null) as string
    })

    const {
        abort,
        canAbort,

        execute,
        isFetching,

        data,
        error
    } = useFetch(
        modelApiRequestUrl,
        {
            refetch: true,
            immediate: modelApiRequestUrl.value != null,
            beforeFetch: ({url, cancel}) => {
                if (url == null) {
                    cancel()
                }
            }
        }
    ).json<CivitaiModel>()

    return {
        abort,
        canAbort,

        execute,
        isFetching,

        data,
        error,

        modelId,
        modelApiRequestUrl
    }
}

export function useCivitaiModel(init?: UseCivitaiModel) {
    const {
        modelId: _modelId = ref(-1),
        modelVersionId: _modelVersionId = ref(-1)
    } = init ?? {}

    const modelId = useRef(_modelId)
    const modelVersionId = useRef(_modelVersionId)

    const {
        abort,
        canAbort,

        execute,
        isFetching,

        data,
        error,

        modelApiRequestUrl
    } = useFetchCivitaiModel({modelId})

    const versions = computed(() => data.value?.modelVersions)
    const versionCount = computed(() => versions.value?.length ?? 0)

    return {
        modelId,
        modelVersionId,

        versions,
        versionCount,

        data,
        error,

        isFetching,
        refresh: execute
    }
}

export function useCivitaiModelEmbed(init?: UseCivitaiModelEmbed) {
    const {
        modelId,
        modelVersionId,

        versions,
        versionCount,

        data,
        error,

        isFetching,
        refresh
    } = useCivitaiModel(init)

    const {
        selectedModelVersionIndex: _selectedVersionIndex = ref(0),
        selectedModelPreviewImageIndex: _selectedModelPreviewImageIndex = ref(0),

        showVersionInfo: _showVersionInfo = ref(false),
        showVersionStatistics: _showVersionStatistics = ref(false)
    } = init ?? {}

    const selectedModelVersionIndex = useRef(_selectedVersionIndex)
    const selectedModelPreviewImageIndex = useRef(_selectedModelPreviewImageIndex)

    const selectedModelVersion = computed(() => data.value?.modelVersions?.[selectedModelVersionIndex.value ?? 0])

    const previewImages = computed(() => selectedModelVersion.value?.images?.filter(it => it.nsfw === "Soft" || it.nsfw === "None"))

    const selectedPreviewImage = computed(() => previewImages.value?.[selectedModelPreviewImageIndex.value ?? 0])
    const selectedPreviewImageUrl = computed(() => selectedPreviewImage.value?.url?.replace(/\/width=\d+/, ''))

    const showVersionInfo = useBooleanRef(_showVersionInfo)
    const showVersionStatistics = useBooleanRef(_showVersionStatistics)

    watch(data, () => {
        const _versionId = modelVersionId.value ?? -1
        const _versionIdx = selectedModelVersionIndex.value ?? -1

        const _versions = versions.value
        const _versionsCount = versionCount.value

        const versionIndexFromId = _versions?.findIndex(it => it.id === _versionId) ?? -1
        if (versionIndexFromId !== -1) {
            selectedModelVersionIndex.value = versionIndexFromId
        } else if (_versionIdx !== -1 && 0 <= _versionIdx && _versionIdx <= _versionsCount) {
            const versionByIdx = _versions?.[_versionIdx]
            if (versionByIdx) {
                modelVersionId.value = versionByIdx.id
            }
        } else {
            selectedModelVersionIndex.value = 0
            selectedModelPreviewImageIndex.value = 0

            const versionByIdx = _versions?.[0]
            if (versionByIdx) {
                modelVersionId.value = versionByIdx.id
            }
        }
    })

    return {
        modelId,
        modelVersionId,

        selectedModelVersionIndex,
        selectedModelPreviewImageIndex,

        showVersionInfo,
        showVersionStatistics,

        selectedPreviewImageUrl: selectedPreviewImageUrl
    }
}