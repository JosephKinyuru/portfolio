import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { srConfig } from '../../config';
import { sr } from '../../lib/utils';
import { usePrefersReducedMotion } from '../../hooks';
import { Link } from 'react-router-dom';
import  Icon from '../icons/icons';

const StyledProjectsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-size: clamp(24px, 5vw, var(--fz-heading));
  }

  .archive-link {
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    &:after {
      bottom: 0.1em;
    }
  }

  .projects-grid {
    ${({ theme }) => theme.mixins.resetList};
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 15px;
    position: relative;
    margin-top: 50px;

    @media (max-width: 1080px) {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
  }

  .more-button {
    ${({ theme }) => theme.mixins.button};
    margin: 80px auto 0;
    display: none;                                               /* SHOW MORE BUTTON */
  }
`;


// Change display to hidden to show button

const StyledProject = styled.li`
  position: relative;
  cursor: default;
  transition: var(--transition);

  @media (prefers-reduced-motion: no-preference) {
    &:hover,
    &:focus-within {
      .project-inner {
        transform: translateY(-7px);
      }
    }
  }

  a {
    position: relative;
    z-index: 1;
  }

  .project-inner {
    ${({ theme }) => theme.mixins.boxShadow};
    ${({ theme }) => theme.mixins.flexBetween};
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    height: 100%;
    padding: 2rem 1.75rem;
    border-radius: var(--border-radius);
    background-color: var(--light-navy);
    transition: var(--transition);
    overflow: auto;
  }

  .project-top {
    ${({ theme }) => theme.mixins.flexBetween};
    margin-bottom: 35px;

    .folder {
      color: var(--green);
      svg {
        width: 40px;
        height: 40px;
      }
    }

    .project-links {
      display: flex;
      align-items: center;
      margin-right: -10px;
      color: var(--light-slate);

      a {
        ${({ theme }) => theme.mixins.flexCenter};
        padding: 5px 7px;

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
    }
  }

  .project-title {
    margin: 0 0 10px;
    color: var(--lightest-slate);
    font-size: var(--fz-xxl);

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

  .project-description {
    color: var(--light-slate);
    font-size: 17px;

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }
  }

  .project-tech-list {
    display: flex;
    align-items: flex-end;
    flex-grow: 1;
    flex-wrap: wrap;
    padding: 0;
    margin: 20px 0 0 0;
    list-style: none;

    li {
      font-family: var(--font-mono);
      font-size: var(--fz-xxs);
      line-height: 1.75;

      &:not(:last-of-type) {
        margin-right: 15px;
      }
    }
  }
`;

interface Project {
    date: string;
    title: string;
    github: string;
    external: string;
    tech: string[];
    html: string;
  }
  
const data: Project[] = [
  {
    date: '1',
    title: 'Threads',
    github: 'https://github.com/JosephKinyuru/threads2',
    external: 'https://threads2-three.vercel.app/',
    tech: ['Next.JS', 'MongoDB', 'Typescript', 'Tailwindcss'],
    html: 'Threads is a duplicate of the app threads by meta. I developed the project in order to test and develop my skills with NextJS and cloud computing with MongoDB. Feel free to check it out its works really well for a social app.',
  },
  {
    date: '2',
    title: 'Cooking confessions',
    github: 'https://github.com/JosephKinyuru/CookingConfessions',
    external: 'https://cookingconfessions.netlify.app/',
    tech: ['Javascript (vanilla)', 'Html', 'CSS3'],
    html: 'Cooking confessions has a curated data set of different recipes which are categorized into four categories. Users are able to view the available recipes after loading the site and can then click to view one full recipe in a different section and then add a comment to it. Users can also choose which category to view.',
  },
  {
    date: '3',
    title: 'Story Circle',
    github: 'https://github.com/JosephKinyuru/Story-Circle',
    external: 'https://storycircle.netlify.app/',
    tech: ['React', 'Flask', 'PostgreSQL', 'CORS'],
    html: 'Story Circle is a social platform connecting book enthusiasts, enabling them to create and join book clubs. Users can engage in discussions, explore a rich library of books, and share their insights through comments.',
  },
  {
    date: '4',
    title: 'Auto Track',
    github: 'https://github.com/barondevke/AutoTrackFinal',
    external: 'https://autotrack2.netlify.app/',
    tech: ['React', 'Public API', 'CSS3'],
    html: 'AutoTrack is a website that allows users to buy and sell cars. It allows users to select from a wide variety of cars to buy from and they can even search for a specific car or narrow down their search according to their budget. Users can also add their own car to sell on the site.'
  }
];  

const GRID_LIMIT = 6;

const Projects = () => {

  const [showMore, setShowMore] = useState(false);
  const revealTitle = useRef<HTMLHeadingElement>(null);
  const revealArchiveLink = useRef<HTMLAnchorElement>(null);
  const revealProjects = useRef<HTMLDivElement[]>([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    if (revealTitle.current) {
      sr!.reveal(revealTitle.current, srConfig());
    }

    if (revealArchiveLink.current) {
      sr!.reveal(revealArchiveLink.current, srConfig());
    }

    revealProjects.current.forEach((ref, i) => {
      if (ref) {
        sr!.reveal(ref, srConfig(i * 100));
      }
    });
  }, [prefersReducedMotion]); 

  const projectsToShow = showMore ? data : data.slice(0, GRID_LIMIT);

  const projectInner = (project: Project) => {
    const { github, external, title, tech, html } = project;

    return (
      <div className="project-inner">
        <header>
          <div className="project-top">
            <div className="folder">
              <Icon name="Folder" />
            </div>
            <div className="project-links">
              {github && (
                <a href={github} aria-label="GitHub Link" target="_blank" rel="noreferrer">
                  <Icon name="GitHub" />
                </a>
              )}
              {external && (
                <a
                  href={external}
                  aria-label="External Link"
                  className="external"
                  target="_blank"
                  rel="noreferrer">
                  <Icon name="External" />
                </a>
              )}
            </div>
          </div>

          <h3 className="project-title">
            <a href={external} target="_blank" rel="noreferrer">
              {title}
            </a>
          </h3>

          <div className="project-description" dangerouslySetInnerHTML={{ __html: html }} />
        </header>

        <footer>
          {tech.length > 0 && (
            <ul className="project-tech-list">
              {tech.map((techItem, i) => (
                <li key={i}>{techItem}</li>
              ))}
            </ul>
          )}
        </footer>
      </div>
    );
  };

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    if (revealTitle.current) {
      sr!.reveal(revealTitle.current, srConfig());
    }

    if (revealArchiveLink.current) {
      sr!.reveal(revealArchiveLink.current, srConfig());
    }

    revealProjects.current.forEach((ref, i) => {
      if (ref) {
        sr!.reveal(ref, srConfig(i * 100));
      }
    });
  }, [prefersReducedMotion]);

  return (
    <StyledProjectsSection>
      <h2 ref={revealTitle}>Other Noteworthy Projects</h2>

      <Link className="inline-link archive-link" to="/archive" ref={revealArchiveLink}>
        view the archive
      </Link>

      <ul className="projects-grid">
        {prefersReducedMotion ? (
          <>
            {projectsToShow.map((project, i) => (
              <StyledProject key={i}>{projectInner(project)}</StyledProject>
            ))}
          </>
        ) : (
          <TransitionGroup component={null}>
            {projectsToShow.map((project, i) => (
              <CSSTransition
                key={i}
                classNames="fadeup"
                timeout={i >= GRID_LIMIT ? (i - GRID_LIMIT) * 300 : 300}
                exit={false}>
                <StyledProject
                  ref={el => el && revealProjects.current.push(el as unknown as HTMLDivElement)}
                  style={{
                    transitionDelay: `${i >= GRID_LIMIT ? (i - GRID_LIMIT) * 100 : 0}ms`,
                  }}>
                  {projectInner(project)}
                </StyledProject>
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </ul>

      <button className="more-button" onClick={() => setShowMore(!showMore)}>
        Show {showMore ? 'Less' : 'More'}
      </button>
    </StyledProjectsSection>
  );
};

export default Projects;