import { Row } from "../pages/MainField"
import { AppDispatch} from "../reduxStore"
import { Rows } from "./rootReducer"

export type createActionProps = {
    newRow: Row,
    setNewRow: (row: Row) => void,
    startRow: Row,
    parentId: number | null
}

export type updateActionProps = {
  id: number,
  editedRow: Row | null,
  setEditingRow: (row: Row | null) => void
}

export const fetchDataAction = () => {
    return async(dispatch: AppDispatch) => {
        try {
          const response = await fetch('http://185.244.172.108:8081/v1/outlay-rows/entity/135130/row/list')
          const data: Rows = await response.json()
          console.log(data)
          dispatch({type: 'FETCH_DATA_SUCCESS', payload: data})
        } catch(error) {
            dispatch({type: 'FETCH_DATA_FAILURE', payload: error})
          }
      }  
}

export const createAction = ({ newRow, setNewRow, startRow, parentId }: createActionProps) => {
    return async (dispatch: AppDispatch) => {
      try {
        const response = await fetch('http://185.244.172.108:8081/v1/outlay-rows/entity/135130/row/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...newRow, parentId: parentId }),
        });

        if (response.ok) {
          const data = await response.json();
          const updatedRow = { ...newRow, id: data.current.id }; // Создаем обновленный объект
          const newRowWithParentId = { ...updatedRow, parentId: parentId };
          dispatch({ type: 'ADD_ROW', payload: newRowWithParentId });
          setNewRow({ ...startRow });
          return newRowWithParentId
        }      
      } catch (error) {
        console.log('Error creating row:', error);
      }
    };
};

export const deleteAction = (id: number) => {
    return async (dispatch: AppDispatch) => {
      try {
        const response = await fetch(`http://185.244.172.108:8081/v1/outlay-rows/entity/135130/row/${id}/delete`, {
          method: 'DELETE',
        });

        if (response.ok) {
          console.log(`Строка с ID ${id} была удалена.`);
          dispatch({ type: 'DELETE_ROW', payload: id });
        }
      } catch (error) {
        console.error('Error deleting row:', error);
      }
  };
};

export const updateAction = ({id, editedRow, setEditingRow}: updateActionProps) => {
    return async(dispatch: AppDispatch) => {
      if (editedRow) {
        try {
          const updatedRow = {
            rowName: editedRow.rowName,
            salary: editedRow.salary,
            equipmentCosts: editedRow.equipmentCosts,
            overheads: editedRow.overheads,
            estimatedProfit: editedRow.estimatedProfit,
            machineOperatorSalary: 0,
            mainCosts: 0,
            materials: 0,
            mimExploitation: 0,
            supportCosts: 0,
          }
  
          const response = await fetch (`http://185.244.172.108:8081/v1/outlay-rows/entity/135130/row/${id}/update`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedRow),
          })

          if (response.ok) {
            console.log(`Строка с ID ${id} была обновлена.`);
            dispatch({type: 'UPDATE_ROW', payload: {id, editedRow}})
            setEditingRow(null); 
          }
        } catch {
          console.log('Ошибка при обновлении')
        }
      }
    }
}