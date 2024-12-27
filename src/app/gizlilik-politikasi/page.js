import React from 'react';
import styles from "./Politika.module.css";
import Head from 'next/head';

const Politika = () => {
  return (
    <div>
      <Head>
        <title>Gizlilik Politikası | Ölçek</title>
        <meta 
            name="description" 
            content="Ölçek platformunun gizlilik politikası ile kullanıcı bilgilerinizi nasıl koruduğumuzu öğrenin. Kişisel verilerin güvenliği ve kullanım koşulları hakkında önemli bilgiler." 
            />
      </Head>

      <div className={styles.firstContainer}>
        <div className={styles.metinContainer}>
          <h2 className={styles.subHeading}>Privacy Policy</h2>
          <p className={styles.paragraph}>
            This privacy policy applies to the Ölçek | Doz Hesaplama Asistanı app (hereby referred to as "Application") for mobile devices that was created by Flexsoftware tr (hereby referred to as "Service Provider") as a Free service. This service is intended for use "AS IS".
          </p>

          <h2 className={styles.subHeading}>Information Collection and Use</h2>
          <p className={styles.paragraph}>
            The Application collects information when you download and use it. This information may include information such as:
          </p>
          <ul>
            <li>Your device's Internet Protocol address (e.g. IP address)</li>
            <li>The pages of the Application that you visit, the time and date of your visit, the time spent on those pages</li>
            <li>The time spent on the Application</li>
            <li>The operating system you use on your mobile device</li>
          </ul>
          <p className={styles.paragraph}>
            The Application does not gather precise information about the location of your mobile device.
          </p>

          <p className={styles.paragraph}>
            The Application collects your device's location, which helps the Service Provider determine your approximate geographical location and make use of it in below ways:
          </p>
          <ul>
            <li>Geolocation Services: The Service Provider utilizes location data to provide features such as personalized content, relevant recommendations, and location-based services.</li>
            <li>Analytics and Improvements: Aggregated and anonymized location data helps the Service Provider to analyze user behavior, identify trends, and improve the overall performance and functionality of the Application.</li>
            <li>Third-Party Services: Periodically, the Service Provider may transmit anonymized location data to external services. These services assist them in enhancing the Application and optimizing their offerings.</li>
          </ul>
          <p className={styles.paragraph}>
            The Service Provider may use the information you provided to contact you from time to time to provide you with important information, required notices and marketing promotions.
          </p>

          <h2 className={styles.subHeading}>Third Party Access</h2>
          <p className={styles.paragraph}>
            Only aggregated, anonymized data is periodically transmitted to external services to aid the Service Provider in improving the Application and their service. The Service Provider may share your information with third parties in the ways that are described in this privacy statement.
          </p>

          <h2 className={styles.subHeading}>Opt-Out Rights</h2>
          <p className={styles.paragraph}>
            You can stop all collection of information by the Application easily by uninstalling it. You may use the standard uninstall processes as may be available as part of your mobile device or via the mobile application marketplace or network.
          </p>

          <h2 className={styles.subHeading}>Data Retention Policy</h2>
          <p className={styles.paragraph}>
            The Service Provider will retain User Provided data for as long as you use the Application and for a reasonable time thereafter. If you'd like them to delete User Provided Data that you have provided via the Application, please contact them at <a href="mailto:flexsoftwaretr@gmail.com">flexsoftwaretr@gmail.com</a> and they will respond in a reasonable time.
          </p>

          <h2 className={styles.subHeading}>Children</h2>
          <p className={styles.paragraph}>
            The Service Provider does not use the Application to knowingly solicit data from or market to children under the age of 13.
          </p>

          <h2 className={styles.subHeading}>Security</h2>
          <p className={styles.paragraph}>
            The Service Provider is concerned about safeguarding the confidentiality of your information. The Service Provider provides physical, electronic, and procedural safeguards to protect information the Service Provider processes and maintains.
          </p>

          <h2 className={styles.subHeading}>Changes</h2>
          <p className={styles.paragraph}>
            This Privacy Policy may be updated from time to time for any reason. The Service Provider will notify you of any changes to the Privacy Policy by updating this page with the new Privacy Policy. You are advised to consult this Privacy Policy regularly for any changes, as continued use is deemed approval of all changes.
          </p>

          <h2 className={styles.subHeading}>Your Consent</h2>
          <p className={styles.paragraph}>
            By using the Application, you are consenting to the processing of your information as set forth in this Privacy Policy now and as amended by us.
          </p>

          <h2 className={styles.subHeading}>Contact Us</h2>
          <p className={styles.paragraph}>
            If you have any questions regarding privacy while using the Application, or have questions about the practices, please contact the Service Provider via email at <a href="mailto:flexsoftwaretr@gmail.com">flexsoftwaretr@gmail.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Politika;

