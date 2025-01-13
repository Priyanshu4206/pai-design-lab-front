import { useEffect } from "react";

const useSEO = (title, description) => {
  useEffect(() => {
    document.title = title || "Default Title";
    const metaDescription = document.querySelector("meta[name='description']");
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        description || "Default Description"
      );
    }
  }, [title, description]);
};

export default useSEO;
