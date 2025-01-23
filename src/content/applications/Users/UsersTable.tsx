import { FC, ChangeEvent, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Typography,
  useTheme,
  CardHeader
} from '@mui/material';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DownloadTwoTone from '@mui/icons-material/DownloadTwoTone';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';
import { User } from '../../../models/user';
import ViewModal from './Modals';
import UserModal from './Modals/UserModal';
import { UserContext } from '../../../contexts/UserContext';
import DeleteModal from './Modals/DeleteModal';

interface UsersTableProps {
  className?: string;
  users: User[];
}

const applyPagination = (
  users: User[],
  page: number,
  limit: number
): User[] => {
  return users.slice(page * limit, page * limit + limit);
};

const UsersTable: FC<UsersTableProps> = ({ users }) => {
  const [selectedUsers, setSelectedUsers] = useState<number[]>(
    []
  );
  const selectedBulkActions = selectedUsers.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const {
    modalOpened,
    setModalOpened,
    viewModalOpened,
    setViewModalOpened,
    deleteModalOpened,
    setDeleteModalOpened,
    setUserId,
    fetchPdf,
  } = useContext(UserContext);

  const handleSelectAllUsers = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedUsers(
      event.target.checked
        ? users.map((user) => user.id)
        : []
    );
  };

  const handleSelectOneUser = (
    event: ChangeEvent<HTMLInputElement>,
    userId: number
  ): void => {
    if (!selectedUsers.includes(userId)) {
      setSelectedUsers((prevSelected) => [
        ...prevSelected,
        userId
      ]);
    } else {
      setSelectedUsers((prevSelected) =>
        prevSelected.filter((id) => id !== userId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };
  
  const handleEdit = (userId: number) => {
    setUserId(userId);
    setModalOpened(true);
  };

  const handleView = (userId: number) => {
    setUserId(userId);
    setViewModalOpened(true);
  };

  const handleDelete = (userId: number) => {
    setUserId(userId);
    setDeleteModalOpened(true);
  };

  const paginatedUsers = applyPagination(
    users,
    page,
    limit
  );
  const selectedSomeCryptoOrders =
    selectedUsers.length > 0 &&
    selectedUsers.length < users.length;
  const selectedAllCryptoOrders =
    selectedUsers.length === users.length;
  const theme = useTheme();

  return (
    <>
      <ViewModal open={viewModalOpened} onClose={() => setViewModalOpened(false)} />
      <UserModal open={modalOpened} onClose={() => setModalOpened(false)}/>
      <DeleteModal open={deleteModalOpened} onClose={() => setDeleteModalOpened(false)}/>
      <Card>
        {selectedBulkActions && (
          <Box flex={1} p={2}>
            <BulkActions />
          </Box>
        )}
        {!selectedBulkActions && (
          <CardHeader
            title="Users"
          />
        )}
        <Divider />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    checked={selectedAllCryptoOrders}
                    indeterminate={selectedSomeCryptoOrders}
                    onChange={handleSelectAllUsers}
                  />
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedUsers.map((user) => {
                const isUserSelected = selectedUsers.includes(
                  user.id
                );
                return (
                  <TableRow
                    hover
                    key={user.id}
                    selected={isUserSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isUserSelected}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                          handleSelectOneUser(event, user.id)
                        }
                        value={isUserSelected}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {user.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {user.email}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {user.role}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="View User" arrow>
                        <IconButton
                          sx={{
                            '&:hover': {
                              background: theme.colors.primary.lighter
                            },
                            color: theme.palette.primary.main
                          }}
                          color="inherit"
                          size="small"
                          onClick={() => handleView(user.id)}
                        >
                          <VisibilityTwoToneIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Download Pdf" arrow>
                        <IconButton
                          sx={{
                            '&:hover': {
                              background: theme.colors.primary.lighter
                            },
                            color: theme.palette.primary.main
                          }}
                          color="inherit"
                          size="small"
                          onClick={() => fetchPdf(user.id)}
                        >
                          <DownloadTwoTone fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit User" arrow>
                        <IconButton
                          sx={{
                            '&:hover': {
                              background: theme.colors.primary.lighter
                            },
                            color: theme.palette.primary.main
                          }}
                          color="inherit"
                          size="small"
                          onClick={() => handleEdit(user.id)}
                        >
                          <EditTwoToneIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete User" arrow>
                        <IconButton
                          sx={{
                            '&:hover': { background: theme.colors.error.lighter },
                            color: theme.palette.error.main
                          }}
                          color="inherit"
                          size="small"
                          onClick={() => handleDelete(user.id)}
                        >
                          <DeleteTwoToneIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box p={2}>
          <TablePagination
            component="div"
            count={users.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25, 30]}
          />
        </Box>
      </Card>
    </>
  );
};

UsersTable.propTypes = {
  users: PropTypes.array.isRequired
};

UsersTable.defaultProps = {
  users: []
};

export default UsersTable;
