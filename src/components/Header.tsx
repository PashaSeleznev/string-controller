
const Header = () => {
    return (
        <div className="header">
            <div className="first-line">
                <img className="first-img" src="/src/images/square.png" alt="" />
                <img className="first-img" src="/src/images/back-arrow.png" alt="" />
                <p className="first-text-active">Просмотр</p>
                <p className="first-text">Управление</p>
            </div>
            <div className="second-line">
                <div>
                    <p className="project-text">Название проекта</p>
                    <p className="abbrevetry-text">Аббревиатура</p>
                </div>
                <img className="second-img" src="/src/images/list-arrow.png" alt="" />
                <p className="build-text">Строительно-монтажные работы</p>
            </div>
        </div>
    )
}

export default Header