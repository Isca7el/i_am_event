import {HeaderComponent} from "../../components/header/header.component";
import {useFetch} from "../../hooks/useFetch";
import {Fragment, useState} from "react";
import {LoadingComponent} from "../../components/loading/loading.component";

import {ContentComponent} from "../../components/content/content.component";

export const MainPage = () => {
    const [currentData, setCurrentData]=useState([]);
    const data = useFetch('data/fly.json', setCurrentData);

    return (
            <Fragment>
                <HeaderComponent/>
                {
                    data.isLoading ? <LoadingComponent/> :
                    <ContentComponent data={currentData}/>
                }
            </Fragment>
    );
}