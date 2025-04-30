import { createContext, useContext, useEffect, useState } from "react";

const SearchContext = createContext({
  isDialogOpen: false,
  setIsDialogOpen: (open: boolean) => {},
});

export function useSearchContext() {
  return useContext(SearchContext);
}

export default function SearchContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsDialogOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <SearchContext.Provider
      value={{
        isDialogOpen,
        setIsDialogOpen,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
