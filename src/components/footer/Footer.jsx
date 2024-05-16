import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>Argun</div>
      <div className={styles.text}>
        Argun creative thoughts agency © All Rights Reserved
      </div>
    </div>
  );
};

export default Footer;
