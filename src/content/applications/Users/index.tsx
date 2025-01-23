import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';

import Users from './Users';
import { UserProvider } from '../../../contexts/UserContext';

function ApplicationsUsers() {
  return (
    <UserProvider>
      <Helmet>
        <title>Transactions - Applications</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Users />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </UserProvider>
  );
}

export default ApplicationsUsers;
