import { Button } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function Images(props) {
  const { images, pageNumber, setPageNumber, imagesPerPage } = props;

  const handleNextButton = () => {
    setPageNumber(pageNumber + 1);
  };

  const handlePrevButton = () => {
    pageNumber > 1 && setPageNumber(pageNumber - 1);
  };

  return (
    <div>
      <div>
        <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3">
        {images.map((image, i) => (
          <div className="col">
            <LazyLoadImage
              src={image.urls.regular}
              alt={image.user.name}
              className="image"
              width="100%"
              effect="blur"
              key={i}
            />
          </div>
        ))}
        </div>
      </div>

      <div className="my-5">
        <Button
          disabled={pageNumber === 1}
          variant="dark"
          className="page-button"
          onClick={handlePrevButton}
        >
          Prev
        </Button>{" "}
        <Button
          disabled={images.length < imagesPerPage}
          variant="dark"
          className="page-button"
          onClick={handleNextButton}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
