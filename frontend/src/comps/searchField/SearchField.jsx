import React from "react";
import "./search.css";

function SearchField({ searchValue, setSearchValue, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        className="search-input"
        placeholder="search here..."
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button className="search-Btn">SEARCH</button>
    </form>
  );
}

export default SearchField;
