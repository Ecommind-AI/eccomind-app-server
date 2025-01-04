import { useState } from "react";
import "./ProductDescription.css";

export const ProductDescription = ({
  description,
}: {
  description: string;
}) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Function to detect if the text contains Hebrew characters
  const isHebrewText = (text: string) => /[\u0590-\u05FF]/.test(text);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const getShortenedDescription = (description: string) => {
    const maxLines = 2;
    const charLimit = maxLines * 50;
    return description.length > charLimit ? (
      <>
        {showFullDescription ? description : description.slice(0, charLimit)}
        <span onClick={toggleDescription} className="more-less-button">
          {showFullDescription ? " less" : " more..."}
        </span>
      </>
    ) : (
      <>{description}</>
    );
  };

  return (
    <div
      className="product-description"
      dir={isHebrewText(description) ? "rtl" : "ltr"} // ✅ Dynamically set text direction
    >
      {getShortenedDescription(description)}
    </div>
  );
};
