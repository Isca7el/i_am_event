import {CardComponent} from "../card/card.component";
import styles from './Content.module.css';

export const ContentComponent = (props) => {
    const data = props.data?.flights;

    return (
        <div className={styles.content}>
            <div className={styles.container}>
                {
                    data?.length === 0 ? <h3>В данном направлении билеты отутсвуют</h3>
                        :
                        data?.map((item) => {
                            return (

                                <CardComponent item={item} key={item.id}/>

                            )
                        })
                }
            </div>
        </div>
    )
}