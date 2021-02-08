import React, { ReactNode } from "react";
import { debounce } from "./debounce";
import { isServer } from "./isServer";

interface ViewportProviderProps {
  children: ReactNode;
}

export type ViewportValues = {
  width: number;
  height: number;
}

type ViewportContext = ViewportValues;

const viewportContext = React.createContext<ViewportContext>({
  height: 0,
  width: 0
});

/**
 * A global context provider that provides information on the viewport height and width
 * Modified version of https://blog.logrocket.com/developing-responsive-layouts-with-react-hooks/
 */
export const ViewportProvider: React.FC<ViewportProviderProps> = ({ children }) => {
  if (isServer()) {
    // return (
    //   <viewportContext.Provider value={{ width: 0, height: 0 }}>
    //     {children}
    //   </viewportContext.Provider>
    // );
    return null;
  }

  const [width, setWidth] = React.useState(window.innerWidth);
  const [height, setHeight] = React.useState(window.innerHeight);

  const handleWindowResize = debounce(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }, 1000);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <viewportContext.Provider value={{ width, height }}>
      {children}
    </viewportContext.Provider>
  );
};

export const useViewport = (): ViewportContext => {
  const viewportValues = React.useContext<ViewportContext>(viewportContext);
  return viewportValues;
}