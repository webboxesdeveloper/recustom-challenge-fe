import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  Divider,
  Box,
} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../../contexts/UserContext';

function DeleteModal(props) {
  const { selectedUser, handleDelete } = useContext(UserContext);
  const { onClose, open } = props;
  const [name, setName] = useState(selectedUser?.name);
  useEffect(() => {
    setName(selectedUser?.name);
  }, [selectedUser]);
  const handleSubmit = (e) => {
    handleDelete();
    e.preventDefault();
  };

  return (
    <Dialog onClose={onClose} open={open}>
      {/*<DialogTitle>User Details</DialogTitle>*/}
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader title={`Are you sure you want to delete ${name}?`} />
          <Divider />
          <Divider />
          <Box px={2} py={2} display="flex" justifyContent="end">
            <Box pr={8}>
              <Button
                sx={{ mt: { xs: 2, md: 0 } }}
                variant="outlined"
                onClick={onClose}
              >
                Cancel
              </Button>
            </Box>
            <Box>
              <Button
                sx={{ mt: { xs: 2, md: 0 } }}
                variant="contained"
                type="submit"
              >
                Delete
              </Button>
            </Box>
          </Box>
        </Card>
      </form>
    </Dialog>
  );
}

DeleteModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default DeleteModal;
