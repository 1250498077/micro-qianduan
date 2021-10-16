let defaultValue = {}
export class ProxySandbox {
    constructor() {
        // 1.代理对象
        this.proxy = null
        this.active()
    }
    // 沙箱激活
    active() {
        this.proxy = new Proxy(window, {
            get(target, key) {
                if (typeof target[key] === 'function') {
                    return target[key].bind(target)
                }
                return defaultValue[key] || target[key]
            },
            set(target, key, value) {
                defaultValue[key] = value
                return true
            }
        })
    }
    // 沙箱销毁
    inactive () {
        defaultValue = {}
    }
}