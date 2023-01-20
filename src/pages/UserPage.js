import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useState } from 'react';
// @mui
import {
  Grid,
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Pagination,
  TableHead
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import usePagination from '../components/Pagination';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import useFetch from '../api/useFetch';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'phoneNumber', label: 'PhoneNumber', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'nationalId', label: 'NationalId', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.userName.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserPage() {

  const navigate = useNavigate()

  const routeChange = (path) => {
    navigate(`/${path}`)
  }

  const [page, setPage] = useState(1);

  const [open, setOpen] = useState(null);

  const {data, loading, error} = useFetch("/users")

  const PER_PAGE = 5;
  const count = Math.ceil(data.length / PER_PAGE);
  const _DATA = usePagination(data, PER_PAGE)
  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('userName');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
    // setRowsData(rows)
  };
  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.userName);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0);
    
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const filteredUsers = applySortFilter(data, getComparator(order, orderBy), filterName);
  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
          <Button variant="contained" onClick={() => routeChange('new-user')}  startIcon={<Iconify icon="ant-design:user-add-outlined" />}>
            New User
          </Button>
        </Stack>

        <Grid style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} container spacing={1} justifyContent="center">
      <Grid item>
        <Paper>
          <Grid>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 800 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Username</TableCell>
                    <TableCell align="left">PhoneNumber</TableCell>
                    <TableCell align="left">Role</TableCell>
                    <TableCell align="left">nationalId</TableCell>
                  </TableRow>
                </TableHead>
                {}
                <TableBody>
                  {_DATA.currentData().map((row, idx) => {  
                    return (<TableRow key={idx}>
                      <TableCell component="th" scope="row">
                        {row.userName}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.phoneNumber}
                      </TableCell>
                      <TableCell align="left">
                        {row.role}
                      </TableCell>
                      <TableCell align="left">
                        {row.nationalId}
                      </TableCell>
                    </TableRow>)
})}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Paper>
      </Grid>
      <Pagination
        style={{margin: '10px'}}
        count={count}
        size="large"
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
      />
    </Grid>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
