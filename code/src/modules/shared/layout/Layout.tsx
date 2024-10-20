import styles from "./Layout.module.css";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return <div className={styles["app-layout"]}>{children}</div>;
}
