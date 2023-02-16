import React from 'react';
import { IRecord } from '../../types';
import RecordCard from '../Cards/RecordCards';
import { useNavigate } from 'react-router-dom';

type RecordCardListProps = {
  records?: IRecord[];
}

const RecordCardList = ({records = []}: RecordCardListProps) => {
  const navigate = useNavigate();

  return (
    <>
      {records.map((x) => (
        <RecordCard key={x.id} record={x} onClick={() => navigate(`/record/${x.id}`)} />
      ))}
    </>
  );
};

export default RecordCardList;
