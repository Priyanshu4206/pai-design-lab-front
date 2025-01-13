import { useEffect, useState } from "react";

const useInView = (elementRef, threshold = 0.1) => {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!elementRef.current || inView) return;

    const observerOptions = { threshold };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, observerOptions);

    observer.observe(elementRef.current);

    return () => observer.disconnect();
  }, [elementRef, threshold, inView]);

  return inView;
};

export default useInView;
