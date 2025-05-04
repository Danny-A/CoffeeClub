import { ChevronsUpDown, Check } from 'lucide-react';
import * as React from 'react';
import { useMemo, useCallback, useEffect } from 'react';

import { cn } from '@/utils/cn';

import { Button } from '../Button';
import { Popover, PopoverContent, PopoverTrigger } from '../Popover';
import { Text } from '../Text';

export type ComboBoxProps<T> = {
  options: T[];
  value: string | null;
  onChange: (value: string | null) => void;
  onSearch?: (query: string) => void;
  onScrollEnd?: () => void;
  isLoading?: boolean;
  getOptionLabel: (option: T) => string;
  getOptionValue: (option: T) => string;
  placeholder?: string;
};

// Symbol for storing the scroll handler on the node
const comboBoxScrollHandlerSymbol = Symbol('comboBoxScrollHandler');

export function ComboBox<T>({
  options,
  value,
  onChange,
  onSearch,
  onScrollEnd,
  isLoading,
  getOptionLabel,
  getOptionValue,
  placeholder = 'Select...',
}: ComboBoxProps<T>) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [highlightedIndex, setHighlightedIndex] = React.useState<number>(-1);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const listRef = React.useRef<HTMLUListElement | null>(null);

  // Derived values
  const filteredOptions = useMemo(() => {
    if (onSearch) return options;
    return options.filter((opt) =>
      getOptionLabel(opt).toLowerCase().includes(search.toLowerCase())
    );
  }, [onSearch, options, getOptionLabel, search]);

  const selectedOption = useMemo(() => {
    if (!value) return null;
    return options.find((opt) => getOptionValue(opt) === value);
  }, [options, value, getOptionValue]);

  // Ref callback to attach/detach scroll event
  const setListRef = useCallback(
    (node: HTMLUListElement | null) => {
      if (listRef.current && listRef.current !== node) {
        // @ts-expect-error: custom property for cleanup
        const prevHandler = listRef.current[comboBoxScrollHandlerSymbol] as
          | EventListenerOrEventListenerObject
          | undefined;
        if (prevHandler) {
          listRef.current.removeEventListener('scroll', prevHandler);
          // @ts-expect-error: custom property for cleanup
          listRef.current[comboBoxScrollHandlerSymbol] = undefined;
        }
      }
      if (node) {
        const handleScroll = () => {
          if (node.scrollTop + node.clientHeight >= node.scrollHeight - 10) {
            onScrollEnd?.();
          }
        };
        node.addEventListener('scroll', handleScroll);
        // @ts-expect-error: custom property for cleanup
        node[comboBoxScrollHandlerSymbol] = handleScroll;
      }
      listRef.current = node;
    },
    [onScrollEnd]
  );

  // Effects
  useEffect(() => {
    if (!open) setSearch('');
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  useEffect(() => {
    if (onSearch) onSearch(search);
  }, [search, onSearch]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!open) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHighlightedIndex((i) => Math.min(i + 1, filteredOptions.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHighlightedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (
          highlightedIndex >= 0 &&
          highlightedIndex < filteredOptions.length
        ) {
          const opt = filteredOptions[highlightedIndex];
          onChange(getOptionValue(opt));
          setOpen(false);
        }
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    },
    [open, filteredOptions, highlightedIndex, onChange, getOptionValue]
  );

  useEffect(() => {
    setHighlightedIndex(-1);
  }, [search, open, filteredOptions.length]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
          onClick={() => setOpen((v) => !v)}
        >
          {selectedOption
            ? getOptionLabel(selectedOption as T) || placeholder
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 min-w-[200px]">
        <div className="p-2">
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
            autoFocus
          />
        </div>
        <ul
          ref={setListRef}
          className="max-h-60 overflow-y-auto"
          tabIndex={-1}
          role="listbox"
        >
          {isLoading && (
            <li className="p-2 text-center text-muted-foreground">
              <Text variant="small">Loading...</Text>
            </li>
          )}
          {filteredOptions.length === 0 && !isLoading && (
            <li className="p-2 text-center text-muted-foreground">
              <Text variant="small">No options found.</Text>
            </li>
          )}
          {filteredOptions.map((opt, idx) => (
            <li
              key={getOptionValue(opt)}
              role="option"
              aria-selected={value === getOptionValue(opt)}
              className={cn(
                'cursor-pointer px-3 py-2 flex items-center gap-2',
                idx === highlightedIndex && 'bg-accent',
                value === getOptionValue(opt) && 'font-bold'
              )}
              onMouseDown={() => {
                onChange(getOptionValue(opt));
                setOpen(false);
              }}
              onMouseEnter={() => setHighlightedIndex(idx)}
            >
              <Text variant="small">{getOptionLabel(opt)}</Text>
              <Check
                className={cn(
                  'mr-2 h-4 w-4',
                  value === getOptionValue(opt) ? 'opacity-100' : 'opacity-0'
                )}
              />
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
