import React from 'react';
import styles from "./Sozlesme.module.css";
import Head from 'next/head';

const Politika = () => {
  return (
    <div>
      <Head>
        <title>Kullanıcı Sözleşmesi | Ölçek</title>
        <meta 
          name="description" 
          content="Ölçek platformunun kullanıcı sözleşmesi ile hizmet koşulları ve kullanıcı hakları hakkında bilgi edinin. Adil, şeffaf ve güvenilir bir kullanıcı deneyimi sunmayı taahhüt ediyoruz." 
        />
      </Head>

      <div className={styles.firstContainer}>
        <div className={styles.titleContainer}>
          <div className={styles.mainTitle}>Kullanıcı Sözleşmesi</div>
        </div>

        <h1 className={styles.baslik}>
          Ölçek platformunun kullanıcı sözleşmesi ile hizmet koşulları ve kullanıcı hakları hakkında bilgi edinin.
        </h1>

        <div className={styles.metinContainer}>
          <h2 className={styles.subHeading}>1. Taraflar</h2>
          <p className={styles.paragraph}>
            Bu sözleşme, İlaç Doz Hesaplama ve Hatırlatıcı Oluşturma | Ölçek (“Uygulama”) ile uygulamayı kullanan kullanıcı (“Kullanıcı”) arasında akdedilmiştir. Kullanıcı, Uygulama’yı kullanarak bu sözleşmeyi kabul etmiş sayılacaktır.
          </p>

          <h2 className={styles.subHeading}>2. Uygulamanın Amacı</h2>
          <p className={styles.paragraph}>
            Uygulama, ilaç doz hesaplama ve hatırlatıcı oluşturma hizmeti sunmakta olup, kullanıcıların ilaç ve besin takviyeleri ile ilgili doğru dozaj ve hatırlatmalar almasını sağlamaktadır.
          </p>

          <h2 className={styles.subHeading}>3. Kullanıcı Kayıt ve Bilgileri</h2>
          <p className={styles.paragraph}>
            Uygulama’da doz hesabı işlemleri, kullanıcı kayıt olmadan da gerçekleştirilebilmektedir. Ancak, hatırlatıcı oluşturabilmek için kullanıcıların uygulamaya kayıt olması gerekmektedir. Kullanıcı, kayıt sırasında ya manuel olarak e-posta adresi, ad ve soyad gibi bilgileri sağlayabilir ya da Google ile devam et seçeneğini kullanarak hızlı bir kayıt süreci gerçekleştirebilir. ...
          </p>

          <h2 className={styles.subHeading}>4. Galeri ve Bildirim İzni</h2>
          <p className={styles.paragraph}>
            Uygulama, kullanıcıların profil fotoğrafı ekleyebilmesi için galeri izni talep etmektedir. Ayrıca, uygulama üzerinden bildirimler alabilmeniz için bildirim izni vermeniz gerekmektedir. ...
          </p>

          <h2 className={styles.subHeading}>5. İlaç ve Besin Takviyesi Hizmetleri</h2>
          <p className={styles.paragraph}>
            Uygulama, kullanıcının yaş, kilo veya hastalık bilgilerini alarak uygun ilaç dozajını sunmaktadır. Ayrıca, kullanıcıya ilaçlar hakkında hatırlatmalar gönderilmektedir.
          </p>

          <h2 className={styles.subHeading}>6. Sorumluluk Reddi</h2>
          <p className={styles.paragraph}>
            Kullanıcı, Uygulama tarafından sağlanan tüm bilgilerin yalnızca bilgilendirme amaçlı olduğunu ve tıbbi tavsiye niteliği taşımadığını kabul eder. Uygulama, sağlık durumu ile ilgili herhangi bir değerlendirme veya tedavi önerisi sunmamaktadır. ...
          </p>

          <h2 className={styles.subHeading}>7. Sözleşmenin Değiştirilmesi</h2>
          <p className={styles.paragraph}>
            Bu sözleşme, Uygulama tarafından değiştirilebilir. Değişiklikler, Uygulama üzerinden kullanıcıya bildirilecektir.
          </p>

          <h2 className={styles.subHeading}>8. Yürürlük</h2>
          <p className={styles.paragraph}>
            Bu sözleşme, Kullanıcı’nın Uygulama’yı kullanmaya başlamasıyla birlikte yürürlüğe girecektir. Kullanıcı, bu sözleşmeyi kabul ederek Uygulama’yı kullanmaya başlamaktadır.
          </p>

          <h2 className={styles.subHeading}>9. Yetkili Mahkeme ve Uygulanacak Hukuk</h2>
          <p className={styles.paragraph}>
            Bu sözleşmeden doğabilecek her türlü uyuşmazlık Türkiye Cumhuriyeti kanunlarına tabidir. Taraflar arasında ortaya çıkabilecek her türlü uyuşmazlıkta İstanbul Mahkemeleri ve İcra Daireleri yetkilidir.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Politika;
