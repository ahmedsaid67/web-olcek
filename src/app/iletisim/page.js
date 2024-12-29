import Head from "next/head";
import styles from "./Iletisim.module.css";
import { FaPhone, FaEnvelope, FaTwitter, FaFacebook, FaInstagram,FaTiktok } from "react-icons/fa";
import Contact from "../../../compenents/Contact"

export default function Home() {
  return (
    <div>
      <Head>
        <title>İletişim | Öleçk Uygulaması</title>
        <meta name="description" content="Bize ulaşarak sorularınızı ve geri bildirimlerinizi iletebilir, Öleçk CEO'su ile doğrudan iletişim kurabilirsiniz. Hızlı yanıt ve destek için buradayız." />
      </Head>
      <div className={styles.firstContainer}>

        <div className={styles.titleContainer}>
          <div className={styles.mainTitle}>Bize Ulaşın</div>
        </div>

        <h1 className={styles.baslik}>Sorularınız ve Geri Bildirimleriniz İçin Bizimle İletişime Geçin!</h1>

        <div>
          <div className={styles.kutular}>
            <Contact />
            <div className={styles.kutum2}>
              <div>
                <h2>İletişim Bilgileri:</h2>
                <div className={styles.klasikonuştur}>
                  <FaPhone className={styles.icon}/>
                  <p>(+90) 507 704-6141</p>
                </div>
                <div className={styles.klasikonuştur}>
                  <FaPhone className={styles.icon}/>
                  <p>(+90) 531 918-3467</p>
                </div>
                <div className={styles.klasikonuştur}>
                  <FaEnvelope className={styles.icon}/>
                  <a href="mailto:flexsoftwaretr@gmail.com"><p>flexsoftwaretr@gmail.com</p></a>
                </div>
              </div>
              <div>
                <h2>Sosyal Medya Bağlantıları</h2>
                <div className={styles.klasikonuştur}>
                  <div className={styles.sos}>
                    <a href="#"><FaTwitter className={styles.sosIcon}/></a>
                    <a href="#"><FaFacebook className={styles.sosIcon}/></a>
                    <a href="#"><FaInstagram className={styles.sosIcon}/></a>
                    <a href="#"><FaTiktok className={styles.sosIcon}/></a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

