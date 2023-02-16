import { Alert, Button, Card } from '@mui/material';
import axios, { AxiosError } from 'axios';
import { Form, FormState } from 'informed';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LabeledInput from '../../Components/Inputs/LabeledInput';
import useAuth from '../../Hooks/Auth.hook';
import './Login.scss';

const Login = () => {
  const [alert, setAlert] = useState<string | undefined>(undefined);

  const { signIn } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async ({ values }: FormState) => {
    if (!values || values.length === 0) return;
    const url = process.env.REACT_APP_API_URL + '/Auth' || undefined;
    if (!url) throw new Error('Could not find API_URL in ENV');

    const response = await axios.post(url, JSON.stringify(values), {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    }).catch((err: AxiosError) => {
      console.log(err, 'err');
      if (err?.response?.status === 404) {
        setAlert('Incorrect credentials');
      } else {
        setAlert('Cannot reach the API server');
      }
      throw new Error(err.message);
    });
    signIn(response?.data.persons[0], response?.data.token);

    navigate('/dashboard');
    return;
  };

  return (
    <div className='login'>
      <Card className='login__card' variant='outlined'>
        <h1> Login to system </h1>
        <Form className='login__card__form' onSubmit={(e) => onSubmit(e)}>
          <LabeledInput required className='login__card__form__input' label="Email" variant="outlined" name="username" type="email" />
          <LabeledInput required className='login__card__form__input' name="password" variant="outlined" label='Password' type="password" />
          {!alert ? '' : (
            <Alert className='login__card__form__alert' severity='error'>
              {alert}
            </Alert>
          )}
          <Button className='login__card__form__btn' variant='contained' type="submit"> Sign in </Button>
        </Form>
        <span className='mt-6'> Do you already have an account? <a className='text-blue-500' href="/registration"> Sign in </a></span>
      </Card>
    </div>
  );
};

export default Login;
