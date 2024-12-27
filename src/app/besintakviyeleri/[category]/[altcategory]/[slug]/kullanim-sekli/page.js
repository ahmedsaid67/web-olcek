import Link from "next/link";
import styles from "./TakviyeDetay.module.css";
import Head from "next/head";



async function getProductDetail(slug) {
  try {
    const res = await fetch(`https://api.ölçek.com/api/appname/products/product-detail/?slug=${slug}`);

    // Eğer durum kodu 200 değilse, hata fırlat
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.detail || "Sunucudan geçersiz bir yanıt alındı.");
    }

    const data = await res.json();
    return data;

  } catch (error) {
    // Eğer spesifik bir hata mesajı varsa
    if (error.message.includes("Belirtilen slug ile eşleşen bir ürün bulunamadı.")) {
      throw new Error("Aradığınız besin takviyesi sistemimizde mevcut değil. Lütfen doğru ismi yazdığınızdan emin olun.")
    } else {
      // Genel hata
      throw new Error("Bir şeyler ters gitti, daha sonra tekrar deneyiniz.");
    }
  }
}






export default async function TakviyeDetay({ params }) {
  const { slug } = params; // Dinamik slug
  const category = params.category;
  const altCategory = params.altcategory;


  // Sunucu tarafında ürün verisini çekme
  let product;
  let errorMessage = null;

  try {
    product = await getProductDetail(slug);
  } catch (error) {
    errorMessage = error.message;
  }
  // console.log(product)

  // Hata mesajı veya ürün verisi olmayan durum
  if (errorMessage) {
    return (
      <div className={styles.drugContainer}>
        <div className={styles.firstContainer}>
          <div className={styles.messageContainer}>
            <h1 className={styles.errorMessage}>{errorMessage}</h1>
            {errorMessage==="Aradığınız besin takviyesi sistemimizde mevcut değil. Lütfen doğru ismi yazdığınızdan emin olun." && (
              <Link href="/besintakviyeleri" className={styles.returnLink}>İlaç Kategori Sayfasına Git</Link>)
            }
          </div>
        </div>
      </div>
    );
  }

  if (category != product.product_category.supplement.slug || altCategory != product.product_category.slug) {
    return (
      <div className={styles.drugContainer}>
        <div className={styles.firstContainer}>
          <div className={styles.messageContainer}>
            <h1 className={styles.errorMessage}>Aradığınız besin takviyesi sistemimizde mevcut değil. Lütfen doğru ismi yazdığınızdan emin olun.</h1>
            <Link href="/besintakviyeleri" className={styles.returnLink}>Besin Takviyeleri Sayfasına Git</Link>
          </div>
        </div>
      </div>
    );
  }

  // Ürün varsa detayları göster
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
            <h1 className={`${styles.mapText} ${styles.activeText}`}>
              {product.name} Kullanım Şekli
            </h1>
          </div>
        </div>

        <div className={styles.pageContainer}>
          <div className={styles.pageLeftContainer}>
            <div className={styles.pageLeftAdvert}>Reklam alanıdır</div>
          </div>

          <div className={styles.pageCenterContainer}>
            <div className={styles.contextContainer}>
              <h2>{product.name} Kullanım Şekli</h2>
              <p>{product.explanation}</p>
            </div>
            

           
            <div className={styles.TanitimContainer}>
                <h3>Ölçek | İlaç ve Besin Takviyelerinde Doz Hesaplama ve Hatırlatıcı Asistanınız</h3>
                <p>Ölçek ile İlaç dozlarınızı kolayca hesaplayın, besin takviyelerinizin dozlarına hızla ulaşın! Hatırlatma özelliğiyle sağlığınızı güvenle koruyun. <Link href="/indir"><strong>Hemen indirin!</strong></Link></p>
                <Link href="/indir">
                  <div className={styles.TanitimImageContainer}>
                    <h3>İlaç ve Takviyede Doğru Doz İçin: Ölçek!</h3>
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
