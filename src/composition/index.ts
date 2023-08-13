import { computed, isRef, MaybeRef } from 'vue'

export function useBoolean(b: MaybeRef<string | number | boolean | null>, null_true: boolean = true) {
    function bool(a: string | number | boolean | null): boolean {
        if (a === undefined) {
            return false
        } else if (a == null) {
            return null_true
        } else if (typeof a == 'string') {
            a = a.toLowerCase()
            if (a == 'true') {
                return true
            } else if (a == 'false') {
                return false
            } else {
                a = parseInt(a)
                console.log('checking refresh as int', a)
                return bool(a)
            }
        }

        return Boolean(a)
    }

    return computed(() => bool(isRef(b) ? b.value : b))
}