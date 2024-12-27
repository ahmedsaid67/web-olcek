'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes, FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import useWindowSize from './useWindowSize';
import axios from 'axios';
import styles from '../styles/navbar.module.css';
import { usePathname, useRouter } from 'next/navigation';

const Navbar = () => {
    const [width, height] = useWindowSize();
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null);
    const [isMobileState, setIsMobileState] = useState(null);
    const [ilaclar, setIlaclar] = useState([]);
    const [supplements, setSupplements] = useState([]);
    const [error, setError] = useState(null); // Track endpoint errors
    const router = useRouter(); // Access Next.js router
    const pathname = usePathname();

    useEffect(() => {
        if (width <= 1024) {
            setIsMobileState(true);
        } else {
            setIsMobileState(false);
        }
    }, [width]);

    // Fetch data from API endpoints
    const fetchData = async () => {
        try {
            const [ilaclarData, supplementsData] = await Promise.all([
                axios.get('https://api.ölçek.com/api/appname/form/'),
                axios.get('https://api.ölçek.com/api/appname/supplements/')
            ]);
            setIlaclar(ilaclarData.data);
            setSupplements(supplementsData.data);
        } catch (error) {
            setError(true);
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    const handleMenuClick = (menu) => {
        if (activeMenu === menu) {
            setActiveMenu(null); // Close menu
        } else {
            setActiveMenu(menu); // Open selected menu
        }
    };


    if (isMobileState === null) {
        return null; // State belirlenene kadar hiçbir şey render etmeyin
    }

    if (error) {
        router.push('/servererror'); // Redirect to error page if there is an error
        return null;
    }

    const hideLayout = pathname.includes('kullanim-talimati');

    if (hideLayout) return null;

    return (
        <div className={styles.navbarContainer}>
            <Link href="/" onClick={() => setMenuOpen(false)}><div className={styles.logoContainer}>Ölçek</div></Link>

            {isMobileState && !menuOpen && (
                <div className={styles.hamburgerContainer} onClick={toggleMenu}>
                    <FaBars />
                </div>
            )}

            {isMobileState && menuOpen && (
                <div className={styles.mobileMenuOverlay}>
                    <div className={styles.mobileMenuContent}>
                        <div className={styles.closeIconContainer}>
                            {activeMenu === null ? (
                                <>
                                    <Link href="/" onClick={() => setMenuOpen(false)}><div className={styles.logoContainer}>Ölçek</div></Link>
                                    <div className={styles.hamburgerContainer} onClick={toggleMenu}>
                                        <FaTimes />
                                    </div>
                                </>
                            ) : (
                                <div
                                    className={styles.hamburgerContainer}
                                    onClick={() => setActiveMenu(null)}
                                >
                                    <FaChevronLeft />
                                </div>
                            )}
                        </div>
                        <div style={{ margin: '0.5rem 10%' }}>
                            {/* Main Menu */}
                            {activeMenu === null && (
                                <>
                                    <Link href='/' onClick={() => setMenuOpen(false)}>
                                        <p>Ana Sayfa</p>
                                    </Link>
                                    <p onClick={() => handleMenuClick('ilaclar')}>
                                        İlaçlar <FaChevronRight />
                                    </p>
                                    <p onClick={() => handleMenuClick('besin')}>
                                        Besin Takviyeleri <FaChevronRight />
                                    </p>
                                    <Link href='/hakkimizda' onClick={() => setMenuOpen(false)}>
                                        <p>Hakkımızda</p>
                                    </Link>
                                    <Link href='/iletisim' onClick={() => setMenuOpen(false)}>
                                        <p>İletişim</p>
                                    </Link>
                                    <Link href='/indir' onClick={() => setMenuOpen(false)}>
                                        <p>İndir</p>
                                    </Link>
                                </>
                            )}
                            {/* "İlaçlar" Sub Menu */}
                            {activeMenu === 'ilaclar' &&
                                ilaclar
                                    .sort((a, b) => (a.order || 0) - (b.order || 0))
                                    .map((item) => (
                                        <Link
                                            href={`/ilaclar?tab=${item.slug}`}
                                            key={item.id}
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            <p>{item.name}</p>
                                        </Link>
                                    ))}
                            {/* "Besin Takviyeleri" Sub Menu */}
                            {activeMenu === 'besin' &&
                                supplements
                                    .sort((a, b) => (a.order || 0) - (b.order || 0))
                                    .map((item) => (
                                        <Link
                                            href={`/besintakviyeleri?tab=${item.slug}`}
                                            key={item.id}
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            <p>{item.name}</p>
                                        </Link>
                                    ))}
                        </div>
                    </div>
                </div>
            )}

            {!isMobileState && (
                <div className={styles.itemContainer}>
                    <div>
                        <Link href='/'><p>Ana Sayfa</p></Link>
                    </div>
                    <div className={styles.menuItem}>
                        <Link href={`/ilaclar`}><p>İlaçlar</p></Link>
                        <div className={styles.dropdown}>
                            {ilaclar
                                .sort((a, b) => (a.order || 0) - (b.order || 0))
                                .map((item) => (
                                    <Link href={`/ilaclar?tab=${item.slug}`} key={item.id}>
                                        <p>{item.name}</p>
                                    </Link>
                                ))}
                        </div>
                    </div>
                    <div className={styles.menuItem}>
                        <Link href={`/besintakviyeleri`}><p>Besin Takviyeleri</p></Link>
                        <div className={styles.dropdown}>
                            {supplements
                                .sort((a, b) => (a.order || 0) - (b.order || 0))
                                .map((item) => (
                                    <Link href={`/besintakviyeleri?tab=${item.slug}`} key={item.id}>
                                        <p>{item.name}</p>
                                    </Link>
                                ))}
                        </div>
                    </div>
                    <div>
                        <Link href='/hakkimizda'><p>Hakkımızda</p></Link>
                    </div>
                    <div>
                        <Link href='/iletisim'><p>İletişim</p></Link>
                    </div>
                    <div>
                        <Link href='/indir'><p>İndir</p></Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;



