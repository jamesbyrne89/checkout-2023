import Link from "next/link";
import styles from "./LatestComments.module.scss";

export interface Comment {
  fullName: string;
  email: string;
  text: string;
  submittedUtc: string;
  rating: 1 | 2 | 3 | 4 | 5;
}

interface LatestCommentsProps {
  comments: Comment[];
}

export const LatestComments = ({ comments = [] }: LatestCommentsProps) => {
  return (
    <div>
      <h2 className={styles.title}>Latest comments</h2>
      {comments.length > 0 ? (
        <ul className={styles.list}>
          {comments.map((comment) => (
            <li key={comment.submittedUtc} className={styles.comment}>
              <div className={styles.email}>{comment.email}</div>
              <div>{comment.text ?? "-"}</div>
            </li>
          ))}
        </ul>
      ) : (
        <div>
          No comments yet. Why not{" "}
          <Link href="/" className={styles.link}>
            submit one
          </Link>
          ?
        </div>
      )}
    </div>
  );
};
