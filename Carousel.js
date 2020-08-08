function Sim(sldrId) {

    let id = document.getElementById(sldrId);
    if (id) {
        this.sldrRoot = id;
    } else {
        this.sldrRoot = document.querySelector('.sim-slider');
    }

    // Carousel objects
    this.sldrList = this.sldrRoot.querySelector('.sim-slider-list');
    this.sldrElements = this.sldrList.querySelectorAll('.sim-slider-element');
    this.sldrElemFirst = this.sldrList.querySelector('.sim-slider-element');
    this.leftArrow = this.sldrRoot.querySelector('div.sim-slider-arrow-left');
    this.rightArrow = this.sldrRoot.querySelector('div.sim-slider-arrow-right');
    this.indicatorDots = this.sldrRoot.querySelector('div.sim-slider-dots');

    // Initialization
    this.options = Sim.defaults;
    this.mode = 0;
    Sim.initialize(this);
}

Sim.defaults = {

    // Default options for the carousel
    loop: true,     // Бесконечное зацикливание слайдера
    auto: false,     // Автоматическое пролистывание
    interval: 5000, // Интервал между пролистыванием элементов (мс)
    arrows: true,   // Пролистывание стрелками
    dots: true,     // Индикаторные точки
    length: 3       // Длина ряда
};

Sim.prototype.elemPrev = function (num) {
    let prevElement;
    if (this.mode === 1) {
        num = num || this.options.length;
        prevElement = this.currentElement;
    } else {
        num = num || 1;
        prevElement = (this.currentElement + this.options.length - 1) % this.sldrElements.length;
    }
    //console.log(num);
    this.mode = -1;
    this.currentElement -= num;
    if (this.currentElement < 0) this.currentElement = this.elemCount + this.currentElement;
    // console.log(prevElement + " " + this.currentElement);
    if (!this.options.loop) {
        if (this.currentElement === 0) {
            this.leftArrow.style.display = 'none';
        }
        this.rightArrow.style.display = 'block';
    }
    this.sldrElements[this.currentElement].style.opacity = '1';
    this.sldrElements[prevElement].style.opacity = '0';

    setTimeout(() => function () {
        this.sldrElements[this.currentElement].style.display = 'block';
        this.sldrElements[prevElement].style.display = 'none'
    }.apply(this, arguments), 250);
    setTimeout(() => function () {
        for (let i = this.currentElement - this.options.length + 1; i <= this.currentElement; i++){
            let x = i;
            if (i < 0){
                x = this.sldrElements.length + i;
            }
            this.sldrElements[x].style.opacity = '1';
        }
    }.apply(this, arguments), 500);

    if (this.options.dots) {
        this.dotOn(prevElement);
        this.dotOff(this.currentElement);
    }
};

Sim.prototype.elemNext = function (num) {
    let prevElement;
    if (this.mode === -1) {
        num = num || this.options.length;
        prevElement = this.currentElement;
    } else {
        num = num || 1;
        prevElement = ((this.currentElement - this.options.length + 1) + this.sldrElements.length) % this.sldrElements.length;
    }
    //console.log(num);
    this.mode = 1;
    this.currentElement += num;
    if (this.currentElement >= this.elemCount) this.currentElement = this.currentElement - this.elemCount;
    // console.log(prevElement + " " + this.currentElement);

    if (!this.options.loop) {
        if (this.currentElement === this.elemCount - 1) {
            this.rightArrow.style.display = 'none';
        }
        this.leftArrow.style.display = 'block';
    }

    for (let i = 0; i < this.sldrElements.length; i++){
        this.sldrElements[i].style.opacity = '0';
    }

    setTimeout(() => function () {
        this.sldrElements[this.currentElement].style.display = 'block';
        this.sldrElements[prevElement].style.display = 'none'
    }.apply(this, arguments), 250);
    setTimeout(() => function () {
        for (let i =this.currentElement - this.options.length + 1; i <= this.currentElement; i++){
            let x = i;
            if (i < 0){
                x = this.sldrElements.length + i;
            }
            this.sldrElements[x].style.opacity = '1';
        }
    }.apply(this, arguments), 500);

    if (this.options.dots) {
        this.dotOn(prevElement);
        this.dotOff(this.currentElement);
    }
};

Sim.prototype.dotOn = function (num) {
    this.indicatorDotsAll[num].style.cssText = 'background-color:#BBB; cursor:pointer;'
};

Sim.prototype.dotOff = function (num) {
    this.indicatorDotsAll[num].style.cssText = 'background-color:#556; cursor:default;'
};

