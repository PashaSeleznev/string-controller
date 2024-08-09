import { useDispatch } from "react-redux"
import { updateAction } from "../reducers/actions"
import { AppDispatch } from "../reduxStore"
import { FC, KeyboardEvent, useState, useEffect } from "react"
import { Row } from "../pages/MainField"

type UpdateFormRowProps = {
    setEditingRow: (row: Row | null) => void,
    editingRow: Row | null,
    id: number
}

const UpdateRowForm: FC<UpdateFormRowProps> = ({setEditingRow, editingRow, id}) => {
    const dispatch = useDispatch<AppDispatch>()
    const [editedRow, setEditedRow] = useState<Row | null>(null)
    
    const handleUpdate = (id: number) => {
        dispatch(updateAction({id, editedRow, setEditingRow}))
      }

    const handleKeyUpdate = (e: KeyboardEvent<HTMLInputElement>, id: number) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleUpdate(id)
        }
    }

    useEffect(() => {
        if (editingRow) {
          setEditedRow({...editingRow})
        }
      }, [editingRow])     

    return (
        <div className="row-update-form">
          <input
           type="text"
           style={{width: '639px'}} 
           value={editedRow?.rowName || ''}
           onChange = {(e) => setEditedRow(editedRow ? {...editedRow, rowName: e.target.value} : null)} 
           onKeyDown={(e) => handleKeyUpdate(e, id)} 
          />
          <input
           type="number" 
           style={{width: '176px', marginLeft: '12px'}}
           value={editedRow?.salary || 0}
           onChange = {(e) => setEditedRow(editedRow ? {...editedRow, salary: Number(e.target.value)} : null)} 
           onKeyDown={(e) => handleKeyUpdate(e, id)} 
          />
          <input
           type="number"
           style={{width: '176px', marginLeft: '12px'}}
           value={editedRow?.equipmentCosts || 0} 
           onChange = {(e) => setEditedRow(editedRow ? {...editedRow, equipmentCosts: Number(e.target.value)} : null)} 
           onKeyDown={(e) => handleKeyUpdate(e, id)}
          />
          <input
           type="number"
           style={{width: '176px', marginLeft: '12px'}}
           value={editedRow?.overheads || 0}
           onChange = {(e) => setEditedRow(editedRow ? {...editedRow, overheads: Number(e.target.value)} : null)}
           onKeyDown={(e) => handleKeyUpdate(e, id)} 
          />
          <input
           type="number"
           style={{width: '176px', marginLeft: '12px', marginRight: '24px'}}
           value={editedRow?.estimatedProfit || 0} 
           onChange = {(e) => setEditedRow(editedRow ? {...editedRow, estimatedProfit: Number(e.target.value)} : null)} 
           onKeyDown={(e) => handleKeyUpdate(e, id)} />
        </div>
    )
}

export default UpdateRowForm