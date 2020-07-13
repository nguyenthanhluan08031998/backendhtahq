import { useState, useEffect } from 'react'
import * as api from '../services/TopicManagementAPI'
import { useTranslation } from "react-i18next";
import { EditorUtils } from "@progress/kendo-react-editor";
// import { notification } from "@/components/Notification/RenderNotification"

export const useItem = ({ notification }) => {
    const { t } = useTranslation()
    const [state, setState] = useState({
        page: 0,
        rowsPerPage: 10,
    })
    const { page, rowsPerPage } = state
    const [data, setData] = useState({
        ListGrid: [],
        TotalCount: 0
    })
    const [detail, setDetail] = useState();
    const [item, setItem] = useState(api.makeNewItem)

    const [dictionaryOptions,setDictionaryOptions] = useState([])

    const onInputChange = async (e) => {
        if (e) {
            console.log("onInputChange:", e)
            const list = await api.getDictionaryOptions(e)
            setDictionaryOptions(list)
            //setTextSearch(e)
            console.log('dictionaryOptions:', list)
        }
    }
    

    async function getData() {
        let result = await api.getTopic({ page, rowsPerPage });
        if (result) {
            setData(result)
        }
    }
    useEffect(() => {
        getData(page, rowsPerPage)
    }, [page, rowsPerPage])

    const onSelect = (dataItem) => {
        setItem(dataItem)
    }

    const editorChange = e => {
        if (!detail) setDetail(e);
    };

    const addOrUpdate = (dataItem) => {
        if (detail)
            dataItem.html = EditorUtils.getHtml(detail.target.view.state);
        let newItem = { ...item, ...dataItem };
        // newItem.id = 0
        // console.log("data", newItem)
        //console.log('topic sẽ add',newItem)
        api.addOrUpdate(newItem).then(id => {
            if (id > 0) {
                notification(t("Lưu thành công"), "success");
                getData()
                setItem(newItem)
                // history.push(`/quydinhthaotac/xem?Id=${id}`);
            } else {
                notification(t("Lưu thất bại"), "error");
                // notification("Lưu thất bại", "error");
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
        onSelect,
        editorChange,
        addOrUpdate,
        addNew,
        handleChangePage,
        handleChangeRowsPerPage,
        dictionaryOptions,
        onInputChange
    }
}
