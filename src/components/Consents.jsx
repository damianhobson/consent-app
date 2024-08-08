import { useState, useEffect} from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const extractConsent = (row) => {
  let str = `${row.news ? 'Receive newsletter,' : ''}
    ${row.ads ? 'Be shown targeted ads,' : ''}
    ${row.stats ? 'Contribute to statistics,' : ''}`;
    str = str.trim().slice(0, -1);
  return str
}
export default function Consents() {
  const [consents, setConsents] = useState([]);
  const [page, setPage] = useState(1);
  const [amount, setAmount] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    fetch('http://localhost:8080/consents')
      .then(response => response.json())
      .then(data => {
        setAmount(Math.ceil(data.length / rowsPerPage));
        setConsents(data);
      })
      .catch(error => console.error('Error:', error.msg));
  }, [])

  const handlePageChange = (e, value) => {
    setPage(value)
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="Consent table, listing consents by user.">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell >Email</StyledTableCell>
              <StyledTableCell >Consent given for:</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {consents.filter((item, index) => index >= (page - 1) * rowsPerPage && index < page * rowsPerPage).map((row, index) => (
              <StyledTableRow key={'consent_' + index}>
                <StyledTableCell>{row.name}</StyledTableCell>
                <StyledTableCell>{row.email}</StyledTableCell>
                <StyledTableCell>{extractConsent(row)}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination className="consentPagination" count={amount} page={page} onChange={handlePageChange} />
    </div>
  )
}

