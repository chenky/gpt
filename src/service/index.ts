import type { memberTypeKeys } from '@/types/common';
import { get, post } from '@/utils/request'
import type { AxiosRequestConfigPlus } from 'axios';

export function getUserInfo (uid = '') {
    const config: AxiosRequestConfigPlus = {
        url: ``
    }
    // only local test need this Authorization
    // if (import.meta.env.MODE === 'development') {
    // config.headers.Authorization = ''
    //     config.headers = { Authorization: 'eyJraWQiOiI3V09TVjlRMUZLVnVkOFUxR0pMTFZhVEdrOTg2YVR5S0VUbzl6VXF6MGJZPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2bnZ1NHUyZm5wYzdqYTByOGc2OWZqZzcxayIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiaHR0cHM6XC9cL2FwaS1xYS5saXF1aWRvLmNvbVwvdjFcL3BheW1lbnRzXC9wYXlvdXRzXC9BTEwgaHR0cHM6XC9cL2FwaS1xYS5saXF1aWRvLmNvbVwvdjFcL3BheW1lbnRzXC9jaGFyZ2VzXC9BTEwiLCJhdXRoX3RpbWUiOjE2Nzg2NzIyOTEsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5hcC1zb3V0aGVhc3QtMS5hbWF6b25hd3MuY29tXC9hcC1zb3V0aGVhc3QtMV9qc1NCVzlRYkwiLCJleHAiOjE2Nzg2NzU4OTEsImlhdCI6MTY3ODY3MjI5MSwidmVyc2lvbiI6MiwianRpIjoiNDE3MDM1MWYtZmNhYi00NTIwLTk2NmEtNTc1ZDgwMDY4YWVhIiwiY2xpZW50X2lkIjoiNm52dTR1MmZucGM3amEwcjhnNjlmamc3MWsifQ.ozhDpZmyxudD75Yl36fHm0uBXZSGVoLAh-cuVk6haFoYk9XshYXkAZLcm3L1d6M82ElCxyc5AymkNgJ5SKmiddcYHgrNdIs2uYCKH8uMBjqm8ZEjCdkSomqYwIurWKi66Ge2lbOqJgs_hVNPQJ14fHn9LWHxjIEN_2g9kNwh2pQQW96P8OTEdS3ECwexfA7ZUrVZWHKUg_3l9ymxIYWup8QYtiY7eUFMkRpu_vTHy1w5wfCSmr-AWqThI1OEClbFiFI-JfXX-bUiAW33sSf0MUxIV008nMcGPMIkguOQHBu-DLVoP-SDeL9hat6HmCpsa-C_-mDfdpd0wK38g6ejkQ' }
    // }
    // console.log('mode: ', import.meta.env.MODE, ', config', config)
    return get(config)
}

export function postMsg (uid: string, prompt: string) {
    return post({
        url: '/ask_chatgpt',
        data: { uid, prompt }
    })
}

// 充值成为vip会员
export function recharge (uid: string, memberType: string) {
    return post({
        url: '/ask_chatgpt',
        data: { uid, memberType }
    })
}