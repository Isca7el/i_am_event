import {range, rangesArr} from "../../const/panel";
import {useEffect, useState} from "react";
import {getCountedValues} from "../../utils/getCountedValyes";
import {getMin} from "../../utils/getMin";
import {getMax} from "../../utils/getMax";

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
    }, [searchTermByOrigin, searchTermByDestination, defaultData]);

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
        setChangedData(defaultData)
    }

    return (
        <div>
            {
                rangesArr.map((item, i) => {
                    return (
                        <div key={i}>
                            <div style={{"display": "flex", "flexDirection": "row"}}>
                                <h3>{[item].min}</h3><h3>{rangeValues[item].currentValue}</h3>
                                <h4>{rangeValues[item].max}</h4></div>
                            <input min={rangeValues[item].min} max={rangeValues[item].max}
                                   value={rangeValues[item].currentValue} id={item} type="range"
                                   onChange={handleRangeValues}/>
                        </div>
                    )
                })
            }
            <button onClick={resetFilter}>Сбросить стили</button>
        </div>
    )
}