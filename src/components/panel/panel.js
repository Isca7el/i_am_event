import {useEffect, useState} from "react";
import {sortByTransfer, sortByValue} from "../../const/panel";
import {Ranges} from "../ranges/ranges";
import {Checkboxes} from "../checkboxes/checkboxes";
import {Inputs} from "../inputs/inputs";
import styles from './Panel.module.css'

export const Panel = (props) => {
    const {data, setChangedData, defaultData} = props;

    const [searchTermByOrigin, setSearchTermByOrigin] = useState('');
    const [searchTermByDestination, setSearchTermByDestination] = useState('');

    return (
        <div className={styles.panel}>
            <div className={styles.checkboxes}>
                <div className={styles.checkboxes_item}>
                    <h3 className="title">Сортировка по стоимости</h3>
                    <Checkboxes
                        arr={sortByValue}
                        defaultData={defaultData}
                        setChangedData={setChangedData}
                        data={data}
                    />
                </div>
                <div>
                    <h3 className="title">Сортировка по пересадкам</h3>
                    <Checkboxes
                        arr={sortByTransfer}
                        defaultData={defaultData}
                        setChangedData={setChangedData}
                        data={data}
                    />
                </div>
            </div>

            <Inputs
                defaultData={defaultData}
                setChangedData={setChangedData}
            />

            <Ranges defaultData={defaultData}
                    searchTermByOrigin={searchTermByOrigin}
                    searchTermByDestination={searchTermByDestination}
                    setChangedData={setChangedData}
                    data={data}
            />
        </div>

    )
}