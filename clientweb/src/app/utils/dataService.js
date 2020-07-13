
import axios from "axios";
import { APIPort, IpServer } from "./Port";
import store from "@/store/redux";
import { setLoading } from "@/store/redux/loading/loadingActions"
import formatDateFNS from "date-fns/format";
import isValidDateFNS from "date-fns/isValid";
import parseISO from "date-fns/parseISO";

const APIUrl = `http://${IpServer}:${APIPort}/api/`

export const getAll = (url, method) => {
    numberOfAjaxCAllPending++;
    var configHTTP = {
        url: `${APIUrl}${url}/`,
        method,
    };
    return axios(configHTTP)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error)
            return null
        });
}

export const getAllPaging = (url, e) => {
    numberOfAjaxCAllPending++;
    var params = Object.keys(e).map(key => `${key}=${e[key]}`).join('&');

    var configHTTP = {
        url: `${APIUrl}${url}/getPage?${params}`,
        method: "GET",
    };
    return axios(configHTTP)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error)
            return null
        });
}

export const addOrUpdate = (url, data) => {
    numberOfAjaxCAllPending++;
    var configHTTP = {
        url: `${APIUrl}${url}/addOrUpdate`,
        method: 'POST',
        data,
    };
    return axios(configHTTP)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error)
            return null
        });
}

export const getParams = (url, e) => {
    numberOfAjaxCAllPending++;
    var configHTTP = {
        url: `${APIUrl}${url}/${e}`,
        method: "GET",
    };
    return axios(configHTTP)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error)
            return null
        });
}

export const getFunction = (url, func) => {
    // numberOfAjaxCAllPending++;
    var configHTTP = {
        url: `${APIUrl}${url}/${func}`,
        method: 'GET',
    };
    return axios(configHTTP)
        .then((response) => {
            // store.dispatch(setLoading(false));
            return response.data;
        })
        .catch((error) => {
            // store.dispatch(setLoading(false));
            console.log(error)
            return null
        });
}

export const postFunction = (url, func, data) => {
    numberOfAjaxCAllPending++;
    var configHTTP = {
        url: `${APIUrl}${url}/${func}`,
        method: 'POST',
        data
    };
    return axios(configHTTP)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error)
            return null
        });
}

export const getURLParamsKey = (url, key) => {
    let params = new URLSearchParams(url);
    return params.get(key);
};


var numberOfAjaxCAllPending = 0;

// Add a request interceptor
axios.interceptors.request.use(
    function (config) {
        if (numberOfAjaxCAllPending > 0) {
            store.dispatch(setLoading(true));
        }
        return config;
    },
    function (error) {
        numberOfAjaxCAllPending = 0;
        store.dispatch(setLoading(false));
        return Promise.reject(error);
    }
);

// Add a response interceptor
axios.interceptors.response.use(
    function (response) {
        if (numberOfAjaxCAllPending > 0) {
            numberOfAjaxCAllPending--;
        }
        //console.log("Respone left >>>", numberOfAjaxCAllPending);
        if (numberOfAjaxCAllPending <= 0) {
            store.dispatch(setLoading(false));
        }
        return response;
    },
    function (error) {
        numberOfAjaxCAllPending = 0;
        store.dispatch(setLoading(false));
        return Promise.reject(error);
    }
);

export function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


export function formatDate(value, format = "dd/MM/yyyy") {
    let isValidDateValue = checkIsValidDate(value);
    if (isValidDateValue) {
        return typeof value === "string" ? formatDateFNS(parseISO(value), format) : formatDateFNS(value, format);
    }
    return "";
}

export function checkIsValidDate(value) {
    return value == null ? false : typeof value === "string" ? isValidDateFNS(parseISO(value)) : isValidDateFNS(value);
}