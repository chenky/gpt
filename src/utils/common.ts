export function setStateProp (state: Obj, data: Obj) {
    Object.keys(state).forEach((key: string) => {
        state[key] = data[key]
    })
}