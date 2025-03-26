function carouselTopMenu() {
    const img_carousel = document.getElementsByClassName('img_carousel');
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

}


// ページロード時に実行される初期化スクリプト
document.addEventListener('DOMContentLoaded', function() {
    // カルーセル
});

// ウィンドウサイズが変更されたときにスタイルを調整
document.addEventListener('resize', function() {
});

const carousel = document.querySelector('#multiSlideCarousel');
carousel.addEventListener('slide.bs.carousel', (event) => {
    const items = document.querySelectorAll('.carousel-item');
    const activeItem = document.querySelector('.carousel-item.active');

    // 次のアイテムへ移動処理
    const nextIndex = (Array.from(items).indexOf(activeItem) + 1) % items.length;
    items[nextIndex].classList.add('next');
    activeItem.classList.remove('active');
});