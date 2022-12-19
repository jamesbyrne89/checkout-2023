import styles from "./LatestComments.module.scss";

export interface Comment {
  fullName: string;
  email: string;
  text: string;
  id: string;
  rating: 1 | 2 | 3 | 4 | 5;
}

interface LatestCommentsProps {
  comments: Comment[];
}

export const LatestComments = ({ comments = [] }: LatestCommentsProps) => {
  return (
    <div>
      <h2 className={styles.title}>Latest comments</h2>
      <ul className={styles.list}>
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <li key={comment.id} className={styles.comment}>
              <div className={styles.email}>{comment.email}</div>
              <div>{comment.text}</div>
            </li>
          ))
        ) : (
          <div>No comments yet.</div>
        )}
      </ul>
    </div>
  );
};
