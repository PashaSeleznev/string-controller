import { v4 } from "uuid"

const List = () => {
    const listData: string[] = [
        'По проекту',
        'Объекты',
        'РД',
        'MTO',
        'СМР',
        'График',
        'МиМ',
        'Рабочие',
        'Капвложения',
        'Бюджет',
        'Финансирование',
        'Панорамы',
        'Камеры',
        'Поручения',
        'Контрагенты'
    ]

    return (
        <ul className="project-list">
            {listData.map((element) => (
                <li key={v4()} className={element === 'СМР' ? 'list-element-active' : 'list-element'}>
                    <img className="list-img" src="/src/images/element-icon.png" alt="" />
                    <p className='element-text'>
                        {element}
                    </p>
                </li>
            ))}
        </ul>
    )
}

export default List