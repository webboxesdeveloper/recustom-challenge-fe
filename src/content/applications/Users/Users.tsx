import { Card } from '@mui/material';
import UsersTable from './UsersTable';
import { useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext';

function Users() {
  const { users } = useContext(UserContext);

  return (
    <Card>
      <UsersTable users={users} />
    </Card>
  );
}

export default Users;
