import type { AxiosRequestConfig } from 'axios'

declare module 'axios' {
    /**
     * can only add new property that is not exist 
     * in AxiosRequestConfig
    */
    // interface AxiosRequestConfig {
    //     newProperty: boolean
    // }

    /**
     * 附加自定义内容的AxiosRequestConfig
     * -------------------- 
     * extend AxiosRequestConfig, you can override the property
     * that is exist in AxiosRequestConfig
     * */
    interface AxiosRequestConfigPlus extends AxiosRequestConfig {
        freeSignture?: boolean
        needOriginalData?: boolean
        needOriginalResponse?: boolean
        crossDomain?: boolean
        allowMultipleRequest?: boolean
        serialId?: string
        url: string
        BASE_API?: string
        hideError?: boolean
        data?: object
    }
}

declare module 'pinia' {
    export interface PiniaCustomProperties {
        $router: Router;
    }
}


// declare global {
//     /**
//      * can only add new property that is not exist 
//      * in AxiosRequestConfig
//     */
//     interface Window {
//         lqda: {
//             a: string
//         }
//     }
//     // add a new global type declare
//     interface gcql {
//         a: string
//     }
// }


// declare module interface


