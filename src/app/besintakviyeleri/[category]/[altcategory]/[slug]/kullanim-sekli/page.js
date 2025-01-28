import Link from "next/link";
import styles from "./TakviyeDetay.module.css";
import Head from "next/head";
import axios from 'axios';

async function getProductDetail(slug) {
  try {
    const response = await axios.get(`https://api.ölçek.com/api/appname/products/product-detail/?slug=${slug}`);

    return response.data;

  } catch (error) {
    if (error.response && error.response.data.detail === "Belirtilen slug ile eşleşen bir ürün bulunamadı.") {
      throw new Error("Aradığınız besin takviyesi sistemimizde mevcut değil. Lütfen doğru ismi yazdığınızdan emin olun.")
    } else {
      throw new Error("Bir şeyler ters gitti, daha sonra tekrar deneyiniz.");
    }
  }
}

export default async function TakviyeDetay({ params }) {
  const { slug } = params; // Dinamik slug
  const category = params.category;
  const altCategory = params.altcategory;

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
          <div className={styles.messageContainer}>
            <h1 className={styles.errorMessage}>{errorMessage}</h1>
            {errorMessage === "Aradığınız besin takviyesi sistemimizde mevcut değil. Lütfen doğru ismi yazdığınızdan emin olun." && (
              <Link href="/besintakviyeleri" className={styles.returnLink}>İlaç Kategori Sayfasına Git</Link>
            )}
        </div>
      </div>
    );
  }

  if (category != product.product_category.supplement.slug || altCategory != product.product_category.slug) {
    return (
      <div className={styles.drugContainer}>
          <div className={styles.messageContainer}>
            <h1 className={styles.errorMessage}>Aradığınız besin takviyesi sistemimizde mevcut değil. Lütfen doğru ismi yazdığınızdan emin olun.</h1>
            <Link href="/besintakviyeleri" className={styles.returnLink}>Besin Takviyeleri Sayfasına Git</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{product.name} Kullanım Şekli</title>
        <meta
          name="description"
          content={`${product.name} kullanımı hakkında detaylı bilgi edinin.`}
        />
      </Head>

      <div className={styles.drugContainer}>
        <div className={styles.firstContainer}>
          <div className={styles.mapContainer}>
            <Link href="/">
              <div className={styles.mapText}>Ana Sayfa</div>
            </Link>
            <span className={styles.icon}>/</span>
            <Link href="/besintakviyeleri">
              <div className={styles.mapText}>Besin Takviyeleri</div>
            </Link>
            <span className={styles.icon}>/</span>
            <Link href={`/besintakviyeleri?tab=${product.product_category.supplement.slug}`}>
              <div className={styles.mapText}>{product.product_category.supplement.name}</div>
            </Link>
            <span className={styles.icon}>/</span>
            <Link href={`/besintakviyeleri?tab=${product.product_category.supplement.slug}&kategori=${product.product_category.slug}`}>
              <div className={styles.mapText}>{product.product_category.name}</div>
            </Link>
            <span className={styles.icon}>/</span>
            <Link href={`/besintakviyeleri/${product.product_category.supplement.slug}/${product.product_category.slug}/${product.slug}`}>
              <div className={styles.mapText}>{product.name}</div>
            </Link>
            <span className={styles.icon}>/</span>
            <div className={`${styles.mapText} ${styles.activeText}`}>
              {product.name} Kullanım Şekli
            </div>
          </div>
        </div>

        <div className={styles.pageContainer}>
          <div className={styles.pageLeftContainer}>
            <div className={styles.pageLeftAdvert}>Reklam alanıdır</div>
          </div>

          <div className={styles.pageCenterContainer}>
            <div className={styles.contextContainer}>
              <h1>{product.name} Kullanım Şekli</h1>
              <p>{product.explanation}</p>
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
            <div className={styles.pageRightAdvert}>Reklam alanıdır</div>
          </div>
        </div>
      </div>
    </>
  );
}