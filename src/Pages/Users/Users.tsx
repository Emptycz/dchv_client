import { BlockOutlined, RemoveCircle } from '@mui/icons-material';
import { Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseContainer from '../../Containers/Base/BaseContainer';
import { AuthContext } from '../../Contexts/AuthContext';
import useAxios from '../../Hooks/useAxios';
import { ILogin } from '../../types';

const Users = () => {
  const [data, setData] = useState<ILogin[]>();
  
  const { token } = useContext(AuthContext);
  const axios = useAxios(token);
  const history = useNavigate();

  const fetchData = async () => {
    return await axios.get('/login');
  };

  const removeUser = async (id: number) => {
    const result = await axios.delete(`/login/${id}`);
    if (result.status !== 200) return;
    setData(data?.filter((x) => x.id !== id));
  };

  const renderData = (data: ILogin[]) => {
    return data.map((x, index) => (
      <TableRow key={index}>
        <TableCell> {x.id} </TableCell>
        <TableCell> <a href={`/user/${x.id}`} > {x.username} </a> </TableCell>
        <TableCell> {moment(x.created_at).format('DD-MM-YYYY')} </TableCell>
        {/* TODO: Change these to display onHover  */}
        <TableCell> 
          <IconButton>
            <BlockOutlined color='warning' />
          </IconButton>
          <IconButton onClick={() => removeUser(x.id)}>
            <RemoveCircle color='error' />
          </IconButton>
        </TableCell>
      </TableRow>
    ));
  };

  useEffect(() => {
    fetchData().then((x) => {
      if (x.status !== 200) return;
      setData(x.data);
    });
  }, []);

  return (
    <BaseContainer>
      <div className='users'>
        <div className='users__header'>
          <h1> Users </h1>
        </div>
        <div>
          <Button variant='contained' onClick={() => history('/users/add')}>
          Add user
          </Button>
        </div>
        <div className='users__table'>
          <TableContainer>
            <Table id='users_table'>
              <TableHead>
                <TableRow>
                  <TableCell> ID </TableCell>
                  <TableCell> Username </TableCell>
                  <TableCell> Created at </TableCell>
                  <TableCell> Operation </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data ? renderData(data) : undefined}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </BaseContainer>
  );
};

export default Users;