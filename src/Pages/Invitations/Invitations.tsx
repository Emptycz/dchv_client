import React from 'react';
import useAxios from '../../Hooks/Axios.hook';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { IPersonGroupRelation, IPersonGroupRelationsState } from '../../types';
import BaseContainer from '../../Containers/Base/BaseContainer';
import LoadingCircle from '../../Components/Spinners/LoadingCircle';
import { Button } from '@mui/material';


const Invitations = () => {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery(
    ['fetchPersonGroupInvitations'],
    async (): Promise<IPersonGroupRelation[]> => {
      const { data: res } = await axios.get<IPersonGroupRelation[]>('/personGroupRelations?State=1');
      return res;
    }
  );

  const { mutateAsync: patchInvitation } = useMutation(
    ['patchPersonGroupInvitation'],
    async ({ id, data }: { id: string | number, data: string | FormData }): Promise<IPersonGroupRelation[]> => {
      const { data: res } = await axios.patch<IPersonGroupRelation[]>(`/personGroupRelations/${id}`, data);
      return res;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('fetchPersonGroupInvitations');
        queryClient.invalidateQueries('fetchInvitationsCount');
      }
    }
  );

  const { mutateAsync: removeInvitation } = useMutation(
    ['removePersonGroupInvitation'],
    async (id: string | number): Promise<void> => {
      await axios.delete(`/personGroupRelations/${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('fetchPersonGroupInvitations');
        queryClient.invalidateQueries('fetchInvitationsCount');
      }
    }
  );

  const acceptInvitation = (id: number) =>
    patchInvitation({id, data: JSON.stringify({ state: IPersonGroupRelationsState.JOINED })});

  const declineInvitation = (id: number) => removeInvitation(id);

  const renderInvitationBox = (inv: IPersonGroupRelation) => (
    <div className='border-[1px] flex flex-col p-4 gap-2 w-81 h-min-30 bg-gray-200 dark:bg-gray-700 rounded-md' key={inv.id}>
      <div className='flex'>
        <h3> You are invited to join a team: {inv.group?.displayName || inv.group?.name} </h3>
      </div>
      <div className='flex flex-col w-full'>
        <span> by {inv.group?.person?.firstname} {inv.group?.person?.lastname} </span>
        <div className='flex flex-row justify-center gap-10'>
          <Button variant='contained' onClick={() => acceptInvitation(inv.id)}> Accept </Button>
          <Button variant='outlined' color='error' onClick={() => declineInvitation(inv.id)}> Decline </Button>
        </div>
      </div>
    </div>
  );

  return (
    <BaseContainer>
      <h1> Your invitations </h1>
      <div className='my-10'>
        {isLoading ? <LoadingCircle show={isLoading} /> : (
          <div className='flex flex-col gap-6'>
            {!Array.isArray(data) ? (
              <h3 className='self-center'> You have no pending invitations </h3>
            ): data?.map((x) => renderInvitationBox(x))}
          </div>
        )}
      </div>
    </BaseContainer>
  );
};

export default Invitations;
