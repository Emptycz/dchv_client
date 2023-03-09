import { Button } from '@mui/material';
import { Form, FormState } from 'informed';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../Components/Inputs/Input';
import BaseContainer from '../../Containers/Base/BaseContainer';
import useAxios from '../../Hooks/Axios.hook';
import { IRecord } from '../../types';
import AddRecordForm from './AddRecordForm';
import useAuth from '../../Hooks/Auth.hook';
import { isAdmin } from '../../Utils/Auth.utils';

const AddRecord = () => {
  const [file, setFile] = useState<File>();
  const { user } = useAuth();

  const onFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event || !event.target || !event.target.files) return;
    setFile(event.target.files[0]);
  };
  const history = useNavigate();
  const axios = useAxios();

  const onFormSubmit = async ({ values }: FormState) => {
    if (!user) return;
    if (!values || values.length === 0 || !file) return;
    const formData = new FormData();
    formData.append('file', file);
    // TODO: Modify the FormState type to create a Generic that will allow this natively
    // (pass custom types, instead of using 'unknown')
    if (!values.name || typeof values.name !== 'string') return;
    formData.append('name', values?.name);
    try {
      await axios.post<IRecord>('/record', formData);
    } catch (err) {
      throw new Error(String(err));
    }
    if (isAdmin(user)) return history('/records');
    return history('/filespace');
  };

  return (
    <BaseContainer>
      <Form onSubmit={onFormSubmit} name='addRecordForm' className='flex flex-col gap-5 w-100 justify-center items-center'>
        <h2> Create new record </h2>
        <AddRecordForm onFileUpload={onFileUpload} />
        <Button className='lg:w-96' variant='contained' type='submit'> Create record </Button>
      </Form>
    </BaseContainer>
  );
};

export default AddRecord;