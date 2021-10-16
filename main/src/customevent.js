export class Custom {
    on (name, cb) {
        window.addEventListener(name, (e) => {
            cb(e)
        })
    }
    emit (name, data) {
        const event = new CustomEvent(name, data)
        window.dispatchEvent(event)
    }
}