import Swiper from 'swiper'

class MySlider {
    constructor(customize) {
        this.customize = customize
    }

    SlideInit(clickBar, bodyPages, call, customize = this.customize) {
        let navSum = 0
        let bar = null
        let activeSlidePosition = 0
        let clientWidth = 0
        let lastbar = null
        let navSlideWidth = 0
        let navActiveSlideLeft = 0
        let navWidth = 0
        let activeIndex = 0
        let clickSlide = null
        let navSwiper = new Swiper(clickBar, {
            slidesPerView: 6,
            freeMode: true,
            on: {
                init() {
                    navSlideWidth = this.slides.eq(0).css('width'); //导航字数需要统一,每个导航宽度一致
                    navSum = this.slides[this.slides.length - 1].offsetLeft //最后一个slide的位置
                    bar = this.$el.find('.bar')   //获取bar元素
                    bar.find('.color').css('background', customize.highLightBarColor)  //设置bar中color滑动条的颜色
                    bar.find('.color').css('width', customize.BarWidth + 'px')  //设置颜色滑动条的宽度  最大不能超过bar的宽度
                    this.slides.find('.cannel').css('color', customize.ordinaryCannelColor)  //先让所有的cannel颜色变成设置的默认颜色
                    this.slides.eq(0).find('.cannel').css('color', customize.highLightCannelColor)  //再让第一个频道颜色为高亮颜色
                    bar.css('width', navSlideWidth)  //设置bar的宽度
                    clientWidth = parseInt(this.$wrapperEl.css('width')) //Nav的可视宽度
                    for (let i = 0; i < this.slides.length; i++) {
                        navWidth += parseInt(this.slides.eq(i).css('width'))
                    }
                }
            }
        })
        let PageSwiper = new Swiper(bodyPages, {
            on: {
                init() {
                    this.slides.find('.hole').css('paddingBottom', customize.PaddingBottom == 0 ? '' : customize.PaddingBottom + 'px')
                },
                touchMove(e) {
                    bar.transform('translateX(' + navSum * this.progress + 'px)')
                },
                transitionStart(e) {
                    activeIndex = this.activeIndex
                    activeSlidePosition = navSwiper.slides[activeIndex].offsetLeft
                    bar.transition(300)
                    bar.transform('translateX(' + activeSlidePosition + 'px)')
                    navSwiper.setTransition(300)
                    navActiveSlideLeft = navSwiper.slides[activeIndex].offsetLeft //activeSlide距左边的距离
                    if (navActiveSlideLeft < (clientWidth - parseInt(navSlideWidth)) / 2) {
                        navSwiper.setTranslate(0)
                    } else if (navActiveSlideLeft > navWidth - (parseInt(navSlideWidth) + clientWidth) / 2) {
                        navSwiper.setTranslate(clientWidth - navWidth)
                    } else {
                        navSwiper.setTranslate((clientWidth - parseInt(navSlideWidth)) / 2 - navActiveSlideLeft)
                    }
                    navSwiper.slides.find('.cannel').css('color', customize.ordinaryCannelColor)
                    navSwiper.slides.eq(activeIndex).find('.cannel').css('color', customize.highLightCannelColor)
                    call && call(this.activeIndex, e)
                },
            }
        })
        //点击切换频道
        navSwiper.on('tap', function (e) {
            clickSlide = this.slides.eq(this.clickedIndex)
            PageSwiper.slideTo(this.clickedIndex, 300);
            this.slides.find('.cannel').css('color', customize.ordinaryCannelColor);
            clickSlide.find('.cannel').css('color', customize.highLightCannelColor);
        })
        this.navSwiper = navSwiper
        this.PageSwiper = PageSwiper
    }
}

export {
    MySlider,
}
