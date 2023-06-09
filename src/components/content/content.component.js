import {Fragment} from "react";
import {CardComponent} from "../card/card.component";

export const ContentComponent = (props) => {
    const data = props.data;

    return(
            data.flights.map((item, i) => {
                return (
                    <Fragment key={item.id}>
                        <CardComponent item={item}/>
                    </Fragment>
                )
            })
    )
}