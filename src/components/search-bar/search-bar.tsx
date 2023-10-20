import magnifyGlass from "../../assets/magnify-glass.svg";
import "./search-bar.scss";

export default function SearchBar() {
  // async function submitSearch(keyword: string) {
  //   const encodedString = encodeURI(keyword + " ambience");
  //   const youtubeURL =
  //     `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelType=any&maxResults=25&order=relevance&q=${encodedString}&type=video&videoDuration=any&videoEmbeddable=true&videoLicense=any&videoType=videoTypeUnspecified&key=` +
  //     import.meta.env.VITE_YOUTUBE_API_KEY;
  //   console.log(keyword);

  //   FormData;
  //   const response = await fetch(youtubeURL);
  //   const videos = await response.json();

  //   console.log(videos);
  // }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.currentTarget;

    console.log(target.searchTerm.value);
  }

  return (
    <div className="search-container">
      <form method="post" onSubmit={handleSubmit}>
        <input
          name="searchTerm"
          placeholder="Search with keywords separated by commas:  Snow, Lord of the Rings, Calm"></input>
        <button type="submit">
          <img src={magnifyGlass} alt="magnify glass" />
        </button>
      </form>
    </div>
  );
}
