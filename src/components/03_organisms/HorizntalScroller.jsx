import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";

const scrollAnimation = keyframes`
  to {
    transform: translate(calc(-50% - 0.5rem));
  }
`;

const ScrollerContainer = styled.div`
  margin: auto;
  max-width: 80%;
  overflow: hidden;
  -webkit-mask: linear-gradient(
    90deg,
    transparent,
    white 20%,
    white 80%,
    transparent
  );
  mask: linear-gradient(90deg, transparent, white 20%, white 80%, transparent);

  &[data-animated="true"] .scrollerInner {
    width: max-content;
    display: flex;
    flex-wrap: nowrap;
    animation: ${scrollAnimation} var(--_animation-duration, 40s)
      var(--_animation-direction, forwards) linear infinite;
  }

  &[data-direction="right"] {
    --_animation-direction: reverse;
  }

  &[data-direction="left"] {
    --_animation-direction: forwards;
  }

  &[data-speed="fast"] {
    --_animation-duration: 40s;
  }

  &[data-speed="slow"] {
    --_animation-duration: 60s;
  }
`;

const ScrollerInner = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding-block: 1rem;

  &[data-animated="true"] {
    width: max-content;
  }
`;

const StyledImg = styled.img`
  width: 200px;
  height: 100px;
`;

const Scroller = ({ direction = "right", speed = "slow", items }) => {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!prefersReducedMotion) {
      const scrollerElements = document.querySelectorAll("[data-animated]");
      scrollerElements.forEach((scroller) => {
        scroller.setAttribute("data-animated", "true");

        const scrollerInner = scroller.querySelector(".scrollerInner");

        if (scrollerInner) {
          const scrollerContent = Array.from(scrollerInner.children);
          scrollerContent.forEach((item) => {
            const duplicatedItem = item.cloneNode(true);
            duplicatedItem.setAttribute("aria-hidden", true);
            scrollerInner.appendChild(duplicatedItem);
          });
        } else {
          console.warn("No element with class '.scrollerInner' found inside", scroller);
        }
      });
    }
  }, []);

  return (
    <ScrollerContainer data-direction={direction} data-speed={speed} data-animated="true">
      <ScrollerInner className="scrollerInner">
        {items.map((item, index) => (
          <StyledImg src={item.src} alt={item.alt} key={index} />
        ))}
      </ScrollerInner>
    </ScrollerContainer>
  );
};

export default Scroller;    