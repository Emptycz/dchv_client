import React from 'react';
import LabeledInput from '../../Components/Inputs/LabeledInput';

const AddUserForm = () => (
  <>
    <div className='flex flex-col gap-2'>
      <div className='flex max-lg:flex-col flex-col gap-5'>
        <LabeledInput required className='lg:w-96' label="Firstname" name="persons.[0].firstname" type="text" />
        <LabeledInput required className='lg:w-96' label="Lastname" name="persons.[0].lastname" type="text" />
      </div>
    </div>

    <div className='flex flex-col gap-2 mt-6'>
      <div className='flex max-lg:flex-col flex-col gap-5'>
        <LabeledInput required className='lg:w-96' label="Email" name="username" type="email" />
        <LabeledInput required className='lg:w-96' name="password" label='Password' type="password" />
      </div>
    </div>
  </>
);

export default AddUserForm;