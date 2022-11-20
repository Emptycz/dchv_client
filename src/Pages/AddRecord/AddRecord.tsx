import { Button } from '@mui/material';
import { Form, FormState } from 'informed';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../Components/Inputs/Input';
import BaseContainer from '../../Containers/Base/BaseContainer';
import useAxios from '../../Hooks/Axios.hook';
import { IRecord } from '../../types';

const AddRecord = () => {
  const [file, setFile] = useState<File>();

  const history = useNavigate();

  const onFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event || !event.target || !event.target.files) return;
    setFile(event.target.files[0]);
  };

  const onFormSubmit = async ({ values }: FormState) => {
    if (!values || values.length === 0 || !file) return;
    const axios = useAxios();
    const formData = new FormData();
    formData.append('file', file);
    // TODO: Modify the FormState type to create a Generic that will allow this natively
    // (pass custom types, instead of using 'unknown')
    if (!values.name || typeof values.name !== 'string') return;
    formData.append('name', values?.name);
    try {
      return await axios.post<IRecord>('/record', formData);
    } catch (err) {
      throw new Error(String(err));
    }
    history('/records');
  };

  return (
    <BaseContainer>
      <Form onSubmit={onFormSubmit} name='addRecordForm'>
        <Input label='Name of the record' name='name' type='text' />
        <input type="file" onChange={onFileUpload} />
        <Button variant='outlined' type='submit'> Odeslat </Button>
      </Form>
    </BaseContainer>
  );
};

export default AddRecord;