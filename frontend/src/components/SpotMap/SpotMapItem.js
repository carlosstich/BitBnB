import { useState } from "react";

export default function SpotMapItem({ spot }) {
    const [isHovered, setIsHovered] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        setTooltipPosition({ x: e.clientX, y: e.clientY });
    };

    return (
        <div className="SpotMapItem"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
        >
            {isHovered &&
                <div
                    className="tooltip"
                    style={{
                        left: `${tooltipPosition.x}px`,
                        top: `${tooltipPosition.y}px`
                    }}
                >
                    {spot.name}
                </div>
            }
            <img src={spot.previewImage ? spot.previewImage : "/images/placeholder.png"} alt="previewImage" />
            <div className="SpotMapItemDescription">
                <div className="SpotMapItemFirstRow">
                    <div><strong>{spot.city}, {spot.state}</strong></div>
                    {spot.avgRating ? (
                        <div className="SpotMapItemStarRating">
                            <i className="fa fa-star" aria-hidden="true"></i> {spot.avgRating}
                        </div>
                    ) : (
                        <div className="SpotMapItemNew">
                            New
                        </div>
                    )}
                </div>
                <div className="SpotMapItemPrice"><strong>${spot.price}</strong> night</div>
            </div>
        </div>
    );
}
