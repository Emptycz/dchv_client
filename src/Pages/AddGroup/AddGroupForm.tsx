import React from 'react';
import LabeledInput from '../../Components/Inputs/LabeledInput';

const AddGroupForm = () => {
  return (
    <div className='flex flex-col gap-2'>
      <LabeledInput required className='lg:w-96' label="Group name" name="name" type="text" />
    </div>
  );
};

export default AddGroupForm;
