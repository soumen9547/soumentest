/* eslint-disable no-undef */
import { Box, Grid, IconButton, Stack, Typography } from '@mui/material';
import React from 'react';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
// import AddReactionIcon from "@mui/icons-material/AddReaction";
import '../chat.scss';
// import { useAuth0 } from "@auth0/auth0-react";
import _ from 'lodash';
// import { API } from "../../../../api";
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { useSearchParams } from 'react-router-dom';
// import { toast } from "react-toastify";
import CachedIcon from '@mui/icons-material/Cached';
import { appColors } from '../../../../../utils/theme';
// import { useQueryClient } from "@tanstack/react-query";
// import { getUserDetails } from "../../../../utils/orgName";
import ChatAvatarComponent from '../ChatAvatarComponent';
import { formatAcsUserWithCommunicationId } from '../../../../../routes/helpers';
import { dialogActions } from '../../../../../redux/slices/dialog-slice/dialogSlice';
import { ACS_DELETE_MESSAGE } from '../../../../../constants';
import { chatProfileActions } from '../../../../../redux/slices/chat-profile/chatProfileSlice';
import { fetchUserEducation } from '../../../../../redux/slices/user-education/userEducationSlice';
import { fetchUserWorkHistory } from '../../../../../redux/slices/user-work/userWorkHistorySlice';
import { ChatStyle } from '../ChatStyling';

interface IMessageComponent {
  who: string;
  message: IMessage;
  createdOn: string;
  editedOn: string;
  status: string;
  updateEditor: any;
  setEditCancel: any;
  handlePostMessage: (contentId: number) => void;
  senderCommunicationId: string;
}

const htmlText = (htmlString: string, editedOn: string) => {
  const edited = _.size(editedOn)
    ? `<span style="font-size: 11px; font-family: Open Sans; color:#5f6368; margin-left: 5px">(Edited)</span>`
    : '';
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  const text = doc.body.textContent;
  if (text) {
    const emojiRegex = /[\u{1F000}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F100}-\u{1F1FF}]/u;
    const containsOnlyEmojis = [...text].every((char) => emojiRegex.test(char));
    if (containsOnlyEmojis) {
      return `<p style="font-size:25px; padding: 5px">${text}${edited}</p>`;
    } else {
      return `<p>${htmlString.replace(/^<p>(.*)<\/p>$/, '$1')}${edited}</p>`;
    }
  } else {
    return `<p></p>`;
  }
};

/** Status indication */
const StatusIndication = ({
  status,
  message,
  handlePostMessage
}: {
  status: string;
  message?: IMessage;
  handlePostMessage?: any;
}) => {
  const classes = ChatStyle();
  switch (status) {
    case 'loading':
      return (
        <span> &nbsp; sending...</span>
        // <span />
        // <Typography
        //   color="GrayText"
        //   variant="subtitle1"
        //   sx={{
        //     fontSize: "11px",
        //     color: "#bdbcbb",
        //   }}
        //   pl={1}
        // >
        //   sending...
        // </Typography>
      );
    case 'failed':
      return (
        <Grid
          item
          p={1}
          onClick={() => {
            handlePostMessage(_.get(message, 'contentId', ''));
          }}
        >
          <CachedIcon color="error" style={{ cursor: 'pointer' }} />
        </Grid>
      );
    case 'edited':
      return (
        <span>
          {' '}
          &nbsp; <span className={classes.dot} /> Edited
        </span>
      );
    default:
      return null;
  }
};

