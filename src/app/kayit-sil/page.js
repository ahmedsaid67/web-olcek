import Head from "next/head";
import styles from "./KayitSil.module.css";
import KayitSil from "../../../compenents/KayitSil"

export default function Home() {
  return (
    <div>
      <Head>
        <title>Kayıt Sil | Öleçk Uygulaması</title>
      </Head>
      <div className={styles.firstContainer}>

        <div className={styles.titleContainer}>
          <div className={styles.mainTitle}>Hesabımı Sil</div>
        </div>

        <h1 className={styles.baslik}>Hesabınızı silmeden önce, bu işlemin kalıcı olduğunu ve tüm verilerinizin silineceğini unutmayın!</h1>

       
        <div className={styles.kutular}>
            <KayitSil/>
            <div className={styles.kutum2}>
                <h2>Bizce Silmeyin 😊</h2>
                <div className={styles.icon}>💖</div>
                <p>Hesabınızı silmek istemiyorsanız, verilerinizi koruyarak hizmetimizi daha iyi deneyimleyebilirsiniz!</p>
            </div>
        </div>
        

      </div>
    </div>
  );
}
