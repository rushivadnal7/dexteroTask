// import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Accounts from "./pages/Accounts"
import { Provider } from "react-redux"
import Dashboard from "./pages/Dashboard"
import store from "./store/store"
import FormPage from "./pages/FormPage"

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Dashboard />,
    },
    {
      path: '/profile',
      element: <FormPage />,
    },
    {
      path: '/accounts',
      element: <Accounts />,
    },
  ])
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  )
}

export default App
