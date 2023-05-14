import { VIP_PACK_MAP } from '@/utils/const'

// interface Res {
//     code: number | string
//     data: any
// }

interface Obj {
    [key: string]: any
}

interface Res<T = unknown> {
    code: number
    msg: string
    data: T
}

// interface CreateSessionReq {
//     model: string
//     user_name: string
//     user_id: string
//     chat_name: string
// }


type memberTypeKeys = keyof typeof VIP_PACK_MAP