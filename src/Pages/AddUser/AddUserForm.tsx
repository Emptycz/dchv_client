import React from 'react';
import LabeledInput from '../../Components/Inputs/LabeledInput';

const AddUserForm = () => (
  <>
    <div className='flex flex-col gap-2'>
      <p> Login informations: </p>
      <div className='flex max-lg:flex-col flex-row gap-5'>
        <LabeledInput required className='lg:w-96' label="Email" name="username" type="email" />
        <LabeledInput required className='lg:w-96' name="password" label='Password' type="password" />
      </div>
    </div>
    <div className='flex flex-col gap-2'>
      <p> Person informations: </p>
      <div className='flex max-lg:flex-col lg:flex-row gap-5'>
        <LabeledInput required className='lg:w-96' label="Firstname" name="persons.[0].firstname" type="text" />
        <LabeledInput required className='lg:w-96' label="Lastname" name="persons.[0].lastname" type="text" />
      </div>
    </div>
  </>
);

export default AddUserForm;