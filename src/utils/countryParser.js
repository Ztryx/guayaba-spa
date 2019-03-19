import {getCode, getNameList} from "country-list";

const options = [];
Object.keys(getNameList()).forEach(function(key) {
    options.push({label: key, value: getCode(key)});
});

export default options;
