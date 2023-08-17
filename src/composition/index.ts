import { computed, isRef, MaybeRef, ref } from 'vue'
import { get } from '@/composition/maybeRef'

export function useBoolean(b: MaybeRef, null_true: boolean = true) {
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

export function useNumberAbbreviation(
    _number: MaybeRef<number | undefined>,
    _decimalPlaces: MaybeRef<number> = 1,
    _upperCase: MaybeRef<boolean> = true
) {
    const units = ['k', 'm', 'b', 't']

    function abbreviate(_n: number, _d: number): string {
        _d = Math.pow(10, _d)

        for (let i = units.length - 1; i >= 0; i--) {
            const size = Math.pow(10, (i + 1) * 3)

            if (size <= _n) {
                _n = Math.round(_n * _d / size) / _d
                if (_n === 1000 && i < (units.length - 1)) {
                    _n = 1
                    i++
                }

                return _n + units[i]
            }
        }

        return String(_n)
    }

    return computed(() => {
        const _n = get(_number) ?? 0
        const _d = get(_decimalPlaces)
        const _u = get(_upperCase)

        const _a = abbreviate(_n, _d)
        return _u ? _a.toUpperCase() : _a
    })
}

export function useAsInt(_number: MaybeRef<number | string | undefined>, defaultValue?: number) {
    function int(a: string | number) {
        if (typeof a === 'string') {
            return parseInt(a)
        }

        return a
    }

    return computed({
        get: () => {
            const _num = _number ? isRef(_number) ? _number.value : _number : defaultValue
            return _num ? int(_num) : defaultValue
        },
        set: (value: number | string | undefined) => {
            const _value = value ? int(value) : undefined
            console.log('setting', value)
            if (isRef(_number)) {
                _number.value = _value
            } else {
                _number = _value
            }
        }
    })
}

export function coercedRef(
    initialValue: MaybeRef<number>,
    min: MaybeRef<number>,
    max: MaybeRef<number>
) {
    const _coerced = ref(initialValue)

    const coerce = (v: number): number => Math.max(get(min), Math.min(v, get(max)))
    return computed({
        get: () => coerce(_coerced.value),
        set: (value) => _coerced.value = coerce(value)
    })
}