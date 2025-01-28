import Link from "next/link";
import Head from "next/head";
import styles from './Doz.module.css';
import DozHesaplama from "../../../../../../compenents/DozHesaplama";
import axios from 'axios';

async function getProductDetail(slug) {
  try {
    const response = await axios.get(`https://api.ölçek.com/api/appname/ilac/ilac-doz-detail/?slug=${slug}`);

    return response.data;

  } catch (error) {
    if (error.response && error.response.data.detail === "Belirtilen slug ile eşleşen bir ilaç bulunamadı.") {
      throw new Error("Aradığınız ilaç sistemimizde mevcut değil. Lütfen doğru ismi yazdığınızdan emin olun.")
    } else {
      throw new Error("Bir şeyler ters gitti, daha sonra tekrar deneyiniz.");
    }
  }
}

export default async function TakviyeDetay({ params }) {
  const { slug } = params; // Dinamik slug
  const category = params.category;

  let product;
  let errorMessage = null;

  try {
    product = await getProductDetail(slug);
  } catch (error) {
    errorMessage = error.message;
  }

  if (errorMessage) {
    return (
      <div className={styles.drugContainer}>
        <div className={styles.firstContainer}>
          <div className={styles.messageContainer}>
            <h1 className={styles.errorMessage}>{errorMessage}</h1>
            {errorMessage === "Aradığınız ilaç sistemimizde mevcut değil. Lütfen doğru ismi yazdığınızdan emin olun." && (
              <Link href="/ilaclar" className={styles.returnLink}>İlaçlar Sayfasına Git</Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (category != product.ilac_form.slug) {
    return (
      <div className={styles.drugContainer}>
        <div className={styles.firstContainer}>
          <div className={styles.messageContainer}>
            <h1 className={styles.errorMessage}>Aradığınız ilaç sistemimizde mevcut değil. Lütfen doğru ismi yazdığınızdan emin olun.</h1>
            <Link href="/ilaclar" className={styles.returnLink}>İlaçlar Sayfasına Git</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{`${product.name} Doz Hesaplama`}</title>
        <meta
          name="description"
          content={`${product.name} için doğru dozajı hesaplayın. Yaş ve kilo bilgilerinize göre önerilen doz miktarını öğrenin.`}
        />
      </Head>

      <div className={styles.drugContainer}>
        <div className={styles.firstContainer}>
          <div className={styles.mapContainer}>
            <Link href="/">
              <div className={styles.mapText}>Ana Sayfa</div>
            </Link>
            <span className={styles.icon}>/</span>
            <Link href="/ilaclar">
              <div className={styles.mapText}>İlaçlar</div>
            </Link>
            <span className={styles.icon}>/</span>
            <Link href={`/ilaclar?tab=${product.ilac_form.slug}`}>
              <div className={styles.mapText}>
                {product.ilac_form.name}
              </div>
            </Link>
            <span className={styles.icon}>/</span>
            <Link href={`/ilaclar/${product.ilac_form.slug}/${product.slug}`}>
              <div className={styles.mapText}>
                {product.name}
              </div>
            </Link>
            <span className={styles.icon}>/</span>
            <div className={`${styles.mapText} ${styles.activeText}`}>
              {product.name} Doz Hesaplama
            </div>
          </div>
        </div>

        <div className={styles.pageContainer}>
          <div className={styles.pageLeftContainer}>
            <div className={styles.pageLeftAdvert}>
              reklam alanıdır
            </div>
          </div>

          <div className={styles.pageCenterContainer}>
            <div key={product.id} className={styles.contextContainer}>
              <h1>{product.name} Doz Hesaplama</h1>
              <span className={styles.contextEtkin}>{product.etken_madde}</span>
              <p>
                <strong>Uyarı: </strong>
                Mevcut web sitesi, yalnızca bilgilendirme amaçlıdır ve tıbbi tavsiye niteliği taşımaz.
                Kullanıcı, sağlık durumu ile ilgili her zaman doktoruna veya bir sağlık uzmanına danışmalıdır.
              </p>

              <DozHesaplama product={product} />
            </div>

            <div className={styles.TanitimContainer}>
              <div className={styles.TanitimBaslik}>Ölçek | İlaç ve Besin Takviyelerinde Doz Hesaplama ve Hatırlatıcı Asistanınız</div>
              <div className={styles.TanitimText}>Ölçek ile İlaç dozlarınızı kolayca hesaplayın, besin takviyelerinizin dozlarına hızla ulaşın! Hatırlatma özelliğiyle sağlığınızı güvenle koruyun. <Link href="/indir"><strong>Hemen indirin!</strong></Link></div>
              <Link href="/indir">
                <div className={styles.TanitimImageContainer}>
                  <div className={styles.TanitimImageBaslik}>İlaç ve Takviyede Doğru Doz İçin: Ölçek!</div>
                  <img src="/sliderbig.png" alt="Ölçek | İlaç, Besin Takviyesi Doz Hesaplama ve Hatırlatma Uygulaması" />
                  <div className={styles.textImage}>
                    <img src="/storeios.png" alt="Ölçek | İlaç, Besin Takviyesi Doz Hesaplama ve Hatırlatma Uygulaması İndir - İos" />
                    <img src="/storegoogle.png" alt="Ölçek | İlaç, Besin Takviyesi Doz Hesaplama ve Hatırlatma Uygulaması İndir - Android" />
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div className={styles.pageRightContainer}>
            <div className={styles.pageRightAdvert}>
              reklam alanıdır
            </div>
          </div>
        </div>
      </div>
    </>
  );
}