Sim.initialize = function (that) {

    // Constants
    that.elemCount = that.sldrElements.length; // Количество элементов

    // Variables
    that.currentElement = that.options.length - 1;
    let bgTime = getTime();

    // Functions
    function getTime() {
        return new Date().getTime();
    }

    function setAutoScroll() {
        that.autoScroll = setInterval(function () {
            let fnTime = getTime();
            if (fnTime - bgTime + 10 > that.options.interval) {
                bgTime = fnTime;
                that.elemNext();
            }
        }, that.options.interval);
    }

    // Start initialization
    if (that.elemCount <= 1) {   // Отключить навигацию
        that.options.auto = false;
        that.options.arrows = false;
        that.options.dots = false;
        that.leftArrow.style.display = 'none';
        that.rightArrow.style.display = 'none';
    }
    if (that.elemCount >= 1) {
        if (that.elemCount - that.options.length > 0) {
            for (let i = 0; i < that.options.length; i++) {
                that.sldrElements[i].style.opacity = '1';
                that.sldrElements[i].style.display = 'block';
            }
        } else if (that.elemCount - that.options.length === 0) {
            for (let i = 0; i < that.options.length; i++) {
                that.sldrElements[i].style.opacity = '1';
                that.sldrElements[i].style.display = "block";
            }
            that.options.auto = false;
            that.options.arrows = false;
            that.options.dots = false;
            that.leftArrow.style.display = 'none';
            that.rightArrow.style.display = 'none';
        } else {
            that.sldrElemFirst.style.opacity = '1';
            that.sldrElemFirst.style.display = 'block';
        }
    }

    if (!that.options.loop) {
        that.leftArrow.style.display = 'none';  // отключить левую стрелку
        that.options.auto = false; // отключить автопркрутку
    } else if (that.options.auto) {   // инициализация автопрокруки
        setAutoScroll();
        // Остановка прокрутки при наведении мыши на элемент
        that.sldrList.addEventListener('mouseenter', function () {
            clearInterval(that.autoScroll)
        }, false);
        that.sldrList.addEventListener('mouseleave', setAutoScroll, false)
    }

    if (that.options.arrows) {  // инициализация стрелок
        that.leftArrow.addEventListener('click', function () {
            let fnTime = getTime();
            if (fnTime - bgTime > 1000) {
                bgTime = fnTime;
                that.elemPrev()
            }
        }, false);
        that.rightArrow.addEventListener('click', function () {
            let fnTime = getTime();
            if (fnTime - bgTime > 1000) {
                bgTime = fnTime;
                that.elemNext()
            }
        }, false)
    } else {
        that.leftArrow.style.display = 'none';
        that.rightArrow.style.display = 'none'
    }

    if (that.options.dots) {  // инициализация индикаторных точек
        let sum = '';
        for (let i = 0; i < that.elemCount; i++) {
            sum += '<span class="sim-dot"></span>'
        }
        that.indicatorDots.innerHTML = sum;
        that.indicatorDotsAll = that.sldrRoot.querySelectorAll('span.sim-dot');
        // Назначаем точкам обработчик события 'click'
        for (let n = 0; n < that.elemCount; n++) {
            that.indicatorDotsAll[n].addEventListener('click', function () {
                if ((n !== that.currentElement && that.mode <= 0)||(that.mode === 1 && n !== that.currentElement + that.options.length - 1)) {
                    bgTime = getTime();
                    for (let i = 0; i < that.elemCount; i++) {
                        that.sldrElements[i].style.opacity = '0';
                        setTimeout(() => function () {
                            that.sldrElements[i].style.display = 'none';
                        }.apply(this, arguments), 250);
                        that.dotOn(i);
                    }
                    setTimeout(() => function () {
                    for (let i = n; i < n + that.options.length; i++) {
                        if (i > that.elemCount - 1) {
                            i = i - that.elemCount;
                        }
                        that.sldrElements[i].style.opacity = '1';
                        that.sldrElements[i].style.display = 'block';
                        console.log(that.sldrElements[i].style.display);
                        that.dotOff(i);
                    }}.apply(this, arguments), 251);
                    if (that.mode === 1) {
                        that.currentElement = n + that.options.length - 1;
                    } else {
                        that.currentElement = n;
                    }
                }
                /*if (n < that.currentElement) {
                    bgTime = getTime();
                    that.elemPrev(diffNum)
                } else if (n > that.currentElement) {
                    bgTime = getTime();
                    that.elemNext(diffNum)
                }*/
                // Если n == that.currentElement ничего не делаем
            }, false)
        }
        for (let i = 0; i < that.options.length; i++) {
            that.dotOff(i)
        }
        for (let i = that.options.length; i < that.elemCount; i++) {
            that.dotOn(i)
        }
    }
};

new Sim();