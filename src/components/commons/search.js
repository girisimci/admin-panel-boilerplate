const Search = ({ value, onChange }) => (
    <input
      type="text"
      placeholder="Search..."
      value={value}
      onChange={onChange}
      className="border p-2 rounded w-72"
    />
  );
  export default Search;