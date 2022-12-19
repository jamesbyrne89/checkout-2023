import clsx from "clsx";
import { forwardRef } from "react";
import styles from "./TextInput.module.scss";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  required: boolean;
  errorMessage?: string;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput({ label, id, required, errorMessage, ...props }, ref) {
    return (
      <div className={styles.group}>
        <label htmlFor={id}>
          <span className={styles.labelText}>
            {required ? `${label}*` : label}
          </span>
          <input
            className={clsx(styles.input, {
              [styles.invalid]: !!errorMessage,
            })}
            id={id}
            type="text"
            {...props}
            ref={ref}
            aria-describedby={errorMessage ? `${id}-error` : undefined}
          />
        </label>
        <div id={`${id}-error`} className={styles.errorMessage}>
          {errorMessage}
        </div>
      </div>
    );
  }
);
