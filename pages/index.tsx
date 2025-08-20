import Head from 'next/head'
import Navigation from '../components/Navigation'
import HeroSection from '../components/HeroSection'
import RechargeSection from '../components/RechargeSection'
import AmenitiesSection from '../components/AmenitiesSection'
import GallerySection from '../components/GallerySection'
import AttractionsSection from '../components/AttractionsSection'
import Footer from '../components/Footer'
import Preloader from '../components/Preloader'

export default function Home() {
  return (
    <>
      <Head>
        <title>Wild Berry Wood - Holiday Cottage in Charlevoix</title>
        <meta name="description" content="Peaceful retreat in one of Quebec's most beautiful villages. Wild Berry Wood offers breathtaking views and exceptional accommodations." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Preloader />
      
      <div id="app">
        <Navigation />
        <HeroSection />
        
        <main className="main-content">
          <RechargeSection />
          <AmenitiesSection />
          <GallerySection />
          <AttractionsSection />
        </main>
        
        <Footer />
      </div>
    </>
  )
}
