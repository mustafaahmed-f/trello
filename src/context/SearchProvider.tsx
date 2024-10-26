import React, { createContext, useContext } from "react";

interface SearchProviderProps {
  children: React.ReactNode;
}

const searchContext = createContext<{
  searchVal: string;
  setSearchVal: React.Dispatch<React.SetStateAction<string>>;
  showAutoComplete: boolean;
  setShowAutoComplete: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  searchVal: "",
  setSearchVal: () => {},
  showAutoComplete: false,
  setShowAutoComplete: () => {},
});

function SearchProvider({ children }: SearchProviderProps) {
  const { 0: showAutoComplete, 1: setShowAutoComplete } = React.useState(false);
  const { 0: searchVal, 1: setSearchVal } = React.useState("");
  return (
    <searchContext.Provider
      value={{ showAutoComplete, setShowAutoComplete, searchVal, setSearchVal }}
    >
      {children}
    </searchContext.Provider>
  );
}

export function useSearchContext() {
  let context = useContext(searchContext);
  if (!context) throw new Error("Context must be used within SearchProvider");
  return context;
}

export default SearchProvider;
