import { isRef, MaybeRef } from 'vue'

export function get<T = unknown | undefined>(t: MaybeRef<T>): T {
    return isRef(t) ? t.value : t
}