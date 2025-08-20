import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="footer" id="contact">
      {/* Decorative elements */}
      <div className="deco-element deco-01"></div>
      <div className="deco-element deco-02"></div>
      <div className="deco-element deco-03"></div>
      <div className="deco-element deco-04"></div>
      <div className="deco-element deco-05"></div>
      
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <Image 
              src="/logo1.svg" 
              alt="Wild Berry Wood" 
              className="footer-logo"
              width={120}
              height={120}
            />
          </div>
          
          <div className="footer-contact">
            <h4>C o n t a c t  u s :</h4>
            <p>H é b é r g e m e n t  C h a r l e v o i x</p>
            <a href="tel:+14184355107" className="phone-link">
              4 1 8 4 3 5 - 5 1 0 7
            </a>
            <div className="social-links">
              <span>Follow us</span>
              <a href="#" className="social-link" aria-label="instagram">
                instagram
              </a>
              <a href="#" className="social-link" aria-label="facebook">
                facebook
              </a>
            </div>
          </div>
          
          <div className="footer-booking">
            <button className="book-now-btn">Book now</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
