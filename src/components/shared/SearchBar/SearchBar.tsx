import { type ChangeEvent, useEffect, useState } from "react";

import { X } from "lucide-react";
import { useSearchParams } from "react-router";

import useDebounce from "@/hooks/useDebounce";

import { Input } from "@/ui/input";

import { SEARCH_PARAMS } from "@/constants";

const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchText, setSearchText] = useState<string>(
    searchParams.get(SEARCH_PARAMS.SEARCH_TEXT) ?? ""
  );

  const debouncedSearchText = useDebounce(searchText, 500);

  useEffect(() => {
    setSearchParams(
      (prevParams) => {
        const newParams = new URLSearchParams(prevParams);
        if (debouncedSearchText) {
          newParams.set(SEARCH_PARAMS.SEARCH_TEXT, debouncedSearchText);
        } else {
          newParams.delete(SEARCH_PARAMS.SEARCH_TEXT);
        }
        return newParams;
      },
      { replace: true }
    );
  }, [debouncedSearchText, setSearchParams]);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleClear = () => {
    setSearchText("");

    setSearchParams(
      (prevParams) => {
        const newParams = new URLSearchParams(prevParams);
        newParams.delete("searchText");
        return newParams;
      },
      { replace: true }
    );
  };

  return (
    <div className="relative mx-auto max-w-xs">
      <Input
        placeholder="Search..."
        value={searchText}
        onChange={handleSearch}
        className="pr-10"
      />
      {searchText && (
        <X
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
        />
      )}
    </div>
  );
};

export default SearchBar;
