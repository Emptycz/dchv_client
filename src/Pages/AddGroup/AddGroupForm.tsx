import React from 'react';
import LabeledInput from '../../Components/Inputs/LabeledInput';
import Select from '../../Components/Inputs/Select';
import PersonSelect from '../../Components/Inputs/PersonSelect';

const AddGroupForm = () => {
  return (
    <div className='flex flex-col gap-2'>
      <LabeledInput required className='lg:w-96' label="Group name" name="name" type="text" />
      <PersonSelect name="test" />
    </div>
  );
};

export default AddGroupForm;
