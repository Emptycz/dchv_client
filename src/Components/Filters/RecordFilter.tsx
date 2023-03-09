import React, { useState } from 'react';
import { IRecordData } from '../../types';
import LabeledInput from '../Inputs/LabeledInput';
import { Button } from '@mui/material';

interface RecordFilterDictionary {
  id: number,
  row?: IRecordData,
}

const RecordFilter = () => {
  const [filters, setFilters] = useState<RecordFilterDictionary[]>([{id: 0 }]);

  const addFilterRow = () => {
    setFilters([...filters, { id: filters.length !== 0 ? filters[filters.length - 1].id + 1 : 0 }]);
  };

  const removeFilterRow = (key: number) => {
    setFilters(filters.filter((x) => x.id !== key));
  };

  return (
    <div className='flex flex-col gap-3'>
      {Array.isArray(filters) && filters?.map((x) => (
        <div key={x.id} className='flex flex-row gap-6'>
          <LabeledInput required name={`value[${x.id}]`} type='text' label='Value' />
          <LabeledInput name={`row[${x.id}]`} type='number' label='Row' />
          <LabeledInput name={`column[${x.id}]`} type='number' label='Column' />
          <Button type="button" onClick={() => removeFilterRow(x.id)}> - </Button>
        </div>
      ))}
      <Button type="button" onClick={() => addFilterRow()}> + </Button>
    </div>
  );
};

export default RecordFilter;
