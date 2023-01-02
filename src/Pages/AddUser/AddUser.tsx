import { Alert, Button } from '@mui/material';
import { Form, FormState } from 'informed';
import moment from 'moment';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Checkbox from '../../Components/Inputs/Checkbox';
import BaseContainer from '../../Containers/Base/BaseContainer';
import useAxios from '../../Hooks/Axios.hook';
import AddUserForm from './AddUserForm';

const AddUser = () => {
  const [alert, setAlert] = useState<string>();

  const axios = useAxios();
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
        {/* FIXME: Remove the <h1> out of the <form> */}
        <h1> Create new account </h1>
        <AddUserForm />
        <Checkbox label='User is verified' name='verified_at' />
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
