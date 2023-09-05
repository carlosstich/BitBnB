import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./SpotDetails.css";
import { getSpotDetails } from "../../store/spotDetails";
import Header from "../NavBar/TopBar";
import Reviews from "../Review/Reviews";
import { getReviews } from "../../store/reviews";

export default function SpotDetails() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const spotDetails = useSelector((state) => state.spotDetails);
  const reviews = useSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(getSpotDetails(spotId));
  }, [dispatch, spotId]);

  useEffect(() => {
    dispatch(getReviews(spotId));
  }, [dispatch, spotId]);

  if (!spotDetails || !spotDetails.Spot) {
    return (
      <div className="SpotDetails">
        <h1>Spot not found</h1>
      </div>
    );
  }

  const previewImageUrl = spotDetails.Spot.SpotImages?.find(
    (image) => image.preview
  )?.url;
  const nonPreviwImages =
    spotDetails.Spot.SpotImages?.filter((image, i) => !image.preview) || [];

  const averageStars = reviews
    ? reviews.reduce((acc, review) => acc + review.stars, 0) / reviews.length
    : 0;

  const totalReviews = reviews ? reviews.length : 0;

  return (
    <div className="SpotDetailsWrapper">
      <Header className="TopBar" />
      <div className="SpotDetails">
        <div className="SpotNameLocation">
          <h2>{spotDetails.Spot.name}</h2>
          <p>{`${spotDetails.Spot.city}, ${spotDetails.Spot.state}, ${spotDetails.Spot.country}`}</p>
        </div>
        <div className="SpotImages">
          <img
            className="SpotImagesLeft"
            src={previewImageUrl}
            alt={previewImageUrl}
          />
          <div className="SpotImagesRight">
            <div className="SpotImagesRightRow">
              {nonPreviwImages
                .filter((image, i) => i <= 1)
                .map((image, i) => (
                  <img src={image.url} alt={image.url} key={i} />
                ))}
            </div>
            <div className="SpotImagesRightRow">
              {nonPreviwImages
                .filter((image, i) => i >= 2)
                .map((image, i) => (
                  <img src={image.url} alt={image.url} key={i} />
                ))}
            </div>
          </div>
        </div>
        <div className="SpotDetailsBodyAndPriceWrapper">
          <div className="SpotDetailsBody">
            <h2>
              Hosted by {spotDetails.Spot.User?.firstName}{" "}
              {spotDetails.Spot.User?.lastName}
            </h2>
            <div className="SpotDetailsDescription">
              {spotDetails.Spot.description}
            </div>
          </div>
          <div className="PriceAndRatingBox">
  <div className="PriceRatingWrapper">
    <div className="PriceTopRight">
      Price: ${spotDetails.Spot.price} night
    </div>
    <div className="RatingTopRight">
      {totalReviews === 0 ? (
        "New"
      ) : (
        <>
          {averageStars.toFixed(1)} <i className="fa fa-star"></i>
        </>
      )}
    </div>
  </div>
  <button
    className="ReserveButton"
    onClick={() => alert("Feature coming soon!")}
  >
    Reserve
  </button>
</div>
        </div>

        <hr className="black-line" />
        <div className="ReviewsSection">
          <div className="rating-wrapper">
            <i className="fa fa-star" aria-hidden="true"></i>
            {totalReviews === 0 ? (
              <span className="average-rating">New</span>
            ) : (
              <>
                <span className="average-rating">
                  {averageStars.toFixed(1)}
                </span>
                <span className="dot-divider">&middot;</span>
                <span className="total-reviews">
                  {totalReviews === 1
                    ? `${totalReviews} Review`
                    : `${totalReviews} Reviews`}
                </span>
              </>
            )}
          </div>
          {reviews && spotDetails && (
            <Reviews spot={spotDetails} reviews={reviews} />
          )}
        </div>
      </div>
    </div>
  );
}
