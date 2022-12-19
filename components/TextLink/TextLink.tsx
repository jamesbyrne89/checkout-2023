import { ArrowLeftIcon } from "components/icons";
import Link from "next/link";
import styles from "./TextLink.module.scss";

interface TextLinkProps {
  label: string;
  href: string;
  arrowDirection: "left" | "right";
}

export const TextLink = ({ href, label, arrowDirection }: TextLinkProps) => {
  return (
    <Link href={href} className={styles.link}>
      {arrowDirection === "left" ? (
        <>
          <ArrowLeftIcon /> <span>{label}</span>
        </>
      ) : (
        <>
          <span>label</span>
          <ArrowRightIcon />
        </>
      )}
    </Link>
  );
};
