import Link from "next/link";
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
      <div className={styles.videoLink}>
        <p>Link to Assignment 2 videos:</p>
        <Link href="https://drive.google.com/drive/u/2/folders/1MVmsYmRUguyPDn-7B-SVXBOYSbSqXaRD" target="_blank">
          View Videos on Google Drive
        </Link>
      </div>
    </div>
  );
}
