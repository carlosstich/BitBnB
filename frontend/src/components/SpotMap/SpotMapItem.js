export default function SpotMapItem({ spot }) {
    return (
        <div className="SpotMapItem">
            <img src={spot.previewImage ? spot.previewImage : "/images/placeholder.png"} alt="previewImage" />
            <div className="SpotMapItemDescription">
                <div className="SpotMapItemFirstRow">
                    <div><strong>{spot.city}, {spot.state}</strong></div>
                    {spot.avgRating && (
                        <div className="SpotMapItemStarRating">
                            <i className="fa fa-star" aria-hidden="true"></i> {spot.avgRating}
                        </div>
                    )}
                </div>
                <div className="SpotMapItemPrice"><strong>${spot.price}</strong> night</div>
            </div>
        </div>
    );
}
