import { PropsWithChildren } from "react";
import styles from "./Page.module.scss";

export const Page = ({ children }: PropsWithChildren) => {
  return <main className={styles.main}>{children}</main>;
};
