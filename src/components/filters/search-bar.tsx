// src/components/filters/search-bar.tsx

import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  const [inputValue, setInputValue] = useState(value);
  
  useEffect(() => {
    setInputValue(value);
  }, [value]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onChange(inputValue);
  };
  
  const handleClear = () => {
    setInputValue('');
    onChange('');
  };
  
  return (
    <form 
      onSubmit={handleSubmit} 
      className="relative flex-1 max-w-md"
    >
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search skills or projects..."
          className="pl-9 pr-10 h-10"
          value={inputValue}
          onChange={handleChange}
        />
        {inputValue && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-10 w-10"
            onClick={handleClear}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
      </div>
    </form>
  );
}
