import {useEffect, useState} from "react";
import style from './Inputs.module.css';

export const Inputs = (props) => {
    const {
        defaultData,
        setChangedData
    } = props;

    const [searchTermByOrigin, setSearchTermByOrigin] = useState('');
    const [searchTermId, setSearchTermId] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchTermArr, setSearchTermArr] = useState({});
    const [searchTermByDestination, setSearchTermByDestination] = useState('');


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

    const handleSearchTerm = (e) => {
        let searchTermId = e.target.id;
        let searchTermValue = e.target.value;
        setSearchTermId(searchTermId);
        searchTermId === 'origin' ? setSearchTermByOrigin(searchTermValue) : setSearchTermByDestination(searchTermValue);
        setSearchTerm('' + searchTermValue);

        setSearchTermArr({...searchTermArr, [searchTermId]: searchTermValue});
    }

    function searchByTerm(obj) {
        let res = defaultData;

        if (!searchTermArr.origin && !searchTermArr.destination) {
            return res;
        }

        let keys = Object.keys(obj);
        let values = Object.values(obj);

        for (let i = 0; i < keys.length; i++) {
            res = filterObjectByTerm(res, keys[i], values[i]);
        }

        return res;
    }

    function filterObjectByTerm(data, prop, value) {
        return {
            flights: [...data.flights?.filter(item => {
                return item[prop]?.toLowerCase().includes(value?.toLowerCase())
            })]
        }
    }


    return (
        <div className={style.inputs}>
            <h3 className="title">Поиск по городу отправления</h3>
            <input id="origin"
                   value={searchTermByOrigin}
                   autoFocus
                   autoComplete="off"
                   placeholder="Введите город отправки"
                   type="text"
                   onChange={handleSearchTerm}
                   className={style.input}
            />
            <h3 className="title">Поиск по городу прилета</h3>
            <input id="destination"
                   value={searchTermByDestination}
                   autoFocus
                   autoComplete="off"
                   placeholder="Введите город прибытия"
                   type="text"
                   onChange={handleSearchTerm}
                   className={style.input}
            />
        </div>
    )
}