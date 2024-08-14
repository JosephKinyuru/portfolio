import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import { srConfig } from '../../config';
import { KEY_CODES } from '../../lib/utils';
import { sr } from '../../lib/utils';
import { usePrefersReducedMotion } from '../../hooks';

const StyledJobsSection = styled.section`
  max-width: 700px;

  .inner {
    display: flex;

    @media (max-width: 600px) {
      display: block;
    }

    // Prevent container from jumping
    @media (min-width: 700px) {
      min-height: 340px;
    }
  }
`;

const StyledTabList = styled.div`
  position: relative;
  z-index: 3;
  width: max-content;
  padding: 0;
  margin: 0;
  list-style: none;

  @media (max-width: 600px) {
    display: flex;
    overflow-x: auto;
    width: calc(100% + 100px);
    padding-left: 50px;
    margin-left: -50px;
    margin-bottom: 30px;
  }
  @media (max-width: 480px) {
    width: calc(100% + 50px);
    padding-left: 25px;
    margin-left: -25px;
  }

  li {
    &:first-of-type {
      @media (max-width: 600px) {
        margin-left: 50px;
      }
      @media (max-width: 480px) {
        margin-left: 25px;
      }
    }
    &:last-of-type {
      @media (max-width: 600px) {
        padding-right: 50px;
      }
      @media (max-width: 480px) {
        padding-right: 25px;
      }
    }
  }
`;

interface StyledTabButtonProps {
  isActive: boolean;
}

const StyledTabButton = styled.button<StyledTabButtonProps>`
  ${({ theme }) => theme.mixins.link};
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--tab-height);
  padding: 0 20px 2px;
  border-left: 2px solid var(--lightest-navy);
  background-color: transparent;
  color: ${({ isActive }) => (isActive ? 'var(--green)' : 'var(--slate)')};
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
  text-align: left;
  white-space: nowrap;

  @media (max-width: 768px) {
    padding: 0 15px 2px;
  }
  @media (max-width: 600px) {
    ${({ theme }) => theme.mixins.flexCenter};
    min-width: 120px;
    padding: 0 15px;
    border-left: 0;
    border-bottom: 2px solid var(--lightest-navy);
    text-align: center;
  }

  &:hover,
  &:focus {
    background-color: var(--light-navy);
  }
`;

interface StyledHighlightProps {
  activeTabId: number;
}

const StyledHighlight = styled.div<StyledHighlightProps>`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 2px;
  height: var(--tab-height);
  border-radius: var(--border-radius);
  background: var(--green);
  transform: translateY(calc(${({ activeTabId }) => activeTabId} * var(--tab-height)));
  transition: transform 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition-delay: 0.1s;

  @media (max-width: 600px) {
    top: auto;
    bottom: 0;
    width: 100%;
    max-width: var(--tab-width);
    height: 2px;
    margin-left: 50px;
    transform: translateX(calc(${({ activeTabId }) => activeTabId} * var(--tab-width)));
  }
  @media (max-width: 480px) {
    margin-left: 25px;
  }
`;

const StyledTabPanels = styled.div`
  position: relative;
  width: 100%;
  margin-left: 20px;

  @media (max-width: 600px) {
    margin-left: 0;
  }
`;

const StyledTabPanel = styled.div`
  width: 100%;
  height: auto;
  padding: 10px 5px;

  ul {
    ${({ theme }) => theme.mixins.fancyList};
  }

  h3 {
    margin-bottom: 2px;
    font-size: var(--fz-xxl);
    font-weight: 500;
    line-height: 1.3;

    .company {
      color: var(--green);
    }
  }

  .range {
    margin-bottom: 25px;
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
  }
`;

interface Job {
  title: string;
  company: string;
  location: string;
  range: string;
  url: string;
  html: string;
}

