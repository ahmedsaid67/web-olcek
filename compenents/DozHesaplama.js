'use client';

import { useEffect, useState } from "react";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { FaCaretDown } from 'react-icons/fa';
import { TextField, Button } from "@mui/material";
import styles from "../src/app/ilaclar/[category]/[slug]/doz-hesaplama/Doz.module.css";
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import trLocale from 'date-fns/locale/tr'; 
import axios from "axios";
import { FaExclamationCircle } from "react-icons/fa";
import { FaInfoCircle,FaTimesCircle } from "react-icons/fa";
import { da } from "date-fns/locale";


export default function DozHesaplama({product}) {
    const [selectedDisease, setSelectedDisease] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [weight, setWeight] = useState('');
    const [date, setDate] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);

    const [diseases,setDiseases] = useState([])

    const [info,setInfo] = useState("")

    const [statusWeight,setStatusWeight] = useState(false)
    const [statusAge,setStatusAge] = useState(false)
    const [statusDisease,setStatusDisease] = useState(false)

    const [direction, setDirection] = useState("")
    const [uyari,setUyari] = useState("")
    const [message,setMessage] = useState("")
    const [kullanim,setKullanim] = useState("")

    const id = product.id
    const type=product.hassasiyet_turu.name


    // console.log(type)



    const calculateHandle = async () => {
        setMessage("")
        if (type === "Yaş-Doz") {
            if (!date) {
                setMessage("Hesaplamak için yaş bilgisini girin.")
                return;
            }
    
            // Ensure date is a valid Date object
            const providedDate = new Date(date);
            // if (isNaN(providedDate.getTime())) {
            //     console.error("Invalid date provided!");
            //     return;
            // }
    
            const today = new Date();

            // Calculate the difference in months
            const totalMonths =
                (today.getFullYear() - providedDate.getFullYear()) * 12 +
                (today.getMonth() - providedDate.getMonth());
    
            // if (totalMonths < 0) {
            //     console.error("Provided date is in the future!");
            //     return;
            // }

    
            // Make the API call with the calculated total months
            const yasDoz = await axios.get("https://api.ölçek.com/api/appname/yasdoz/get-dosage-by-age", {
                params: {
                    ilac_id: id,
                    yas: totalMonths,
                    yas_birimi: "ay", // Using months as the unit
                },
            });
            setInfo(yasDoz.data.doz);
        }else if (type === "Kilo-Doz"){
            if (!weight) {
                setMessage("Hesaplamak için kilo bilgisini girin.")
                return;
            }

            const response = await axios.get('https://api.ölçek.com/api/appname/kilodoz/get-dosage-by-weight/', {
                params: {
                    kilo: weight,
                    ilac_id: id,
                }
            });


            setInfo(response.data.message)
            setKullanim(response.data.kullanim_sikligi)
            setUyari(response.data.check_uyari)
        }else if (type === "Hastalıklı-Azalan-kilo"){
            if (!weight) {
                setMessage("Hesaplamak için kilo bilgisini girin.")
                return;
            }

            if (!selectedDisease) {
                setMessage("Hesaplamak için kişinin hastalığını seçin.")
                return;
            }

            const response = await axios.get('https://api.ölçek.com/api/appname/hastalikazalankilodoz/get-hastalik-azalan-doz-kilo/', {
                params: {
                    kilo: weight,
                    ilac_id: id,
                    hastalik_id: selectedDisease.id, 
                }
            });


            setInfo(response.data.message)
            setKullanim(response.data.kullanim_sikligi)
            setUyari(response.data.check_uyari)
        }else if (type === "Azalan-kilo"){
            if (!weight) {
                setMessage("Hesaplamak için kilo bilgisini girin.")
                return;
            }

            const response = await axios.get('https://api.ölçek.com/api/appname/azalankilodoz/get-azalan-doz-kilo/', {
                params: {
                    kilo: weight,
                    ilac_id: id,
                }
            });

            setInfo(response.data.message)
            setKullanim(response.data.kullanim_sikligi)
            setUyari(response.data.check_uyari)
        }else if(type === "Hastalıklı-yasa-baglı-azalan-kilo-doz"){
            if (!weight) {
                setMessage("Hesaplamak için kilo bilgisini girin.")
                return;
            }

            if (!selectedDisease) {
                setMessage("Hesaplamak için kişinin hastalığını seçin.")
                return;
            }


            if (!date) {
                setMessage("Hesaplamak için yaş bilgisini girin.");
                return;
            }
            
            // Tarihi Date nesnesine dönüştür
            const birthDate = new Date(date);
            // Güncel tarihi al
            const currentDate = new Date();
            // Yaşı hesapla
            const age = currentDate.getFullYear() - birthDate.getFullYear();
            // Ay ve gün kontrolü yaparak yaşı doğru hesapla
            const isBeforeBirthday = 
                currentDate.getMonth() < birthDate.getMonth() || 
                (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate());
            const correctedAge = isBeforeBirthday ? age - 1 : age;
            
            const response = await axios.get('https://api.ölçek.com/api/appname/hastalikhemyasahemkiloyabagliazalandoz/get-detail-data/', {
                params: {
                    ilac_id: id,
                    hastalik_id: selectedDisease.id,
                    age: correctedAge
                }
            });

            const { threshold_age } = response.data;

            if (parseInt(correctedAge) < threshold_age) {

                const response = await axios.get('https://api.ölçek.com/api/appname/hastalikhemyasahemkiloyabagliazalandoz/get-hastalik-azalan-doz-hem-kilo-hem-yas/', {
                    params: {
                        age:correctedAge,
                        weight,
                        ilac_id: id,
                        hastalik_id: selectedDisease.id
                    }
                });

                setInfo(response.data.message)
                setKullanim(response.data.kullanim_sikligi)
                setUyari(response.data.check_uyari)
                
            } else {
                const response = await axios.get('https://api.ölçek.com/api/appname/hastalikhemyasahemkiloyabagliazalandoz/get-hastalik-azalan-doz-hem-kilo-hem-yas/', {
                    params: {
                        age:correctedAge,
                        ilac_id: id,
                        hastalik_id: selectedDisease.id
                    }
                });

                setInfo(response.data.message)
                setKullanim(response.data.kullanim_sikligi)
                setUyari(response.data.check_uyari)
            }
            
        }else if (type === "Hastalık-Yaş"){
            if (!date) {
                setMessage("Hesaplamak için yaş bilgisini girin.")
                return;
            }

            if (!selectedDisease) {
                setMessage("Hesaplamak için kişinin hastalığını seçin.")
                return;
            }
    
            const providedDate = new Date(date);
    
            const today = new Date();

            const totalMonths =
                (today.getFullYear() - providedDate.getFullYear()) * 12 +
                (today.getMonth() - providedDate.getMonth());
    

            const response = await axios.get('https://api.ölçek.com/api/appname/hastalikyasdoz/get-dosage-by-age-and-disease', {
                params: {
                  ilac_id: id,
                  hastalik_id: selectedDisease.id, 
                  yas: totalMonths,
                  yas_birimi: "ay",
                },
            });

            setInfo(response.data.doz);

        }else if (type === "hastalıklı artan kilo"){
            if (!weight) {
                setMessage("Hesaplamak için kilo bilgisini girin.")
                return;
            }

            if (!selectedDisease) {
                setMessage("Hesaplamak için kişinin hastalığını seçin.")
                return;
            }

            const response = await axios.get('https://api.ölçek.com/api/appname/hastalikartankilodoz/get-hastalik-artan-doz-kilo/', {
                params: {
                    kilo: weight,
                    ilac_id: id,
                    hastalik_id: selectedDisease.id, 
                }
            });

            setInfo(response.data.message)
            setKullanim(response.data.kullanim_sikligi)
            setUyari(response.data.check_uyari)
        }else if(type === "Hastalıklı-yasa-baglı-artan-kilo-doz"){
            if (!weight) {
                setMessage("Hesaplamak için kilo bilgisini girin.")
                return;
            }

            if (!selectedDisease) {
                setMessage("Hesaplamak için kişinin hastalığını seçin.")
                return;
            }
            if (!date) {
                setMessage("Hesaplamak için yaş bilgisini girin.");
                return;
            }


            // Tarihi Date nesnesine dönüştür
            const birthDate = new Date(date);
            // Güncel tarihi al
            const currentDate = new Date();
            // Yaşı hesapla
            const age = currentDate.getFullYear() - birthDate.getFullYear();
            // Ay ve gün kontrolü yaparak yaşı doğru hesapla
            const isBeforeBirthday = 
                currentDate.getMonth() < birthDate.getMonth() || 
                (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate());
            const correctedAge = isBeforeBirthday ? age - 1 : age;
            
            const response = await axios.get('https://api.ölçek.com/api/appname/hastalikhemyasahemkiloyabagliartandoz/get-detail-data/', {
                params: {
                    ilac_id: id,
                    hastalik_id: selectedDisease.id,
                    age: correctedAge
                }
            });

            const { threshold_age } = response.data;

            if (parseInt(correctedAge) > threshold_age) {

                const response = await axios.get('https://api.ölçek.com/api/appname/hastalikhemyasahemkiloyabagliartandoz/get-hastalik-artan-doz-hem-kilo-hem-yas/', {
                    params: {
                        age:correctedAge,
                        weight,
                        ilac_id: id,
                        hastalik_id: selectedDisease.id
                    }
                });

                setInfo(response.data.message)
                setKullanim(response.data.kullanim_sikligi)
                setUyari(response.data.check_uyari)
                
            }else{

                const response = await axios.get('https://api.ölçek.com/api/appname/hastalikhemyasahemkiloyabagliartandoz/get-hastalik-artan-doz-hem-kilo-hem-yas/', {
                    params: {
                        age:correctedAge,
                        ilac_id: id,
                        hastalik_id: selectedDisease.id
                    }
                });

                setInfo(response.data.message)
                setKullanim(response.data.kullanim_sikligi)
                setUyari(response.data.check_uyari)
            }
        }else if (type === "Artan-kilo"){

            if (!weight) {
                setMessage("Hesaplamak için kilo bilgisini girin.")
                return;
            }

            const response = await axios.get('https://api.ölçek.com/api/appname/artankilodoz/get-artan-doz-kilo/', {
                params: {
                    kilo: weight,
                    ilac_id: id,
                }
            });

            setInfo(response.data.message)
            setKullanim(response.data.kullanim_sikligi)
            setUyari(response.data.check_uyari)
        }else if (type === "Hastalıklı-Kilo"){
            if (!weight) {
                setMessage("Hesaplamak için kilo bilgisini girin.")
                return;
            }

            if (!selectedDisease) {
                setMessage("Hesaplamak için kişinin hastalığını seçin.")
                return;
            }

            const response = await axios.get('https://api.ölçek.com/api/appname/hastalikkilodoz/get-dosage-by-weight-and-condition/', {
                params: {
                    kilo: weight,
                    ilac_id: id,
                    hastalik_id: selectedDisease.id, 
                }
            });

            setInfo(response.data.message)
            setKullanim(response.data.kullanim_sikligi)
            setUyari(response.data.check_uyari)

        }
    };


    useEffect(()=>{
        const explanationDoz = async () => {
            if (type === "Explations-Doz"){
                const response = await axios.get('https://api.ölçek.com/api/appname/explanationdoz/get-dosage-by-explanation', {
                    params: {
                      ilac_id: id,
            
                    },
                });
                
                setInfo(response.data.bilgi)
                setUyari(response.data.check_uyari)
            }
        }

        explanationDoz()
        
    },[])
    
    

    useEffect(()=>{

        let age ;
        let weight;
        let disease;

        if (type === "Yaş-Doz" || type === "Hastalıklı-yasa-baglı-azalan-kilo-doz" || type === "Hastalık-Yaş" || type === "Hastalıklı-yasa-baglı-artan-kilo-doz" ){
            setStatusAge(true)
            age = true
        }
        if (type === "Kilo-Doz" || type === "Hastalıklı-Azalan-kilo" || type === "Azalan-kilo" || 
            type === "Hastalıklı-yasa-baglı-azalan-kilo-doz" || type === "hastalıklı artan kilo" || type === "Hastalıklı-yasa-baglı-artan-kilo-doz" ||
            type === "Artan-kilo" || type === "Hastalıklı-Kilo"){
            setStatusWeight(true)
            weight = true 
        }
        if (type === "Hastalıklı-Azalan-kilo" || type === "Hastalıklı-yasa-baglı-azalan-kilo-doz" || type === "Hastalık-Yaş" || 
            type === "Hastalıklı-yasa-baglı-artan-kilo-doz" || type === "hastalıklı artan kilo"){
            setStatusDisease(true)
            disease = true
            setDiseases(product.hastaliklar)
        }

        if (age && weight && disease){
            setDirection("Doz hesaplamak için lütfen kişinin hastalığını seçin, kilo ve yaş bilgisini girin.")
        }
        else if (age && weight){
            setDirection("Doz hesaplamak için lütfen kişinin kilo ve yaş bilgisini girin.")
        }else if (age && disease){
            setDirection("Doz hesaplamak için lütfen kişinin hastalığını seçin yaş bilgisini girin.")
        }else if (weight && disease){
            setDirection("Doz hesaplamak için lütfen kişinin hastalığını seçin kilo bilgisini girin.")
        }else if (age){
            setDirection("Doz hesaplamak için lütfen kişinin yaş bilgisini girin.")
        }else if (weight){
            setDirection("Doz hesaplamak için lütfen kişinin kilo bilgisini girin.")
        }else if (disease){
            setDirection("Doz hesaplamak için lütfen kişinin hastalığını seçin.")
        }
    
        
    },[])



    const handleWeightChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, ''); // Sadece pozitif tam sayılar
        setWeight(value);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const selectDisease = (disease) => {
        setSelectedDisease(disease);
        setIsDropdownOpen(false);
    };

    const handleDatePickerClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const resetHandle = () => {
        setInfo("")
        setDate(null)
        setWeight("")
        setSelectedDisease("")
        setUyari("")
        setMessage("")
        setKullanim("")
    }


    return (

        
        <>
        {type === "Explations-Doz" ? (

            <div className={styles.explanationDozContainer}>
                <div className={styles.explanationTitle}>Kullanım Bilgisi</div>
                <p>{info}</p>
                {
                    uyari && (
                        <>
                        <div className={styles.explanationTitleUyari}>Kullanım Uyarısı</div>
                        <p>{uyari}</p>
                        </>
                    )
                }
            </div>
        ) : (

            <div className={styles.dozMainContainer}>
                <div className={styles.dozContainer}>
                    <div>
                        <div className={styles.dozContainerBaslik}>Ölçek İle Doz Hesapla</div>
                        <p>{direction}</p>

                        {/* Hastalık Seçimi */}
                        {statusDisease && (
                            <div className={styles.customSelectContainer}>
                                <div className={styles.customSelect} onClick={toggleDropdown}>
                                    {selectedDisease.name || 'Bir hastalık seçin'}
                                    <FaCaretDown className={styles.iconCal} />
                                </div>
                                {isDropdownOpen && (
                                    <div className={styles.dropdown}>
                                        {diseases.map((disease) => (
                                            <div
                                                key={disease.id}
                                                className={styles.dropdownItem}
                                                onClick={() => selectDisease(disease)}
                                            >
                                                {disease.name}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                        
                        {/* Kilo Girişi */}

                        {statusWeight && (
                            <div className={styles.inputContainer}>
                                <div className={styles.customInput}>
                                    <input
                                        type="text"
                                        placeholder="Kilonuzu girin"
                                        value={weight}
                                        onChange={handleWeightChange}
                                        className={styles.input}
                                    />
                                </div>
                            </div>
                        )}

                        
                        {/* Tarih Seçimi */}
                        {statusAge && (
                            <div className={styles.DateContainer} >
                                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={trLocale}>
                                    <DatePicker
                                        aria-hidden={false}
                                        maxDate={new Date()}
                                        clearable
                                        value={date}
                                        onChange={(newDate) => setDate(newDate)}
                                        renderDay={(day, selectedDays, pickersDayProps) => {
                                            const { key, ...rest } = pickersDayProps; // key'i ayırıyoruz
                                            return <PickersDay key={key} {...rest} />;
                                        }}
                                    
                                        PopperProps={{
                                            placement: "bottom-end",
                                            anchorEl: anchorEl,
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                placeholder="MM/DD/YYYY" // Placeholder'ı ayarlıyoruz
                                                className={styles.input2}
                                                onClick={handleDatePickerClick} // Açılır pencereyi açmak için tıklama etkinliğini yönlendiriyoruz
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        color: 'rgb(113, 118, 123)', // Yazı rengi
                                                        backgroundColor: 'black', // Input arka plan rengi
                                                        '& fieldset': {
                                                            borderColor: 'rgb(113, 118, 123)', // Border rengi
                                                            borderWidth: '2px', // Border genişliği
                                                        },
                                                        '&:hover fieldset': {
                                                            borderColor: 'rgb(113, 118, 123)', // Hover border rengi
                                                            borderWidth: '2px', // Hover border genişliği
                                                        },
                                                        '&.Mui-focused fieldset': {
                                                            borderColor: 'rgb(113, 118, 123)', // Focus border rengi
                                                            borderWidth: '2px', // Focus border genişliği
                                                        },
                                                    },
                                                    '& .MuiInputBase-input': {
                                                        color: 'rgb(113, 118, 123)', // Placeholder ve yazı rengi
                                                        fontSize: '1rem', // Yazı boyutu
                                                        height: '1rem', // Input yüksekliği
                                                        '&::placeholder': {
                                                            color: 'rgb(113, 118, 123)', // Placeholder rengi
                                                            opacity: 1, // Soluk olmaması için
                                                        },
                                                        '@media (max-width: 767px)': {
                                                            fontSize: '0.9rem',
                                                        },
                                                    },
                                                    '& .MuiInputLabel-root': {
                                                        display: 'none', // Label tamamen gizlenir
                                                    },
                                                    '& .MuiSvgIcon-root': {
                                                        color: 'rgb(113, 118, 123)', // Tarih seçici simge rengi
                                                        fontSize: '1.5rem', // Tarih ikonunun boyutu
                                                        visibility: 'visible', // İkonun görünür olmasını sağlar
                                                    },
                                                }}
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                            </div>
                        )}


                        {message && (
                            <div className={styles.inputUyari}>
                                <FaTimesCircle className={styles.inputUyariIcon} />
                                <p>{message}</p>
                            </div>
                        )}             


                        <div className={styles.mobilInfoContainer}>
                            {info && (
                                <div className={styles.info}>
                                    <FaInfoCircle className={styles.infoIcon} />
                                    <p>{info}</p>
                                    {kullanim && <p>{kullanim}</p>}
                                </div>
                            )}

                            {uyari && (
                                <div className={styles.uyari}>
                                    <FaExclamationCircle className={styles.uyariIcon} />
                                    <p>{uyari}</p>
                                </div>
                            )}
                        </div>


                    </div>


                    <div className={styles.buttonContainer}>
                        <button className={`${styles.button} ${styles.calculateButton}`} onClick={calculateHandle}>Hesapla</button>
                        <button className={`${styles.mobileButton} ${styles.resetButton}`} onClick={resetHandle}>Sıfırla</button>
                    </div>
                </div>

                <div className={styles.resContainer}>
                    <div className={styles.resInfoContainer}>
                        <div className={styles.dozContainerBaslik}>
                                Kullanım Bilgisi
                        </div>
                            
                        {info && (
                            <div className={styles.bilgiContainer}>
                                <FaInfoCircle style={{ fontSize: "2rem", color: "#fff" }} />
                                <p>{info}</p>
                                {kullanim && <p>{kullanim}</p>}
                            </div>
                        )}


                        {uyari && (
                            <div className={styles.uyariContainer}>
                                <FaExclamationCircle style={{ fontSize: "2rem", color: "#fff" }} />
                                <p>{uyari}</p>
                            </div>
                        )}
                    </div>


                    <div className={styles.buttonContainer}>
                        <button className={`${styles.button} ${styles.resetButton}`} onClick={resetHandle}>Sıfırla</button>
                    </div>
                </div>
            </div>
        )}

        </>
    );
}
