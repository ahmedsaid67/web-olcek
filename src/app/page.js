// app/page.js
import styles from '../../styles/home.module.css'
import Vitrin from '../../compenents/Vitrin'
import VitrinSecond from '../../compenents/VitrinSecond'
import Link from 'next/link';
import Head from 'next/head';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Ölçek - İlaç, Besin Takviyesi Doz Hesaplama ve Hatırlatma Uygulaması</title>
        <meta
          name="description"
          content="Ölçek uygulaması ile ilaç doz hesaplamasını kolayca yapabilir, besin takviyelerinin dozlarına ulaşabilir ve hatırlatıcılar oluşturabilirsiniz."
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-16778449088"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-16778449088');
            `,
          }}
        ></script>
      </Head>

      <Link href="/indir">
        <div className={styles.firstContainer}>
          <div className={styles.textContainer}>
            <h1>Ölçek: İlaç ve Besin Takviyelerinde Doz Hesaplama ve Hatırlatıcı Asistanınız</h1>
            <p>
              Ölçek ile ilaç doz hesaplama işlemini kolayca yapabilir, besin takviyelerinizin dozlarına hızlıca ulaşabilirsiniz. Hatırlatma özelliğiyle dozlarınızı tam zamanında alarak sağlığınızı güvenle koruyabilirsiniz.
            </p>
            <div className={styles.textImage}>
              <img
                src="/storeios.png"
                alt="Ölçek | İlaç, Besin Takviyesi Doz Hesaplama ve Hatırlatma Uygulaması İndir - İos"
              />
              <img
                src="/storegoogle.png"
                alt="Ölçek | İlaç, Besin Takviyesi Doz Hesaplama ve Hatırlatma Uygulaması İndir - Android"
              />
            </div>
          </div>
          <div className={styles.anaSliderContainer}>
            <img
              src="/sliderbig.png"
              alt="Ölçek | İlaç, Besin Takviyesi Doz Hesaplama ve Hatırlatma Uygulaması"
            />
          </div>
        </div>
      </Link>

      {/* Vitrin and VitrinSecond Components */}
      <div>
        <Vitrin />
      </div>

      <div>
        <VitrinSecond />
      </div>
    </div>
  );
}
