import React, { useState } from 'react';
import LabeledInput from '../../Components/Inputs/LabeledInput';

type AddRecordFormType = {
  onFileUpload(event: React.ChangeEvent<HTMLInputElement>): void;
};

const AddRecordForm = ({ onFileUpload }: AddRecordFormType) => {
  return (
    <>
      <div className='flex flex-col gap-2'>
        <p> Record informations: </p>
        <div className='flex max-lg:flex-col flex-col gap-5'>
          <LabeledInput required className='lg:w-96' label='Name of the record' name='name' type='text' />
          <LabeledInput required className='lg:w-96' name="description" label='Description of the record' type="text" />
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <p> Upload file: </p>
        <input type="file" onChange={onFileUpload} />
      </div>
    </>
  );
};

export default AddRecordForm;
