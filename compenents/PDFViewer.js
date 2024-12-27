'use client';

import React, { useEffect, useRef, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { pdfjs } from 'react-pdf';
import styles from "../src/app/ilaclar/[category]/[slug]/kullanim-talimati/KullanimTalimati.module.css";

const PDFViewer = ({ file }) => {
  const [numPages, setNumPages] = useState(null);
  const [loading, setLoading] = useState(true);
  const [renderReady, setRenderReady] = useState(false); // Ensures DOM is ready before rendering
  const canvasRefs = useRef([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('react-pdf').then(({ pdfjs }) => {
        pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

        const loadPdf = async () => {
          try {
            const loadingTask = pdfjs.getDocument(file);
            const pdf = await loadingTask.promise;
            setNumPages(pdf.numPages);

            // Initialize the canvasRefs array with enough refs
            canvasRefs.current = Array.from({ length: pdf.numPages }, () => React.createRef());
            setRenderReady(true); // Allow DOM to render the canvases
          } catch (error) {
            console.error('Error loading PDF:', error);
          }
        };

        loadPdf();
      });
    }
  }, [file]);

  useEffect(() => {
    const renderAllPages = async () => {
      if (renderReady && numPages) {
        try {
          const loadingTask = pdfjs.getDocument(file);
          const pdf = await loadingTask.promise;
          for (let pageNum = 1; pageNum <= numPages; pageNum++) {
            await renderPage(pdf, pageNum);
          }
          setLoading(false);
        } catch (error) {
          console.error('Error rendering pages:', error);
        }
      }
    };

    renderAllPages();
  }, [renderReady, numPages, file]);

  const renderPage = async (pdf, pageNum) => {
    const page = await pdf.getPage(pageNum);
    const canvas = canvasRefs.current[pageNum - 1]?.current;

    if (!canvas) {
      console.warn(`Canvas for page ${pageNum} is not available.`);
      return;
    }

    const context = canvas.getContext('2d');
    const containerWidth = canvas.parentNode.offsetWidth;
    const scale = containerWidth / page.getViewport({ scale: 1 }).width;
    const viewport = page.getViewport({ scale });

    canvas.height = viewport.height;
    canvas.width = viewport.width;

    await page.render({
      canvasContext: context,
      viewport: viewport,
    }).promise;
  };

  return (
    <div className={styles.mainPdfContainer}>
      <div className={styles.pdfContainer}>
        {loading && (
          <div className={styles.loadingSpinner}>
            <CircularProgress />
            <p>PDF Yükleniyor...</p>
          </div>
        )}
        {renderReady &&
          Array.from({ length: numPages || 0 }, (_, index) => (
            <div key={index} className={styles.pageContainer}>
              <canvas ref={canvasRefs.current[index]} className={styles.canvas}></canvas>
            </div>
          ))}
      </div>
    </div>
    
  );
};

export default PDFViewer;

