import styles from "./about.module.css";
export default function About() {
  return (
    <div className={styles.container}>
      <div className={styles.studentInfo}>
        {/* <p>Name: Ngoc Kim Ngan Nguyen</p>
        <p>StudentId: 21519232</p> */}
      </div>
      <div className={styles.vid}>
        <iframe
          width="600"
          height="340"
          src="demo.mp4"
          title="Video"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
