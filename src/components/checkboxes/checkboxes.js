import {useState} from "react";
import {useSort} from "../../hooks/useSort";
import styles from './Checkboxes.module.css';

export const Checkboxes = (props) => {
    const {
        arr,
        defaultData,
        setChangedData,
        data
    }
        = props;

    const [selectedPriceValue, setSelectedPriceValue] = useState('');

    const sortDataByPrice = useSort(data, selectedPriceValue);

    const handlePriceChange = (e) => {
        const {checked, value} = e.target;

        if (checked) {
            setSelectedPriceValue(value);
            setChangedData({...sortDataByPrice});
        } else {
            setSelectedPriceValue('');
            setChangedData({...defaultData});
        }
    }

    return (
        <div >
            {
                arr.map((item, i) => {
                    return (
                        <div className={styles.checkboxes}>
                            <label key={i} className={styles.label} htmlFor={item.label}>{item.value}</label>
                            <input id={item.id}  checked={selectedPriceValue === item.id} value={item.id}
                                   type="checkbox" onChange={handlePriceChange}/>
                        </div>
                    )
                })
            }
        </div>
    )
}