import { Alert, Card } from '@mui/material';
import Button from '@mui/material/Button/Button';
import axios from 'axios';
import { Form, FormState } from 'informed';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAxiosHeaders } from '../../Hooks/Axios.hook';
import { ILogin, IPerson } from '../../types';
import RegistrationForm from './RegistrationForm';
import LoginContainer from '../../Containers/LoginContainer/LoginContainer';

const Registration = () => {

  const navigate = useNavigate();
  const [alert, setAlert] = useState<string>();

  const onSubmit = async ({ values }: FormState ) => {
    console.log(values, 'Vals');
    if (!values || values.length === 0) return;

    const url = process.env.REACT_APP_API_URL + '/Login' || undefined;
    if (!url) throw new Error('Could not find API_URL in ENV');

    const reqObj: Partial<ILogin> = {
      // FIXME: Fix the informed type problem (allow for generic types)
      username: values.username as string,
      password: values.password as string,
      persons: values.persons as IPerson[],
    };

    try {
      await axios.post(
        url,
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
    <LoginContainer>
      <div className='login'>
        <Card className='login__card' variant='outlined'>
          <Form onSubmit={onSubmit} className='login__card__form flex gap-6 flex-col justify-center items-center h-screen'>
            <h1> Create new account </h1>
            <RegistrationForm />
            {!alert ? '' : (
              <Alert severity='error'>
                {alert}
              </Alert>
            )}
            <Button variant='contained' type="submit"> Create new account </Button>
            <span className='mt-6'> Do you have account already? <a className='text-blue-500' href="/"> Sign in </a></span>
          </Form>
        </Card>
      </div>
    </LoginContainer>
  );
};

export default Registration;
