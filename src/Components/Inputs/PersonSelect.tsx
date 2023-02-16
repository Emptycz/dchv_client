import React from 'react';
import Select from './Select';
import { useMutation, useQuery } from 'react-query';
import { IPerson } from '../../types';
import useAxios from '../../Hooks/Axios.hook';

type PersonSelectProps = {
  name: string,
}

const PersonSelect = ({
  name,
}: PersonSelectProps) => {

  const axios = useAxios();

  const { data, isLoading } = useQuery(['FetchPersonList'],
    async (): Promise<IPerson[]> => {
      const { data: res } = await axios.get<IPerson[]>('/person');
      return res;
    }
  );

  const { mutateAsync: fetchFilteredPerson } = useMutation(['FetchPersonList'],
    async (filter: string): Promise<IPerson[]> => {
      const { data: res } = await axios.get<IPerson[]>(`/person?name="${filter}"`);
      return res;
    }
  );

  const filterPersons = async () => {
    return await fetchFilteredPerson('Test');
  };

  return (
    <Select
      name={name}
      options={data?.map((x) => ({ value: x.id, label: `${x.firstname} ${x.lastname}` }))}
    />
  );
};

export default PersonSelect;
