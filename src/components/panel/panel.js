import {useSort} from "../../hooks/useSort";
import {useEffect, useState} from "react";
import {getCountedValues} from "../../utils/getCountedValyes";
import {getMin} from "../../utils/getMin";
import {getMax} from "../../utils/getMax";
import {rangesArr, range, sortByTransfer, sortByValue} from "../../const/panel";
import {Ranges} from "../ranges/ranges";

export const Panel = (props) => {
    const {data, setChangedData, defaultData} = props;

    const [searchTermByOrigin, setSearchTermByOrigin] = useState('');
    const [searchTermByDestination, setSearchTermByDestination] = useState('');
    const [searchTermArr, setSearchTermArr] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [searchTermId, setSearchTermId] = useState('');

    const [filter, setFilter] = useState('');
    let [filterArr, setFilterArr] = useState({});
    const [filterProp, setFilterProp] = useState('');

    const [selectedPriceValue, setSelectedPriceValue] = useState('');

    const [dataForSearching, setDataForSearching] = useState(true);

    const sortDataByPrice = useSort(data, selectedPriceValue);

    const [rangeValues, setRangeValues]
        = useState(range);

    const isDataSearched = (array) => {
        return array?.flights?.length >= defaultData.flights?.length;
    }

    useEffect(() => {
        if (searchTermByOrigin === '' && searchTermByDestination === '') {
            setChangedData({...defaultData});
            return;
        }

        let res = searchByTerm(searchTermArr);

        const Debounce = setTimeout(() => {
            setChangedData({...res});
        }, 300);

        return () => clearInterval(Debounce);
    }, [searchTerm, searchTermByOrigin, searchTermByDestination]);

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

    const handleSearchTerm = (e) => {
        let searchTermId = e.target.id;
        let searchTermValue = e.target.value;
        setSearchTermId(searchTermId);
        searchTermId === 'origin' ? setSearchTermByOrigin(searchTermValue) : setSearchTermByDestination(searchTermValue);
        setSearchTerm('' + searchTermValue);

        setSearchTermArr({...searchTermArr, [searchTermId]: searchTermValue});
    }

    function addOrRemoveValueFilterArray(prop, value) {
        setFilterArr({...filterArr, [prop]: value});
    }

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

    function filterObjectByTerm(data, prop, value){
        return {
            flights: [...data.flights?.filter(item => {
                return item[prop]?.toLowerCase().includes(value?.toLowerCase())
            })]
        }
    }

    useEffect(() => {
        let res = filterByFilterArr(filterArr, defaultData, data);

        setChangedData(res);
    }, [filterArr])

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

    function searchByTerm(obj){
        let res = defaultData;

        if (!searchTermArr.origin && !searchTermArr.destination){
            return res;
        }

        let keys = Object.keys(obj);
        let values = Object.values(obj);

        for (let i = 0; i < keys.length; i++) {
            res = filterObjectByTerm(res , keys[i], values[i]);
        }

        return res;
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
            <div>
                <h3>Сортировка по стоимости</h3>
                <div className="price">
                    {
                        sortByValue.map((item, i) => {
                            return (
                                <label key={i} htmlFor={item.label}>{item.value}
                                    <input id={item.id} checked={selectedPriceValue === item.id} value={item.id}
                                           type="checkbox" onChange={handlePriceChange}/>
                                </label>
                            )
                        })
                    }
                </div>
            </div>
            <div>
                <h3>Сортировка по пересадкам</h3>
                <div className="transfer">
                    {
                        sortByTransfer.map((item, i) => {
                            return (
                                <label key={i} htmlFor={item.label}>{item.value}
                                    <input id={item.id} checked={selectedPriceValue === item.id} value={item.id}
                                           onChange={handlePriceChange} type="checkbox"/>
                                </label>
                            )
                        })
                    }
                </div>
            </div>
            <div>
                <div>
                    <input id="origin"
                           value={searchTermByOrigin}
                           autoFocus
                           autoComplete="off"
                           placeholder="Введите город отправки"
                           type="text"
                           onChange={handleSearchTerm}
                    />
                </div>
                <div>
                    <input id="destination"
                           value={searchTermByDestination}
                           autoFocus
                           autoComplete="off"
                           placeholder="Введите город прибытия"
                           type="text"
                           onChange={handleSearchTerm}
                    />
                </div>
            </div>


            <Ranges defaultData={defaultData}
                    searchTermByOrigin={searchTermByOrigin}
                    searchTermByDestination={searchTermByDestination}
                    setChangedData={setChangedData}
                    data={data}
            />
            {/*<div>*/}

            {/*    {*/}
            {/*        rangesArr.map((item, i) => {*/}
            {/*            return (*/}
            {/*                <div key={i}>*/}
            {/*                    <div style={{"display": "flex", "flexDirection": "row"}}>*/}
            {/*                        <h3>{rangeValues[item].min}</h3><h3>{rangeValues[item].currentValue}</h3>*/}
            {/*                        <h4>{rangeValues[item].max}</h4></div>*/}
            {/*                    <input min={rangeValues[item].min} max={rangeValues[item].max}*/}
            {/*                           value={rangeValues[item].currentValue} id={item} type="range"*/}
            {/*                           onChange={handleRangeValues}/>*/}
            {/*                </div>*/}
            {/*            )*/}
            {/*        })*/}
            {/*    }*/}

            {/*    <button onClick={resetFilter}>Сбросить стили</button>*/}
            {/*</div>*/}
        </div>

    )
}