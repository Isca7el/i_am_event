import {HeaderComponent} from "../../components/header/header.component";
import {useFetch} from "../../hooks/useFetch";
import {Fragment, useState} from "react";
import {LoadingComponent} from "../../components/loading/loading.component";

import {ContentComponent} from "../../components/content/content.component";
import {Panel} from "../../components/panel/panel";

export const MainPage = () => {
    const [currentData, setCurrentData]=useState([]);
    const data = useFetch('data/fly.json', setCurrentData);

    const setChangedData = (data) => {
        setCurrentData(data)
    }

    return (
            <Fragment>
                <HeaderComponent/>
                <Panel data={currentData} setChangedData={setChangedData}/>
                {
                    data.isLoading ? <LoadingComponent/> :
                    <ContentComponent data={currentData}/>
                }
            </Fragment>
    );
}