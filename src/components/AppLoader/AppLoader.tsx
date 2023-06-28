/* eslint-disable no-undef */
import { makeStyles } from '@mui/styles';
import { ThreeDots } from 'react-loader-spinner';
import { appColors } from '../../utils/theme';

const useStyles = makeStyles({
  appLoaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const AppLoader: React.FC<IAppLoader> = ({ color = appColors.blue2, height }) => {
  const classes = useStyles();
  return (
    <div
      className={classes.appLoaderContainer}
      style={{
        height: height ? height : '100vh'
      }}
    >
      <ThreeDots height="60" width="60" radius="7" color={color} ariaLabel="three-dots-loading" visible={true} />
    </div>
  );
};

export default AppLoader;
