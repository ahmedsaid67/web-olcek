import React from 'react';
import styles from "./Hakkimizda.module.css"
import Head from 'next/head';

const Hakkimizda = () => {
  return (
    <div>
      <Head>
        <title>Hakkımızda | Flexsoft | Ölçek</title>
        <meta 
          name="description" 
          content="Flexsoft, yazılım ve teknoloji alanında yenilikçi çözümler sunan dinamik bir şirkettir. Ölçek projemizle sektörel bilgi birikimiyle desteklenen inovatif yazılımlar sunuyoruz." 
        />
      </Head>
      <div className={styles.firstContainer}>

        <div className={styles.titleContainer}>
          <div className={styles.mainTitle}>Hakkımızda</div>
        </div>

        <h1 className={styles.baslik}>
          Biz Kimiz, Flexsoft bu işin neresindedir, Ölçek kime aittir?
        </h1>

        <div className={styles.metinContainer}>

          <p className={styles.paragraph}>
            Flexsoft, yazılım ve teknoloji alanında yenilikçi çözümler sunan, dinamik ve vizyon sahibi bir şirkettir. 
            Kurulduğumuz günden bu yana, müşterilerimizin iş süreçlerini kolaylaştıran ve hedeflerine ulaşmalarını hızlandıran çözümler üretmek için çalışıyoruz. 
            Özelleştirilmiş yazılım geliştirme projelerimizle, her sektöre özgü ihtiyaçlara yanıt verebilen niş yazılımlar geliştiriyoruz. 
          </p>

          <p className={styles.paragraph}>
            Aynı zamanda, e-ticaret platformları, ürün tanıtım siteleri ve kurumsal web çözümleri gibi farklı kategorilerde, 
            kullanıma hazır ürünler sunuyoruz. Bu ürünler, kullanıcı dostu arayüzleri ve gelişmiş özellikleriyle işletmelerin dijital dünyadaki 
            varlıklarını güçlendirmelerine olanak tanımaktadır. Geliştirdiğimiz tüm çözümler, hız, güvenilirlik ve kaliteyi temel almaktadır.
          </p>

          <p className={styles.paragraph}>
            Ölçek, Flexsoft’un öne çıkan inovatif projelerinden biridir. Yazılım ekibimizin uzmanlığı ve bir ilaç mümessilinin 
            değerli iş birliğiyle hayata geçirilmiştir. Proje sürecinde, ilaç mümessilinin devlet kaynaklarından derlediği geniş kapsamlı veri seti, 
            yazılım ekibimiz tarafından analiz edilmiş ve bu veri temel alınarak Ölçek geliştirilmiştir. Bu, ürünümüzün yalnızca bir yazılım çözümü değil, 
            aynı zamanda sektörel bilgi birikimiyle desteklenen yenilikçi bir platform olduğunu göstermektedir.
          </p>

          <p className={styles.paragraph}>
            Flexsoft olarak, yalnızca yazılım geliştirmekle kalmıyor, aynı zamanda müşterilerimizle uzun soluklu iş birlikleri kurmaya odaklanıyoruz. 
            Çözüm odaklı yaklaşımımız sayesinde, müşterilerimizin ihtiyaçlarına en uygun yazılım çözümlerini tasarlıyor ve uyguluyoruz. 
            Her projemizde, hem kullanıcı deneyimini önceliklendiriyor hem de sürdürülebilir bir altyapı sunuyoruz.
          </p>

          <p className={styles.paragraph}>
            Hedefimiz, teknolojiyi daha erişilebilir, daha kullanışlı ve daha etkili bir hale getirmektir. Müşterilerimize yalnızca bir hizmet 
            sunmuyor, aynı zamanda onların başarı hikayelerinde bir parça olmayı hedefliyoruz. Bizi tercih eden firmalar, yalnızca bir yazılım 
            çözümü değil, aynı zamanda bir vizyon ortağı kazanmaktadır.
          </p>

          <p className={styles.paragraph}>
            Flexsoft ile tanışın ve işletmenizin dijital dönüşüm yolculuğunda güçlü bir ortak edinin. Teknolojiye olan tutkumuz ve inovasyona 
            olan bağlılığımızla, işinizi bir sonraki seviyeye taşımak için buradayız.
          </p>

        </div>

      </div>
    </div>
  );
};

export default Hakkimizda;


