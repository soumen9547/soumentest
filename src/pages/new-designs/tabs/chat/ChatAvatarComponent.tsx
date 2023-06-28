/* eslint-disable react/jsx-no-useless-fragment */
import { Box, Typography } from '@mui/material';
import _ from 'lodash';
import { alphaColors } from '../../../../utils/alphabates-colors';
import { appColors } from '../../../../utils/theme';
import { getUserDetails } from '../../../../utils/orgName';

/**
 * Chat avatar component
 */

interface IChatAvatarComponent {
  image?: string | null | undefined;
  firstLetter?: any;
  onClickOnUserIcon?: () => void;
  width?: string;
  height?: string;
  type?: 'self' | 'other' | 'home' | 'no status';
  fontSize?: string;
}

const ChatAvatarComponent: React.FC<IChatAvatarComponent> = ({
  image,
  firstLetter,
  onClickOnUserIcon,
  width = '48px',
  height = '48px',
  type = 'other',
  fontSize
}) => {
  const userFirstLetter = getUserDetails()?.name?.slice(0, 1);

  return (
    <Box
      width={type === 'home' ? '65px' : '50px'}
      height={type === 'home' ? '65px' : '50px'}
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
    >
      <Box
        onClick={onClickOnUserIcon}
        style={{ cursor: onClickOnUserIcon ? 'pointer' : '' }}
        justifyContent="center"
        alignItems="center"
        display="flex"
        bgcolor={image ? 'white' : _.get(alphaColors, _.capitalize(firstLetter?.charAt(0)), '')}
        width={width}
        height={height}
        borderRadius="50%"
      >
        {_.size(image) ? (
          <img
            src={image || ''}
            referrerPolicy="no-referrer"
            alt=""
            style={{
              width: width,
              height: height,
              borderRadius: '50%',
              objectFit: 'cover'
            }}
          />
        ) : (
          <>
            {type === 'self' ? (
              <Typography color="inherit">{_.capitalize(userFirstLetter)}</Typography>
            ) : (
              <Typography
                color="inherit"
                fontSize={fontSize ? fontSize : '15px'}
                sx={{ color: '#fff', fontWeight: '600' }}
              >
                {firstLetter?.toUpperCase()}
              </Typography>
            )}
          </>
        )}
      </Box>
      {type !== 'no status' && (
        <Box
          width="10px"
          height="10px"
          borderRadius="50%"
          style={{
            position: 'absolute',
            bottom: '6px',
            right: '3px',
            backgroundColor: appColors.lightGreen,
            border: '2px solid white',
            boxSizing: 'border-box'
          }}
        />
      )}
    </Box>
  );
};

export default ChatAvatarComponent;
