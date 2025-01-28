'use client';

import React from 'react';
import styles from "../src/app/ilaclar/[category]/[slug]/kullanim-talimati/KullanimTalimati.module.css";

const PDFViewer = ({ file }) => {
  return (
      <div className={styles.pdfContainer}>
        <embed
          src={`${file}#toolbar=0&navpanes=0&scrollbar=0`}
          type="application/pdf"
          width="100%"
          height="100%"
        />

    </div>
  );
};

export default PDFViewer;


