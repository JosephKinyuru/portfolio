import React, { useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { srConfig } from '../config';
import { sr } from '../lib/utils';
import { Layout } from '../components';
import  Icon from '../components/icons/icons';
import { usePrefersReducedMotion } from '../hooks';

const StyledTableContainer = styled.div`
  margin: 100px -20px;

  @media (max-width: 768px) {
    margin: 50px -10px;
  }

  table {
    width: 100%;
    border-collapse: collapse;

    .hide-on-mobile {
      @media (max-width: 768px) {
        display: none;
      }
    }

    tbody tr {
      &:hover,
      &:focus {
        background-color: var(--light-navy);
      }
    }

    th,
    td {
      padding: 10px;
      text-align: left;

      &:first-child {
        padding-left: 20px;

        @media (max-width: 768px) {
          padding-left: 10px;
        }
      }
      &:last-child {
        padding-right: 20px;

        @media (max-width: 768px) {
          padding-right: 10px;
        }
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }

    tr {
      cursor: default;

      td:first-child {
        border-top-left-radius: var(--border-radius);
        border-bottom-left-radius: var(--border-radius);
      }
      td:last-child {
        border-top-right-radius: var(--border-radius);
        border-bottom-right-radius: var(--border-radius);
      }
    }

    td {
      &.year {
        padding-right: 20px;

        @media (max-width: 768px) {
          padding-right: 10px;
          font-size: var(--fz-sm);
        }
      }

      &.title {
        padding-top: 15px;
        padding-right: 20px;
        color: var(--lightest-slate);
        font-size: var(--fz-xl);
        font-weight: 600;
        line-height: 1.25;
      }

      &.company {
        font-size: var(--fz-lg);
        white-space: nowrap;
      }

      &.tech {
        font-size: var(--fz-xxs);
        font-family: var(--font-mono);
        line-height: 1.5;
        .separator {
          margin: 0 5px;
        }
        span {
          display: inline-block;
        }
      }

      &.links {
        min-width: 100px;

        div {
          display: flex;
          align-items: center;

          a {
            ${({ theme }) => theme.mixins.flexCenter};
            flex-shrink: 0;
          }

          a + a {
            margin-left: 10px;
          }
        }
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
  ios?: string;
  android?: string;
  company?: string;
}

const data: Project[] = [
  {
    date: '05-27-2024',
    title: 'CaseFiti',
    github: 'https://github.com/JosephKinyuru/casefiti',
    external: 'https://casefiti.vercel.app',
    tech: ['Next.JS', 'Uploadthing', 'Typescript', 'Tailwindcss', 'Stripe'],
  },
  {
    date: '01-07-2024',
    title: 'SribePDF',
    github: 'https://github.com/JosephKinyuru/scribepdf',
    external: 'https://scribepdf.vercel.app/',
    tech: ['NextJS', 'Pinecone', 'Langchain', 'OpenAI'],
  },
  {
    date: '01-08-2024',
    title: 'Light Landing Page',
    github: 'https://github.com/JosephKinyuru/light-landing-page',
    external: 'https://light-landing-page.vercel.app/',
    tech: ['NextJS', 'Framer-motion', 'Sass'],
  },
  {
    date: '07-23-2024',
    title: 'Dark Landing Page',
    github: 'https://github.com/JosephKinyuru/dark-landing-page',
    external: 'https://dark-landing-page-rouge.vercel.app/',
    tech: ['NextJS', 'Framer-motion', '3D', 'Acceternity'],
  },
  {
    date: '05-12-2023',
    title: 'Threads',
    github: 'https://github.com/JosephKinyuru/threads2',
    external: 'https://threads2-three.vercel.app/',
    tech: ['Next.JS', 'MongoDB', 'Typescript', 'Tailwindcss'],
  },
  {
    date: '03-07-2023',
    title: 'Cooking confessions',
    github: 'https://github.com/JosephKinyuru/CookingConfessions',
    external: 'https://cookingconfessions.netlify.app/',
    tech: ['Javascript (vanilla)', 'Html', 'CSS3'],
  },
  {
    date: '03-10-2023',
    title: 'Story Circle',
    github: 'https://github.com/JosephKinyuru/Story-Circle',
    external: 'https://storycircle.netlify.app/',
    tech: ['React', 'Flask', 'PostgreSQL', 'CORS'],
  },
  {
    date: '06-08-2023',
    title: 'Auto Track',
    github: 'https://github.com/barondevke/AutoTrackFinal',
    external: 'https://autotrack2.netlify.app/',
    tech: ['React', 'Public API', 'CSS3'],
  },
];  

const ArchivePage = () => {
  const revealTitle = useRef<HTMLHeadElement>(null);
  const revealTable = useRef<HTMLDivElement>(null);
  const revealProjects = useRef<HTMLTableRowElement[]>([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    if (revealTitle.current) {
      sr!.reveal(revealTitle.current, srConfig());
    }

    if (revealTable.current) {
      sr!.reveal(revealTable.current, srConfig());
    }

    revealProjects.current.forEach((ref, i) => {
      if (ref) {
        sr!.reveal(ref, srConfig(i * 100));
      }
    });
  }, [prefersReducedMotion]); 

  return (
    <Layout>
      <Helmet title="Archive | Joseph Kinyuru" />

      <main>
        <header ref={revealTitle}>
          <h1 className="big-heading">Archive</h1>
          <p className="subtitle">A big list of things I’ve worked on</p>
        </header>

        <StyledTableContainer ref={revealTable}>
          <table>
            <thead>
              <tr>
                <th>Year</th>
                <th>Title</th>
                <th className="hide-on-mobile">Made at</th>
                <th className="hide-on-mobile">Built with</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 &&
                data.map(( project , i) => {
                  const {
                    date,
                    github,
                    external,
                    ios,
                    android,
                    title,
                    tech,
                    company,
                  } = project;
                  return (
                    <tr key={i} ref={el => el && revealProjects.current.push(el as unknown as HTMLTableRowElement)}>
                      <td className="overline year">{`${new Date(date).getFullYear()}`}</td>

                      <td className="title">{title}</td>

                      <td className="company hide-on-mobile">
                        {company ? <span>{company}</span> : <span>—</span>}
                      </td>

                      <td className="tech hide-on-mobile">
                        {tech?.length > 0 &&
                          tech.map((item, i) => (
                            <span key={i}>
                              {item}
                              {''}
                              {i !== tech.length - 1 && <span className="separator">&middot;</span>}
                            </span>
                          ))}
                      </td>

                      <td className="links">
                        <div>
                          {external && (
                            <a href={external} aria-label="External Link">
                              <Icon name="External" />
                            </a>
                          )}
                          {github && (
                            <a href={github} aria-label="GitHub Link">
                              <Icon name="GitHub" />
                            </a>
                          )}
                          {ios && (
                            <a href={ios} aria-label="Apple App Store Link">
                              <Icon name="AppStore" />
                            </a>
                          )}
                          {android && (
                            <a href={android} aria-label="Google Play Store Link">
                              <Icon name="PlayStore" />
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </StyledTableContainer>
      </main>
    </Layout>
  );
};


export default ArchivePage;