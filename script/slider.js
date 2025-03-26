document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.slider');
    const images = document.querySelectorAll('.slider img');
    const imageCount = images.length;
    let imageWidth = images[0].clientWidth;
  
    let currentIndex = 0;
  
    // 最初と最後の画像をクローンして追加
    const firstClone = images[0].cloneNode(true);
    const lastClone = images[imageCount - 1].cloneNode(true);
    slider.appendChild(firstClone);
    slider.insertBefore(lastClone, images[0]);
  
    // 初期位置を設定
    slider.style.transform = `translateX(${-imageWidth}px)`;
  
    // ウィンドウサイズ変更時の画像幅を再取得
    window.addEventListener('resize', () => {
      imageWidth = images[0].clientWidth; // 再取得
      updateSliderPosition(); // スライダーの位置を再調整
    });
  
    function updateSliderPosition() {
      slider.style.transition = 'none';
      slider.style.transform = `translateX(${-(currentIndex + 1) * imageWidth}px)`;
    }
  
    function slideToIndex(index) {
      currentIndex = index;
      slider.style.transition = 'transform 0.5s ease-in-out';
      slider.style.transform = `translateX(${-(currentIndex + 1) * imageWidth}px)`;
  
      // 最後のクローンから最初の画像に戻る
      if (currentIndex === imageCount) {
        setTimeout(() => {
          slider.style.transition = 'none'; // トランジションを無効化
          currentIndex = 0; // 最初の画像にリセット
          slider.style.transform = `translateX(${-imageWidth}px)`;
        }, 500); // トランジション終了後
      }
  
      // 最初のクローンから最後の画像に戻る
      if (currentIndex === -1) {
        setTimeout(() => {
          slider.style.transition = 'none'; // トランジションを無効化
          currentIndex = imageCount - 1; // 最後の画像にリセット
          slider.style.transform = `translateX(${-(currentIndex + 1) * imageWidth}px)`;
        }, 500); // トランジション終了後
      }
  
      updateIndicators();
      updateProgressSegments();
    }
  
    // インジケーターの作成
    const indicatorContainer = document.querySelector('.indicator-container');
    for (let i = 0; i < imageCount; i++) {
      const indicator = document.createElement('button');
      indicator.dataset.index = i;
      indicator.classList.add('indicator');
      if (i === 0) indicator.classList.add('active'); // 最初のインジケーターをアクティブ化
      indicatorContainer.appendChild(indicator);
    }
  
    const indicators = document.querySelectorAll('.indicator-container button');
  
    function updateIndicators() {
      indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
      });
    }
  
    // 進捗バーのセグメント作成
    const progressBar = document.querySelector('.progress-bar');
    for (let i = 0; i < imageCount; i++) {
      const segment = document.createElement('div');
      segment.classList.add('progress-segment');
      if (i === 0) segment.classList.add('active');
      progressBar.appendChild(segment);
    }
  
    const segments = document.querySelectorAll('.progress-segment');
  
    function updateProgressSegments() {
      segments.forEach((segment, index) => {
        segment.classList.toggle('active', index === currentIndex);
      });
    }
  
    // 自動スライド
    let autoSlideInterval;
    function startAutoSlide() {
      autoSlideInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % imageCount;
        slideToIndex(currentIndex);
      }, 3000);
    }
  
    function stopAutoSlide() {
      clearInterval(autoSlideInterval);
    }
  
    // 左右ボタンの動作
    document.querySelector('.prev-button').addEventListener('click', () => {
      stopAutoSlide();
      currentIndex = currentIndex - 1 < 0 ? imageCount - 1 : currentIndex - 1;
      slideToIndex(currentIndex);
      startAutoSlide();
    });
  
    document.querySelector('.next-button').addEventListener('click', () => {
      stopAutoSlide();
      currentIndex = (currentIndex + 1) % imageCount;
      slideToIndex(currentIndex);
      startAutoSlide();
    });
  
    // インジケータークリックの動作
    indicators.forEach(indicator => {
      indicator.addEventListener('click', () => {
        stopAutoSlide();
        const index = Number(indicator.dataset.index);
        slideToIndex(index);
        startAutoSlide();
      });
    });
  
    // クローン処理の管理
    slider.addEventListener('transitionend', () => {
      // 配列の最後尾に達した際、画像の表示位置のみを初期化（先頭クローン、１枚目を表示）
      if (currentIndex === imageCount - 1) {
        slider.style.transition = 'none';
        slider.style.transform = `translateX(${0}px)`;
      }
      // 最後尾＋１になった場合、リセットをかける
      if (currentIndex === imageCount) {
        currentIndex = 0;
      }
      if (currentIndex === -1) {
        slider.style.transition = 'none';
        currentIndex = imageCount - 1;
        slider.style.transform = `translateX(${-(currentIndex + 1) * imageWidth}px)`;
      }

    });
  
    // 初期化
    updateIndicators();
    updateProgressSegments();
    updateSliderPosition();
    startAutoSlide();
  });