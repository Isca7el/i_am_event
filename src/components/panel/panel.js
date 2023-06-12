import {useSort} from "../../hooks/useSort";
import {useEffect, useState} from "react";

export const Panel = (props) => {
    const data = props.data;
    const setChangedData = props.setChangedData;

    const[sortValue, setSortValue]=useState({});
    const[selectedPriceValue, setSelectedPriceValue] = useState('');


    const sortDataByPrice = useSort(data, selectedPriceValue);

    const sortByValue = [
        {
            label: "cheap", value: "от дешёвого", id: "cheap"
        },
        {
            label: "expensive", value: "от дорогого", id: "expensive"
        }
    ];

    const sortByTransfer = [
        {
            label: "min", value: "от минимального", id: "min"
        },
        {
            label: "max", value: "к максимальному", id: "max"
        }
    ];

    const handlePriceChange = (e) => {
        e.stopPropagation();
        const {checked, value} = e.target;
        console.log(e.target)



        console.log(checked);
        if(checked){
            setSelectedPriceValue(value);
            setChangedData({...sortDataByPrice});
        } else {
            setSelectedPriceValue('');
        }
        console.log(sortDataByPrice);
    }

     return (
         <div>
             <div>
                 <h3>Сортировка по стоимости</h3>
                 <div className="price">
                     {
                         sortByValue.map((item, i) => {
                             return(
                                 <label key={i} htmlFor={item.label}>{item.value}
                                     <input id={item.id} checked={selectedPriceValue === item.id} value={item.id} type="checkbox" onChange={handlePriceChange}/>
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
                            return(
                                <label key={i} htmlFor={item.label}>{item.value}
                                    <input id={item.id} checked={selectedPriceValue === item.id} value={item.id} onChange={handlePriceChange} type="checkbox"/>
                                </label>
                            )
                        })
                    }
                </div>
            </div>
         </div>


     )
}