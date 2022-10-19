import { BlockOutlined, RemoveCircle } from '@mui/icons-material';
import { Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import moment from 'moment';
import React, { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import BaseContainer from '../../Containers/Base/BaseContainer';
import { AuthContext } from '../../Contexts/AuthContext';
import useAxios from '../../Hooks/useAxios';
import { IRecord } from '../../types';

const Records = () => {
  const [records, setRecords] = useState<IRecord[]>();
  const { token } = useContext(AuthContext);
  const axios = useAxios(token);
  const history = useNavigate();

  const fetchData = async () => {
    return await axios.get('/record');
  };

  useQuery(
    ['getRecords'],
    async () => {
      const { data } = await fetchData();
      setRecords(data);
    }
  );

  const renderData = (data: IRecord[]) => {
    return data.map((x, index) => (
      <TableRow key={index}>
        <TableCell> {x.id} </TableCell>
        <TableCell>  <a href={`/record/${x.id}`}> {x.name} </a> </TableCell>
        <TableCell> {`${x.author?.firstname} ${x.author?.lastname}`} </TableCell>
        <TableCell> {moment(x.created_at).format('DD-MM-YYYY')} </TableCell>
        {/* TODO: Change these to display onHover  */}
        <TableCell>
          <IconButton>
            <BlockOutlined color='warning' />
          </IconButton>
          <IconButton onClick={() => console.error('Že já tě vymažu!')}>
            <RemoveCircle color='error' />
          </IconButton>
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <BaseContainer>
      <h1> Records </h1>
      <div>
        <Button variant='contained' onClick={() => history('/records/add')}>
          Import file
        </Button>
      </div>
      <div>
        <TableContainer>
          <Table id='users_table'>
            <TableHead>
              <TableRow>
                <TableCell> ID </TableCell>
                <TableCell> Name </TableCell>
                <TableCell> Author </TableCell>
                <TableCell> Created at </TableCell>
                <TableCell> Operation </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records ? renderData(records) : undefined}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </BaseContainer>
  );
};

export default Records;
