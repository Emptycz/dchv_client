import React from 'react';
import LabeledInput from '../../Components/Inputs/LabeledInput';
import AddUserForm from '../AddUser/AddUserForm';

type RegistrationFormProps = {
  className?: string,
}

const RegistrationForm = ({
  className
}: RegistrationFormProps) => {
  return (
    <div className={className}>
      <AddUserForm />
      <div className='flex flex-col gap-5 mt-6'>
        <LabeledInput
          className='lg:w-96'
          name="repassword"
          type="password"
          label="Repeat your password"
          required
        />
      </div>
    </div>
  );
};

export default RegistrationForm;