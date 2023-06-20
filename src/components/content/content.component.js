import {CardComponent} from "../card/card.component";

export const ContentComponent = (props) => {
    const data = props.data?.flights;

    return (
        data?.length === 0 ? <h3>В данном направлении билеты отутсвуют</h3>
            :
            data?.map((item) => {
                return (
                    <CardComponent item={item} key={item.id}/>
                )
            })
    )
}