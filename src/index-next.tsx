import { Motion, spring, presets } from "react-motion";
import { useEffect, useRef, useState, WheelEvent } from "react";

export const ScrollHorizontal = ({ children, reverseScroll }) => {
  const [scrollValue, setScrollValue] = useState(0);

  const parentElement = useRef<HTMLDivElement>(null);
  // const scrollElement = useRef<HTMLDivElement>(null);
  
  const resetMin = () => {
    setScrollValue(0);
  };

  const resetMax = (x: number) => {
    setScrollValue(x);
  };

  const calculate = () => {
    if (!parentElement.current) throw new Error();
    const rect = parentElement.current.getBoundingClientRect();
    // @ts-ignore
    const max = parentElement.current.lastElementChild.scrollWidth;
    const win = parentElement.current.offsetWidth;

    const bounds = -(max - win);

    // Logic to hold everything in place
    if (scrollValue >= 1) {
      resetMin();
    } else if (scrollValue <= bounds) {
      if (max > rect.width) {
        resetMax(bounds + 1);
      } else {
        resetMax(0);
      }
    }
  };

  const caniscroll = () => {
    if (!parentElement.current) throw new Error();

    let el = parentElement.current;
    let rect = el.getBoundingClientRect();
    let scroller = el.firstElementChild;

    return (
      // @ts-ignore
      scroller.offsetLeft < rect.left ||
      // @ts-ignore
      scroller.offsetLeft + scroller.offsetWidth > rect.width
    );
  };

  const onScrollStart = (e: WheelEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (!caniscroll()) {
      return;
    }

    const rawData = e.deltaY ? e.deltaY : e.deltaX;
    const mouseY = Math.floor(rawData);

    const scrolling = () => {
      reverseScroll
        ? setScrollValue(scrollValue - mouseY)
        : setScrollValue(scrollValue + mouseY);
    };

    // Begin Scrolling Animation
    window.requestAnimationFrame(scrolling);
  };

  useEffect(() => {
    if (!parentElement.current) throw new Error();

    // @ts-ignore
    parentElement.current.addEventListener("wheel", onScrollStart, {
      passive: false,
    });

    return () => {
      if (!parentElement.current) throw new Error();

      // @ts-ignore
      parentElement.current.removeEventListener("wheel", onScrollStart, {
        passive: false,
      });
    };
  }, []);

  useEffect(() => {
    calculate();
  }, [scrollValue]);

  return (
    <div ref={parentElement} style={{ height: '300px', width: '100vw', background: 'red' }} className="">
      <Motion style={{ z: spring(scrollValue, {}) }}>
        {({ z }) => {
          return (
            <div style={{ transform: `translate3d(${z}px, 0,0)` }}>
              {children}
            </div>
          );
        }}
      </Motion>
    </div>
  );
};
