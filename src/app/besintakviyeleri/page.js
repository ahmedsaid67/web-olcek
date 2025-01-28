'use client';
import React, { useRef, useState, useEffect } from 'react';
import { FaChevronRight, FaChevronLeft, FaSearch, FaInfoCircle, FaCalculator, FaFileAlt } from 'react-icons/fa';
import styles from './BesinTakviyeleri.module.css';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { Pagination,PaginationItem } from '@mui/material';
import Head from 'next/head';



export default function IlacKategori() {
  const containerRef = useRef(null);
  const [medications, setMedications] = useState([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const searchParams = useSearchParams(); // Get query parameters
  const [activeCategoryCombined,setActiveCategoryCombined] = useState ({name:"",slug:searchParams.get("tab")})
  const [activeAltCategoryCombined,setActiveAltCategoryCombined] = useState ({name:"",slug:searchParams.get("kategori")})
  const router = useRouter();
  const [loading, setLoading] = useState(true); // New state for loading categories
  const [medicationsLoading, setMedicationsLoading] = useState(false); // New state for loading medications
  const [loadingCategory, setLoadingCategory] = useState(true);
  const page = parseInt(searchParams.get("page")) || 1
  const [data,setData] = useState([])
  const [categoryData,setCategoryData] = useState([])

  const [totalPages, setTotalPages] = useState(1);
  const [buttonStatus,setButtonStatus] = useState(true)

  const [takviye,setTakviye] = useState([])
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTakviye, setFilteredTakviye] = useState([]);
  const containerSearchRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const [isMobileOpen,setIsMobileOpen] = useState(false)

  const inputRef = useRef(null);


  useEffect(() => {
    // Eğer container açılırsa input'a odaklan
    if (isMobileOpen) {
      inputRef.current?.focus();
    }
  }, [isMobileOpen,searchTerm])


  useEffect(() => {
    // Kullanıcı yazdıkça filtreleme
    const filtered = takviye.filter((drug) =>
      drug.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTakviye(filtered);
  }, [searchTerm, takviye]);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerSearchRef.current && !containerSearchRef.current.contains(event.target)) {
        setIsOpen(false); // Container dışında bir yere tıklanınca kapat
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);



  // Fetch categories and set loading state
  useEffect(() => {
    const fetchData = async () => {
      
      try {
        const response = await axios.get("https://api.ölçek.com/api/appname/products/product-full/");
        const res = response.data;
        setTakviye(res);

      } catch (error) {
        console.error('Error fetching categories:', error);
        router.push("/servererror");
      }
      
    };

    fetchData(); // Call the async function inside the effect
  }, []);






  // Fetch categories and set loading state
  useEffect(() => {
    const fetchData = async () => {
      // console.log("activeCategoryCombined:",activeCategoryCombined)

      try {
        const response = await axios.get("https://api.ölçek.com/api/appname/supplements/");
        const res = response.data;
        setData(res);
        if (res.length>0){
          handleActiveCategory(res);
        }else{
          setLoadingCategory(false)
          setLoading(false);
        }
        
      } catch (error) {
        console.error('Error fetching categories:', error);
        router.push("/servererror");
      }
    
    };

    fetchData(); 
  }, [searchParams]);

  const handleActiveCategory = (categories) => {
    const pathSlug = searchParams.get('tab'); // Get the 'tab' query parameter
    let activeCat = categories.find((category) => category.slug === pathSlug);

    const fullUrl = `${window.location.pathname}${window.location.search}`;

    if(!activeCat && fullUrl==="/besintakviyeleri"){
      activeCat = categories[0]
    }else if (!activeCat){
      router.push('/404');
      return;
    }

    setActiveCategoryCombined({ name: activeCat.name, slug: activeCat.slug });
    fetchAltKategori(activeCat.id,categories)
    
  };

    const fetchAltKategori = async (id,categories) => {
      setLoadingCategory(true)
      try {
        const response = await axios.get(`https://api.ölçek.com/api/appname/productcategory/list-categories-by-supplement/?supplement_id=${id}`);
        const res = response.data;
        // console.log(res)
        
        
        const pathSlug = searchParams.get('kategori'); // Get the 'tab' query parameter
        let activeCat = res.find((category) => category.slug === pathSlug);

        const kategoriUrl = categories.map(categori => "/besintakviyeleri?tab="+categori.slug)

        const fullUrl = `${window.location.pathname}${window.location.search}`;
        const durum = kategoriUrl.includes(fullUrl);
     

        if(!activeCat && (durum || fullUrl==="/besintakviyeleri" ) ){
          activeCat = res[0]
        }else if (!activeCat){
          router.push('/404');
          return;
        }

        setCategoryData(res);

        setActiveAltCategoryCombined({ name: activeCat.name, slug: activeCat.slug });

        const page = parseInt(searchParams.get("page")) || 1

        fetchMedications(activeCat.id,page);


      }catch(error) {
        console.error('Error fetching :', error);
      }finally{
        setLoadingCategory(false)
        setLoading(false);
      }
    }
  

    const fetchMedications = async (id,page) => {
      setMedicationsLoading(true); // Set medications loading state to true
      try {

        const response = await axios.get(
          `https://api.ölçek.com/api/appname/products/list-products-by-category/?product_category_id=${id}&page=${page}`
        );
        // console.log(response.data.results)

        setTotalPages(Math.ceil(response.data.count / 20));
        setMedications(response.data.results);
      } catch (error) {
        console.error('Error fetching medications:', error);
        if (error.response && error.response.data.detail === "Invalid page.") {
          router.push('/404');
        }else{
          router.push("/servererror");
        }
      } finally {
        setMedicationsLoading(false); // Set medications loading state to false
      }
    };
    



    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
      }
    };
  
  
    const smoothScroll = (start, end, duration) => {
      const change = end - start;
      const startTime = performance.now();
    
      const animateScroll = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1); // 0 ile 1 arasında bir değer
        const easeInOutQuad = progress < 0.5 
          ? 2 * progress * progress 
          : -1 + (4 - 2 * progress) * progress; // Yumuşak animasyon eğrisi
    
        const scrollValue = start + change * easeInOutQuad;
        containerRef.current.scrollLeft = scrollValue;
    
        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      };
    
      requestAnimationFrame(animateScroll);
    };
    
  
    const handleScrollLeft = () => {
      if (containerRef.current) {
        const { scrollLeft, clientWidth } = containerRef.current;
        const scrollAmount = clientWidth * 0.8;
        const targetScroll = Math.max(scrollLeft - scrollAmount, 0);
    
        smoothScroll(scrollLeft, targetScroll, 500); // 500ms'lik animasyon
      }
    };
    
    const handleScrollRight = () => {
      if (containerRef.current) {
        const { scrollLeft, clientWidth, scrollWidth } = containerRef.current;
        const scrollAmount = clientWidth * 0.8;
        const maxScrollLeft = scrollWidth - clientWidth;
        const targetScroll = Math.min(scrollLeft + scrollAmount, maxScrollLeft);
    
        smoothScroll(scrollLeft, targetScroll, 500); // 500ms'lik animasyon
      }
    };


    
  const handleCategoryClick = (category) => {
    setActiveCategoryCombined({name:category.name,slug:category.slug})
  
    const container = containerRef.current;
    const categoryElement = document.getElementById(`category-${category.slug}`);
    const leftButton = document.querySelector(`.${styles.scrollButtonLeft}`);
    const rightButton = document.querySelector(`.${styles.scrollButtonRight}`);
  
    if (container && categoryElement) {
      const containerRect = container.getBoundingClientRect();
      const categoryRect = categoryElement.getBoundingClientRect();
  
      // Buton genişliklerini al
      const leftButtonWidth = leftButton ? leftButton.getBoundingClientRect().width : 0;
      const rightButtonWidth = rightButton ? rightButton.getBoundingClientRect().width : 0;
  
      if (
        categoryRect.left >= containerRect.left &&
        categoryRect.right <= containerRect.right
      ) {
        return; // Zaten görünüyorsa, kaydırmaya gerek yok
      }
  
      const spacing = 32; // Ek boşluk
      let scrollAmount;
  
      if (categoryRect.left < containerRect.left) {
        // Sol tarafa kaydır
        scrollAmount = categoryRect.left - containerRect.left - spacing - leftButtonWidth;
      } else {
        // Sağ tarafa kaydır
        scrollAmount = categoryRect.right - containerRect.right + spacing + rightButtonWidth;
      }
  
      // Mevcut pozisyon ve hedef pozisyon
      const start = container.scrollLeft;
      const targetScroll = start + scrollAmount;
  
      // Animasyonu uygula
      smoothScroll(start, targetScroll, 500); // 500ms'lik animasyon
    }
  };



  useEffect(()=>{

    if(activeCategoryCombined.name){
      const category=activeCategoryCombined

      const container = containerRef.current;
      const categoryElement = document.getElementById(`category-${category.slug}`);
      const leftButton = document.querySelector(`.${styles.scrollButtonLeft}`);
      const rightButton = document.querySelector(`.${styles.scrollButtonRight}`);
    
      if (container && categoryElement) {
        const containerRect = container.getBoundingClientRect();
        const categoryRect = categoryElement.getBoundingClientRect();
    
        // Buton genişliklerini al
        const leftButtonWidth = leftButton ? leftButton.getBoundingClientRect().width : 0;
        const rightButtonWidth = rightButton ? rightButton.getBoundingClientRect().width : 0;
    
        if (
          categoryRect.left >= containerRect.left &&
          categoryRect.right <= containerRect.right
        ) {
          return; // Zaten görünüyorsa, kaydırmaya gerek yok
        }
    
        const spacing = 32; // Ek boşluk
        let scrollAmount;
    
        if (categoryRect.left < containerRect.left) {
          // Sol tarafa kaydır
          scrollAmount = categoryRect.left - containerRect.left - spacing - leftButtonWidth;
        } else {
          // Sağ tarafa kaydır
          scrollAmount = categoryRect.right - containerRect.right + spacing + rightButtonWidth;
        }
    
        // Mevcut pozisyon ve hedef pozisyon
        const start = container.scrollLeft;
        const targetScroll = start + scrollAmount;
    
        // Animasyonu uygula
        smoothScroll(start, targetScroll, 500); // 500ms'lik animasyon
      }

    }

  },[containerRef.current])


  useEffect(()=>{

    const calculateTotalWidth = () => {
      if (containerRef.current) {
        const {clientWidth } = containerRef.current;
        // console.log("clientWidth:",clientWidth+29)
        const categories = containerRef.current.children; // Container'ın altındaki tüm elemanlar
        const total = Array.from(categories).reduce((acc, category) => {
            return acc + category.offsetWidth; // Her bir elemanın genişliğini topla
        }, 0);
        // console.log("total:",total)

        const spacing = (categories.length - 1) * 16;
        // console.log("spacing:",spacing)
        const adjustedTotal = total + spacing;

        // console.log("total (adjusted):", adjustedTotal);

        // Buton durumunu belirle
        setButtonStatus(adjustedTotal > clientWidth+29);
      
      }

    }

    calculateTotalWidth(); // İlk render'da genişliği hesapla

    // Ekran boyutu değişirse genişliği yeniden hesapla
    window.addEventListener("resize", calculateTotalWidth);
    return () => {
      window.removeEventListener("resize", calculateTotalWidth);
    };


  },[containerRef.current])
  

  return (
    <>

      <Head>
        <title>{`${activeAltCategoryCombined.name} Kategorisine Ait Besin Takviyeleri`}</title>
        <meta
          name="description"
          content={`Bu sayfada ${activeAltCategoryCombined.name} kategorisindeki besin takviyeleri listelenmiştir. Ürünlerin kullanım şekillerini öğrenmek için tıklayın.`}
        />
      </Head>


      {loading ? (
        <div className={styles.loadingOverlay}>
          <CircularProgress sx={{ color: 'rgb(29,29,31)' }} />
        </div>
      ):(

      <div className={styles.drugContainer}>

      <div className={styles.firstContainer}>
        <div className={styles.mapContainer}>
          <Link href="/">
            <div className={styles.mapText}>Ana Sayfa</div>
          </Link>
          <span className={styles.icon}>/</span>
          <Link href="/besintakviyeleri">
            <div className={styles.mapText}>Besin Takviyeleri</div>
          </Link>
          <span className={styles.icon}>/</span>
          <Link href={`/besintakviyeleri?tab=${activeCategoryCombined.slug}`}>
            <div className={styles.mapText }>{activeCategoryCombined.name}</div>
          </Link>
          <span className={styles.icon}>/</span>
          <h1 className={`${styles.mapText} ${styles.activeText}`}>{activeAltCategoryCombined.name}</h1>
        </div>
        <div className={styles.searchContainer}>
          <button className={styles.searchButton}>
            <FaSearch />
          </button>
          <input
            type="text"
            placeholder="Arama"
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsOpen(true); // Yazmaya başladığında container'ı aç
              setIsMobileOpen(true); 
            }}
          />
        </div>
      </div>

      {/* Sonuç Container */}
      {isOpen && searchTerm && (
          <div className={styles.resultsContainer} ref={containerSearchRef}>
            {filteredTakviye.length > 0 ? (
              filteredTakviye.map((drug) => (
                <Link href={`besintakviyeleri/${drug.product_category.supplement.slug}/${drug.product_category.slug}/${drug.slug}`} key={drug.id}>
                  <div key={drug.id} className={styles.resultItem}>
                    {drug.name}
                    <FaChevronRight className={styles.resulItemIcon} />
                  </div>
                </Link>
              ))
            ) : (
              <div className={styles.noResult}>Sonuç bulunamadı</div>
            )}
          </div>
        )}


        {/* Sonuç Container Mobile */}
        {isMobileOpen && searchTerm && (
          <div className={styles.resultsContainerMobile}>
            {/* Geri Butonu */}
            <div className={styles.backContainer}>
              <FaChevronLeft 
                className={styles.backIcon} 
                onClick={() => {
                  setIsMobileOpen(false);
                  setSearchTerm("");
                }} 
              />
            </div>

            {/* Arama Alanı */}
            <div className={styles.searchContainerMobile}>
              <button
                className={styles.searchButton}
              >
                <FaSearch />
              </button>
              <input
                type="text"
                placeholder="Arama"
                className={styles.searchInput}
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setIsMobileOpen(true); 
                }}
                ref={inputRef}
              />
            </div>

            {/* Sonuç Listesi */}
            {filteredTakviye.length > 0 ? (
              filteredTakviye.map((drug) => (
                <Link href={`besintakviyeleri/${drug.product_category.supplement.slug}/${drug.product_category.slug}/${drug.slug}`} key={drug.id}>
                  <div className={styles.resultItemMobile}>
                    {drug.name}
                    <FaChevronRight className={styles.resulItemIconMobile} />
                  </div>
                </Link>
              ))
            ) : (
              <div className={styles.noResult}>Sonuç bulunamadı</div>
            )}
          </div>
        )}

      <div className={styles.pageContainer}>
        <div className={styles.pageLeftContainer}>
          <div className={styles.pageLeftAdvert}>
            reklam alanıdır
          </div>
        </div>

        <div className={styles.pageCenterContainer}>

          <div className={styles.categoryContainer}>
              <div className={styles.scrollContainer} ref={containerRef} onScroll={handleScroll}>
                {data.map((category) => (
                  <Link
                    key={category.id} // Add the key here for the Link component
                    href={`/besintakviyeleri?tab=${category.slug}`}
                    passHref
                    onClick={() => handleCategoryClick(category)}
                  >
                    <div
                      id={`category-${category.slug}`}
                      className={
                        activeCategoryCombined.name === category.name
                          ? styles.ItemActiveContainer
                          : styles.ItemContainer
                      }
                    >
                      {category.name}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            {buttonStatus && (
              <div className={styles.directionContainer}>
                
                  <button
                    className={`${styles.buttonLeft} ${!canScrollLeft ? styles.disabled : ''}`}
                    onClick={canScrollLeft ? handleScrollLeft : undefined}
                    disabled={!canScrollLeft}
                  >
                    <FaChevronLeft className={styles.directionIcon} />
                  </button>
              

                  <button
                    className={`${styles.buttonRight} ${!canScrollRight ? styles.disabled : ''}`}
                    onClick={canScrollRight ? handleScrollRight : undefined}
                    disabled={!canScrollRight}
                  >
                    <FaChevronRight className={styles.directionIcon}/>
                  </button>
              </div>
            )}
              

          
          <div className={styles.altCategoryContainer}>
            <div className={styles.altCategoryText}>{activeCategoryCombined.name} İçin Alt Kategori</div>
            <div className={styles.altCategory}>
              {categoryData.map((category) => (
                <Link
                  key={category.id} // Add the key here for the Link component
                  href={`/besintakviyeleri?tab=${activeCategoryCombined.slug}&kategori=${category.slug}&page=1`}
                >
                  <div className={activeAltCategoryCombined.name === category.name ? styles.activealtCategoryButton : styles.altCategoryButton} >
                    {category.name}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {medicationsLoading ? (
              <div className={styles.contextContainerAlternative}>
                  <CircularProgress sx={{ color: 'rgb(29,29,31)' }} />
              </div>
            ) : (
              <>
                <div className={styles.medicationContainer}>
                  {medications.map((medication) => (
                    <div key={medication.id} className={styles.contextContainer}>
                      <h2>{medication.name}</h2>
                      <div className={styles.contextArticle}>
                      <h3>
                        <FaCalculator className={styles.iconContext} />
                        <Link href={`/besintakviyeleri/${activeCategoryCombined.slug}/${activeAltCategoryCombined.slug}/${medication.slug}/kullanim-sekli`}>
                          {medication.name} nasıl kullanılır? Doğru kullanım şekli rehberi.
                        </Link>

                      </h3>
                      {/* Nedir ve Ne İçin Kullanılır kısmı */}
                      <h3>
                        <FaInfoCircle className={styles.iconContext} />
                        <Link href={`/besintakviyeleri/${activeCategoryCombined.slug}/${activeAltCategoryCombined.slug}/${medication.slug}/nedir-ne-icin-kullanilir`}>
                          {medication.name} hakkında bilgi: Nedir? {medication.ne_icin_kullanilir && medication.ne_icin_kullanilir.toLowerCase() !== 'nan' 
                            ? `Ne için kullanılır / sağlık beyanı açıklaması.`
                            : ``}
                        </Link>
                      </h3>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
        </div>
        <div className={styles.pageRightContainer}>
          <div className={styles.pageRightAdvert}>
            reklam alanıdır
          </div>
        </div>
      </div>

      {medications.length > 0 && (
        <div
          style={{
            marginTop: '2rem',
            marginBottom: '2rem',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Pagination
            count={totalPages} // Toplam sayfa sayısı
            page={page} // Geçerli sayfa
            color="primary"
            sx={{
              '.MuiPaginationItem-root': {
                fontSize: '1rem',
                fontWeight: 500,
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                backgroundColor: '#d6d6d6', // Aktif olmayan buton arka plan rengi (biraz daha koyu)
                color: '#333', // Yazı rengi
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#bdbdbd', // Hover sırasında biraz daha koyu bir gri
                },
              },
              '.Mui-selected': {
                backgroundColor: 'rgb(29, 29, 31) !important', // Aktif sayfa arka plan rengi
                color: '#fff', // Aktif sayfa yazı rengi
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: 'rgb(29, 29, 31) !important', // Hover sırasında aynı renk
                  boxShadow: '0px 6px 8px rgba(0, 0, 0, 0.3)',
                },
              },
            }}
            renderItem={(item) => (
              <Link
                href={`/besintakviyeleri?tab=${activeCategoryCombined.slug}&kategori=${activeAltCategoryCombined.slug}&page=${item.page}`}
                passHref
              >
                  <PaginationItem {...item} />
              </Link>
            )}
          />
        </div>
      )}


      </div>
    )}
    </>
  );
}

