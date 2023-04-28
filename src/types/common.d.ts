import { VIP_PACK_MAP } from '@/utils/const'

// interface Res {
//     code: number | string
//     data: any
// }

interface Obj {
    [key: string]: any
}


type memberTypeKeys = keyof typeof VIP_PACK_MAP
type memberTypeValues = VIP_PACK_MAP[keys]