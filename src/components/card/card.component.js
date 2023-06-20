import './card.css';
import {hoursToNumber} from "../../utils/hoursToNumber";

export const CardComponent = (props) => {
    const data = props.item;

    return (
        <div className="card">
            <div className="route">
                <h3>Маршрут</h3>
                <h4>{data?.origin} - {data?.destination}</h4>
            </div>
            <div>
                <h3>Цена</h3>
                <h4>{data?.price}</h4>
            </div>
            {data?.stops > 1 ?
                <div style={{"display": "flex", "flexDirection": 'row'}}>
                    <div>
                        <h3>Количество пересадок</h3>
                        <h4>{data.stops}</h4>
                    </div>
                    <div>
                        <h3>Между пересадками</h3>
                        <h4>{data?.layovers.reduce((acc, item) => acc + hoursToNumber(item?.duration), 0) + 'h'}</h4>
                    </div>
                    <div>
                        <h3>Время полета</h3>
                        <h4>{data.totalFlightTime}</h4>
                    </div>
                </div>
                :
                <div>
                    <h3>Время полета</h3>
                    <h4>{data.totalFlightTime}</h4>
                </div>
            }
        </div>
    )
}