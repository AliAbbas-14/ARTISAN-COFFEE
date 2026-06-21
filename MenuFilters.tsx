'use client';

import { CATEGORIES, FLAVORS, SORT_OPTIONS } from '@/lib/constants';

interface MenuFiltersProps {
  query: string;
  category: string;
  flavor: string;
  sort: string;
  resultCount: number;
  onQueryChange: (q: string) => void;
  onCategoryChange: (c: string) => void;
  onFlavorChange: (f: string) => void;
  onSortChange: (s: string) => void;
}

export default function MenuFilters({
  query,
  category,
  flavor,
  sort,
  resultCount,
  onQueryChange,
  onCategoryChange,
  onFlavorChange,
  onSortChange,
}: MenuFiltersProps) {
  return (
    <div className="space-y-6 mb-10">
      <div className="relative max-w-2xl">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none">
          <SearchIcon />
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search by name, flavor, mood… (e.g. vanilla, iced, cozy)"
          className="input-field pl-12 pr-4 py-4 text-base"
          aria-label="Search coffees"
        />
      </div>

      <div>
        <p className="text-xs uppercase tracking-widest text-muted mb-3">Category</p>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => onCategoryChange(c.id)}
              className={pillClass(category === c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs uppercase tracking-widest text-muted mb-3">Flavor profile</p>
        <div className="flex flex-wrap gap-2">
          {FLAVORS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => onFlavorChange(f.id)}
              className={pillClass(flavor === f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-muted text-sm">
          <span className="text-cream font-semibold">{resultCount}</span>{' '}
          {resultCount === 1 ? 'coffee' : 'coffees'} match your taste
        </p>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="input-field py-2.5 px-4 w-full sm:w-auto text-sm"
          aria-label="Sort coffees"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.id} value={o.id}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

function pillClass(active: boolean) {
  return [
    'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border',
    active
      ? 'bg-accent text-white border-accent shadow-glow'
      : 'bg-surface/60 text-muted border-border hover:border-accent/50 hover:text-cream',
  ].join(' ');
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}
