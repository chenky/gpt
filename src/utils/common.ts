export function setStateByStateKey (state: Obj, data: Obj) {
    Object.keys(state).forEach((key: string) => {
        state[key] = data[key]
    })
}

export function setStateByDataKey (state: Obj, data: Obj) {
    Object.keys(data).forEach((key) => {
        state[key] = data[key]
    })
}