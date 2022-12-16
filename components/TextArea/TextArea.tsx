import styles from "./TextArea.module.scss";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  id: string;
}

export const TextArea = ({ label, id }: TextAreaProps) => {
  return (
    <div className={styles.group}>
      <label htmlFor={id}>
        <span className={styles.labelText}>{label}</span>
        <textarea id={id} />
      </label>
    </div>
  );
};
