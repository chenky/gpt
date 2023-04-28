import ClipboardJS from 'clipboard'
import { showToast } from 'vant';
// import 'vant/es/toast/style';

export default {
    mounted (el, binding) {
        el._clipboard = new ClipboardJS(el, {
            text: () => binding.value
        })
        el._clipboard.on('success', e => {
            //   console.log('复制成功！')
            showToast({ message: '复制成功!', duration: 500 });
            el._clipboard.destroy()
        })
        el._clipboard.on('error', e => {
            //   console.log('复制失败！')
            el._clipboard.destroy()
        })
    },
    beforeUnmount (el) {
        el._clipboard.destroy()
    }
}
