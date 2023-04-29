/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BASE_URL: string
    readonly VITE_WX_CALLBACK_URL: string
    readonly VITE_APPID: string
    // 更多环境变量...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}