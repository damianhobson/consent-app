import { Link, Outlet } from "react-router-dom";
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Layout({page, setPage}) {
  const matches = useMediaQuery('(min-width:920px)');
  return (
    <div className={`app ${matches ? 'lg' : 'sm'}`}>
      <div className="nav">
        <Link to="/give-consent" className="item">
          <Button 
            variant={page === "give_consent" ? "contained" : "outlined"}
            onClick={()=>{setPage("give_consent")}}
            aria-label="Give consent page link button">
              Give Consent
          </Button>
        </Link>
        <Link to="/consents" className="item">
          <Button 
            variant={page === "consent_list" ? "contained" : "outlined"}  
            onClick={()=>{setPage("consent_list")}}
            aria-label="Collected consent page link button">
              Collected Consents
          </Button>
        </Link>   
      </div>
      <div className="main">
        <Outlet />
      </div>
    </div>
  )
}

