import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { sr } from '../../lib/utils';
import { srConfig } from '../../config';
import { usePrefersReducedMotion } from '../../hooks';
import  Icon from '../icons/icons';


const StyledProjectsGrid = styled.ul`
  ${({ theme }) => theme.mixins.resetList};

  a {
    position: relative;
    z-index: 1;
  }
`;

const StyledProject = styled.li`
  position: relative;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(12, 1fr);
  align-items: center;

  @media (max-width: 768px) {
    ${({ theme }) => theme.mixins.boxShadow};
  }

  &:not(:last-of-type) {
    margin-bottom: 100px;

    @media (max-width: 768px) {
      margin-bottom: 70px;
    }

    @media (max-width: 480px) {
      margin-bottom: 30px;
    }
  }

  &:nth-of-type(odd) {
    .project-content {
      grid-column: 7 / -1;
      text-align: right;

      @media (max-width: 1080px) {
        grid-column: 5 / -1;
      }
      @media (max-width: 768px) {
        grid-column: 1 / -1;
        padding: 40px 40px 30px;
        text-align: left;
      }
      @media (max-width: 480px) {
        padding: 25px 25px 20px;
      }
    }
    .project-tech-list {
      justify-content: flex-end;

      @media (max-width: 768px) {
        justify-content: flex-start;
      }

      li {
        margin: 0 0 5px 20px;

        @media (max-width: 768px) {
          margin: 0 10px 5px 0;
        }
      }
    }
    .project-links {
      justify-content: flex-end;
      margin-left: 0;
      margin-right: -10px;

      @media (max-width: 768px) {
        justify-content: flex-start;
        margin-left: -10px;
        margin-right: 0;
      }
    }
    .project-image {
      grid-column: 1 / 8;

      @media (max-width: 768px) {
        grid-column: 1 / -1;
      }
    }
  }

  .project-content {
    position: relative;
    grid-column: 1 / 7;
    grid-row: 1 / -1;

    @media (max-width: 1080px) {
      grid-column: 1 / 9;
    }

    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      grid-column: 1 / -1;
      padding: 40px 40px 30px;
      z-index: 5;
    }

    @media (max-width: 480px) {
      padding: 30px 25px 20px;
    }
  }

  .project-overline {
    margin: 10px 0;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    font-weight: 400;
  }

  .project-title {
    color: var(--lightest-slate);
    font-size: clamp(24px, 5vw, 28px);

    @media (min-width: 768px) {
      margin: 0 0 20px;
    }

    @media (max-width: 768px) {
      color: var(--white);

      a {
        position: static;

        &:before {
          content: '';
          display: block;
          position: absolute;
          z-index: 0;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }
      }
    }
  }

  .project-description {
    ${({ theme }) => theme.mixins.boxShadow};
    position: relative;
    z-index: 2;
    padding: 25px;
    border-radius: var(--border-radius);
    background-color: var(--light-navy);
    color: var(--light-slate);
    font-size: var(--fz-lg);

    @media (max-width: 768px) {
      padding: 20px 0;
      background-color: transparent;
      box-shadow: none;

      &:hover {
        box-shadow: none;
      }
    }

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }

    strong {
      color: var(--white);
      font-weight: normal;
    }
  }

  .project-tech-list {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    z-index: 2;
    margin: 25px 0 10px;
    padding: 0;
    list-style: none;

    li {
      margin: 0 20px 5px 0;
      color: var(--light-slate);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      white-space: nowrap;
    }

    @media (max-width: 768px) {
      margin: 10px 0;

      li {
        margin: 0 10px 5px 0;
        color: var(--lightest-slate);
      }
    }
  }

  .project-links {
    display: flex;
    align-items: center;
    position: relative;
    margin-top: 10px;
    margin-left: -10px;
    color: var(--lightest-slate);

    a {
      ${({ theme }) => theme.mixins.flexCenter};
      padding: 10px;

      &.external {
        svg {
          width: 22px;
          height: 22px;
          margin-top: -4px;
        }
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }

    .cta {
      ${({ theme }) => theme.mixins.smallButton};
      margin: 10px;
    }
  }

  .project-image {
    ${({ theme }) => theme.mixins.boxShadow};
    grid-column: 6 / -1;
    grid-row: 1 / -1;
    position: relative;
    z-index: 1;

    @media (max-width: 768px) {
      grid-column: 1 / -1;
      height: 100%;
      opacity: 0.25;
    }

    a {
      width: 100%;
      height: 100%;
      background-color: var(--green);
      border-radius: var(--border-radius);
      vertical-align: middle;

      &:hover,
      &:focus {
        background: transparent;
        outline: 0;

        &:before,
        .img {
          background: transparent;
          filter: none;
        }
      }

      &:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 3;
        transition: var(--transition);
        background-color: var(--navy);
        mix-blend-mode: screen;
      }
    }

    .img {
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1) brightness(90%);

      @media (max-width: 768px) {
        object-fit: cover;
        width: auto;
        height: 100%;
        filter: grayscale(100%) contrast(1) brightness(50%);
      }
    }
  }
`;

