import clsx from "clsx";
import { forwardRef } from "react";
import styles from "./TextArea.module.scss";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  id: string;
  required: boolean;
  errorMessage?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea({ label, id, required, errorMessage, ...props }, ref) {
    return (
      <div className={styles.group}>
        <label htmlFor={id}>
          <span className={styles.labelText}>
            {required ? `${label}*` : label}
          </span>
          <textarea
            id={id}
            {...props}
            ref={ref}
            aria-required={required}
            className={clsx(styles.textarea, {
              [styles.invalid]: !!errorMessage,
            })}
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
