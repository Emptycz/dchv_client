import React from 'react';
import LabeledInput from '../../Components/Inputs/LabeledInput';
import PersonSelect from '../../Components/Inputs/PersonSelect';

const AddGroupForm = () => {
  return (
    <div className='flex flex-col gap-2'>
      <LabeledInput required className='lg:w-96' label="Group name" name="name" type="text" />
      <PersonSelect name="members" className='dark:text-black lg:w-96' />
    </div>
  );
};

export default AddGroupForm;
