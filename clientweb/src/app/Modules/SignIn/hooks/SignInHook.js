import { useState, useEffect } from 'react'
import * as api from "../services/SignInAPI"
import { useTranslation } from "react-i18next";
export const useItem = ({ history, notification }) => {
    const { t } = useTranslation()
    const addOrUpdate = async (dataItem) => {
        const newItem = {
            Id: 0,
            Name: "",
            Email: "",
            Password: "",
            ...dataItem
        }
        if (newItem.Password != newItem.ConfirmPassword) {
            notification("Nhập lại mật khẩu không đúng", "error")
            return
        }
        else {
            delete newItem.ConfirmPassword
        }
        api.signUp(newItem).then(result => {
            if (result.IdUser > 0) {
                notification(t("Đăng kí thành công"), "success")
                history.push('/dangnhap')
            }
            else {
                if (result.exist) {
                    notification("Email này đã được sử dụng", "error")
                }
                else
                    notification(t("Đăng kí thất bại"), "error")
            }
        })
    }
    return {
        addOrUpdate
    }
}
