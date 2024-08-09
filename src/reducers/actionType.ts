import { Rows } from "./rootReducer";
import { Row } from "../pages/MainField";

export type ActionType = 
    | { type: 'FETCH_DATA_SUCCESS'; payload: Rows }
    | { type: 'FETCH_DATA_FAILURE'; payload: string }
    | { type: 'ADD_ROW'; payload: Row}
    | { type: 'DELETE_ROW'; payload: number }
    | { type: 'UPDATE_ROW'; payload: { id: number, editedRow: Row } }


