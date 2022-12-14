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
      setAlert('Chybné přihlašovací údaje');
      if (err.code === '404') {
        //TODO: Show error message (), user not found
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
        <h1> Přihlášení do systému </h1>
        <Form className='login__card__form' onSubmit={(e) => onSubmit(e)}>
          <LabeledInput required className='login__card__form__input' label="Email" variant="outlined" name="username" type="email" />
          <LabeledInput required className='login__card__form__input' name="password" variant="outlined" label='Heslo' type="password" />
          {!alert ? '' : (
            <Alert className='login__card__form__alert' severity='error'>
              {alert}
            </Alert>
          )}
          <Button className='login__card__form__btn' variant='contained' type="submit"> Přihlásit se </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
