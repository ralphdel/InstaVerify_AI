'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState(searchParams.get('q') || '');

  // Keep local state in sync if URL changes externally
  useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

  // Only render the search block if we are on the dashboard
  if (pathname !== '/dashboard') {
    return <div className="hidden md:block w-32" />; // Spacer for other pages
  }

  function handleSearch(term: string) {
    setQuery(term);
    const params = new URLSearchParams(searchParams);
    
    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }

    startTransition(() => {
      // Use replace to avoid filling up the browser history string
      router.replace(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input 
        type="search" 
        placeholder="Search merchants, IDs..." 
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        className={`w-full bg-secondary/50 border-transparent focus-visible:ring-1 focus-visible:ring-ring pl-9 transition-opacity ${isPending ? 'opacity-70' : ''}`}
      />
    </div>
  );
}
