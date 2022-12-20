import { StarEmptyIcon, StarIcon } from "components/icons";
import { forwardRef, useEffect, useReducer } from "react";

import styles from "./StarRating.module.scss";

interface StarRatingProps extends React.InputHTMLAttributes<HTMLInputElement> {
  max?: number;
  onSelectionChange: (stars: number) => void;
  errorMessage?: string;
}

interface StarsState {
  selected: number;
  highlighted: number;
}

export const StarRating = forwardRef<HTMLInputElement, StarRatingProps>(
  function StarRating(
    { max = 5, onSelectionChange, errorMessage, ...props }: StarRatingProps,
    ref
  ) {
    const [stars, setStars] = useReducer(
      (data: StarsState, partialData: Partial<StarsState>): StarsState => ({
        ...data,
        ...partialData,
      }),
      { selected: 0, highlighted: 0 }
    );

    const onMouseOver = (index: number) =>
      setStars({
        ...stars,
        highlighted: index + 1,
      });
    const onClick = (index: number) =>
      setStars({
        selected: index + 1,
        highlighted: index + 1,
      });

    useEffect(() => {
      if (onSelectionChange) {
        onSelectionChange(stars.selected);
      }
    }, [stars.selected, onSelectionChange]);

    return (
      <fieldset
        role="radiogroup"
        aria-describedby={errorMessage ? "stars-error" : undefined}
        className={styles.container}
      >
        <legend>Rating*</legend>
        <div
          className={styles.stars}
          onMouseLeave={() =>
            setStars({
              ...stars,
              highlighted: 0,
            })
          }
        >
          {[...Array(max)].map((_, index) => (
            <div key={index}>
              <input
                onClick={() => onClick(index)}
                className={styles.visuallyHidden}
                type="radio"
                name="stars"
                id={`input-stars-${index + 1}`}
                value={index + 1}
                onChange={(e) =>
                  setStars({
                    selected: +e.target.value,
                    highlighted: +e.target.value,
                  })
                }
                ref={ref}
                {...props}
              />
              <label
                htmlFor={`input-stars-${index + 1}`}
                onMouseOver={() => onMouseOver(index)}
                data-testid={`${index + 1}-star`}
              >
                {index >= Math.max(stars.highlighted, stars.selected) ? (
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
