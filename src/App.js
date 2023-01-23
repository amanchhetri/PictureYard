import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import Images from "./Images";
import { useSearchParams } from "react-router-dom";

function App() {
  const [images, setImages] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("query") || "";
  const [searchInput, setSearchInput] = useState(searchTerm);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const imagesPerPage = 15;

  useEffect(() => {
    setLoading(true);
    const searchQuery = searchParams.get("query");

    const getImages = async () => {
      await axios(
        `https://api.unsplash.com/${
          searchQuery !== "" ? "search/" : ""
        }photos?client_id=${
          process.env.REACT_APP_UNSPLASH_API_KEY
        }&query=${searchQuery}&per_page=${imagesPerPage}&page=${pageNumber}`
      ).then((res) => {
        searchQuery !== "" ? setImages(res.data.results) : setImages(res.data);
        setLoading(false);
      });
    };

    getImages();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pageNumber, searchParams]);

  const handleSearchButton = () => {
    searchInput ? setSearchParams({ query: searchInput }) : setSearchParams({});
    setPageNumber(1);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearchButton();
    }
  };

  return (
    <div className="wrapper">
      <div className="display-4 my-3">PICTUREYARD</div>
      <div className="mb-5">
        <input
          className="search-input w-25 text-uppercase p-2"
          placeholder="Search here..."
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button
          variant="dark"
          className="search-button text-uppercase p-2"
          onClick={handleSearchButton}
        >
          Search
        </Button>
      </div>

      {loading ? (
        <div className="loading-spinner"></div>
      ) : images && images.length > 0 ? (
        <Images
          images={images}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          imagesPerPage={imagesPerPage}
        />
      ) : (
        <h1>No Result Found!</h1>
      )}
    </div>
  );
}

export default App;
