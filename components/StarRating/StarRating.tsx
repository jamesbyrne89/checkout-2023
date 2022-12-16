import { StarEmptyIcon, StarIcon } from "components/icons";
import { useEffect, useState } from "react";

import styles from "./StarRating.module.scss";

interface StarRatingProps {
  max?: number;
  onSelectionChange: (stars: number) => void;
}

export const StarRating = ({ max = 5, onSelectionChange }: StarRatingProps) => {
  const [stars, setStars] = useState(0);
  const [highlighted, setHighlighted] = useState(0);

  const onMouseOver = (index: number) => setHighlighted(index + 1);
  const onClick = (index: number) => {
    setStars(index + 1);
    setHighlighted(index + 1);
  };

  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(stars);
    }
  }, [stars, onSelectionChange]);

  return (
    <div className={styles.stars}>
      {Array(max)
        .fill(true)
        .map((item, index) => (
          <div key={index}>
            <input
              onClick={() => onClick(index)}
              className={styles.visuallyHidden}
              type="radio"
              name="stars"
              id={`input-stars-${index + 1}`}
              value={index + 1}
              onChange={(e) => setStars(+e.target.value)}
            />
            <label
              htmlFor={`input-stars-${index + 1}`}
              onMouseOver={() => onMouseOver(index)}
            >
              {index >= highlighted ? <StarEmptyIcon /> : <StarIcon />}
            </label>
          </div>
        ))}
    </div>
  );
};
