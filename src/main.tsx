import React, { ReactElement } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './context/auth/AuthContext.tsx';

interface AppStateProps {
    children: ReactElement | ReactElement[] | null;
}

const AppState: React.FC<AppStateProps> = ({ children }) => {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    )
}



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <AppState>
            <App />
        </AppState>
    </React.StrictMode>,
)
