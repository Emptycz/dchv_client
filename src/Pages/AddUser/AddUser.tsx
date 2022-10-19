import { Button } from '@mui/material';
import { Form, FormState } from 'informed';
import moment from 'moment';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Checkbox from '../../Components/Inputs/Checkbox';
import LabeledInput from '../../Components/Inputs/LabeledInput';
import { AuthContext } from '../../Contexts/AuthContext';
import useAxios from '../../Hooks/useAxios';

const AddUser = () => {
  const { token } = useContext(AuthContext);

  const axios = useAxios(token);
  const history = useNavigate();

  const onSubmit = async ({ values }: FormState ) => {
    if (!values || values.length === 0) return;
    if (values.verified_at) values.verified_at = moment().toISOString();

    const response = await axios.post('/login', JSON.stringify(values));
    if (response.status !== 200) return;
    history('/users');
  };

  return (
    <Form className='login__card__form' onSubmit={onSubmit}>
      <div>
        <h3> Login informations: </h3>
        <LabeledInput required className='login__card__form__input' label="Email" name="username" type="email" />
        <LabeledInput required className='login__card__form__input' name="password" label='Heslo' type="password" />
      </div>
      <div>
        <h3> Person informations: </h3>
        <LabeledInput required className='login__card__form__input' label="Firstname" name="persons.[0].firstname" type="text" />
        <LabeledInput required className='login__card__form__input' label="Lastname" name="persons.[0].lastname" type="text" />
      </div>
      <Checkbox label='Verified' name='verified_at' />
      <Button className='login__card__form__btn' variant='contained' type="submit"> Create account </Button>
    </Form>
  );
};

export default AddUser;
