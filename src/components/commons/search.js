const Search = ({ value, onChange }) => (
    <input
      type="text"
      placeholder="Search..."
      value={value}
      onChange={onChange}
      className="border p-2 rounded max-w-72 text-black"
    />
  );
  export default Search;