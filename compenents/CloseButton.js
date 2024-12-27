'use client'

import styles from "../src/app/ilaclar/[category]/[slug]/kullanim-talimati/KullanimTalimati.module.css";
import { IoClose } from 'react-icons/io5';



export default function CloseButton() {

  return (
    <>

        <IoClose 
            className={styles.closeIcon} 
            onClick={() => window.history.back()}  // Geri gitme işlevi
        />

    </>
  );
}