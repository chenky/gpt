import axios from 'axios'
import type { AxiosRequestConfigPlus, RawAxiosRequestHeaders } from 'axios';
import { SUCCESS_CODE, STATUS_CODE } from './const'
// import { showFailToast } from 'vant';
// import 'vant/es/toast/style';
// import { signature } from './crypto.ts'
// import Vue from 'vue'

// type SuccessRes<T> = {
//     code: '00000';
//     data: T;
//     message: '';
// }

// export type PromiseRes<ResType = unknown> = Promise<ResData<ResType> | AxiosError<ResData<ResType>>>
const { VITE_BASE_URL } = import.meta.env

// console.log(import.meta, 'aaaaaaa')

const requestLocker = new Map()
// 鉴权失效需要跳登录页http状态码
const authStatusCodes = [401]

// 因为前端不需要支持太老的浏览器，所以可以使用URLSearchParams, 本来参数应该放在params中，但是现在很多参数都放在url中了
function paramsSerializer (config: AxiosRequestConfigPlus) {
    const { url, params } = config

    const searchIndex = url.indexOf('?')
    let finalParams = new URLSearchParams()
    if (searchIndex !== -1) {
        const _urlSearch = url.substring(searchIndex + 1)
        finalParams = new URLSearchParams(_urlSearch)
    }
    for (const key in params) {
        if (Object.hasOwnProperty.call(params, key)) {
            const val = params[key]
            finalParams.append(key, val)
        }
    }
    const finalUrl = searchIndex !== -1 ? url.slice(0, searchIndex) : url
    return { url: finalUrl, params: finalParams }
}

// create an axios instance
function getAxiosInstance (config: AxiosRequestConfigPlus) {
    const { BASE_API = '' } = config
    let headers: RawAxiosRequestHeaders = {
        'Content-Type': 'application/json'
    }
    if (config.headers) {
        headers = { ...headers, ...config.headers }
    }
    const service = axios.create({
        baseURL: VITE_BASE_URL + BASE_API, // api 的 base_url
        timeout: typeof config.timeout === 'number' ? config.timeout : 30000, // request timeout,
        headers
    })
    // request interceptor
    service.interceptors.request.use(
        originalConfig => {
            // originalConfig.headers.Authorization = accountInfo()?.token
            // config.withCredentials = true
            originalConfig.data = config.needOriginalData ? config.data : JSON.stringify(config.data)

            const urlAndParams = paramsSerializer(config)

            const retConfig = { ...originalConfig, ...urlAndParams }
            // if (!originalConfig?.freeSignture) {
            //     if (!retConfig.headers) retConfig.headers = {}
            //     retConfig.headers.signature = signature(config.data)
            //     // console.log('body is ', config.data, ', signature is ', retConfig.headers.signature?.toString())
            // }
            // console.log(retConfig, 'request config')
            return retConfig
        },
        error => {
            // Do something with request error
            Promise.reject(error)
        }
    )

    // response interceptor
    // 统一token失效处理，以及公共错误处理。
    service.interceptors.response.use(
        // response => response,
        /**
         * 根据状态码定义特殊提示
         */
        response => {
            // console.log(response)
            if (config.needOriginalResponse) {
                return response
            }

            const { data, status } = response
            const { code } = data
            if (code === SUCCESS_CODE  && status === STATUS_CODE) {
                return data
            } else {
                // 默认不显示统一错误处理
                // if (!config.hideError) {
                //     showFailToast(transferErrorMsg)
                // }
                // return Promise.reject(transferErrorMsg)
                return Promise.reject(data)
            }
        },
        error => {
            // const status = error?.response?.status
            // let tipMsg
            // if (authStatusCodes.indexOf(status) !== -1) {
            //     tipMsg = error?.response?.data?.message || 'session expired, please sign in'
            // } else {
            //     tipMsg = error?.response?.data?.message || 'network error'
            //     // 添加判断是否是主动取消请求的错误，不弹出提示
            //     if (error.message === 'Request aborted') {
            //         config.hideError = true
            //     }
            // }
            const errRes = error?.response
            // 默认不显示统一错误处理
            // if (!config.hideError) {
            //     showFailToast(errData.errors[0]?.errorMessage)
            // }
            return Promise.reject(errRes?.data)
        }
    )

    return service
}

/**
 * 封装Axios
 * 1. 同一个url且参数也相同，则必须等到请求返回结果后才能提交，其他请求不受影响
 * 2. 如果登录有token，则每个请求会在http header.Authorization中携带token
 * 3. 设置一些基础默认参数，比如超时时间等
 * 4. 统一错误处理，比如token失效调登录页
 * 备注：
 * a. 不需要做防重复提交可以设置allowMultipleRequest=true，serialId作为防重复提交的标识，如果没有这个参数则url+method+JSON.stringfy(params)
 * b. 不需要展示错误消息hideError设置为true
 * c. 如果需要返回原始的response，这needOriginalResponse参数设置为true
 * d. 前端传递数据给后台统一json字符串，如果需要原始数据，比如formData，设置needOriginalData为true
 *
 */
export function Request (config: AxiosRequestConfigPlus) {
    // 设置默认参数
    config.method = config?.method ?? 'POST'
    // config.crossDomain = true

    if (!config.url) {
        throw new Error('提交的url不能为空')
    }

    // 某些场景需要同时请求多次相同的接口，如果需要跳过重复提交的检查就传此参数 allowMultipleRequest
    if (config.allowMultipleRequest) {
        const service = getAxiosInstance(config)

        return service.request(config)
    }

    let guid = config.serialId
    if (!guid) {
        const { url, params, data } = config
        guid = url + '_' + config.method + '_' + JSON.stringify(data) + '_' + JSON.stringify(params)
    }

    if (requestLocker.has(guid)) {
        const tipMsg = '[duplicate requests]duplicate request, please request later'
        // 默认不显示统一错误处理
        // if (!config.hideError) oneMessage.warning(tipMsg)
        console.log(tipMsg)
        // 正在提交中
        return Promise.reject(tipMsg)
    }
    requestLocker.set(guid, true)

    const service = getAxiosInstance(config)

    return service.request(config).finally(() => {
        // 请求结束重置请求，以允许用户再次提交
        // 使用delete及时清理不需要的数据，防止map对象存储太多键值内存溢出
        requestLocker.delete(guid)
    })
}

// 本来应该只有一个config参数
export function api (config: AxiosRequestConfigPlus) {
    return Request(config)
}

export function get (config: AxiosRequestConfigPlus) {
    return api({ ...config, method: 'GET' })
}

export function post (config: AxiosRequestConfigPlus) {
    return api({ ...config, method: 'POST' })
}

// 下载
export function downloadByApi (config: AxiosRequestConfigPlus) {
    config.responseType = 'blob'
    return api(config)
}
