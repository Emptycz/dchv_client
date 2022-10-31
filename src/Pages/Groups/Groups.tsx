import { BlockOutlined, RemoveCircle } from '@mui/icons-material';
import { Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import moment from 'moment';
import React, { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import BaseContainer from '../../Containers/Base/BaseContainer';
import { AuthContext } from '../../Contexts/AuthContext';
import useAxios from '../../Hooks/useAxios';
import { IPersonGroup } from '../../types';

const renderData = (data: IPersonGroup[]) => {
  return data.map((x, index) => (
    <TableRow key={index}>
      <TableCell> {x.id} </TableCell>
      <TableCell>  <a href={`/group/${x.id}`}> {x.name} </a> </TableCell>
      <TableCell> {`${x.person?.firstname} ${x.person?.lastname}`} </TableCell>
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

const Groups = () => {
  const { token } = useContext(AuthContext);

  const [groups, setGroups] = useState<IPersonGroup[]>([]);

  const axios = useAxios(token);
  const history = useNavigate();

  const fetchData = async () => {
    return await axios.get('/personGroup');
  };

  useQuery(
    ['fetchPersonGroups'],
    async () => {
      const { data } = await fetchData();
      setGroups(data);
    }
  );

  return (
    <BaseContainer>
      <h1> Your groups </h1>
      <div>
        <Button variant='contained' onClick={() => history('/groups/add')}>
          Create new group
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
              {groups ? renderData(groups) : undefined}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </BaseContainer>
  );
};

export default Groups;