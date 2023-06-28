/* eslint-disable react-hooks/exhaustive-deps */
import Box from '@mui/material/Box/Box';
import IconButton from '@mui/material/IconButton/IconButton';
import Typography from '@mui/material/Typography';
import pencil from '../../../assets/images/pencil.svg';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { disabilityPopupActions } from '../../../redux/slices/disability/disabilityPopupSlice';

const Disability = () => {
  const userData = useAppSelector((state) => state.userProfile.data);
  const disabilityValue = userData?.personal_details?.disability || [];
  const dispatch = useAppDispatch();

  return (
    <Box sx={{ marginBottom: '20px' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px'
        }}
      >
        <Box
          sx={{
            fontFamily: 'Open Sans',
            fontSize: '14px',
            fontWeight: '600',
            lineHeight: '19px',
            color: '#0082B6'
          }}
        >
          Disability
        </Box>

        <Box>
          <IconButton
            onClick={() =>
              dispatch(
                disabilityPopupActions.handleDisabilityPopup({
                  open: true,
                  disbale: false
                })
              )
            }
          >
            <img
              src={pencil}
              alt="pencil"
              style={{
                padding: 0,
                margin: 0,
                width: '20px',
                height: '20px'
              }}
            />
          </IconButton>
        </Box>
      </Box>
      {disabilityValue && disabilityValue?.length > 0 ? (
        disabilityValue?.length === 1 ? (
          <ul style={{ margin: 0 }}>
            <li>
              <Typography
                sx={{
                  fontFamily: 'Open Sans',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#152536'
                }}
              >
                {disabilityValue[0]}
              </Typography>
            </li>
          </ul>
        ) : (
          <ul style={{ margin: 0 }}>
            {disabilityValue?.map((each, index) => (
              <li key={index}>
                <Typography
                  sx={{
                    fontFamily: 'Open Sans',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#152536'
                  }}
                >
                  {each}
                </Typography>
              </li>
            ))}
          </ul>
        )
      ) : (
        <Box sx={{ padding: '8px 0  8px 17px' }}>
          <Typography>No Disabilities</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Disability;
