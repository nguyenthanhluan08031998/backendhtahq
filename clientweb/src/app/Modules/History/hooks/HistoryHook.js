import { useState, useEffect } from 'react'
import * as api from '../services/HistoryAPI'
import { useSelector } from "react-redux"

export const useItem = ({ location }) => {
    const currentUser = useSelector((state) => state.authService.user)

    const [state, setState] = useState({
        page: 0,
        rowsPerPage: 20,
    })
    const { page, rowsPerPage } = state
    const [data, setData] = useState({
        ListGrid: [],
        TotalCount: 0
    })

    async function getData(page, rowsPerPage) {
        if (currentUser.Id > 0) {
            let result = await api.getHistory({ page, rowsPerPage, IdUser: currentUser.Id });
            if (result) {
                setData(result)
            }
        }
    }

    useEffect(() => {
        getData(page, rowsPerPage)
    }, [page, rowsPerPage, currentUser])

    const handleChangePage = (e, newPage) => {
        setState((pre) => ({ ...pre, page: newPage }));
    };

    const handleChangeRowsPerPage = (e) => {
        setState((pre) => ({ ...pre, page: 0, rowsPerPage: parseInt(e.target.value, 10) }));
    };
    return {
        state,
        data,
        handleChangePage,
        handleChangeRowsPerPage
    }
}
