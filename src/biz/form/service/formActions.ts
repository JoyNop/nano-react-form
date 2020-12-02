/*
 * @Author: your name
 * @Date: 2020-11-30 18:04:34
 * @LastEditTime: 2020-12-01 17:34:39
 * @LastEditors: HanRui(JoyNop)
 * @Description: In User Settings Edit
 * @FilePath: /nano-react-form/src/biz/form/service/formActions.ts
 */
import { Dispatch } from "redux";
import axios from "@/utils/http";
import { FormTypes } from "@/store/types";

import { IInitialState } from "@/store/types";

export const getTodoList = () => async (dispatch: Dispatch<IInitialState>) => {
  dispatch({ type: FormTypes.FORM_FETCH_LOADING });
  try {
    const res = await axios.get(`/todos`);
    dispatch({ type: FormTypes.FORM_FETCH_LOADING, payload: res.data });
  } catch (error) {
    dispatch({ type: FormTypes.FORM_FETCH_LOADING });
  }
};

/**
 * @description 存储FormContent
 * @param {any[]} content
 */
export const setFormContent = (content: any[]) => async (
  dispatch: Dispatch<IInitialState>
) => {
  dispatch({ type: FormTypes.FORM_SET_CONTENT, payload: content });
};

/**
 *
 * @description 保存activeID
 * @param {string} activeId
 */
export const setFormActiveId = (activeId: string) => async (
  dispatch: Dispatch<IInitialState>
) => {
  dispatch({ type: FormTypes.FORM_SET_ACTIVE_ID, payload: activeId });
};

/**
 *
 * @description 修改整体表单的布局配置
 * @param {string} key 对应的key
 * @param {string} value 对应的value
 */

export const updateFormConfig = (key: string, value: string) => async (
  dispatch: Dispatch<IInitialState>
) => {
  dispatch({ type: FormTypes.FORM_UPDATE_CONFIG, payload: { key, value } });
};

/**
 * @description: 控制展示类型
 * @param {*} type
 * @return {*}
 */
export const setFormClientMode = (type: "pc" | "phone") => async (
  dispatch: Dispatch<IInitialState>
) => {

  dispatch({ type: FormTypes.FORM_SET_CLIENT_MODE, payload: type });

};
