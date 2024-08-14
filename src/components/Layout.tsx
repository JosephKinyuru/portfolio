import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from '../styles';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import Loader from "./Loader";
import NavBar from "./NavBar";
import Head from './Head';
import Footer from './footer/Footer';

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const location = useLocation();
  const isHome = location.pathname === '/';
  const [isLoading, setIsLoading] = useState(isHome);

  const handleExternalLinks = () => {
    const allLinks = Array.from(document.querySelectorAll('a'));
    if (allLinks.length > 0) {
      allLinks.forEach(link => {
        if (link.host !== window.location.host) {
          link.setAttribute('rel', 'noopener noreferrer');
          link.setAttribute('target', '_blank');
        }
      });
    }
  };

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (location.hash) {
      const id = location.hash.substring(1); // location.hash without the '#'
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView();
          el.focus();
        }
      }, 0);
    }

    handleExternalLinks();
  }, [isLoading, location.hash]);

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      const flashlight = document.querySelector('.flashlight') as HTMLElement | null;
      if (flashlight) {
        flashlight.style.setProperty('--x', e.clientX + 'px');
        flashlight.style.setProperty('--y', e.clientY + 'px');
      }
    };

    document.addEventListener('mousemove', updateCursorPosition);

    return () => {
      document.removeEventListener('mousemove', updateCursorPosition);
    };
  }, []);

  return (
    <html lang="en">
      <Head />
      <body>
        <ThemeProvider theme={theme} >
          <GlobalStyle/>

          <a className="skip-to-content" href="#content">
            Skip to Content
          </a>

          {isLoading && isHome ? (
            <Loader finishLoading={() => setIsLoading(false)} />
          ) : (
            <StyledContent>
              <NavBar isHome={isHome} />
            
              <div id="content">
                {children}
              </div>
              <Footer/>
            </StyledContent>
          )}
        </ThemeProvider>
        <div className="flashlight"/>
      </body>
    </html>
  );
}
