import styles from "./Footer.module.css";
export default function Footer() {
  const today = new Date();
  const formattedDate = `${today.getDate()}/${
    today.getMonth() + 1
  }/${today.getFullYear()}`;

  return (
    <footer className={styles.footer}>
      <p>©</p>
      <p>Ngoc Kim Ngan Nguyen - 21519232</p>
      <p>{formattedDate}</p>
    </footer>
  );
}
