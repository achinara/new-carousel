class Carousel {
    constructor({el, items, cls,  numToShow, itemWidth, itemHeight}) {
        this.el = el;
        this.items = items;
        this.cls = cls;
        this.numToShow = numToShow;
        this.itemWidth = itemWidth;
        this.itemHeight = itemHeight;

        this.createElements();
        this.ul = el.querySelector(`ul`);

        const prevButton = el.querySelector(`.${cls}__prev`);
        const nextButton = el.querySelector(`.${cls}__next`);

        prevButton.addEventListener('click', this.showPrevItems.bind(this));
        nextButton.addEventListener('click', this.showNextItems.bind(this));
    }

    createElements() {
        let {el, items, numToShow, cls, itemWidth, itemHeight} = this;

        if (!items.length) throw new Error('No items to render');

        el.classList.add(cls);
        el.innerHTML = `<button class="${cls}__prev">⇦</button>
                        <div class="${cls}__inner"><ul></ul></div>
                        <button class="${cls}__next">⇨</button>`;

        const ul = el.querySelector(`ul`);

        el.style.width = numToShow * itemWidth + 'px';
        ul.style.width = itemWidth * items.length + 'px';
        ul.style.height = itemHeight + 'px';

        items.forEach(function (item) {
            let li = document.createElement('li');
            li.innerHTML = `<img src="${item}">`;
            ul.append(li);
        });
    }

    showPrevItems() {
        this.move(1)
    }

    showNextItems() {
        this.move(-1);
    }

    move(dir) {
        let {items, numToShow, itemWidth, ul} = this;

        const marginLeft = +parseInt(ul.style.marginLeft) || 0;
        const widthToShow = numToShow * itemWidth;
        const maxLength = items.length * itemWidth;

        let next = 0;

        if (dir < 0) {
            next = marginLeft - Math.min(marginLeft + maxLength - widthToShow, widthToShow);
        } else {
            next = Math.min(marginLeft + widthToShow, 0);
        }

        ul.style.marginLeft = next + 'px';
    }
}
