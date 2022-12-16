import styles from "./TextInput.module.scss";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
}

export const TextInput = ({ label, id, ...props }: TextInputProps) => {
  return (
    <div className={styles.group}>
      <label htmlFor={id}>
        <span className={styles.labelText}>{label}</span>
        <input className={styles.input} id={id} type="text" {...props} />
      </label>
    </div>
  );
};
