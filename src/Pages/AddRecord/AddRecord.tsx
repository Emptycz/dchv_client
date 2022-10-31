import { Button } from '@mui/material';
import { Form, FormState } from 'informed';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../Components/Inputs/Input';
import LabeledInput from '../../Components/Inputs/LabeledInput';
import BaseContainer from '../../Containers/Base/BaseContainer';
import { AuthContext } from '../../Contexts/AuthContext';
import useAxios from '../../Hooks/useAxios';

const AddRecord = () => {
  const { token } = useContext(AuthContext);
  const [file, setFile] = useState<File>();

  const history = useNavigate();

  const onFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event || !event.target || !event.target.files) return;
    setFile(event.target.files[0]);
  };

  const onFormSubmit = async ({ values }: FormState) => {
    if (!values || values.length === 0 || !file) return;
    console.log(token, 'token');
    const axios = useAxios(token);
    const formData = new FormData();
    formData.append('file', file);
    // TODO: Modify the FormState type to create a Generic that will allow this natively
    // (pass custom types, instead of using 'unknown')
    if (!values.name || typeof values.name !== 'string') return;
    formData.append('name', values?.name);
    const response = await axios.post('/record', formData);
    if (response.status !== 200) throw new Error(response.data);
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