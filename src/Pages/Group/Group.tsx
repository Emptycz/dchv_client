import React, { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import BaseContainer from '../../Containers/Base/BaseContainer';
import { AuthContext } from '../../Contexts/AuthContext';
import useAxios from '../../Hooks/useAxios';
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

  const [group, setGroup] = useState<IPersonGroup>();

  const { token } = useContext(AuthContext);
  const axios = useAxios(token);

  const fetchData = async () => {
    return await axios.get(`/personGroup/${groupId}`);
  };

  useQuery(
    ['fetchPersonGroup', groupId],
    async () => {
      const { data } = await fetchData();
      setGroup(data);
    },
  );

  return (
    <BaseContainer>
      <div>
        <h1> {group?.name} </h1>
        <span> Members: </span>
        <ul>
          {!group?.members || group?.members?.length === 0 ?
            <li> no members in the group </li>
            : renderMembers(group?.members)}
        </ul>
      </div>
    </BaseContainer>
  );
};

export default Group;