import {range, rangesArr} from "../../const/panel";
import {useEffect, useState} from "react";
import {getCountedValues} from "../../utils/getCountedValyes";
import {getMin} from "../../utils/getMin";
import {getMax} from "../../utils/getMax";
import styles from './Ranges.module.css';

export const Ranges = (props) => {
    const {
        defaultData,
        searchTermByOrigin,
        searchTermByDestination,
        setChangedData,
        data
    } = props;

    const [filter, setFilter] = useState('');
    const [filterArr, setFilterArr] = useState({});
    const [filterProp, setFilterProp] = useState('');
    const [rangeValues, setRangeValues]
        = useState(range);

    function filterObject(data, prop, value) {
        return {
            flights: [...data.flights?.filter(item => {
                if (typeof (item[prop]) === 'string') {
                    return parseInt(item[prop]) >= value
                } else {
                    return item[prop] >= value
                }
            })]
        }
    }

    function filterByFilterArr(obj, defData, data) {
        let currentData;
        if (searchTermByOrigin || searchTermByDestination) {
            currentData = data;
        } else {
            currentData = structuredClone(defData);
        }

        let res;

        let keys = Object.keys(obj);
        let values = Object.values(obj);

        for (let i = 0; i < keys.length; i++) {
            res = filterObject(currentData, keys[i], values[i]);
        }

        return res;
    }

    useEffect(() => {
        let res = filterByFilterArr(filterArr, defaultData, data);

        setChangedData(res);
    }, [filterArr]);

    useEffect(() => {
        const Debounce = setTimeout(() => {
            let updatedRangesValues = setRangeValue(data);

            for (let key in updatedRangesValues) {
                if (updatedRangesValues.hasOwnProperty(key)) {
                    updatedRangesValues[key].currentValue = updatedRangesValues[key].min;
                }
            }

            setRangeValues({...updatedRangesValues});
        }, 300)

        return () => clearInterval(Debounce);
    }, [defaultData]);

    function setRangeValue(obj) {
        const res = {};

        rangesArr.map(item => {
            const arr = getCountedValues(obj?.flights, item);
            res[item] = {
                min: getMin(arr),
                max: getMax(arr),
            }
        })
        return res;
    }
    function addOrRemoveValueFilterArray(prop, value) {
        setFilterArr({...filterArr, [prop]: value});
    }

    const handleRangeValues = (e) => {
        e.stopPropagation();
        let rangeId = e.target.id;
        let rangeValue = e.target.value;

        setRangeValues({
            ...rangeValues,
            [rangeId]: {
                ...rangeValues[rangeId],
                currentValue: rangeValue
            }
        });

        setFilter(rangeValue);
        setFilterProp(rangeId);
        addOrRemoveValueFilterArray(rangeId, rangeValue);
    }
    function resetFilter() {
        setChangedData({...defaultData})

        let updatedRangesValues = setRangeValue(data);
        for (let key in updatedRangesValues) {
            if (updatedRangesValues.hasOwnProperty(key)) {
                updatedRangesValues[key].currentValue = updatedRangesValues[key].min;
            }
        }

        setRangeValues({...updatedRangesValues});
    }

    return (
        <div>
            {
                rangesArr.map((item, i) => {
                    return (
                        <div key={i} className={styles.ranges}>
                            <h3 className={styles.ranges_title}>{range[item]?.title}</h3>
                            <div style={{"display": "flex", "flexDirection": "row", "width": "100%", "justifyContent": "space-between"}}>
                                <h3 className={styles.ranges_subtitle}>{rangeValues[item].min}</h3><h3 className={styles.ranges_subtitle}>{rangeValues[item].currentValue}</h3>
                                <h4 className={styles.ranges_subtitle}>{rangeValues[item].max}</h4></div>
                            <input  className={styles.range}
                                    min={rangeValues[item].min} max={rangeValues[item].max}
                                   value={rangeValues[item].currentValue} id={item} type="range"
                                   onChange={handleRangeValues}/>
                        </div>
                    )
                })
            }
            <button className={styles.button} onClick={resetFilter}>Сбросить стили</button>
        </div>
    )
}