import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';

export interface MaterialTableProps<T> {
  name: string,
  columns: string[],
  data?: JSX.Element[],
}

const renderColumns = (cols: string[]) => {
  if (!cols || cols.length === 0) return;
  return cols.map((x: string, index: number) => (
    <TableCell key={index}> {x} </TableCell>
  ));
};

const renderData = (data: string[]) => {
  if (!data || data.length === 0) return;
  return data.map((x: string, index: number) => (
    <TableCell key={index}> {x} </TableCell>
  ));
};

const MaterialTable = <T,>({
  name,
  columns,
  data,
}: MaterialTableProps<T>) => {
  return (
    <TableContainer>
      <Table id={name}>
        <TableHead>
          <TableRow>
            {renderColumns(columns)}
          </TableRow>
        </TableHead>
        <TableBody>
          {data}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MaterialTable;
