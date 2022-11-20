import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import BaseContainer from '../../Containers/Base/BaseContainer';
import useAxios from '../../Hooks/Axios.hook';
import { IPerson, IPersonGroup } from '../../types';

const renderMembers = (members: IPerson[]) => {
  return members.map((x) => (
    <li key={x.id}> {x.firstname} {x.lastname} </li>
  ));
};

const Group = () => {
  const { groupId } = useParams();
  const history = useNavigate();

  if (!groupId) {
    history('/groups');
  }

  const axios = useAxios();

  const fetchData = async () => {
    const { data } = await axios.get<IPersonGroup>(`/personGroup/${groupId}`);
    return data;
  };

  const { data } = useQuery(
    ['fetchPersonGroup', groupId],
    async () => await fetchData(),
  );

  return (
    <BaseContainer>
      <div>
        <h1> {data?.name} </h1>
        <span> Members: </span>
        <ul>
          {!data?.members || data?.members?.length === 0 ?
            <li> no members in the group </li>
            : renderMembers(data?.members)}
        </ul>
      </div>
    </BaseContainer>
  );
};

export default Group;