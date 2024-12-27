'use client';
import { useState } from "react";
import styles from "../src/app/kayit-sil/KayitSil.module.css";
import axios from "axios";

export default function DeleteAccount() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Hata mesajını temizle
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    const newErrors = {};

    // Boş alanları kontrol et
    if (!formData.email) newErrors.email = "Geçerli bir e-posta adresi giriniz.";
    else if (!validateEmail(formData.email))
      newErrors.email = "E-posta adresi geçersiz.";
    if (!formData.password) newErrors.password = "Şifrenizi giriniz.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post(
        "https://api.ölçek.com/api/appname/delete-user/",
        { email: formData.email, password: formData.password }
      );

      if (response.status === 200) {
        alert("Hesabınız ve profiliniz başarıyla silindi.");
        setFormData({ email: "", password: "" }); // Formu temizle
      }
    } catch (error) {
      if (error.response?.status === 404) {
        setErrors({ email: "Kullanıcı bulunamadı. E-posta ve şifrenizi kontrol ediniz." });
      } else {
        alert("Bir hata oluştu, lütfen daha sonra tekrar deneyiniz.");
        console.error("Hata Detayı:", error.response || error);
      }
    }
  };

  return (
    <div className={styles.kutum1}>
      <h2>Hesap Silme Formu</h2>

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
        <p>Şifre</p>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Şifrenizi giriniz"
        />
        {errors.password && <span className={styles.error}>{errors.password}</span>}
      </div>

      <div className={styles.gonder}>
        <button onClick={handleSubmit}>Hesabı Sil</button>
      </div>
    </div>
  );
}

