
import React from 'react';
import { Search } from 'lucide-react';

const SearchFilter = ({ onSearch, placeholder = "Search..." }) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search size={18} className="text-gray-500" />
      </div>
      <input
        type="search"
        className="block w-full p-2.5 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
        placeholder={placeholder}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchFilter;