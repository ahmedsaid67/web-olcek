import './globals.css';
import Navbar from '../../compenents/Navbar'; // Navbar bileşenini içe aktar
import Foother from '../../compenents/Foother'; // Foother bileşenini içe aktar


export const metadata = {
  icons: {
    icon: '/olcek.png', // Favicon olarak .png dosyasını ekliyoruz
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navbar />
          <main style={{ flex: '1' }}>
            {children}
          </main>
          <Foother />
        </div>
      </body>
    </html>
  );
}
