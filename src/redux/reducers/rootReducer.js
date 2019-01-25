import {combineReducers} from "redux";
import pkList from "./pkListReducer";
import pkDetail from "./pkDetailReducer";
import pkRefine from "./pkRefineReducer";
import pkListType from "./pkListTypeReducer";
import pkSearchQuery from "./pkSearchReducer";

export default combineReducers({pkList, pkDetail, pkRefine, pkListType, pkSearchQuery});