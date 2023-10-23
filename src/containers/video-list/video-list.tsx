import SearchBar from "../../components/search-bar/search-bar";

export default function VideoList(props: { setActive: React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
    <div className="video-list-container">
      <h1>HELLO</h1>
      <SearchBar setActive={props.setActive} />
    </div>
  );
}
