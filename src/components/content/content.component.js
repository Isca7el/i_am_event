import {useState} from "react";
import {CardComponent} from "../card/card.component";

export const ContentComponent = (props) => {
    const data = props.data.flights;
    const [currentData, setCurrentData] = useState(data);

    return (
        currentData.map((item) => {
            return (
                <CardComponent item={item} key={item.id}/>
            )
        })
    )
}