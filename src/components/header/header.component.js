import '../../App.css';
import styles from './Header.module.css';
export const HeaderComponent = () => {
    return(
      <header className={styles.header}>
          <div className="container">
              <h1 className={styles.title}>Список авиабилетов</h1>
          </div>
      </header>
    );
}