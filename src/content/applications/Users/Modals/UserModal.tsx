import PropTypes from 'prop-types';
import {
  useTheme,
  Card,
  CardHeader,
  Divider,
  Box,
  Input,
  MenuItem
} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { ADMIN_ROLE, USER_ROLE } from '../../../../models/user';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../../contexts/UserContext';

function UserModal(props) {
  const { handleSubmit: _handleSubmit, selectedUser } = useContext(UserContext);
  const theme = useTheme();
  const { onClose, open } = props;
  const [name, setName] = useState(selectedUser?.name);
  const [email, setEmail] = useState(selectedUser?.email);
  const [role, setRole] = useState(selectedUser?.role);
  useEffect(() => {
    setName(selectedUser?.name);
    setEmail(selectedUser?.email);
    setRole(selectedUser?.role);
  }, [selectedUser]);
  const handleSubmit = (e) => {
    _handleSubmit({
      name,
      email,
      role,
    });
    e.preventDefault();
  };
  const handleChange = (name: string) => (e) => {
    const value = e.target.value;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'role':
        setRole(value);
        break;
      default:
        console.log("form element name not defined");
    }
  }

  return (
    <Dialog onClose={onClose} open={open}>
      {/*<DialogTitle>User Details</DialogTitle>*/}
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader title={`${selectedUser ? 'Update User' : 'Create User'}`} />
          <Divider />
          <Box px={2} py={2} display="flex" alignItems="flex-start">
            <Box pl={2} flex={1}>
              <Box pt={2} display="flex">
                <Box pr={8}>
                  <Typography
                    gutterBottom
                    variant="caption"
                    sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
                  >
                    Name
                  </Typography>
                </Box>
                <Box>
                  <Input
                    name="name"
                    value={name}
                    onChange={handleChange('name')}
                    required
                  />
                </Box>
              </Box>
            </Box>
          </Box>
          <Box px={2} py={2} display="flex" alignItems="flex-start">
            <Box pl={2} flex={1}>
              <Box pt={2} display="flex">
                <Box pr={8}>
                  <Typography
                    gutterBottom
                    variant="caption"
                    sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
                  >
                    Email
                  </Typography>
                </Box>
                <Box>
                  <Input
                    name="email"
                    value={email}
                    type="email"
                    onChange={handleChange('email')}
                    required
                  />
                </Box>
              </Box>
            </Box>
          </Box>
          <Box px={2} py={2} display="flex" alignItems="flex-start">
            <Box pl={2} flex={1}>
              <Box pt={2} display="flex">
                <Box pr={8}>
                  <Typography
                    gutterBottom
                    variant="caption"
                    sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
                  >
                    Role
                  </Typography>
                </Box>
                <Box width={2} flex={1}>
                  <TextField
                    id="outlined-select-currency"
                    select
                    label="Select"
                    required
                    value={role}
                    name="role"
                    helperText="Please select your currency"
                    onChange={handleChange('role')}
                  >
                    <MenuItem key={USER_ROLE} value={USER_ROLE}>
                      {USER_ROLE}
                    </MenuItem>
                    <MenuItem key={ADMIN_ROLE} value={ADMIN_ROLE}>
                      {ADMIN_ROLE}
                    </MenuItem>
                  </TextField>
                </Box>
              </Box>
            </Box>
          </Box>
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
                {selectedUser ? 'Save' : 'Create'}
              </Button>
            </Box>
          </Box>
        </Card>
      </form>
    </Dialog>
  );
}

UserModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default UserModal;
