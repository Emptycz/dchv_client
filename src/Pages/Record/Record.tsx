import {  Table, TableBody, TableCell, TableRow } from '@mui/material';
import React, { useContext, useState } from 'react';
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

  const renderRows = (data: IRecordData[]) => {
    const rows = getDifRows(data);
    return rows.map((cell) => (
      <TableRow key={cell.row}>
        {renderData(data.filter((d) => d.row === cell.row))}
      </TableRow>
    ));
  };

  const renderData = (data: IRecordData[]) => {
    return data.map((x) => {
      return (
        <TableCell key={x.id}> {x.value} </TableCell>
      );
    });
  };

  const getDifRows = (data: IRecordData[]) => {
    return data.filter((x, index) => x.row !== data[index - 1]?.row);
  };

  return (
    <>
      <h1> {record?.name} </h1>
      <Table>
        <TableBody>
          {!record?.data ? null : renderRows(record?.data)}
        </TableBody>
      </Table>
    </>
  );
};

export default Record;
