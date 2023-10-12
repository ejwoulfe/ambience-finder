export default function SearchBar() {
  function searchByKeyword() {
    let results = YouTube.Search.list("id,snippet", { q: "dogs", maxResults: 25 });
    for (let i in results.items) {
      let item = results.items[i];
    }
  }
  return (
    <div className="search-container">
      <input type="search" id="search__input" name="q" />
      <button>Search</button>
    </div>
  );
}
