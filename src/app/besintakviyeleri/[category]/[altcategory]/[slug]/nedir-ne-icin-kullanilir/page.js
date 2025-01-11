import Link from "next/link";
import Head from "next/head";
import styles from './Nedir.module.css'
import { FaInfoCircle, FaCalculator, FaFileAlt } from 'react-icons/fa';

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
    if (error.message.includes("Belirtilen slug ile eşleşen bir ilaç bulunamadı.")) {
      throw new Error("Aradığınız ilaç sistemimizde mevcut değil. Lütfen doğru ismi yazdığınızdan emin olun.")
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
        <title>
          {product.name} Nedir?
          {product.ne_icin_kullanilir && product.ne_icin_kullanilir.toLowerCase() !== 'nan' 
            ? ' - Ne İçin Kullanılır / Sağlık Beyanı'
            : ''}
        </title>
        <meta
          name="description"
          content={
            product.ne_icin_kullanilir && product.ne_icin_kullanilir.toLowerCase() !== 'nan'
              ? `${product.name} Nedir - Ne İçin Kullanılır / Sağlık Beyanı hakkında detaylı bilgi edinin.`
              : `${product.name} Nedir hakkında detaylı bilgi edinin.`
          }
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
              {product.ne_icin_kullanilir && product.ne_icin_kullanilir.toLowerCase() !== 'nan'
                ? `${product.name} Nedir? Ne İçin Kullanılır / Sağlık Beyanı Açıklaması`
                : `${product.name} Nedir?`}
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
            <h1>
              {product.name} Nedir?
              {product.ne_icin_kullanilir && product.ne_icin_kullanilir.toLowerCase() !== 'nan' 
                ? ' Ne İçin Kullanılır / Sağlık Beyanı Açıklaması'
                : ''}
            </h1>
            <p>{product.nedir}</p>
            {product.ne_icin_kullanilir && product.ne_icin_kullanilir.toLowerCase() !== 'nan' && (
              <p>{product.ne_icin_kullanilir.replace(/[“”"]/g, '')}</p>
            )}
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