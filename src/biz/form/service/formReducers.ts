/*
 * @Author: HanRui(JoyNop)
 * @Date: 2020-11-30 18:03:38
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2020-12-01 17:32:25
 * @Description: file content
 */
import { FormTypes, IInitialState } from "../../../store/types";

interface InitState {
  isLoading: boolean;
  content: any[];
  activeId: string;
  config: {
    labelAlign: "left" | "right";
    layout: string;
    size: "default";
  };
  mode: "pc" | "phone";
}

const initialState: InitState = {
  isLoading: true,
  content: [],
  activeId: "",
  config: {
    labelAlign: "left",
    layout: "horizontal",
    size: "default",
  },
  mode: "pc",
};

export const formReducer = (state = initialState, action: IInitialState) => {
  switch (action.type) {
    case FormTypes.FORM_SET_CONTENT:
      return {
        ...state,
        content: action.payload as any[],
      };

    case FormTypes.FORM_SET_ACTIVE_ID:
      return {
        ...state,
        activeId: action.payload as string,
      };

    case FormTypes.FORM_SET_CLIENT_MODE:
      return {
        ...state,
        mode: action.payload,
      };
    case FormTypes.FORM_UPDATE_CONFIG:
      let newConfig: any = state.config;
      newConfig[action.payload.key] = action.payload.value;
      return {
        ...state,
        config: newConfig,
      };
    default:
      return state;
  }
};
