import React from 'react';
import { IRecord } from '../../types';
import GenericCard from './GenericCard';

type RecordCardProps = {
  record: IRecord;
  onClick?: () => void;
}

const RecordCard = ({ record, onClick }: RecordCardProps) => {
  return (
    <GenericCard
      onClick={onClick}
      key={record.id}
      content='CSV'
      title={record.name} />
  );
};

export default RecordCard;
