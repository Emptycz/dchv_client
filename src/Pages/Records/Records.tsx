import { Button } from '@mui/material';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import MaterialTable from '../../Components/Tables/MaterialTable';
import BaseContainer from '../../Containers/Base/BaseContainer';
import { AuthContext } from '../../Contexts/AuthContext';
import useAxios from '../../Hooks/useAxios';

const Records = () => {
  const { token } = useContext(AuthContext);
  const axios = useAxios(token);
  const history = useNavigate();

  const options = {
    columns: [
      'test',
      'test2',
      'test3',
    ],
    rows: []
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
        <MaterialTable
          name="test"
          data={options.rows}
          columns={options.columns}
        />
      </div>
    </BaseContainer>
  ); 
};

export default Records;