/** MessageComponent */
const MessageComponent: React.FC<IMessageComponent> = ({
  who,
  message,
  createdOn,
  editedOn,
  status,
  updateEditor,
  setEditCancel,
  handlePostMessage,
  senderCommunicationId
}) => {
  // const firstLetterOfWho = _.slice(who, 0, 1);
  // const alphaColor = _.get(alphaColors, firstLetterOfWho, "");
  // const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  // const src =
  //   useAppSelector((state) => state.userHeadshot.src) ||
  //   getUserDetails().picture;
  // const { user } = useAuth0();
  const [searchParams] = useSearchParams();
  const acsToken = useAppSelector((state) => state.acsToken.data.token);
  const threadId = searchParams.get('threadid') || '';
  const userProfile = useAppSelector((state) => state.userProfile.data?.personal_details);
  const loginUserProfileImage = _.get(userProfile, 'headshot');
  const loginUserFName = _.get(userProfile, 'firstName', '');
  const loginUserCommunicationId = _.get(userProfile, 'communicationId');
  const [isHovered, setIsHovered] = React.useState(false);
  // const [isDeleted, setDelete] = useState(false);
  // const acsOrgUsers = useAppSelector((state) => state.acsOrgUsers.data);
  const acsCommunityUsers = useAppSelector((state) => state.acsCommunityUsers.data);
  const formattedAcsOrgUsers: any = formatAcsUserWithCommunicationId(acsCommunityUsers);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // const userProfile = user?.picture;

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // const handleMessageDelete = async () => {
  //   const messageId = _.get(message, "id", "");
  //   const orgId = user?.org_id || "";
  //   try {
  //     const { status } = await API.deleteMessage({
  //       orgId,
  //       threadId,
  //       acsToken,
  //       messageId,
  //     });
  //     if (status === 200) {
  //       setDelete(true);
  //       queryClient.fetchQuery({ queryKey: ["recieveMessages"] });
  //     }
  //   } catch (err) {
  //     toast.error(_.get(err, "err.response.data", "Unable to delete message"));
  //   }
  // };
  const onClickOnUserIcon = () => {
    if (formattedAcsOrgUsers) {
      const channelUser = formattedAcsOrgUsers[senderCommunicationId];
      dispatch(chatProfileActions.atnSetChatProfileState(channelUser));
      const commId = _.get(channelUser, 'id.communicationId');
      const userId = _.get(formattedAcsOrgUsers, `${commId}.userId`);
      dispatch(fetchUserEducation(userId.trim()));
      dispatch(fetchUserWorkHistory(userId.trim()));
    }
  };
  const classess = ChatStyle();
  return (
    <Grid item className={classess.chatProperties} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Grid display="flex" alignItems="flex-start" width="100%" position="relative">
        <Grid item>
          <Box
            width="34px"
            height="34px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
            marginRight="8px"
          >
            {senderCommunicationId === loginUserCommunicationId ? (
              <ChatAvatarComponent
                image={loginUserProfileImage}
                firstLetter={loginUserFName.slice(0, 1)}
                width="34px"
                height="34px"
              />
            ) : (
              <ChatAvatarComponent
                onClickOnUserIcon={onClickOnUserIcon}
                image={_.get(formattedAcsOrgUsers, `[${senderCommunicationId}].id.headshot`)}
                firstLetter={who.slice(0, 1)}
                width="34px"
                height="34px"
              />
            )}
            {/* <Box
                width="35px"
                height="35px"
                // border="1px solid black"
                borderRadius={"50%"}
              > */}
            {/* <ChatAvatarComponent firstLetter="T" image={src} width="35px" height="35px"/> */}
            {/* <img
                  src={
                    user?.name?.toLowerCase() === who.toLowerCase()
                      ? src
                      : "https://www.corporatephotographerslondon.com/wp-content/uploads/2021/07/LinkedIn_profile_photo_sample_3-300x300.jpg"
                  }
                  alt="avatar"
                  style={{
                    width: "35px",
                    height: "35px",
                    borderRadius: "50%",
                  }}
                /> */}
            {/* </Box> */}
            {/* <Box
                width="8px"
                height="8px"
                borderRadius={"50%"}
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  backgroundColor: "green",
                  border: "2px solid white",
                }}
              ></Box> */}
          </Box>
        </Grid>
        <Grid item width="100%">
          <Stack direction="row" alignItems="center">
            <Typography
              onClick={() => {
                if (senderCommunicationId !== loginUserCommunicationId) {
                  onClickOnUserIcon();
                }
              }}
              sx={{
                cursor: senderCommunicationId !== loginUserCommunicationId ? 'pointer' : '',
                fontFamily: 'Open Sans',
                fontWeight: '700',
                fontSize: '14px',
                color: appColors.ChatTitle
              }}
            >
              {who}
            </Typography>
            <Typography
              sx={{
                fontSize: '10px',
                color: '#ABB5BE',
                fontFamily: 'Open Sans',
                fontWeight: '400'
              }}
              pl={1}
            >
              {createdOn.toUpperCase()}
              <StatusIndication status={status} message={message} handlePostMessage={handlePostMessage} />
            </Typography>
          </Stack>
          {/* <Typography fontSize="small" color="GrayText" mt={-0.5}>active</Typography> */}
          <Box
            className="chatContent"
            style={{
              paddingLeft: 1,
              margin: 0,
              wordBreak: 'break-word',
              // minWidth: "200px",
              fontFamily: 'Open Sans',
              fontWeight: '400',
              fontSize: '14px',
              color: '#68717A'
            }}
            dangerouslySetInnerHTML={{
              __html: htmlText(_.get(message, 'content.message', ''), editedOn)
            }}
          >
            {/* {message} */}
          </Box>
        </Grid>
        {isHovered && (
          <Box
            display="flex"
            alignItems="center"
            boxShadow={1}
            borderRadius={1}
            bgcolor="#fff"
            sx={{
              position: 'absolute',
              top: -25,
              right: 20
            }}
            border="1px solid lightgray"
          >
            {/* <IconButton title="Add A Reaction">
                <AddReactionIcon
                  fontSize="small"
                  sx={{ padding: 0, margin: 0 }}
                />
              </IconButton> */}
            {senderCommunicationId === loginUserCommunicationId ? (
              <>
                <IconButton
                  title="Edit"
                  onClick={() => {
                    setEditCancel(true);
                    updateEditor(message);
                  }}
                >
                  <CreateIcon fontSize="small" sx={{ padding: 0, margin: 0 }} />
                </IconButton>
                <IconButton
                  title="Delete"
                  onClick={() =>
                    dispatch(
                      dialogActions.atnOpenDialog({
                        dialogName: ACS_DELETE_MESSAGE,
                        title: '',
                        dialogDetails: { message: message, threadId: threadId, acsToken: acsToken }
                      })
                    )
                  }
                >
                  <DeleteIcon fontSize="small" sx={{ padding: 0, margin: 0 }} />
                </IconButton>
              </>
            ) : null}
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default MessageComponent;
