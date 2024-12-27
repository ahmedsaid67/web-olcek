'use client'
import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaFacebook, FaTwitter, FaInstagram, FaTiktok } from 'react-icons/fa'; // Import the icons
import Link from 'next/link'; // Import Next.js Link
import styles from '../styles/foother.module.css';
import { usePathname } from 'next/navigation';

const ImageSlider = () => {

  const pathname = usePathname();

  const hideLayout = pathname.includes('kullanim-talimati');

  if (hideLayout) return null;



  return (
    <div className={styles.container}>
      <div className={styles.itemContainer}>
        <h2>Hızlı Linkler</h2>
        <div className={styles.linkItem}>
          <Link href='/'>
            <p>Ana Sayfa</p>
          </Link>
        </div>
        <div className={styles.linkItem}>
          <Link href='/ilaclar'>
            <p>İlaçlar</p>
          </Link>
        </div>
        <div className={styles.linkItem}>
          <Link href='/besintakviyeleri'>
            <p>Besin Takviyeleri</p>
          </Link>
        </div>
        <div className={styles.linkItem}>
          <Link href='/hakkimizda'>
            <p>Hakkımızda</p>
          </Link>
        </div>
        <div className={styles.linkItem}>
          <Link href='/iletisim'>
            <p>İletişim</p>
          </Link>
        </div>
        <div className={styles.linkItem}>
          <Link href='/indir'>
            <p>İndir</p>
          </Link>
        </div>
      </div>

      <div className={styles.itemContainer}>
        <h2>Yasal Koşullar</h2>
        <div className={styles.linkItem}>
          <Link href='/kullanici-sozlesmesi'>
            <p>Kullanıcı Sözleşmesi</p>
          </Link>
        </div>
        <div className={styles.linkItem}>
          <Link href='/kayit-sil'>
            <p>Hesabı Sil</p>
          </Link>
        </div>
      </div>

      <div className={styles.itemContainer}>
        <h2>İletişim</h2>
        <div className={styles.contactItem}>
          <FaEnvelope className={styles.icon} />
          <a href="mailto:flexsoftwaretr@gmail.com"><p>flexsoftwaretr@gmail.com</p></a>
        </div>
        <div className={styles.contactItem}>
          <FaPhoneAlt className={styles.icon} />
          <p>05069405414</p>
        </div>
        <div className={styles.contactItem}>
          <FaPhoneAlt className={styles.icon} />
          <p>05077046141</p>
        </div>
        <div className={styles.contactItem}>
          <FaPhoneAlt className={styles.icon} />
          <p>05319183467</p>
        </div>
      </div>

      <div className={styles.itemContainer}>
        <h2>İndir</h2>
        <Link href='/indir'>
          <div className={styles.indirContainer}>
            <img src="/storeios.png" alt="Ölçek - İlaç ve Takviye Dozlama Uygulaması İndir - İos" />
            <img src="/storegoogle.png" alt="Ölçek - İlaç ve Takviye Dozlama Uygulaması İndir - Android" />
          </div>
        </Link>
      </div>

      <div className={styles.itemContainer}>
        <h2>Sosyal Medya</h2>
        <div className={styles.socialIcons}>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className={styles.sIcon} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className={styles.sIcon} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className={styles.sIcon} />
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
            <FaTiktok className={styles.sIcon} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;

