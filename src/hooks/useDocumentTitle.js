import { useRef, useEffect } from "react";

const useDocumentTitle = (title) => {
  const defaultTitle = useRef(document.title).current;

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      // cleanup function runs on unmount
      document.title = defaultTitle;
    };
  }, []);
};

export default useDocumentTitle;
