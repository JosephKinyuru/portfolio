import { FaGithub,  FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const email = 'josephkinyuru22@gmail.com';

export const socialMedia = [
  {
    name: 'GitHub',
    url: 'https://github.com/JosephKinyuru',
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/jos3ph.kinyuru/',
  },
  {
    name: 'Twitter',
    url: 'https://x.com/josephk1nyuru',
  },
  {
    name: 'Linkedin',
    url: 'https://www.linkedin.com/in/joseph-kinyuru-650bb129b/',
  },
];

export const navLinks = [
  {
    name: 'About',
    url: '/#about',
  },
  {
    name: 'Work',
    url: '/#projects',
  },
  {
    name: 'Contact',
    url: '/#contact',
  },
];

export const colors = {
  green: '#64ffda',
  navy: '#0a192f',
  darkNavy: '#020c1b',
};

export const srConfig = (delay = 200, viewFactor = 0.25) => ({
  origin: 'bottom',
  distance: '20px',
  duration: 500,
  delay,
  rotate: { x: 0, y: 0, z: 0 },
  opacity: 0,
  scale: 1,
  easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  mobile: true,
  reset: false,
  useDelay: 'always',
  viewFactor,
  viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
});


export const footerSocialMedia = [
  {
    icon: FaGithub,
    url: 'https://github.com/JosephKinyuru',
  },
  {
    icon:  FaInstagram,
    url: 'https://www.instagram.com/jos3ph.kinyuru/',
  },
  {
    icon: FaXTwitter,
    url: 'https://x.com/josephk1nyuru',
  },
  {
    icon: FaLinkedin,
    url: 'https://www.linkedin.com/in/joseph-kinyuru-650bb129b/',
  },
];