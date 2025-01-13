import { useEffect } from "react";

const useLazyLoad = (callback) => {
  useEffect(() => {
    const timer = setTimeout(() => callback(), 500);
    return () => clearTimeout(timer);
  }, [callback]);
};

export default useLazyLoad;
