import Link from "next/link";
import Head from "next/head";
import styles from './IlacDetay.module.css'
import { FaInfoCircle, FaCalculator, FaFileAlt } from 'react-icons/fa';

async function getProductDetail(slug) {
  try {
    const res = await fetch(`https://api.ölçek.com/api/appname/ilac/ilac-arama-detail/?slug=${slug}`);

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
            {errorMessage==="Aradığınız ilaç sistemimizde mevcut değil. Lütfen doğru ismi yazdığınızdan emin olun." && (
              <Link href="/ilaclar" className={styles.returnLink}>İlaç Kategori Sayfasına Git</Link>)
            }
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
            <Link href="/ilaclar" className={styles.returnLink}>İlaç Kategori Sayfasına Git</Link>
          </div>
        </div>
      </div>
    );
  }



  

  // Ürün varsa detayları göster
  return (
    <>
     <Head>
        <title>{`${product.name} Nedir ve Ne İçin Kullanılır? | Kullanım Talimatı ve Doz Hesaplama`}</title>
        <meta
          name="description"
          content={`${product.name} nedir, ne için kullanılır ve doz hesaplama için buradan ulaşabilirsiniz. Ayrıca kullanım talimatlarına da bu sayfadan erişebilirsiniz.`}
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
            <h1 className={`${styles.mapText} ${styles.activeText}`}>
              {product.name}
            </h1>
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
              <h2>{product.name}</h2>
              <span className={styles.contextEtkin}>{product.etken_madde}</span>
              <div className={styles.contextArticle}>
                <Link href={`/ilaclar/${product.ilac_form.slug}/${product.slug}/nedir-ne-icin-kullanilir`}>
                  <h3>
                    <FaInfoCircle className={styles.iconContext} />
                    {product.name} hakkında detaylı bilgi: Nedir, ne için kullanılır?
                  </h3>
                </Link>
                <Link href={`/ilaclar/${product.ilac_form.slug}/${product.slug}/kullanim-talimati`}>
                  <h3>
                    <FaFileAlt className={styles.iconContext} />
                    {product.name} için kullanım talimatı: Doğru ve güvenli kullanım rehberi.
                  </h3>
                </Link>
                <Link href={`/ilaclar/${product.ilac_form.slug}/${product.slug}/doz-hesaplama`}>
                  <h3>
                    <FaCalculator className={styles.iconContext} />
                    {product.name} için doz hesaplama: Size uygun dozajı öğrenin.
                  </h3>
                </Link>
              </div>
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
            <div className={styles.pageRightAdvert}>
              reklam alanıdır
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
