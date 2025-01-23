import PropTypes from 'prop-types';
import {
  useTheme,
  Card,
  CardHeader,
  Divider, Box
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import { UserContext } from '../../../../contexts/UserContext';
import Button from '@mui/material/Button';

function ViewModal(props) {
  const theme = useTheme();
  const { onClose, open } = props;
  const { selectedUser, fetchPdf } = useContext(UserContext);
  const handleDownload = () => {
    fetchPdf(selectedUser.id);
    onClose();
  }

  return (
    <Dialog onClose={onClose} open={open}>
      {/*<DialogTitle>User Details</DialogTitle>*/}
      <Card>
        <CardHeader title="User Details" />
        <Divider />
        <Box px={2} py={2} display="flex" alignItems="flex-start">
          <Box pl={2} flex={1}>
            <Typography variant="h6">Details</Typography>
            <Box pt={2} display="flex">
              <Box pr={8}>
                <Typography
                  gutterBottom
                  variant="caption"
                  sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
                >
                  Name
                </Typography>
                <Typography variant="body1">{selectedUser?.name}</Typography>
              </Box>
              <Box>
                <Typography
                  gutterBottom
                  variant="caption"
                  sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
                >
                  Email
                </Typography>
                <Typography variant="body1">{selectedUser?.email}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        {/*<Divider />*/}
        <Box px={2} pb={2} display="flex" alignItems="flex-start">
          <Box pl={2} flex={1}>
            <Box display="flex">
              <Box pr={8}>
                <Typography
                  gutterBottom
                  variant="caption"
                  sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
                >
                  Role
                </Typography>
                <Typography variant="body1">{selectedUser?.role}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Divider />
        <Box px={2} py={2} display="flex" alignItems="flex-start">
          <Box pl={2} flex={1}>
            <Typography variant="h6">Activities</Typography>

            <Box pt={2} display="flex">
              <Box pr={8}>
                <Typography
                  gutterBottom
                  variant="caption"
                  sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
                >
                  Logins
                </Typography>
                <Typography variant="body1">654</Typography>
              </Box>
              <Box>
                <Typography
                  gutterBottom
                  variant="caption"
                  sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
                >
                  Downloads
                </Typography>
                <Typography variant="body1">21</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
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
              onClick={handleDownload}
            >
              Download
            </Button>
          </Box>
        </Box>
      </Card>
    </Dialog>
  );
}

ViewModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default ViewModal;
