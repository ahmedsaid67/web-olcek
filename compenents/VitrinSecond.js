'use client'
import React, { useRef, useState } from 'react';
import { MdArrowBackIos, MdArrowForwardIos, MdVerified, MdSmartphone, MdPerson, MdLocalPharmacy, MdLock, MdUpdate, MdAccessTime, MdStore } from 'react-icons/md'; // New icons for each item
import styles from '../styles/vitrinSecond.module.css';

const ImageSlider = () => {
  const sliderRef = useRef(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const getScrollDistance = () => {
    return window.innerWidth < 768 ? 266 : 413;
  };

  const getVisibleItemCount = () => {
    const containerWidth = sliderRef.current ? sliderRef.current.clientWidth : 0;
    const itemWidth = getScrollDistance();
    return Math.floor(containerWidth / itemWidth);
  };

  const scrollRightHandler = () => {
    if (sliderRef.current) {
      const slider = sliderRef.current;
      const scrollDistance = getScrollDistance();
      const totalItems = slider.children.length;
      const visibleItemCount = getVisibleItemCount();
      const remainingItems = totalItems - Math.ceil(slider.scrollLeft / scrollDistance) - visibleItemCount;

      if (remainingItems <= 0) {
        slider.scrollTo({ left: slider.scrollWidth, behavior: 'smooth' });
      } else {
        slider.scrollBy({ left: scrollDistance, behavior: 'smooth' });
      }
    }
    checkSliderPosition();
  };

  const scrollLeftHandler = () => {
    if (sliderRef.current) {
      const slider = sliderRef.current;
      const scrollDistance = getScrollDistance();
      const visibleItemCount = getVisibleItemCount();
      const scrollIndex = Math.floor(slider.scrollLeft / scrollDistance);
  
      // Eğer kalan öğe sayısı 1 ise, başa kaydır
      const remainingItems = scrollIndex + visibleItemCount;
      
      // Kalan öğe sayısı 1 ya da 2 ise, başa kaydır
      if (remainingItems <= 1) {
        slider.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        slider.scrollBy({ left: -scrollDistance, behavior: 'smooth' });
      }
    }
    checkSliderPosition();
  };

  const checkSliderPosition = () => {
    const slider = sliderRef.current;
    const tolerance = 1;

    const isStart = slider.scrollLeft <= tolerance;
    const isEnd = slider.scrollWidth - slider.scrollLeft - slider.clientWidth <= tolerance;

    setIsAtStart(isStart);
    setIsAtEnd(isEnd);
  };

  return (
    <div className={styles.sliderContainer}>
      <h2>Neden Ölçek’i Tercih Etmelisiniz?</h2>
      <div className={styles.imageContainerWrapper}>
        <div
          className={styles.responseContainer}
          ref={sliderRef} 
          onScroll={checkSliderPosition}
        >
          <div className={styles.responseItem}>
            <div className={styles.icon}><MdVerified  /></div>
            <h3>Güvenilir Kaynaklardan Veriler</h3>
            <p>Ölçek, ilaç doz hesaplamasında ve besin takviyelerinin ideal kullanım miktarlarının belirlenmesinde güvenilir kaynaklardan yararlanır ve bilgilerini bilimsel doğrulukla sunar.</p>
          </div>
          <div className={styles.responseItem}>
            <div className={styles.icon}><MdSmartphone  /></div>
            <h3>Kullanıcı Dostu Mobil Uygulama</h3>
            <p>Ölçek, kullanıcıların kolayca anlayabileceği şekilde tasarlanmış, pratik bir arayüze sahiptir. Bu sayede ilaç doz hesaplamasını kolayca yapabilir, besin takviyelerinin dozlarına ulaşabilir ve hatırlatıcılar oluşturabilirsiniz.</p>
          </div>
          <div className={styles.responseItem}>
            <div className={styles.icon}><MdPerson  /></div>
            <h3>Yaş ve Kilo Bilgisine Dayalı Kişiselleştirilmiş Doz</h3>
            <p>İlaç doz hesaplama, yaş ve kilo gibi kişisel verilere dayanarak yapılır ve böylece sağlık ihtiyaçlarınıza en uygun doz belirlenerek daha etkili bir tedavi sağlanır.</p>
          </div>
          <div className={styles.responseItem}>
            <div className={styles.icon}><MdLocalPharmacy  /></div>
            <h3>Geniş İlaç ve Besin Takviyesi Yelpazesi</h3>
            <p>Ölçek, ilaçlar ve besin takviyeleri dahil olmak üzere geniş bir veritabanına sahiptir. İlaç doz hesaplama ve takviyelerle ilgili doz bilgilerini kolayca bulabilir, ihtiyacınız olan her şeyi tek bir uygulamada bulabilirsiniz.</p>
          </div>
          <div className={styles.responseItem}>
            <div className={styles.icon}><MdLock  /></div>
            <h3>Gizlilik ve Güvenlik</h3>
            <p>Kullanıcı bilgileriniz güvenli bir şekilde saklanır ve yalnızca ilaç doz hesaplama amacıyla kullanılır. Böylece, kişisel bilgileriniz koruma altında olur.</p>
          </div>
          <div className={styles.responseItem}>
            <div className={styles.icon}><MdUpdate  /></div>
            <h3>Her Zaman Güncel Bilgiler</h3>
            <p>Kaynaklarımız sürekli güncellenir, böylece en güncel ve doğru bilgilere ulaşırsınız.</p>
          </div>
          <div className={styles.responseItem}>
            <div className={styles.icon}><MdAccessTime  /></div>
            <h3>Zaman Tasarrufu Sağlar</h3>
            <p>Doz hesaplaması için zaman kaybetmezsiniz; uygulama, ilaç ve besin takviyesi dozlarını hızla ve kolayca sunar.</p>
          </div>
          <div className={styles.responseItem}>
            <div className={styles.icon}><MdStore  /></div>
            <h3>Eczanelerde Kolay Kullanım</h3>
            <p>Uygulamanın pratikliği sayesinde eczacılar ve sağlık profesyonelleri tarafından da güvenle kullanılabilir.</p>
          </div>
        </div>
      </div>

      <div className={styles.arrowsContainer}>
        <div
          className={`${styles.arrowButton} ${styles.prevArrow} ${isAtStart ? styles.disabled : ''}`}
          onClick={scrollLeftHandler}
        >
          <MdArrowBackIos />
        </div>
        <div
          className={`${styles.arrowButton} ${styles.nextArrow} ${isAtEnd ? styles.disabled : ''}`}
          onClick={scrollRightHandler}
        >
          <MdArrowForwardIos />
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;

