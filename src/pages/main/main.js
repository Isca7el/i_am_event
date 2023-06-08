import {Header} from "../../components/header/header";
import {useFetch} from "../../hooks/useFetch";
import {Fragment} from "react";

export const Main = () => {
    const data = useFetch('data/fly.json');

    return (
        <Fragment>
            <Header/>
            <div className="App">
                <div>dsfdsfdsfds</div>
                <div>dsfdsfdsfds</div>
                <div>dsfdsfdsfds</div>
                <div>dsfdsfdsfds</div>
                <div>dsfdsfdsfds</div>
                <div>dsfdsfdsfds</div>
                <div>dsfdsfdsfds</div>
            </div>
        </Fragment>
    );

}