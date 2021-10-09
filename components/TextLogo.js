import styles from '../components/TextLogo.module.css'
import Link from 'next/link';
import Logo from './Logo';

const TextLogo = () =>{
  return (
    <div className={styles.box}>
      <div className={styles.sproutlogo}><Logo/></div>
      <Link href="/"><a className={styles.logo}>예발자닷컴</a></Link>
      <span className={styles.content}>예비개발자에게 필요한 정보를 제공합니다</span>
    </div>
  );
}

export default TextLogo;