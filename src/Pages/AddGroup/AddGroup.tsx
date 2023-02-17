import React from 'react';
import BaseContainer from '../../Containers/Base/BaseContainer';
import { Form, FormState } from 'informed';
import AddGroupForm from './AddGroupForm';
import { Button } from '@mui/material';
import { useMutation, useQuery } from 'react-query';
import { IPersonGroup } from '../../types';
import useAxios from '../../Hooks/Axios.hook';

const AddGroup = () => {
  const axios = useAxios();

  const { mutateAsync: addPersonGroup } = useMutation(
    ['AddPersonGroup'],
    async (data: string | FormData): Promise<IPersonGroup> => {
      const { data: res } = await axios.post<IPersonGroup>('/personGroup', data);
      return res;
    }
  );

  const onSubmit = async ({ values }: FormState) => {
    let data = values;
    if (values.members && Array.isArray(values.members)) {
      data = {
        ...values,
        members: values.members.map((x: {id: number, name: string}) => ({personID: x.id}))
      };
    }
    await addPersonGroup(JSON.stringify(data));
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
