import React from 'react';
import BaseContainer from '../../Containers/Base/BaseContainer';
import { Form } from 'informed';
import AddGroupForm from './AddGroupForm';
import { Button } from '@mui/material';

const AddGroup = () => {
  const onSubmit = () => {

  };

  return (
    <BaseContainer>
      <Form className='flex flex-col gap-5 w-100' onSubmit={onSubmit}>
        <h1> Create new group </h1>
        <AddGroupForm />
        <Button className='lg:w-96' variant='contained' type="submit"> Create group </Button>
      </Form>
    </BaseContainer>

  );
};

export default AddGroup;
