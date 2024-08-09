import { useEffect, useState } from "react"
import {useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootStateType } from "../reduxStore"
import { createAction, deleteAction, fetchDataAction} from "../reducers/actions"
import CreateRowForm from "../components/CreateRowForm"
import UpdateRowForm from "../components/UpdateRowForm"

export type Row = {
    id: number,
    child: Row[],
    equipmentCosts: number,
    estimatedProfit: number,
    machineOperatorSalary: number,
    mainCosts: number,
    materials: number,
    mimExploitation: number,
    overheads: number,
    parentId: number | null,
    rowName: string,
    salary: number,
    supportCosts: number,
  }

const MainField = () => {
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
      const rows = useSelector((state: RootStateType) => state.rows)
      const dispatch = useDispatch<AppDispatch>()
      const [editingRow, setEditingRow] = useState<Row | null>(null)
      const [showTrash, setShowTrash] = useState(false);
      const [loading, setLoading] = useState(true); // добавляем состояние загрузки
      
      const handleCreate = async (parentId: number | null) => {
        const createdRow = await dispatch(createAction({ newRow, setNewRow, startRow, parentId }));
        if (createdRow) {
          startEditing(createdRow)
        }
      };

      const handleDelete = (id: number) => {
        dispatch(deleteAction(id));
      };
    
      const startEditing = (row: Row) => {
        setEditingRow(row)
      }

      useEffect (() => {
        dispatch(fetchDataAction())
      }, [])

      useEffect(() => {
        setTimeout(() => {
          setLoading(false); 
        }, 200);
      }, []);

      const getChildDepth = (row: Row): number => {
        if (row.child.length === 0) {
            return 0; 
        }
    
        let totalDescendants = 0;
        for (let i = 0; i < row.child.length; i++) { 
            totalDescendants += 1 + getChildDepth(row.child[i]);
        }
        return totalDescendants; 
      };
    
      const getDepth = (row: Row): number => {
        if (row.child.length === 0) {
            return 0; 
        }
    
        let totalDescendants = 0;
        for (let i = 0; i < row.child.length - 1; i++) { 
            totalDescendants += 1 + getChildDepth(row.child[i]);
        }
        return totalDescendants + 1;
      };

      if (loading) {
        return <div style={{backgroundColor: '#202124', width: '1705px'}}></div>;
      }

      const renderRow = (row: Row) => {
        const hasChildren = row.child.length > 0;
        const depth = getDepth(row);
    
        return (
            <div>
                <div className={`row ${hasChildren ? 'has-children' : ''} depth-${depth}`} style={{ '--depth': depth, padding: '0' } as React.CSSProperties}>
                    <div onDoubleClick={() => startEditing(row)} className="row-info">
                        {!showTrash && (
                            <img
                                className="row-tree-img"
                                src="/src/images/tree-icon.png"
                                onClick={() => handleCreate(row.id)}
                                onMouseEnter={() => setShowTrash(true)}
                            />
                        )}
                        {showTrash && !editingRow && (
                            <div className="row-buttons" onMouseLeave={() => setShowTrash(false)}>
                                <img
                                    className="row-tree-img"
                                    src="/src/images/tree-icon.png"
                                    onClick={() => handleCreate(row.id)}
                                />
                                <img
                                    className="row-trash-img"
                                    src="/src/images/trash-icon.png"
                                    onClick={() => handleDelete(row.id)}
                                />
                            </div>
                        )}
                        {showTrash && editingRow && (
                          <img
                            className="row-tree-img"
                            src="/src/images/tree-icon.png"
                      />
                        )}
                        {editingRow === row ? (
                            <UpdateRowForm
                                setEditingRow={setEditingRow}
                                editingRow={editingRow}
                                id={row.id}
                            />
                        ) : (
                            <div className="row-data">
                                <p style={{width: '664px', marginTop: '4px'}}>{row.rowName}</p>
                                <p style={{width: '200px', marginTop: '4px'}}>{row.salary}</p>
                                <p style={{width: '200px', marginTop: '4px'}}>{row.equipmentCosts}</p>
                                <p style={{width: '200px', marginTop: '4px'}}>{row.overheads}</p>
                                <p style={{width: '200px', marginTop: '4px'}}>{row.estimatedProfit}</p>
                            </div>
                        )}
                    </div>
                </div>
                {hasChildren && (
                    <ul>
                        {row.child.map((childRow) => (
                            <li key={childRow.id}>
                                {renderRow(childRow)}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    };  
      return (
          <div className="main-field">
            <div className="row-features">
              <p 
               style={{width: '210px', margin: '0'}}>Уровень</p>
              <p style={{width: '664px', margin: '0'}}>Наименование работ</p>
              <p style={{width: '200px', margin: '0'}}>Основная з/п</p>
              <p style={{width: '200px', margin: '0'}}>Оборудование</p>
              <p style={{width: '200px', margin: '0'}}>Накладные расходы</p>
              <p style={{width: '200px', margin: '0'}}>Сметная прибыль</p>
            </div>
            <div className="row-list">
            {rows.length > 0 ?
              <ul>
                {rows.map((row) => (
                <li key={row.id}>{renderRow(row)}</li>))}
              </ul> : (
                <CreateRowForm 
                id = {null}
                setEditingRow={setEditingRow}
                />
              )} 
          </div>

        </div>
      )
}

export default MainField