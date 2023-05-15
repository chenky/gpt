import type { Ref } from 'vue'
import { nextTick, ref } from 'vue'

type ScrollElement = HTMLElement | null

interface ScrollReturn {
  scrollRef: Ref<ScrollElement>
  scrollToBottom: () => Promise<void>
  scrollToTop: () => Promise<void>
  scrollToBottomIfAtBottom: () => Promise<void>
}

export function useScroll(scrollRef: Ref<ScrollElement>): ScrollReturn {
scrollRef = scrollRef || ref<ScrollElement>(null)

  const scrollToBottom = async () => {
    await nextTick()
    if (scrollRef.value){
        // console.log(scrollRef.value.scrollHeight, scrollRef.value.scrollTop)
       scrollRef.value.scrollTop = scrollRef.value.scrollHeight 
    }
      
  }

  const scrollToTop = async () => {
    await nextTick()
    if (scrollRef.value)
      scrollRef.value.scrollTop = 0
  }

  const scrollToBottomIfAtBottom = async () => {
    await nextTick()
    if (scrollRef.value) {
      const threshold = 100 // 阈值，表示滚动条到底部的距离阈值
      const distanceToBottom = scrollRef.value.scrollHeight - scrollRef.value.scrollTop - scrollRef.value.clientHeight
      if (distanceToBottom <= threshold)
        scrollRef.value.scrollTop = scrollRef.value.scrollHeight
    }
  }

  return {
    scrollRef,
    scrollToBottom,
    scrollToTop,
    scrollToBottomIfAtBottom,
  }
}