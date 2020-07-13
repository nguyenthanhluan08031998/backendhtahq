import { useState, useEffect } from 'react'
import * as api from '../services/FunctionAPI'
import { EditorUtils } from "@progress/kendo-react-editor";
// import { notification } from "@/components/Notification/RenderNotification"
import { useSelector } from "react-redux"

export const useItem = (props) => {
    const currentUser = useSelector((state) => state.authService.user)
    const { history } = props
    const [data, setData] = useState([])
    async function getData() {
        let result = await api.getFuncMenu();
        if (result) {
            if (currentUser.IdRole == 2) {
                setData(result.filter(x => x.Permission != 1))
            }
            else setData(result)
        }
    }
    useEffect(() => {
        getData()
    }, [])

    const goToPage = (Link) => {
        history.push(Link)
    }
    return {
        data,
        goToPage,
    }
}
