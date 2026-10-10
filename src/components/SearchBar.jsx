import React from 'react';
import { Search, X, RefreshCw } from 'lucide-react';

export default function SearchBar({
  searchQuery,
  onSearchChange,
  onClearSearch,
  onRefresh,
  totalResults,
  isLoading,
}) {
  return (
    <div className="search-bar-wrapper">
      <div className="search-input-box">
        <Search className="search-icon" size={18} />
        <input
          id="employee-search-input"
          type="text"
          className="search-input"
          placeholder="Search by name, email, department, or role..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchQuery && (
          <button
            id="clear-search-btn"
            type="button"
            className="clear-search-btn"
            onClick={onClearSearch}
            title="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div className="search-bar-actions">
        <span className="results-count">
          Showing <strong>{totalResults}</strong> {totalResults === 1 ? 'employee' : 'employees'}
        </span>

        <button
          id="refresh-btn"
          className="btn btn-secondary btn-icon"
          onClick={onRefresh}
          disabled={isLoading}
          title="Refresh employees list"
        >
          <RefreshCw size={16} className={isLoading ? 'spinning' : ''} />
          <span>Refresh</span>
        </button>
      </div>
    </div>
  );
}
