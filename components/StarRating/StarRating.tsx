import React from "react";
import { StarEmptyIcon } from "components/icons";
import styles from "./StarRating.module.scss";

export const StarRating = ({ max = 5 }) => {
  console.log(Array(5));
  return (
    <div className={styles.stars}>{Array(max).fill(<StarEmptyIcon />)}</div>
  );
};
