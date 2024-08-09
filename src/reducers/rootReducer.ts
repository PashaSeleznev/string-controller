import { Row } from "../pages/MainField"
import { ActionType } from "./actionType"

export type Rows = Row[]

type initialStateProps = {
  rows: Rows,
  error: null | string
}

const initialState: initialStateProps = {
    rows: [],
    error: null,
}

const addRow = (rows: Rows, newRow: Row, parentId: number | null): Rows => {
    if (parentId === null) {
      return [...rows, newRow]
    }

    return rows.map(row => {
      if (row.id === parentId) {
        return {
          ...row,
          child: [...(row.child || []), newRow]
        };
      }

      if (row.child) {
        return {
          ...row,
          child: addRow(row.child, newRow, parentId)
        };
      }
  
      return row;
    });
  };

const deleteRowAndChildren = (rows: Row[], id: number): Row[] => {
    return rows.reduce((acc, row) => {
        if (row.id === id) {
          return acc;
        }

        const newRow = { ...row };
    
        if (row.child.length > 0) {
          newRow.child = deleteRowAndChildren(row.child, id);
        }
    
        acc.push(newRow);
        return acc;

      }, [] as Row[]);
    };

const updateRowInTree = (rows: Row[], id: number, updatedRow: Partial<Row>): Row[] => {
    return rows.map((row) => {
      if (row.id === id) {
        return { ...row, ...updatedRow };
      } 
      
      if (row.child.length > 0) {
        return { ...row, child: updateRowInTree(row.child, id, updatedRow) };
      } 

      return row;
    });
  }

export const rootReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {

        case 'FETCH_DATA_SUCCESS':
            return {
                ...state,
                rows: action.payload
            }

        case 'FETCH_DATA_FAILURE':
            return {
                ...state,
                error: action.payload
            }

        case 'ADD_ROW':
            return {
                ...state,
                rows: addRow(state.rows, action.payload, action.payload.parentId)
            }

        case 'DELETE_ROW':
              return { 
                ...state, 
                rows: deleteRowAndChildren(state.rows, action.payload), 
              }

        case 'UPDATE_ROW':
            return {
                ...state,
                rows: updateRowInTree(state.rows, action.payload.id, action.payload.editedRow)
            }

        default:
            return state
    }
}