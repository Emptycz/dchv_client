import { Alert } from '@mui/material';
import Button from '@mui/material/Button/Button';
import axios from 'axios';
import { Form, FormState } from 'informed';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAxiosHeaders } from '../../Hooks/useAxios';
import { ILogin, IPerson } from '../../types';
import RegistrationForm from './RegistrationForm';

const Registration = () => {

  const navigate = useNavigate();
  const [alert, setAlert] = useState<string>();

  const onSubmit = async ({ values }: FormState ) => {
    console.log(values, 'Vals');
    if (!values || values.length === 0) return;

    const reqObj: Partial<ILogin> = {
      // FIXME: Fix the informed type problem (allow for generic types)
      username: values.username as string,
      password: values.password as string,
      persons: values.persons as IPerson[],
    };

    try {
      await axios.post(
        'https://localhost:7122/login',
        JSON.stringify(reqObj),
        {
          method: 'POST',
          headers: {
            ...setAxiosHeaders()
          }
        });

      return navigate('/');
      // TODO: do proper safe guard check
    } catch (err: any) {
      if (err?.response?.data?.detail) {
        // FIXME: Show error message
        setAlert(err.response.data.detail);
      }
    }
  };

  return (
    <Form onSubmit={onSubmit} className='flex flex-col justify-center items-center'>
      <RegistrationForm />
      {!alert ? '' : (
        <Alert severity='error'>
          {alert}
        </Alert>
      )}

      <Button variant='contained' type="submit"> Create new account </Button>
    </Form>
  );
};

export default Registration;
