"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SearchIcon, XIcon } from "lucide-react";
import {
  ChangeEvent,
  InputHTMLAttributes,
  useCallback,
  useRef,
  useState,
} from "react";
import debounce from "debounce";
import { Button } from "@/components/ui/button";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

function debounceFunc<T extends (...args: any) => any>(
  func: T,
  wait: number,
  opts: { immediate: boolean },
) {
  return debounce(func, wait, opts);
}

const SearchInput = (props: SearchInputProps) => {
  const { className, ...rest } = props;
  const [q, setSearch] =
    useState(); /* //TODO: change useState to useQueryState */
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = useCallback(
    debounceFunc(
      (value: string) => {
        setSearch(value || null);
      },
      100,
      { immediate: true },
    ),
    [],
  );

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    handleSearch(newValue);
  };

  return (
    <form className="flex-1">
      <div className="relative mx-auto w-full max-w-[600px]">
        <SearchIcon className="text-muted-foreground absolute top-2.5 left-2.5 size-3.5" />
        <Input
          className={cn(className)}
          ref={inputRef}
          defaultValue=""
          type="search"
          {...rest}
          onChange={handleOnChange}
        />
        {q && (
          <Button
            variant="ghost"
            size="icon"
            className="group absolute top-1.5 right-2.5 size-6 cursor-pointer rounded-full"
          >
            <XIcon className="text-muted-foreground group-hover:text-foreground size-4" />
          </Button>
        )}
      </div>
    </form>
  );
};
export default SearchInput;
