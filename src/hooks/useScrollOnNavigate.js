import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

// On new navigations: scroll to the hash target if present, otherwise to the top.
// Back/forward (POP) is left alone so the browser restores the previous position.
export default function useScrollOnNavigate() {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (hash) {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ behavior: "smooth" });
    } else if (navigationType !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash, navigationType]);
}
