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
      <div className="relative">
        <Input
          placeholder="Search..."
          value={searchText}
          onChange={handleSearch}
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 pr-12 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        {searchText && (
          <X
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 transition hover:text-gray-600"
          />
        )}
      </div>
    </div>
  );
};

export default SearchBar;
