import {  Table, TableBody, TableCell, TableRow } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext';
import useAxios from '../../Hooks/useAxios';
import { IRecord, IRecordData } from '../../types';

type RecordProps = {
  recordId: string,
}

const Record = () => {
  const { recordId } = useParams<RecordProps>();
  const history = useNavigate();
  const [table, setTable] = useState<any[]>();

  if (!recordId) {
    history('/records');
  }

  const [record, setRecord] = useState<IRecord>();
  const { token } = useContext(AuthContext);
  const axios = useAxios(token);

  useQuery(
    ['getRecordDetail', recordId],
    async () => {
      const { data } = await axios.get(`/record/${recordId}`);
      setRecord(data);
    }
  );

  const createTable = (rows: number, cols: number) => {
    return new Array(rows).fill(new Array(cols).fill({}));
  };

  // const normalizeTable = (table: IRecordData[]) => {
  //   let lastRow: number;
  //   table.reduce((prev, curr) => {
  //     const data = {0: {}, 1: {}};
  //     if (curr.row !== lastRow) {
  //       lastRow = lastRow + 1;
  //       return { lastRow: [...prev, curr]};
  //     }
  //   }, []);
  // };

  // const renderRows = (data: IRecordData[]) => {
  //   const rows = getDifRows(data);
  //   createTable(10, 5);
  //   return rows.map((cell) => (
  //     <TableRow key={cell.row}>
  //       {renderData(data.filter((d) => d.row === cell.row))}
  //     </TableRow>
  //   ));
  // };

  // const renderData = (data: IRecordData[]) => {
  //   return data.map((x) => {
  //     return (
  //       <TableCell key={x.id}> {x.value} </TableCell>
  //     );
  //   });
  // };

  // const getDifRows = (data: IRecordData[]) => {
  //   return data.filter((x, index) => x.row !== data[index - 1]?.row);
  // };

  useEffect(() => {
    if (table) return;
    setTable(createTable(100, 100));
  }, []);

  const renderRows = (table?: any[]) => {
    if (!table) return;
    return table.map((rows: any[], i: number) => {
      return (
        <TableRow key={i}>
          {renderCols(rows)}
        </TableRow>
      );
    });
  };

  const renderCols = (rows: any) => {
    return rows.map((col: any, i: number) => {
      return (<TableCell key={i}> </TableCell>);
    });
  };

  return (
    <>
      <h1> {record?.name} </h1>
      <Table>
        <TableBody>
          {renderRows(table)}
          {/* {!record?.data ? null : renderRows(record?.data)} */}
        </TableBody>
      </Table>
    </>
  );
};

export default Record;
