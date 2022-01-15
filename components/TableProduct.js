import {useState} from 'react';
import {
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination,
  TableRow, Button, Box,
} from '@mui/material';
import {Helper} from '../libs/Helper';
import EmptyState from './EmptyState';
import Image from 'next/image';

const DATA_COLUMN_USER = [
  {id: 'productName', label: 'Nama Produk', minWidth: '170px', align: 'center'},
  {
    id: 'stringPrice', label: 'Harga', minWidth: '80px', align: 'center',
  },
  {
    id: 'attachment', label: 'Foto', minWidth: '100px', align: 'center',
  },
  {
    id: 'action',
    label: 'Aksi',
    align: 'center',
  },
];

const IMG_SIZE = 100;

export default function TableProduct(props) {
  const {data = [], onDetele, onEdit} = props;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      <TableContainer sx={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
      }}>
        <Table stickyHeader aria-label={'sticky table'}>
          <TableHead>
            <TableRow>
              {DATA_COLUMN_USER.map((column, index) => (
                <TableCell
                  key={index}
                  align={column.align}
                  style={{minWidth: column.minWidth}}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 && data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, indexRow) => (
                  <TableRow hover role={'checkbox'} tabIndex={-1} key={indexRow}>
                    {DATA_COLUMN_USER.map((column, indexColumn) => {
                      const value = row[column.id];
                      if (column.id !== 'action') {
                        return (
                          <TableCell key={indexColumn} align={column.align}>
                            {column.id === 'attachment' ? (
                              <Image
                                src={`${Helper.getBaseUrl()}${value}`}
                                alt={`${Helper.getBaseUrl()}${value}`}
                                width={IMG_SIZE}
                                height={IMG_SIZE}
                              />
                            ) : value}
                          </TableCell>
                        );
                      }
                      return (
                        <TableCell key={indexColumn} align={column.align}>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <Button
                              sx={{
                                marginRight: '16px',
                              }}
                              variant={'text'}
                              onClick={() => onDetele(row)}
                            >
                            Hapus
                            </Button>
                            <Button
                              variant={'outlined'}
                              onClick={() => onEdit(row)}
                            >
                            Ubah
                            </Button>
                          </Box>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
          </TableBody>
        </Table>
        {data.length === 0 && (
          <EmptyState />
        )}
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component={'div'}
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
