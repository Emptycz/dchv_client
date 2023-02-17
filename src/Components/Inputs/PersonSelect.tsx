import React from 'react';
import { useMutation, useQuery } from 'react-query';
import { IPerson } from '../../types';
import useAxios from '../../Hooks/Axios.hook';
import SearchSelect from './SearchSelect';

interface PersonSelectProps {
  name: string,
  className?: string,
}

const PersonSelect = ({
  name,
  className
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
    <SearchSelect
      name={name}
      className={className}
      options={data?.map((x) => ({ id: x.id, name: `${x.firstname} ${x.lastname}` })) || []}
      placeholder='Uživatel'
      onSearch={(e) => console.log(e)}
    />
  );
};

export default PersonSelect;
