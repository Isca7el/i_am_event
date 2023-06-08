import {HeaderComponent} from "../../components/header/header.component";
import {useFetch} from "../../hooks/useFetch";
import {Fragment} from "react";
import {LoadingComponent} from "../../components/loading/loading.component";
import {CardComponent} from "../../components/card/card.component";
import {ContentComponent} from "../../components/content/content.component";

export const MainPage = () => {
    const data = useFetch('data/fly.json');

    return (
        data.isLoading ? <LoadingComponent/> :
            <Fragment>
                <HeaderComponent/>
                <ContentComponent data={data.data}/>
                {/*{*/}
                {/*    data.data.flights.map((item, i) => {*/}
                {/*        return (*/}
                {/*            <Fragment key={item.id}>*/}
                {/*                <CardComponent item={item}/>*/}
                {/*            </Fragment>*/}
                {/*        )*/}
                {/*    })*/}
                {/*}*/}
                {/*<CardComponent/>*/}
            </Fragment>
    );

}