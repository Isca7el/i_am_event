import {getMin} from "./getMin";
import {getMax} from "./getMax";

export const getMinMaxValues = (data) => {
    let minValue = getMin(data);
    let maxValue = getMax(data);

    return {
        min: minValue,
        max: maxValue
    }
}