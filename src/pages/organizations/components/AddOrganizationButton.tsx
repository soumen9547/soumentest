import { Box, Grid, Typography } from '@mui/material';
import pluscircle from '../../../assets/images/pluscircle.svg';

interface IAddOrganizationButton {
  onClickAddOrganization: (flag: boolean) => void;
}

const AddOrganizationButton: React.FC<IAddOrganizationButton> = ({ onClickAddOrganization }) => {
  return (
    <Box
      sx={{
        marginTop: '1rem'
      }}
    >
      {/* <Button
        variant="contained"
        onClick={() => onClickAddOrganization(true)}
        style={{
          fontFamily: "Open Sans",
          textAlign: "center",
          marginTop: "20px",
          fontSize: "16px",
          fontWeight: "600",
          color: "#fff",
          background: "#152536",
          borderRadius: "8px",
          height: "40px",
          textTransform: "none",
        }}
      >
        Add Organization
      </Button> */}
      <Grid
        container
        sx={{
          padding: '16px',
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Grid>
          <Typography
            sx={{
              fontFamily: 'Open Sans',
              fontSize: '16px',
              fontWeight: '600',
              color: '#152536',
              textAlign: 'left'
            }}
          >
            All Organizations
          </Typography>
        </Grid>
        <Grid>
          <img
            src={pluscircle}
            alt="pluscircle"
            onClick={() => onClickAddOrganization(true)}
            style={{
              padding: 0,
              margin: 0,
              width: '34px',
              height: '34px',
              marginRight: '6px',
              cursor: 'pointer'
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddOrganizationButton;
