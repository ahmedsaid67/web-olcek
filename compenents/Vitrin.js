'use client'
import React, { useRef, useState } from 'react';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';  // Yeni ikonlar
import styles from '../styles/home.module.css';

const ImageSlider = () => {
  const sliderRef = useRef(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);


  // Ekran boyutuna göre kaydırma mesafesini hesaplayan fonksiyon
  const getScrollDistance = () => {
    return window.innerWidth < 768 ? 266 : 413; // Mobilde 264, daha büyük ekranlarda 413
  };

  // Görüntülenen öğe sayısını hesapla (örneğin 3)
  const getVisibleItemCount = () => {
    const containerWidth = sliderRef.current ? sliderRef.current.clientWidth : 0;
    const itemWidth = getScrollDistance();
    return Math.floor(containerWidth / itemWidth); // Konteyner genişliğine göre görünen öğeleri hesapla
  };

  // Sağ kaydırma işlemi
  const scrollRightHandler = () => {
    if (sliderRef.current) {
      const slider = sliderRef.current;
      const scrollDistance = getScrollDistance();
      const totalItems = slider.children.length; // Toplam öğe sayısı
      const visibleItemCount = getVisibleItemCount(); // Görünen öğe sayısı
      const remainingItems = totalItems - Math.ceil(slider.scrollLeft / scrollDistance) - visibleItemCount;

      // Kalan öğe sayısı 1 ise, tam sona kaydır
      if (remainingItems <= 0) {
        slider.scrollTo({ left: slider.scrollWidth, behavior: 'smooth' });
      } else {
        slider.scrollBy({ left: scrollDistance, behavior: 'smooth' });
      }
    }
    checkSliderPosition();
  };

// Sol kaydırma işlemi
const scrollLeftHandler = () => {
  if (sliderRef.current) {
    const slider = sliderRef.current;
    const scrollDistance = getScrollDistance();
    const visibleItemCount = getVisibleItemCount();
    const scrollIndex = Math.floor(slider.scrollLeft / scrollDistance);

    // Eğer kalan öğe sayısı 1 ise, başa kaydır
    const remainingItems = scrollIndex + visibleItemCount;

    if (remainingItems <= 1) {
      slider.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      slider.scrollBy({ left: -scrollDistance, behavior: 'smooth' });
    }
  }
  checkSliderPosition();
};


  // Kaydırma işleminin başlangıçta mı, bitişte mi olduğunu kontrol et
  const checkSliderPosition = () => {
    const slider = sliderRef.current;
    const tolerance = 1; // Küçük bir tolerans değeri

    const isStart = slider.scrollLeft <= tolerance;
    const isEnd = slider.scrollWidth - slider.scrollLeft - slider.clientWidth <= tolerance;

  
    setIsAtStart(isStart);
    setIsAtEnd(isEnd);
  };

  return (
    <div className={styles.sliderContainer}>
      <h2>Ölçek'i yakından tanıyın.</h2>
      <div className={styles.imageContainerWrapper}>
        <div
          className={styles.imageContainer}
          ref={sliderRef} 
          onScroll={checkSliderPosition}
        >
          <div className={styles.sliderItem}>
            <img src="/mobileImage/gorsel1.png" alt="Ölçek uygulamasının ana sayfası - ilaç doz hesaplamasını kolayca yapabilir, besin takviyelerinin dozlarına ulaşabilir ve hatırlatıcılar oluşturabilirsiniz." />
          </div>
          <div className={styles.sliderItem}>
              <img src="/mobileImage/gorsel2.png" alt="Ölçek uygulamasının arama sayfası - İlaç ve besin takviyelerini kolayca arayın, bulun ve doğru dozaj bilgilerine ulaşın." />
          </div>
          <div className={styles.sliderItem}>
              <img src="/mobileImage/gorsel3.png" alt="İlaç seçimi sonrası, Ölçek uygulamasıyla hatırlatıcıları oluşturun ve doz hesaplamalarını yapın." />
          </div>
          <div className={styles.sliderItem}>
              <img src="/mobileImage/gorsel4.png" alt="Kişisel kilo bilgisi ile ilaç doz hesaplama yapın - Ölçek uygulamasıyla sağlıklı yaşamınıza devam edin." />
          </div>
          <div className={styles.sliderItem}>
              <img src="/mobileImage/gorsel5.png" alt="Ölçek uygulamasının kullanım uyarıları sayfası - İlaç ve besin takviyeleri için güvenli kullanım ve dozaj rehberi." />
          </div>
          <div className={styles.sliderItem}>
              <img src="/mobileImage/gorsel6.png" alt="Doz hesaplama sonuçları sayfası - Ölçek uygulaması, ilaç ve besin takviyeleriniz için doğru ve güvenilir dozaj bilgilerini sağlar." />
          </div>
          <div className={styles.sliderItem}>
              <img src="/mobileImage/gorsel7.png" alt="Ölçek ile kişisel hatırlatıcılar kurarak ilaç ve besin takviyesi kullanımını kolaylaştırın." />
          </div>
          <div className={styles.sliderItem}>
              <img src="/mobileImage/gorsel8.png" alt="Ölçek uygulamasının hatırlatıcılar listesi ile kişisel hatırlatıcılarınızı anında yönetebilirsiniz." />
          </div>
          <div className={styles.sliderItem}>
              <img src="/mobileImage/gorsel9.png" alt="Ölçek uygulamasındaki hatırlatıcı bildirimleri ile ilaç ve besin takviyesi kullanımınızı kolayca hatırlayın." />
          </div>
        </div>
      </div>

      <div className={styles.arrowsContainer}>
        <div
          className={`${styles.arrowButton} ${styles.prevArrow} ${isAtStart ? styles.disabled : ''}`}
          onClick={scrollLeftHandler}
          disabled={isAtStart}
        >
          <MdArrowBackIos />
        </div>
        <div
          className={`${styles.arrowButton} ${styles.nextArrow} ${isAtEnd ? styles.disabled : ''}`}
          onClick={scrollRightHandler}
          disabled={isAtEnd}
        >
          <MdArrowForwardIos />
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;


