import React, { useEffect, useState } from "react";
import * as api from '../services/LearnEnglishByTopicAPI';
export const useItem = () => {
    const [dataTopic, setDataTopic] = useState({
        ListGrid: [],
        TotalCount: 0
    });
    const [dataVocabulary, setDataVocabulary] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState(0);
    const [state, setState] = useState({
        page: 0,
        rowsPerPage: 10,
    })
    const { page, rowsPerPage } = state
    const getDataListTopic = async () => {
        let data = await api.getDataListTopic({ page, rowsPerPage });
        if (data) {
            if (data.ListGrid.length > 0) {
                setSelectedTopic(data.ListGrid[0].Id)
                getListVocabularyByTopic(data.ListGrid[0].Id)
            }
            setDataTopic(data)
        }
    }
    useEffect(() => {
        getDataListTopic(page, rowsPerPage)
    }, [page, rowsPerPage])

    const getListVocabularyByTopic = async (idTopic) => {
        let data = await api.getListVocabularyByTopic(idTopic);
        setDataVocabulary(data)
    }
    const onClickTopic = (Topic) => {
        setSelectedTopic(Topic.Id)
        getListVocabularyByTopic(Topic.Id)
    }
    return {
        selectedTopic,
        dataTopic,
        dataVocabulary,
        onClickTopic
    }
}