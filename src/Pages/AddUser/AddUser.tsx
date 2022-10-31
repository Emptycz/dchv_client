import { Alert, Button } from '@mui/material';
import { Form, FormState } from 'informed';
import moment from 'moment';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Checkbox from '../../Components/Inputs/Checkbox';
import LabeledInput from '../../Components/Inputs/LabeledInput';
import BaseContainer from '../../Containers/Base/BaseContainer';
import { AuthContext } from '../../Contexts/AuthContext';
import useAxios from '../../Hooks/useAxios';

const AddUser = () => {
  const { token } = useContext(AuthContext);
  const [alert, setAlert] = useState<string>();

  const axios = useAxios(token);
  const history = useNavigate();

  const onSubmit = async ({ values }: FormState ) => {
    if (!values || values.length === 0) return;
    if (values.verified_at) values.verified_at = moment().toISOString();

    try {
      const response = await axios.post('/login', JSON.stringify(values));
      if (response.status !== 200) {
        setAlert(response?.detail);
        return;
      }
      history('/users');
      // TODO: do proper safe guard check
    } catch (err: any) {
      if (err?.response?.data?.detail) {
        setAlert(err.response.data.detail);
      }
      console.log(err);
    }
  };

  return (
    <BaseContainer>
      <Form className='flex flex-col gap-5 w-100' onSubmit={onSubmit}>
        <h1> Create new account </h1>
        <div className='flex flex-col gap-2'>
          <p> Login informations: </p>
          <div className='flex max-lg:flex-col flex-row gap-5'>
            <LabeledInput required className='lg:w-96' label="Email" name="username" type="email" />
            <LabeledInput required className='lg:w-96' name="password" label='Heslo' type="password" />
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <p> Person informations: </p>
          <div className='flex max-lg:flex-col lg:flex-row gap-5'>
            <LabeledInput required className='lg:w-96' label="Firstname" name="persons.[0].firstname" type="text" />
            <LabeledInput required className='lg:w-96' label="Lastname" name="persons.[0].lastname" type="text" />
          </div>
        </div>
        <Checkbox label='Verified' name='verified_at' />
        {!alert ? '' : (
          <Alert className='login__card__form__alert' severity='error'>
            {alert}
          </Alert>
        )}

        <Button className='lg:w-96' variant='contained' type="submit"> Create account </Button>
      </Form>
    </BaseContainer>
  );
};

export default AddUser;
