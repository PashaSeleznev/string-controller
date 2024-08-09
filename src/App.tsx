import { Provider} from "react-redux"
import { reduxStore } from "./reduxStore"
import Header from "./components/Header"
import MainField from "./pages/MainField"
import List from "./components/List"

function App() {
  return (
    <Provider store={reduxStore}>
      <Header />
      <div className="main">
        <List />
        <MainField /> 
      </div>
    </Provider>
  )
}

export default App

