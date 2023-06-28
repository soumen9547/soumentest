import { Box } from '@mui/material';
import Sidebar from '../Sidebar';
import Header from '../Header';
import { Outlet } from 'react-router-dom';
import DisabilityModal from '../components/DisabilityModal';
import '../../../assets/style/sass/custom.scss';

const Layout = () => {
  return (
    <Box className="mainBody">
      <Sidebar />
      <Box flexGrow={1} height="100vh">
        <Header />
        <Outlet />
        <DisabilityModal />
      </Box>
    </Box>
  );
};

export default Layout;
