export function useRetry<T> (promise: Promise<T>, times = 3) {
    if (typeof times === 'number' && times > 1 && times < 5) {

        return new Promise((resolve, reject) => {
            function _ () {
                if (times > 0) {
                    return promise.then(res => {
                        times = 0
                        resolve(res)
                    }).catch(err => {
                        times--
                        _()
                    })
                }
                return promise
            }
            _()
        })
    }
    return promise
}