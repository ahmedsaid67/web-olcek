// app/page.js
import styles from '../../styles/home.module.css'
import Vitrin from '../../compenents/Vitrin'
import VitrinSecond from '../../compenents/VitrinSecond'
import Link from 'next/link';

export const metadata = {
  title: 'Ölçek - İlaç, Besin Takviyesi Doz Hesaplama ve Hatırlatma Uygulaması',
  description: 'Ölçek uygulaması ile ilaç doz hesaplamasını kolayca yapabilir, besin takviyelerinin dozlarına ulaşabilir ve hatırlatıcılar oluşturabilirsiniz.',
};

export default function Home() {
  return (
    <div className={styles.container}>
      <Link href="/indir">

        <div className={styles.firstContainer}>
          <div className={styles.textContainer}>
            <h1>Ölçek: İlaç ve Besin Takviyelerinde Doz Hesaplama ve Hatırlatıcı Asistanınız</h1>
            <p>
              Ölçek ile ilaç doz hesaplama işlemini kolayca yapabilir, besin takviyelerinizin dozlarına hızlıca ulaşabilirsiniz. Hatırlatma özelliğiyle dozlarınızı tam zamanında alarak sağlığınızı güvenle koruyabilirsiniz.
            </p>
            <div className={styles.textImage}>
              <img src="/storeios.png" alt="Ölçek | İlaç, Besin Takviyesi Doz Hesaplama ve Hatırlatma Uygulaması İndir - İos" />
              <img src="/storegoogle.png" alt="Ölçek | İlaç, Besin Takviyesi Doz Hesaplama ve Hatırlatma Uygulaması İndir - Android" />
            </div>
          </div>
          <div className={styles.anaSliderContainer}>
            <img src="/sliderbig.png" alt="Ölçek | İlaç, Besin Takviyesi Doz Hesaplama ve Hatırlatma Uygulaması" />
          </div>
        </div>
      
      </Link>
      
      <div>
        <Vitrin />
      </div>

      <div>
        <VitrinSecond />
      </div>
    </div>
  );
}
