import React from 'react';
import styles from "./Kullanim.module.css";
import Head from 'next/head';

const KullanımSartlari = () => {
  return (
    <div>
      <Head>
        <title>Şartlar ve Koşullar | Ölçek</title>
        <meta 
          name="description" 
          content="Ölçek platformunun kullanım şartları ve koşullarını öğrenin. Hizmetlerimizden faydalanmadan önce bu önemli bilgilere göz atın." 
        />
      </Head>

      <div className={styles.firstContainer}>

        <div className={styles.metinContainer}>
          <h2 className={styles.subHeading}>Terms & Conditions</h2>

          <p className={styles.paragraph}>
            These terms and conditions apply to the Ölçek | Doz Hesaplama Asistanı app (hereby referred to as "Application") for mobile devices created by Flexsoftware tr (hereby referred to as "Service Provider") as a free service.
          </p>

          <p className={styles.paragraph}>
            Upon downloading or utilizing the Application, you are automatically agreeing to the following terms. It is strongly advised that you thoroughly read and understand these terms prior to using the Application.
          </p>

          <p className={styles.paragraph}>
            Unauthorized copying, modification of the Application, any part of the Application, or our trademarks is strictly prohibited. Any attempts to extract the source code of the Application, translate the Application into other languages, or create derivative versions are not permitted. All trademarks, copyrights, database rights, and other intellectual property rights related to the Application remain the property of the Service Provider.
          </p>

          <p className={styles.paragraph}>
            The Service Provider is dedicated to ensuring that the Application is as beneficial and efficient as possible. As such, they reserve the right to modify the Application or charge for their services at any time and for any reason. The Service Provider assures you that any charges for the Application or its services will be clearly communicated to you.
          </p>

          <p className={styles.paragraph}>
            The Application stores and processes personal data that you have provided to the Service Provider in order to provide the Service. It is your responsibility to maintain the security of your phone and access to the Application.
          </p>

          <p className={styles.paragraph}>
            The Service Provider strongly advises against jailbreaking or rooting your phone, which involves removing software restrictions and limitations imposed by the official operating system of your device. Such actions could expose your phone to malware, viruses, malicious programs, compromise your phone's security features, and may result in the Application not functioning correctly or at all.
          </p>

          <h2 className={styles.subHeading}>Third-Party Terms and Conditions</h2>
          <p className={styles.paragraph}>
            Please note that the Application utilizes third-party services that have their own Terms and Conditions. Below are the links to the Terms and Conditions of the third-party service providers used by the Application:
          </p>

          <ul className={styles.linkList}>
            <li>
              <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">Google Play Services</a>
            </li>
            <li>
              <a href="https://developers.google.com/admob/terms" target="_blank" rel="noopener noreferrer">AdMob</a>
            </li>
            <li>
              <a href="https://www.google.com/analytics/terms/" target="_blank" rel="noopener noreferrer">Google Analytics for Firebase</a>
            </li>
            <li>
              <a href="https://firebase.google.com/terms/crashlytics" target="_blank" rel="noopener noreferrer">Firebase Crashlytics</a>
            </li>
          </ul>

          <p className={styles.paragraph}>
            The Service Provider does not assume responsibility for certain aspects, including lack of access to Wi-Fi or data exhaustion.
          </p>

          <p className={styles.paragraph}>
            Similarly, the Service Provider cannot always assume responsibility for your usage of the Application. It is your responsibility to ensure your device remains charged and operational.
          </p>

          <p className={styles.paragraph}>
            The Service Provider accepts no liability for any loss, direct or indirect, that you experience as a result of relying entirely on the Application's functionality.
          </p>

          <h2 className={styles.subHeading}>Changes to These Terms and Conditions</h2>
          <p className={styles.paragraph}>
            The Service Provider may periodically update their Terms and Conditions. Therefore, you are advised to review this page regularly for any changes. The Service Provider will notify you of any changes by posting the new Terms and Conditions on this page.
          </p>

          <p className={styles.paragraph}>
            These terms and conditions are effective as of 2024-12-23.
          </p>

          <h2 className={styles.subHeading}>Contact Us</h2>
          <p className={styles.paragraph}>
            If you have any questions or suggestions about the Terms and Conditions, please do not hesitate to contact the Service Provider at <a href="mailto:flexsoftwaretr@gmail.com">flexsoftwaretr@gmail.com</a>.
          </p>

        </div>

      </div>
    </div>
  );
};

export default KullanımSartlari;
