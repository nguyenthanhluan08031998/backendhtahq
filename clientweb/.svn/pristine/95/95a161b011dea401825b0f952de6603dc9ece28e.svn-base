import { useState, useEffect } from 'react'
import * as api from '../services/DictionaryManagementAPI'
import { EditorUtils } from "@progress/kendo-react-editor";
import { getURLParamsKey } from "@/app/utils/dataService"
import { useTranslation } from "react-i18next";

export const useItem = ({ notification, location }) => {
    const { t } = useTranslation()
    const id = getURLParamsKey(location.search, "Id")
    const [state, setState] = useState({
        page: 0,
        rowsPerPage: 10,
    })
    const { page, rowsPerPage } = state
    const [data, setData] = useState({
        ListGrid: [],
        TotalCount: 0
    })
    const [textSearch, setTextSearch] = useState("");
    const [detail, setDetail] = useState();
    const [item, setItem] = useState(api.makeNewItem)
    const [TopicOptions, setTopicOptions] = useState([])

    async function getTopicOption() {
        var list = await api.getTopicOption();
        console.log(list)
        setTopicOptions(list || [])
    }
    useEffect(() => {
        getTopicOption();
    }, [])

    async function getData() {
        let result = await api.getDictionary({ page, rowsPerPage, textSearch });
        if (result) {
            setData({
                ...result,
                ListGrid: result.ListGrid.map(x => ({
                    ...x,
                    IdTopic: x.IdTopic ? x.IdTopic = x.IdTopic.split(",").filter(x => x != "") : []
                })),
                TotalCount: result.TotalCount
            })
        }
    }
    const onSearch = (e) => {
        setTextSearch(e.target.value)
    }
    const onKeyPress = (e) => {
        if (e.which === 13 || e.keyCode === 13 || e.which === 1 || e.type === "click") {
            getData()
            setState((pre) => ({ ...pre, page: 0 }))
        }
    }
    useEffect(() => {
        getData()
    }, [page, rowsPerPage])

    const onSelect = (dataItem) => {
        setItem(dataItem)
    }

    const editorChange = e => {
        console.log(e, detail)
        if (!detail) setDetail(e);
    };

    const addOrUpdate = (dataItem) => {
        if (detail)
            dataItem.Html = EditorUtils.getHtml(detail.target.view.state);
        let newItem = { ...item, ...dataItem };
        // newItem.id = 0
        if (newItem.IdTopic) {
            newItem.IdTopic = "," + newItem.IdTopic.join(",") + ","
        }

        api.addOrUpdate(newItem).then(id => {
            if (id > 0) {
                getData()
                notification(t("Lưu thành công"), "success");
            } else {
                notification(t("Lưu thất bại"), "error");
            }
        });
    };

    const addNew = () => {
        setItem(api.makeNewItem)
    }

    const handleChangePage = (e, newPage) => {
        setState((pre) => ({ ...pre, page: newPage }));
    };

    const handleChangeRowsPerPage = (e) => {
        setState((pre) => ({ ...pre, page: 0, rowsPerPage: parseInt(e.target.value, 10) }));
    };
    return {
        state,
        data,
        item,
        TopicOptions,
        textSearch,
        onSelect,
        editorChange,
        addOrUpdate,
        addNew,
        handleChangePage,
        handleChangeRowsPerPage,
        onSearch,
        onKeyPress
    }
}
