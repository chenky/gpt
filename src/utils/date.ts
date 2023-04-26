import dayjs from 'dayjs'
import { formatDate } from './const'

/**
 * @desc 格式化日期
 *        date为日期格式: Date 或date字符串 Date | number | string
 *        fmt为要转化的格式,如:'yyyy-MM-dd HH:mm:ss'
 */
export const dateFormatter = (date: Date | number | string, fmt = formatDate) => {
    if (!date) return ''
    if (typeof date === 'string') {
        const time1 = date.replace(/-/g, '/')
        date = new Date(time1)
    }
    if (typeof date === 'number') {
        date = new Date(date)
    }
    const o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 小时
        'H+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        S: date.getMilliseconds() // 毫秒
    }
    const week = {
        0: '/u65e5',
        1: '/u4e00',
        2: '/u4e8c',
        3: '/u4e09',
        4: '/u56db',
        5: '/u4e94',
        6: '/u516d'
    }
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(
            RegExp.$1,
            (RegExp.$1.length > 1 ? (RegExp.$1.length > 2 ? '/u661f/u671f' : '/u5468') : '') + week[date.getDay() as keyof typeof week]
        )
    }
    let k: keyof typeof o
    for (k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] + '' : ('00' + o[k]).substr(('' + o[k]).length))
        }
    }
    return fmt
}

/**
 * 获取相对当前时间叠加diff（可正可负数，正表示未来某个时间，负数表示过去某个时间）
 * 并且以指定format格式返回
 * dateType: day|month|year
 * diff: Number
 * format: String
 */
export function getDiffDate (dateType = 'day', diff = 0, format = 'yyyy-MM-dd') {
    let retDate: Date | number | string = new Date()
    switch (dateType) {
        case 'day':
            retDate.setTime(retDate.getTime() + 3600 * 1000 * 24 * diff)
            break
        case 'month':
            retDate = retDate.setMonth(retDate.getMonth() + diff)
            break
        case 'year':
            retDate = new Date(retDate.getFullYear() + diff, retDate.getMonth(), retDate.getDate())
            break
    }
    return dateFormatter(retDate, format)
}

/**
 * 把关键字形式的时间段转义成开始结束时间段[startDate, endDate]
 * 默认返回最近十五天时间段
 */
export function translateDate (defaultDateFilter: string) {
    let dateRange = [getDiffDate('day', -15), getDiffDate('day', 0)]
    switch (defaultDateFilter) {
        case 'last_seven_days':
            dateRange = [getDiffDate('day', -7), getDiffDate('day', 0)]
            break
        case 'last_fiften_days':
            dateRange = [getDiffDate('day', -15), getDiffDate('day', 0)]
            break
        case 'last_one_month':
            dateRange = [getDiffDate('month', -1), getDiffDate('month', 0)]
            break
        case 'last_three_months':
            dateRange = [getDiffDate('month', -3), getDiffDate('month', 0)]
            break
        case 'last_one_year':
            dateRange = [getDiffDate('year', -1), getDiffDate('year', 0)]
            break
    }
    return dateRange
}

export function getLastDays (days = 1, format = 'MM.dd') {
    const retDays = []
    for (let index = days; index > 0; index--) {
        retDays.push(getDiffDate('day', -index, format))
    }
    return retDays
}
