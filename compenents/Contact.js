'use client';
import { useState } from "react";
import styles from "../src/app/iletisim/Iletisim.module.css";
import axios from "axios";

export default function Home() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Hata mesajını temizle
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basit bir e-posta doğrulama regex'i
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    const newErrors = {};

    // Boş alanları kontrol et
    if (!formData.name) newErrors.name = "Tam adınızı giriniz.";
    if (!formData.email) newErrors.email = "Geçerli bir e-posta adresi giriniz.";
    else if (!validateEmail(formData.email)) newErrors.email = "E-posta adresi geçersiz.";
    if (!formData.message) newErrors.message = "Mesajınızı yazınız.";

    // Eğer hata varsa setErrors ile uyarıları göster
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // console.log(formData)

    // API'ye POST isteği gönder
    try {
      const response = await axios.post("https://api.ölçek.com/api/appname/contact/", {name:formData.name , mail:formData.email , message:formData.message});

      if (response.status === 200 || response.status === 201) { // 200 veya 201 durum kodunu kontrol et
        alert("Mesajınız başarıyla gönderildi.");
        setFormData({ name: "", email: "", message: "" }); // Formu temizle
      } else {
        alert("Bir hata oluştu, lütfen tekrar deneyiniz.");
        console.error("Hata Detayı:", response.data);
      }
    } catch (error) {
      alert("Bir hata oluştu: " + "lütfen daha sonra tekrar deneyin.");
      console.error("Hata Detayı:", error.response || error);
    }
  };

  return (
    <div className={styles.kutum1}>
      <h2>İletişim Formu</h2>

      <div className={styles.inputlar}>
        <p>Tam Ad</p>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Tam adınızı giriniz"
        />
        {errors.name && <span className={styles.error}>{errors.name}</span>}
      </div>

      <div className={styles.inputlar}>
        <p>E-posta</p>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Geçerli bir e-posta adresi girin"
        />
        {errors.email && <span className={styles.error}>{errors.email}</span>}
      </div>

      <div className={styles.inputlar}>
        <div className={styles.mesaj}>
          <p>Mesaj</p>
          <input
            type="text"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Mesajınızı yazınız"
          />
        </div>
        {errors.message && <span className={styles.error}>{errors.message}</span>}
      </div>

      <div className={styles.gonder}>
        <button onClick={handleSubmit}>Gönder</button>
      </div>
    </div>
  );
}

