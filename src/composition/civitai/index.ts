import { computed, isRef, MaybeRef, reactive, ref } from 'vue'

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
    modelVersionId?: MaybeRef<number | undefined>,
    selectedModelVersionIndex?: MaybeRef<number | undefined>,
    selectedModelPreviewImageIndex?: MaybeRef<number | undefined>
}

function useFetchCivitaiModel(init?: UseFetchCivitaiModel) {
    const {
        modelId: _modelId = ref(-1)
    } = init ?? {}

    const modelId = isRef(_modelId) ? _modelId : ref(_modelId)
    const modelApiRequestUrl = computed(() => {
        const _modelId = modelId.value ?? -1
        return _modelId > 0 ? `https://civitai.com/api/v1/models/${modelId.value}` : null
    })

    return {
        modelId,
        modelApiRequestUrl
    }
}

export function useCivitaiModel(init?: UseCivitaiModel) {
    const {
        modelId: _modelId = ref(-1),
        modelVersionId: _modelVersionId = ref(-1)
    } = init ?? {}

    const modelId = isRef(_modelId) ? _modelId : ref(_modelId)
    const modelVersionId = isRef(_modelVersionId) ? _modelVersionId : ref(_modelVersionId)

    const {
        modelApiRequestUrl
    } = useFetchCivitaiModel({ modelId })

    return reactive({
        modelId,
        modelVersionId,
        modelApiRequestUrl
    })
}