function FilterBar({

selectedFilters,
setSelectedFilters,

sortBy,
setSortBy

}) {
  const filters = [
    "All",
    "Fast Delivery",
    "Top Rated",
    "Pure Veg",
    "Non-Veg",
    "Offers",
    "Near You",
  ];
const toggleFilter = (filter) => {

  if (filter === "All") {
    setSelectedFilters([]);
    return;
  }

  if (selectedFilters.includes(filter)) {

    setSelectedFilters(
      selectedFilters.filter((item) => item !== filter)
    );

  } else {

    setSelectedFilters([
      ...selectedFilters,
      filter,
    ]);

  }

};
  return (
    <div className="container">

      <div className="filter-bar">

        {/* Left Side - Filter Buttons */}
        <div className="filter-options">

          {filters.map((filter) => (
            <button
              key={filter}
             className={
filter==="All"

? selectedFilters.length===0
    ? "active"
    : ""

: selectedFilters.includes(filter)
    ? "active"
    : ""
}
              onClick={() => toggleFilter(filter)}
            >
              {filter}
            </button>
          ))}

        </div>

        {/* Right Side - Sort Dropdown */}
        <div className="sort-section">

          <span>Sort:</span>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="Relevance">Relevance</option>
            <option value="Rating">Rating</option>
            <option value="Delivery Time">Delivery Time</option>
            <option value="Price">Price</option>
          </select>

        </div>

      </div>

    </div>
  );
}

export default FilterBar;