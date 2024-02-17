import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/index.css'
import {RouterProvider} from "react-router-dom";
import {router} from "./router/index.jsx";
import {AuthenticationContextProvider} from "./context/AuthenticationContext.jsx";
import {WorkspaceListHeaderContextProvider} from "./context/WorkspaceListHeaderContextProvider.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <WorkspaceListHeaderContextProvider>
          <AuthenticationContextProvider>
              <RouterProvider router={router}/>
          </AuthenticationContextProvider>
      </WorkspaceListHeaderContextProvider>
  </React.StrictMode>,
)
