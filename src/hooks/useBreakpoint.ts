import { useMediaQuery } from "react-responsive";

const breakpoints = {
  mobile: "(max-width: 767px)",
  tablet: "(min-width: 768px)",
};

export function useBreakpoint(query: keyof typeof breakpoints) {
  return useMediaQuery({ query: breakpoints[query] });
}
