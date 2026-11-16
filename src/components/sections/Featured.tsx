import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { sr } from "../../lib/utils";
import { srConfig } from "../../config";
import { usePrefersReducedMotion } from "../../hooks";
import Icon from "../icons/icons";

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
    grid-gap: 25px;
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
          content: "";
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
        content: "";
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

      @media (max-width: 768px) {
        height: 340px;
        max-height: 340px;
      }
    }

    .img {
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1) brightness(90%);

      @media (max-width: 768px) {
        object-fit: cover;
        object-position: center;
        width: auto;
        height: 340px;
        max-height: 340px;
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
    date: "05-01-2026",
    title: "Casefiti",
    cover: "/assets/casefiti.webp",
    github: "https://github.com/JosephKinyuru/casefiti",
    external: "https://casecobra-bice.vercel.app",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    html: "An e-commerce platform for designing and ordering custom high-quality phone cases. Features a visual case designer, checkout flow, and order management.",
  },
  {
    date: "04-01-2026",
    title: "Nawiri Wellness",
    cover: "/assets/nawiri.webp",
    github: "",
    external: "https://nawiri-phi.vercel.app",
    tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Recharts"],
    html: "A volunteer opportunity platform connecting individuals with community organizations. Features event discovery, registration, coordinator dashboards with analytics, and file upload capabilities.",
  },
  {
    date: "03-01-2026",
    title: "Trova",
    cover: "/assets/trova.webp",
    github: "",
    external: "https://trova-theta.vercel.app",
    tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "TanStack Query"],
    html: "A student housing marketplace with role-based access for students, landlords, and admins. Features listing management, image galleries, reviews, bookmarks, and an admin moderation panel with analytics.",
  },
  {
    date: "01-01-2026",
    title: "SQHK",
    cover: "/assets/sqhk.webp",
    github: "",
    external: "https://sqhk.org",
    tech: ["Next.js", "React", "Sanity CMS", "Paystack", "Resend"],
    html: "Production website and embedded CMS for the <strong>Society for Quality Healthcare in Kenya</strong>. Handles membership registration, donations via M-Pesa and card (Paystack), and automated renewal reminder emails.",
  },
  {
    date: "06-01-2026",
    title: "Lune",
    cover: "/assets/lune.webp",
    github: "",
    external: "https://about.lune.social",
    tech: ["React Native", "Express", "PostgreSQL", "Redis", "Next.js", "Astro"],
    html: "A cross-platform social media app built from scratch as a monorepo — mobile clients (iOS & Android), REST API with push notifications and OAuth, a Next.js moderation dashboard, and an Astro marketing site. Currently in development.",
  },
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
            <StyledProject
              key={i}
              ref={(el: HTMLLIElement | null) =>
                (revealProjects.current[i] = el as unknown as HTMLDivElement)
              }
            >
              <div className="project-content">
                <div>
                  <p className="project-overline">Featured Project</p>
                  <h3 className="project-title">
                    <a href={external}>{title}</a>
                  </h3>
                  <div
                    className="project-description"
                    dangerouslySetInnerHTML={{ __html: html }}
                  />
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
                      <a
                        href={external}
                        aria-label="External Link"
                        className="external"
                      >
                        <Icon name="External" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <div className="project-image">
                <a href={external ? external : github ? github : "#"}>
                  <img src={cover} alt={title} className="img" loading="lazy" />
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
