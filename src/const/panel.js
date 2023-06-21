export const rangesArr = ['price', 'stops', 'totalFlightTime'];
export const range = {
    price: {
        title: 'Фильтр по стоимости',
        min: '',
        max: '',
        currentValue: ''
    },
    stops: {
        title: 'Фильтр по количеству пересадок',
        min: '',
        max: '',
        currentValue: '',
    },
    totalFlightTime: {
        title: 'Фильтр по общему времени полета',
        min: '',
        max: '',
        currentValue: '',
    }
};

export const sortByValue = [
    {
        label: "cheap", value: "от дешёвого", id: "cheap"
    },
    {
        label: "expensive", value: "от дорогого", id: "expensive"
    }
];

export const sortByTransfer = [
    {
        label: "min", value: "от минимального", id: "min"
    },
    {
        label: "max", value: "к максимальному", id: "max"
    }
];

