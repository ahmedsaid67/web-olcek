import Link from "next/link";
import styles from "./KullanimTalimati.module.css";
import Head from "next/head";
import CloseButton from "../../../../../../compenents/CloseButton";
import PDFViewer from "../../../../../../compenents/PDFViewer";


async function getProductDetail(slug) {
  try {
    const res = await fetch(`https://api.ölçek.com/api/appname/ilac/kullanim-talimati/?slug=${slug}`);

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

  // console.log(params)

  try {
    product = await getProductDetail(slug);
  } catch (error) {
    errorMessage = error.message;
  }
  // console.log(product)

  // console.log(errorMessage)

  // Hata mesajı veya ürün verisi olmayan durum
  if (errorMessage) {
    return (
      <div className={styles.MainContainer}>
          <div className={styles.messageContainer}>
            <h1 className={styles.errorMessage}>{errorMessage}</h1>
            {errorMessage==="Aradığınız ilaç sistemimizde mevcut değil. Lütfen doğru ismi yazdığınızdan emin olun." && (
              <Link href="/ilaclar" className={styles.returnLink}>İlaçlar Sayfasına Git</Link>)
            }
          </div>
      </div>
    );
  }

  
  if (category != product.ilac_form.slug) {
    return (
      <div className={styles.MainContainer}>
        <div className={styles.messageContainer}>
          <h1 className={styles.errorMessage}>Aradığınız ilaç sistemimizde mevcut değil. Lütfen doğru ismi yazdığınızdan emin olun.</h1>
            <Link href="/ilaclar" className={styles.returnLink}>İlaçlar Sayfasına Git</Link>
        </div>
      </div>
    );
  }

  

  

  // Ürün varsa detayları göster
  return (
    <>
      <Head>
        <title>{product.name} Kullanım Talimatı</title>
        <meta
          name="description"
          content={`${product.name} için kullanım talimatı mevcuttur.`}
        />
      </Head>

      <div className={styles.MainContainer}>
        <div className={styles.leftContainer}>
          <div className={styles.MobilContainer}>
            <div className={styles.CloseContainer}>
              <CloseButton slug={product.ilac_form.slug}/>
            </div>
            <div className={styles.TitleContainer}>
              <h1>{product?.name} Kullanım Talimatı</h1>
            </div>
          </div>
          
            {product.document ? 
            <PDFViewer file={product.document}/> 
            :
            <div className={styles.mainPdfContainer}>  
              <p>
                Kullanım Talimatı Bulunmamaktadır.
              </p>
            </div>
            }
            
      
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.baslikContainer}>
            <h1>{product?.name} Kullanım Talimatı</h1>
            <p>Etken Madde : {product?.etken_madde}</p>
          </div>
          <div className={styles.tanitimContainer}>
            <h2>Ölçek | İlaç ve Besin Takviyelerinde Doz Hesaplama ve Hatırlatıcı Asistanınız</h2>
            <p>
              Ölçek ile İlaç dozlarınızı kolayca hesaplayın, besin takviyelerinizin dozlarına hızla ulaşın! Hatırlatma özelliğiyle sağlığınızı güvenle koruyun. 
              <Link href="/indir"><strong> Hemen indirin!</strong></Link>
            </p>
            <Link href="/indir">
                  <div className={styles.TanitimImageContainer}>
                    <div className={styles.TanitimImageAltContainer}>
                      <h3>Doğru Doz İçin: Ölçek!</h3>
                      <img src="/tanitim3.png" alt="Ölçek | İlaç, Besin Takviyesi Doz Hesaplama ve Hatırlatma Uygulaması" />
                    </div>
                  </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
