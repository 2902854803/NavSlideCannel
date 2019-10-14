<template>
    <div id="top">
        <div class="swiper-container" id="clickbar">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item,i) in title" :key="i">
                    <div class="cannel" :class="{'first':i==0}">{{item}}</div>
                </div>
                <div class="bar">
                    <div class="color"></div>
                </div>
            </div>
        </div>
        <div class="swiper-container" id="bodyPages" v-rects>
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item,i) in title" :key="i">
                    <div class="hole" @transitionend="TransEnd($event)">
                        <slot :name="'each_'+(i+1)"></slot>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {MySlider} from '@/base/js/slide'
    import SlideTouch from '@/base/js/slidetouch'
    import '@/base/css/slide.less'

    export default {
        data() {
            return {
                slide: null,
                touch: null,
            }
        },
        props: {
            title: {
                type: Array,
                default: null
            },
            highLightBarColor: {  //bar中滑动条的颜色
                type: String,
                default: 'rgb(255,21,76)'
            },
            ordinaryCannelColor: {  //频道字体的默认颜色
                type: String,
                default: 'rgba(51,51,51,1)'
            },
            highLightCannelColor: {  //频道字体的高亮颜色
                type: String,
                default: 'rgb(255,40,78)'
            },
            BarWidth: {    //bar中颜色滑动条的宽度
                type: Number,
                default: 36
            },
            PaddingBottom: {
                type: Number,
                default: 0
            }
        },
        methods: {
            GetActiveSlide(el) {
                return el.querySelector('.swiper-slide-active').querySelector('.hole')
            },
            SetTransform(el, sets) {
                el.style.transform = `translateY(${sets}px)`
            },
            isScrollzero(el) {
                return el.scrollTop == 0
            },
            isScrollBottom(el, that) {
                return Math.abs(el.offsetHeight + that.GetActiveSlide(el).parentElement.scrollTop - that.GetActiveSlide(el).offsetHeight) < 1
            },
            SetTransition(el, speed, type) {
                el.style.transition = `${type} ${speed}s ease`
            },
            TransEnd(e) {
                e.target.style.transition = ''
            },
            BackBeginning(el, speed, trans) {
                this.SetTransition(this.GetActiveSlide(el), speed, 'transform')
                this.SetTransform(this.GetActiveSlide(el), trans)
            },
            AddTouchEvents(that) {
                this.touch.touchEvents({
                    touchmove(el, event, deficit) {
                        if (that.isScrollzero(that.GetActiveSlide(el).parentElement)) {
                            if (deficit.deficitY >= 0) {
                                that.SetTransform(that.GetActiveSlide(el), deficit.deficitY * 0.5)
                            }
                            //滑动到底部
                        } else if (that.isScrollBottom(el, that)) {
                            if (deficit.deficitY <= 0) {
                                that.SetTransform(that.GetActiveSlide(el), deficit.deficitY * 0.5)
                            }
                        }
                    },
                    touchend(el, event, deficit) {
                        if (that.isScrollzero(that.GetActiveSlide(el).parentElement) || that.isScrollBottom(el, that)) {
                            that.BackBeginning(el, 0.4, 0)
                        }
                    }
                })
            }
        },
        mounted() {
            //获取实例
            this.slide = new MySlider({
                highLightBarColor: this.highLightBarColor,
                ordinaryCannelColor: this.ordinaryCannelColor,
                highLightCannelColor: this.highLightCannelColor,
                BarWidth: this.BarWidth,
                PaddingBottom: this.PaddingBottom
            })
            //'#clickbar','#bodyPages'分别是头部tab频道栏和主体slide的container选择器
            this.slide.SlideInit('#clickbar', '#bodyPages', ((id) => {
                this.$emit('slideChange', id)
            }))
            //渲染hole添加拖动功能
            this.touch = new SlideTouch('#bodyPages')
            this.AddTouchEvents(this)
        },
        directives: {
            'rects': {
                bind(el, bounding) {
                    //45.5为#clickbar的高度可自定义修改
                    el.style.height = (document.documentElement.clientHeight - 45.5) + 'px'
                }
            }
        }
    }
</script>
<style>
</style>
