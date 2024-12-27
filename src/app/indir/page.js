import Link from "next/link";
import Head from "next/head";
import styles from "./Indir.module.css";

export default async function İndir() {
  const pageTitle = "Ölçek: İlaç ve Besin Takviyelerinde Doz Hesaplama ve Hatırlatma Uygulamasını İndirin!";
  const pageDescription =
    "Ölçek ile ilaç ve besin takviyesi dozlarını doğru bir şekilde hesaplayın ve hatırlatmalarla hiçbir şeyi unutmayın. Hemen indirin!";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="ölçek, ilaç doz hesaplama, besin takviyesi, hatırlatıcı, sağlık uygulaması" />
      </Head>

      <div className={styles.firstContainer}>
      <div className={styles.titleContainer}>
        <div className={styles.mainTitle}>Hemen İndir!</div>
      </div>

        <h1 className={styles.baslik}>Doğru Doz, Doğru Zaman – Ölçek’i Hemen İndirin! ( Pek Yakında... )</h1>

        <div className={styles.qrContainer}>
          <div className={styles.playContainer}>
            <div className={styles.playAltContainer}>
              <h2>QR ile Yükle - iOS</h2>
              <img className={styles.qrImage} src="/qrdeneme.jpeg" alt="Ölçek | İlaç, Besin Takviyesi Doz Hesaplama ve Hatırlatma Uygulaması İndir QRCODE - Android" />
              <img className={styles.urlImage} src="/storeios.png" alt="Ölçek : İlaç, Besin Takviyesi Doz Hesaplama ve Hatırlatma Uygulaması İndir - Andorid" />
            </div>
          </div>

          <div className={styles.iosContainer}>
            <div className={styles.playAltContainer}>
              <h2>QR ile Yükle - Andorid</h2>
              <img className={styles.qrImage} src="/qrdeneme.jpeg" alt="Ölçek | İlaç, Besin Takviyesi Doz Hesaplama ve Hatırlatma Uygulaması İndir QRCODE - İos" />
              <img className={styles.urlImage} src="/storegoogle.png" alt="Ölçek : İlaç, Besin Takviyesi Doz Hesaplama ve Hatırlatma Uygulaması İndir - İos" />
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
