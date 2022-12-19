import { StarEmptyIcon, StarIcon } from "components/icons";
import { forwardRef, useEffect, useState } from "react";

import styles from "./StarRating.module.scss";
import { useFormContext } from "react-hook-form";

interface StarRatingProps extends React.InputHTMLAttributes<HTMLInputElement> {
  max?: number;
  onSelectionChange: (stars: number) => void;
  errorMessage?: string;
}

export const StarRating = forwardRef<HTMLInputElement, StarRatingProps>(
  function StarRating(
    { max = 5, onSelectionChange, errorMessage, ...props }: StarRatingProps,
    ref
  ) {
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
      <fieldset
        onMouseLeave={() => setHighlighted(0)}
        role="radiogroup"
        aria-describedby={errorMessage ? "stars-error" : undefined}
        className={styles.container}
      >
        <legend>Rating*</legend>
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
                  {...props}
                />
                <label
                  htmlFor={`input-stars-${index + 1}`}
                  onMouseOver={() => onMouseOver(index)}
                >
                  {index >= Math.max(highlighted, stars) ? (
                    <StarEmptyIcon />
                  ) : (
                    <StarIcon />
                  )}
                </label>
              </div>
            ))}
        </div>
        <div id="stars-error" className={styles.errorMessage}>
          {errorMessage}
        </div>
      </fieldset>
    );
  }
);
