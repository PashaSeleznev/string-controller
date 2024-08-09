import { FC, KeyboardEvent, useState } from "react"
import { useDispatch } from "react-redux";
import { AppDispatch } from "../reduxStore";
import { createAction } from "../reducers/actions";
import { Row } from "../pages/MainField";

type CreateRowFormProps = {
    id: number | null,
    setEditingRow: (row: Row | null) => void
}

const CreateRowForm: FC<CreateRowFormProps> = ({id, setEditingRow}) => {
    const startRow = {
        id: 0,
        child: [],
        equipmentCosts: 0,
        estimatedProfit: 0,
        machineOperatorSalary: 0,
        mainCosts: 0,
        materials: 0,
        mimExploitation: 0,
        overheads: 0,
        parentId: null,
        rowName: '',
        salary: 0,
        supportCosts: 0,
      }
    const [newRow, setNewRow] = useState<Row>(startRow)
    const dispatch = useDispatch<AppDispatch>()
    
    const handleCreate = (parentId: number | null) => {
        dispatch(createAction({ newRow, setNewRow, startRow, parentId }));
      };

    const handleKeyCreate = (e: KeyboardEvent<HTMLInputElement>, parentId: number | null) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleCreate(parentId)
          setEditingRow(null)
        }
      }
    
    return (
        <div className="row-create-form">
            <img className="row-tree-img" style={{marginRight: '180px'}} src="/src/images/tree-icon.png" />
            <input type="text" style={{width: '639px'}} value={newRow.rowName} onChange = {(e) => setNewRow({...newRow, rowName: e.target.value})} onKeyDown={(e) => handleKeyCreate(e, id)}/>
            <input type="number" style={{width: '176px', marginLeft: '12px'}} value={newRow.salary} onChange = {(e) => setNewRow({...newRow, salary: Number(e.target.value)})} onKeyDown={(e) => handleKeyCreate(e, id)}/>
            <input type="number" style={{width: '176px', marginLeft: '12px'}} value={newRow.equipmentCosts} onChange = {(e) => setNewRow({...newRow, equipmentCosts: Number(e.target.value)})} onKeyDown={(e) => handleKeyCreate(e, id)}/>
            <input type="number" style={{width: '176px', marginLeft: '12px'}} value={newRow.overheads} onChange = {(e) => setNewRow({...newRow, overheads: Number(e.target.value)})} onKeyDown={(e) => handleKeyCreate(e, id)}/>
            <input type="number" style={{width: '176px', marginLeft: '12px', marginRight: '24px'}} value={newRow.estimatedProfit} onChange = {(e) => setNewRow({...newRow, estimatedProfit: Number(e.target.value)})} onKeyDown={(e) => handleKeyCreate(e, id)}/>
        </div>
    )
}

export default CreateRowForm