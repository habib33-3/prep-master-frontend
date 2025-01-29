import { type ChangeEvent, useEffect, useState } from "react";

import { Search } from "lucide-react";
import { useSearchParams } from "react-router";

import useDebounce from "@/hooks/useDebounce";

import { Input } from "@/ui/input";

const SearchBar = () => {
  const [, setSearchParams] = useSearchParams();
  const [searchText, setSearchText] = useState<string>("");

  // Debounce the search text
  const debouncedSearchText = useDebounce(searchText, 500); // 500ms debounce delay

  // Update search params only when debounced search text changes
  useEffect(() => {
    if (debouncedSearchText) {
      setSearchParams({ searchText: debouncedSearchText });
    }
  }, [debouncedSearchText, setSearchParams]);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  return (
    <div className="relative mx-auto max-w-xs">
      <Input
        placeholder="Search..."
        value={searchText}
        onChange={handleSearch}
        className="pr-10"
      />
      <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
    </div>
  );
};

export default SearchBar;