interface Project {
    date: string;
    title: string;
    cover: string;
    github: string;
    external: string;
    tech: string[];
    html: string;
  }
  
const data: Project[] = [
  {
    date: '27-05-2024',
    title: 'CaseFiti',
    cover: "/assets/casefiti.png",
    github: 'https://github.com/JosephKinyuru/casefiti',
    external: 'https://casefiti.vercel.app',
    tech: ['Next.JS', 'Uploadthing', 'Typescript', 'Tailwindcss', 'Stripe'],
    html: 'CaseFiti enables you to create custom high-quality phone cases in seconds from your very own photos.',
  },
  {
    date: '01-07-2024',
    title: 'SribePDF',
    cover: "/assets/scribepdf.png",
    github: 'https://github.com/JosephKinyuru/scribepdf',
    external: 'https://scribepdf.vercel.app/',
    tech: ['NextJS', 'Pinecone', 'Langchain', 'OpenAI'],
    html: 'ScribePDF is open-source software to make chatting with your PDF files easy. You can open any PDF resource and trace data within it in seconds.',
  },
  {
    date: '01-08-2024',
    title: 'Light Landing Page',
    cover: "/assets/light-landing-page.png",
    github: 'https://github.com/JosephKinyuru/light-landing-page',
    external: 'https://light-landing-page.vercel.app/',
    tech: ['NextJS', 'Framer-motion', 'Sass'],
    html: 'A minimalistic landing page designed to showcase my proficiency in web technologies through a clean and functional design.'
  },
  {
    date: '23-07-2024',
    title: 'Dark Landing Page',
    cover: "/assets/dark-landing-page.png",
    github: 'https://github.com/JosephKinyuru/dark-landing-page',
    external: 'https://dark-landing-page-rouge.vercel.app/',
    tech: ['NextJS', 'Framer-motion', '3D', 'Acceternity'],
    html: 'A minimalistic landing page designed to showcase my proficiency in web technologies through a clean and functional design.'
  }
];  

const Featured = () => {

    const revealTitle = useRef<HTMLHeadingElement>(null);
    const revealProjects = useRef<HTMLDivElement[]>([]);
    const prefersReducedMotion = usePrefersReducedMotion();
  
    useEffect(() => {
      if (prefersReducedMotion) {
        return;
      }
  
      if (revealTitle.current) {
        sr!.reveal(revealTitle.current, srConfig());
      }
      revealProjects.current.forEach((ref, i) => {
        if (ref) sr!.reveal(ref, srConfig(i * 100));
      });
    }, [prefersReducedMotion]);
  
    return (
      <section id="projects">
        <h2 className="numbered-heading" ref={revealTitle}>
          Some Things I’ve Built
        </h2>
  
        <StyledProjectsGrid>
          {data.map((project, i) => {
            const { external, title, tech, github, cover, html } = project;
  
            return (
              <StyledProject key={i} ref={el => (revealProjects.current[i] = el as unknown as HTMLDivElement)}>
                <div className="project-content">
                  <div>
                    <p className="project-overline">Featured Project</p>
                    <h3 className="project-title">
                      <a href={external}>{title}</a>
                    </h3>
                    <div className="project-description" dangerouslySetInnerHTML={{ __html: html }} />
                    {tech.length > 0 && (
                      <ul className="project-tech-list">
                        {tech.map((techItem, i) => (
                          <li key={i}>{techItem}</li>
                        ))}
                      </ul>
                    )}
                    <div className="project-links">
                      {github && (
                        <a href={github} aria-label="GitHub Link">
                          <Icon name="GitHub" />
                        </a>
                      )}
                      {external && (
                        <a href={external} aria-label="External Link" className="external">
                          <Icon name="External" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="project-image">
                  <a href={external ? external : github ? github : '#'}>
                    <img src={cover} alt={title} className="img" />
                  </a>
                </div>
              </StyledProject>
            );
          })}
        </StyledProjectsGrid>
      </section>
    );
  };

export default Featured;