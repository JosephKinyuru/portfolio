import styles from './footer.module.scss';
import { navLinks } from '../../config';
import { Link } from 'react-router-dom';

function getCurrentYear() {
  return new Date().getFullYear();
}

export default function Footer() {
  const currentYear = getCurrentYear();

  return (
    <>
      <div >
        <section >
          <footer className={styles.footer}>
            <div className={styles.footerBackground}>
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x={0}
                y={0}
                width="100%"
                height="100%"
                viewBox="0 0 1600 900"
              >
                <defs>
                  <linearGradient id="bg">
                    <stop offset={0} style={{ stopColor: 'rgba(23, 207, 151, 0.3)' }} />
                    <stop offset={100} style={{ stopColor: 'rgba(23, 207, 151, 0.9)' }} />
                  </linearGradient>
                  <path
                    id="wave"
                    fill="url(#bg)"
                    d="M-363.852,502.589c0,0,236.988-41.997, 505.475,0 s371.981,38.998,575.971,0s293.985-39.278,505.474,5.859s493.475,48.368, 716.963-4.995v560.106H-363.852V502.589z"
                  />
                </defs>
                <g>
                  <use xlinkHref="#wave" opacity={0.3}>
                    <animateTransform
                      dur="10s"
                      attributeName="transform"
                      attributeType="XML"
                      type="translate"
                      calcMode="spline"
                      values="270 230; -334 180; 270 230"
                      keyTimes="0; .5; 1"
                      keySplines="0.42, 0, 0.58, 1.0;0.42,0, 0.58, 1.0"
                      repeatCount="indefinite"
                    />
                  </use>
                  <use xlinkHref="#wave" opacity={0.6}>
                    <animateTransform
                      dur="8s"
                      attributeName="transform"
                      attributeType="XML"
                      type="translate"
                      calcMode="spline"
                      values="270 230; -334 180; 270 230"
                      keyTimes="0; .5; 1"
                      keySplines="0.42, 0, 0.58, 1.0;0.42,0, 0.58, 1.0"
                      repeatCount="indefinite"
                    />
                  </use>
                  <use xlinkHref="#wave" opacity={0.9}>
                    <animateTransform
                      dur="6s"
                      attributeName="transform"
                      attributeType="XML"
                      type="translate"
                      calcMode="spline"
                      values="270 230; -334 180; 270 230"
                      keyTimes="0; .5; 1"
                      keySplines="0.42, 0, 0.58, 1.0;0.42,0, 0.58, 1.0"
                      repeatCount="indefinite"
                    />
                  </use>
                </g>
              </svg>
            </div>
            <section className={styles.footerSection}>
              <ul className={styles.socials}>
                <li>
                  <a href="https://www.instagram.com/jos3ph.kinyuru/" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/josephk1nyuru" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-x-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/joseph-kinyuru-650bb129b/" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-linkedin"></i>
                  </a>
                </li>
                <li>
                  <a href="https://github.com/JosephKinyuru" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-github"></i>
                  </a>
                </li>
              </ul>
              <ul className={styles.links}>
                {navLinks &&
                  navLinks.map(({ url, name }, i) => (
                    <li key={i}>
                      <Link to={url}>{name}</Link>
                    </li>
                  ))}
              </ul>
              <p className={styles.legal}>© {currentYear} Joseph Kinyuru</p>
              <p className={styles.designCredits}>
                Design by <a href="https://brittanychiang.com/" target="_blank" rel="noopener noreferrer">Brittany Chiang</a>
              </p>
            </section>
          </footer>
        </section>
      </div>
    </>
  );
}

