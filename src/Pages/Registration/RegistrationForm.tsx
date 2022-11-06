import React from 'react';
import LabeledInput from '../../Components/Inputs/LabeledInput';
import AddUserForm from '../AddUser/AddUserForm';

const RegistrationForm = () => {
  return (
    <>
      <AddUserForm />
      <div className='flex flex-col gap-5'>
        <span> Heslo </span>
        <LabeledInput
          className='lg:w-96'
          type="password"
          label='Password'
          name="password"
          required
        />
        <LabeledInput
          className='lg:w-96'
          name="repassword"
          type="password"
          label="Repeat your password"
          required
        />
      </div>
    </>
  );
};

export default RegistrationForm;