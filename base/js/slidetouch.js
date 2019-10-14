export default class Touchable {
    constructor(selector) {
        this.selector = selector
    }
    touchEvents(paramsobj, selector = this.selector) {
        this.obj = null
        this.startposition = this.startposition = null
        let that = this
        if (typeof selector == "string") {
            this.obj = document.querySelector(selector)
        } else {
            this.obj = selector
        }
        this.obj.addEventListener('touchstart', function (e) {
            that.startposition = {
                x: e.touches[0].pageX,
                y: e.touches[0].pageY
            }
            paramsobj.touchstart && paramsobj.touchstart(this, e)
        })
        this.obj.addEventListener('touchmove', function (e) {
            that.endposition = {
                x: e.touches[0].pageX,
                y: e.touches[0].pageY
            }
            that.deficitX = that.endposition.x - that.startposition.x
            that.deficitY = that.endposition.y - that.startposition.y
            paramsobj.touchmove && paramsobj.touchmove(this, e, {
                deficitX: that.deficitX,
                deficitY: that.deficitY
            })
        })
        this.obj.addEventListener('touchend', function (e) {
            paramsobj.touchend && paramsobj.touchend(this, e, {
                deficitX: that.deficitX,
                deficitY: that.deficitY
            })
            that.deficitX = 0
            that.deficitY = 0
        })
    }
}
