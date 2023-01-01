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

  return (
    <div className='login'>
      <Card className='login__card' variant='outlined'>
        <h1> Přihlášení do systému </h1>
        <Form className='login__card__form' onSubmit={(e) => navigate('/dashboard')}>
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
