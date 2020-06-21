import React from 'react';
import _ from 'lodash';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import {useRequest} from 'lib/data';

function Category({categoryId}) {
  const {data: categories} = useRequest('/api/categories');
  const map = _.keyBy(categories, '_id');

  return categories ? _.get(map[categoryId], 'name', null) : null;
}

const columns = [
  { id: 'date', label: 'Date', minWidth: 120 },
  { id: 'note', label: 'Note', minWidth: 100 },
  { id: 'amount', label: 'Amount', minWidth: 50 },
  { id: 'type', label: 'Type', minWidth: 50 },
  {
    id: 'category',
    label: 'Category',
    minWidth: 50,
    render: (value) => <Category categoryId={value} />
  },
];

function OperationsTable({items}) {
  return (
    <Paper>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {_.map(items, (row, index) => (
              <TableRow hover key={index}>
                {columns.map((column) => (
                  <TableCell key={column.id}>
                    {column.render ? column.render(row[column.id]) : row[column.id]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default OperationsTable;
