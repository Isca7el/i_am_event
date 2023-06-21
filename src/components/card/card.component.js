import {hoursToNumber} from "../../utils/hoursToNumber";
import styles from './Card.module.css';

export const CardComponent = (props) => {
    const data = props.item;

    return (
        <div className={styles.card}>
            <div className={styles.route}>
                <h3 className={styles.text}>Маршрут</h3>
                <h4 className={styles.text}>{data?.origin} - {data?.destination}</h4>
            </div>
            <div className={styles.price}>
                <h3 className={styles.text}>Цена</h3>
                <h4 className={styles.text}>{data?.price}</h4>
            </div>
            {data?.stops > 1 ?
                <div className={styles.info}>
                    <div className={styles.container}>
                        <h3 className={styles.text}>Количество пересадок</h3>
                        <h4 className={styles.text}>{data.stops}</h4>
                    </div>
                    <div className={styles.container}>
                        <h3 className={styles.text}>Между пересадками</h3>
                        <h4 className={styles.text}>{data?.layovers.reduce((acc, item) => acc + hoursToNumber(item?.duration), 0) + 'h'}</h4>
                    </div>
                    <div className={styles.container}>
                        <h3 className={styles.text}>Время полета</h3>
                        <h4 className={styles.text}>{data.totalFlightTime}</h4>
                    </div>
                </div>
                :
                <div className={`${styles.time + ' ' + styles.container_right}`}>
                    <h3 className={styles.text}>Время полета</h3>
                    <h4 className={styles.text}>{data.totalFlightTime}</h4>
                </div>
            }
        </div>
    )
}