import './card.css';
import {hoursToNumber} from "../../utils/hoursToNumber";

export const CardComponent = (props) => {
    const data = props.item;

    return (
        <div className="card">
            <div className="route">
                <h3>{data?.origin} - {data?.destination}</h3>
            </div>
            <div>
                <h3>{data?.price}</h3>
            </div>

            {
                data?.stops === 1 ? <h4>{data?.totalFlightTime}</h4>
                    :
                    <h4>{data?.totalFlightTime} {data?.layovers.reduce((acc, item) => acc + hoursToNumber(item?.duration), 0) + 'h'}</h4>
            }

        </div>
    )
}