const data: Job[] = [
  {
    title: 'Threads',
    company:'Company1',
    location:'Location1',
    range: 'Range1',
    url: 'https://threads2-three.vercel.app/',
    html: 'Threads is a duplicate of the app threads by meta. I developed the project in order to test and develop my skills with NextJS and cloud computing with MongoDB. Feel free to check it out its works really well for a social app.',
  },
  {
    title: 'Cooking confessions',
    company:'Company1',
    location:'Location1',
    range: 'Range1',
    url: 'https://cookingconfessions.netlify.app/',
    html: 'Cooking confessions has a curated data set of different recipes which are categorized into four categories. Users are able to view the available recipes after loading the site and can then click to view one full recipe in a different section and then add a comment to it. Users can also choose which category to view.',
  },
  {
    title: 'Story Circle',
    company:'Company1',
    location:'Location1',
    range: 'Range1',
    url: 'https://storycircle.netlify.app/',
    html: 'Story Circle is a social platform connecting book enthusiasts, enabling them to create and join book clubs. Users can engage in discussions, explore a rich library of books, and share their insights through comments.',
  },
  {
    title: 'Auto Track',
    company:'Company1',
    location:'Location1',
    range: 'Range1',
    url: 'https://autotrack2.netlify.app/',
    html: 'AutoTrack is a website that allows users to buy and sell cars. It allows users to select from a wide variety of cars to buy from and they can even search for a specific car or narrow down their search according to their budget. Users can also add their own car to sell on the site.'
  }
];  

const Jobs = () => {

  const [activeTabId, setActiveTabId] = useState<number>(0);
  const [tabFocus, setTabFocus] = useState<number | null>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const revealContainer = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    if (revealContainer.current) {
      sr!.reveal(revealContainer.current, srConfig());
    }
  }, [prefersReducedMotion]);

  const focusTab = () => {
    if (tabFocus !== null && tabs.current[tabFocus]) {
      tabs.current[tabFocus]!.focus();
      return;
    }
    // If we're at the end, go to the start
    if (tabFocus !== null && tabFocus >= tabs.current.length) {
      setTabFocus(0);
    }
    // If we're at the start, move to the end
    if (tabFocus !== null && tabFocus < 0) {
      setTabFocus(tabs.current.length - 1);
    }
  };

  // Only re-run the effect if tabFocus changes
  useEffect(() => {
    focusTab();
  }, [tabFocus]);

  // Focus on tabs when using up & down arrow keys
  const onKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case KEY_CODES.ARROW_UP: {
        e.preventDefault();
        setTabFocus(prev => (prev !== null ? prev - 1 : 0));
        break;
      }

      case KEY_CODES.ARROW_DOWN: {
        e.preventDefault();
        setTabFocus(prev => (prev !== null ? prev + 1 : 0));
        break;
      }

      default: {
        break;
      }
    }
  };

  return (
    <StyledJobsSection id="jobs" ref={revealContainer}>
      <h2 className="numbered-heading">Where I’ve Worked</h2>

      <div className="inner">
        <StyledTabList role="tablist" aria-label="Job tabs" onKeyDown={e => onKeyDown(e)}>
          {data &&
            data.map(( job, i) => {
              const { company } = job;
              return (
                <StyledTabButton
                  key={i}
                  isActive={activeTabId === i}
                  onClick={() => setActiveTabId(i)}
                  ref={el => (tabs.current[i] = el)}
                  id={`tab-${i}`}
                  role="tab"
                  tabIndex={activeTabId === i ? 0 : -1} 
                  aria-selected={activeTabId === i ? true : false}
                  aria-controls={`panel-${i}`}>
                  <span>{company}</span>
                </StyledTabButton>
              );
            })}
          <StyledHighlight activeTabId={activeTabId} />
        </StyledTabList>

        <StyledTabPanels>
          {data &&
            data.map(( job, i) => {
              const { title, url, company, range, html } = job;

              return (
                <CSSTransition key={i} in={activeTabId === i} timeout={250} classNames="fade">
                  <StyledTabPanel
                    id={`panel-${i}`}
                    role="tabpanel"
                    tabIndex={activeTabId === i ? 0 : -1} 
                    aria-labelledby={`tab-${i}`}
                    aria-hidden={activeTabId !== i}
                    hidden={activeTabId !== i}>
                    <h3>
                      <span>{title}</span>
                      <span className="company">
                        &nbsp;@&nbsp;
                        <a href={url} className="inline-link">
                          {company}
                        </a>
                      </span>
                    </h3>

                    <p className="range">{range}</p>

                    <div dangerouslySetInnerHTML={{ __html: html }} />
                  </StyledTabPanel>
                </CSSTransition>
              );
            })}
        </StyledTabPanels>
      </div>
    </StyledJobsSection>
  );
};

export default Jobs;
