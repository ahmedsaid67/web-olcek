import axios from 'axios';

const fetchCategories = async () => {
  try {
    const response = await axios.get("https://api.ölçek.com/api/appname/form/");
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

const fetchProducts = async () => {
  try {
    const response = await axios.get("https://api.ölçek.com/api/appname/ilac/ilac-arama/");
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};


const fetchCategoriesTakviye = async () => {
  try {
    const response = await axios.get("https://api.ölçek.com/api/appname/supplements/");
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

const fetchProductsTakviye = async () => {
  try {
    const response = await axios.get("https://api.ölçek.com/api/appname/products/product-full/");
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export async function GET() {
  try {
    const categories = await fetchCategories();
    const products = await fetchProducts();

    const categoriesTakviye = await fetchCategoriesTakviye();
    const productsTakviye = await fetchProductsTakviye();

    const staticPages = [
      { url: 'https://olcekapp.com.', lastmod: new Date().toISOString(), changefreq: 'daily', priority: 1.0 },
      { url: 'https://olcekapp.com/ilaclar', lastmod: new Date().toISOString(), changefreq: 'daily', priority: 0.8 },
      { url: 'https://olcekapp.com/besintakviyeleri', lastmod: new Date().toISOString(), changefreq: 'monthly', priority: 0.6 },
      { url: 'https://olcekapp.com/indir', lastmod: new Date().toISOString(), changefreq: 'yearly', priority: 0.4 },
      { url: 'https://olcekapp.com/hakkimizda', lastmod: new Date().toISOString(), changefreq: 'yearly', priority: 0.4 },
      { url: 'https://olcekapp.com/iletisim', lastmod: new Date().toISOString(), changefreq: 'yearly', priority: 0.4 },
    ];

    const dynamicPages = categories.map(category => ({
      url: `https://olcekapp.com/ilaclar?tab=${category.slug}`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.7,
    }));

    const productPages = products.map(product => ({
      url: `https://olcekapp.com/ilaclar/${product.ilac_form.slug}/${product.slug}`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.7,
    }));

    const productKullanimTalimati = products.map(product => ({
      url: `https://olcekapp.com/ilaclar/${product.ilac_form.slug}/${product.slug}/kullanim-talimati`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.7,
    }));

    const productNedir = products.map(product => ({
      url: `https://olcekapp.com/ilaclar/${product.ilac_form.slug}/${product.slug}/nedir-ne-icin-kullanilir`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.7,
    }));

    const productHesapla = products.map(product => ({
      url: `https://olcekapp.com/ilaclar/${product.ilac_form.slug}/${product.slug}/doz-hesaplama`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.7,
    }));


    const dynamicPagesTakviye = categoriesTakviye.map(category => ({
      url: `https://olcekapp.com/besintakviyeleri?tab=${category.slug}`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.7,
    }));

    const productPagesTakviye = productsTakviye.map(product => ({
      url: `https://olcekapp.com/besintakviyeleri/${product.product_category.supplement.slug}/${product.product_category.slug}/${product.slug}`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.7,
    }));


    const productPagesTakviyeKullanimSekli = productsTakviye.map(product => ({
      url: `https://olcekapp.com/besintakviyeleri/${product.product_category.supplement.slug}/${product.product_category.slug}/${product.slug}/kullanim-sekli`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.7,
    }));

    const sitemapPages = [
      ...staticPages,
      ...dynamicPages,
      ...productPages,
      ...productKullanimTalimati,
      ...productNedir,
      ...productHesapla,
      ...dynamicPagesTakviye,
      ...productPagesTakviye,
      ...productPagesTakviyeKullanimSekli
    ];

    const sitemapXml = `
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${sitemapPages
          .map(page => `
            <url>
              <loc>${page.url}</loc>
              <lastmod>${page.lastmod}</lastmod>
              <changefreq>${page.changefreq}</changefreq>
              <priority>${page.priority}</priority>
            </url>`).join('')}
      </urlset>
    `;

    return new Response(sitemapXml.trim(), {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new Response('Error generating sitemap.', { status: 500 });
  }
}
