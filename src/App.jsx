import { useState } from 'react'
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Layout from './components/Layout';
import GiveConsent from './components/GiveConsent';
import Consents from './components/Consents';
import NoMatch from './components/NoMatch';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './App.scss'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App() {
  const [page, setPage] = useState('give_consent');
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="header"><h1>Didomi</h1></div>
      <Routes>
        <Route path="/" element={<Layout page={page} setPage={setPage}/>}>
          <Route path="give-consent" element={<GiveConsent setPage={setPage}/>} />
          <Route path="consents" element={<Consents />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </ThemeProvider>
  )
}

