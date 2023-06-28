import { styled } from '@mui/system';
import { Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { appColors, chatFonts } from '../../../../utils/theme';

/** Own components */
export const ChatHeading = styled(Typography)({
  fontSize: chatFonts.lg,
  color: appColors.ChatTitle,
  fontWeight: 600,
  fontFamily: 'Open Sans'
});
export const ChatHeadName = styled(Typography)({
  fontSize: chatFonts.lg,
  color: appColors.ChatTitle,
  fontWeight: 600,
  fontFamily: 'Open Sans',
  cursor: 'pointer',
  textTransform: 'capitalize'
});
export const ChatHeadStatus = styled(Typography)({
  fontSize: chatFonts.md,
  color: '#68717A',
  // color: appColors.gray4,
  fontWeight: 400,
  fontFamily: 'Open Sans'
});
export const ChatProfileHeadings = styled(Typography)({
  fontSize: chatFonts.lg,
  color: appColors.ChatTitle,
  fontWeight: 600,
  fontFamily: 'Open Sans'
});
export const ChatProfileSubText = styled(Typography)({
  fontSize: chatFonts.md,
  color: '#68717A',
  fontWeight: 400,
  fontFamily: 'Open Sans'
});
export const ItemsButton = styled(Button)({
  fontSize: '14px',
  fontWeight: '400',
  fontFamily: 'Open Sans',
  color: '#68717A',
  borderRadius: '16px',
  background: '#fff !important',
  height: '29px',
  border: '2px solid #CED4DA',
  textTransform: 'capitalize',
  whiteSpace: 'nowrap',
  cursor: 'default'
});

/** Own clasess */
export const ChatStyle = makeStyles(() => ({
  dot: {
    backgroundColor: '#5f6368',
    display: 'inline-block',
    height: '4px',
    width: '4px',
    borderRadius: '50%',
    marginBottom: '3px',
    marginRight: '3px'
  },
  StartOfChat: {
    fontSize: chatFonts.sm,
    fontFamily: 'Open Sans',
    color: appColors.gray3,
    backgroundColor: appColors.white,
    borderRadius: '20px',
    border: '2px solid #CED4DA',
    padding: '3px 15px'
  },
  /** Sidebar */
  container: {
    backgroundColor: appColors.white,
    minWidth: '350px',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    borderRight: `1px solid ${appColors.gray1}`
  },
  chatTypeTabsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderBottom: `1px solid ${appColors.gray1}`,
    paddingTop: 1
  },
  TabsText: {
    color: '#68717A',
    fontSize: chatFonts.lg,
    fontWeight: 600
  },
  chatPersonWrapper: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.1)'
    }
  },
  ChatPersonWrapperBox: {
    padding: 13,
    display: 'flex',
    borderBottom: `1px solid ${appColors.gray1}`,
    maxWidth: '350px'
  },
  activeChatPersonWrapper: {
    backgroundColor: appColors.blue1
  },
  notificationContainer: {
    backgroundColor: '#F79420',
    padding: '0px 7px',
    borderRadius: '50%'
  },
  /** Main Body */
  chatWrapper: {
    height: '100%',
    padding: 15,
    backgroundColor: '#F9FAFC'
  },
  chatWrapperBody: {
    height: '100%',
    padding: 5,
    backgroundColor: appColors.white,
    borderRadius: 8,
    border: `1px solid ${appColors.gray1}`
  },
  headerContainer: {
    borderBottom: `1px solid ${appColors.gray1}`,
    padding: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  chatContent: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  chatArea: {
    padding: '10px'
  },
  chatTextBox: {
    position: 'relative',
    border: `1px solid ${appColors.gray1}`,
    borderRadius: 8
  },
  chatProperties: {
    width: '100%',
    ':hover': {
      backgroundColor: '#f5faf6'
    },
    padding: '8px 10px'
  },

  /** Chat Profile */
  chatProfileBox: {
    flexGrow: 1,
    bgcolor: appColors.white,
    borderRadius: 8,
    border: '1px solid #152536',
    margin: '0px 16px'
  },
  profileBoxHeading: {
    fontSize: chatFonts.lg,
    fontWeight: 600,
    fontFamily: 'Open Sans',
    color: appColors.ChatTitle
  },
  profileBoxHeading2: {
    fontSize: chatFonts.md,
    fontWeight: 600,
    fontFamily: 'Open Sans',
    color: appColors.ChatTitle
  },
  profileBoxItalic: {
    fontFamily: 'Open Sans',
    fontWeight: '400',
    fontSize: chatFonts.md,
    color: '#68717A',
    fontStyle: 'italic'
  },
  chatProfileName: {
    fontSize: chatFonts.lg,
    color: appColors.ChatTitle,
    fontFamily: 'Open Sans',
    fontWeight: 600
  },
  memberCommonText: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  memberCircleImage: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50px',
    height: '50px',
    position: 'relative'
  },
  memberCircleInner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50px',
    height: '50px',
    background: '#fff',
    borderRadius: '50%'
  },
  membersNameText: {
    fontSize: '16px !important',
    fontFamily: 'Open Sans !important',
    fontWeight: '600 !important',
    color: '#152536 !important',
    marginRight: '10px !important'
  },
  membersButton: {
    borderRadius: '5px',
    fontFamily: 'Open Sans',
    fontSize: '12px',
    fontWeight: '600',
    width: '62px',
    height: '24px'
  },
  menberDetailsText: {
    fontSize: '14px !important',
    fontWeight: '400 !important',
    fontFamily: 'Open Sans !important',
    color: '#68717A !important'
  },
  memberChatBttn: {
    fontSize: '14px !important',
    fontWeight: '600 !important',
    fontFamily: 'Open Sans !important',
    color: '#0082B6 !important',
    border: '1px solid #0082B6 !important',
    borderRadius: '29px !important'
  },
  memberHelpBtn: {
    fontSize: '13px !important',
    fontWeight: '400 !important',
    fontFamily: 'Open Sans !important',
    color: '#68717A !important',
    border: '1px solid  #CED4DA !important',
    borderRadius: '29px !important',
    height: '29px',
    textTransform: 'capitalize',
    whiteSpace: 'nowrap'
  },
  priorHelpBtn: {
    fontSize: '13px !important',
    fontWeight: '400 !important',
    fontFamily: 'Open Sans !important',
    color: '#fff !important',
    borderRadius: '16px !important',
    background: '#0071A9 !important',
    height: '29px',
    textTransform: 'capitalize',
    whiteSpace: 'nowrap'
  },
  memberBoxSize: {
    background: '#fff',
    borderRadius: '8px',
    border: '1px solid #EFF0F4',
    margin: '16px 16px 16px 0'
  },
  memberWorkHistory: {
    fontFamily: 'Open Sans',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '22px',
    color: ' #68717A',
    fontStyle: 'italic'
  },
  memberLanguage: {
    fontFamily: 'Open Sans',
    fontWeight: '400',
    fontSize: '12px',
    color: appColors.ChatTitle
  },
  filterAccordionDetails: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '5px'
  },
  filterDetailsText: {
    FontFamily: 'Open Sans',
    fontWeight: '400!important',
    fontSize: '14px !important',
    color: '#68717A'
  },
  programPopupWrapper: {
    color: '#68717A',
    fontSize: '14px',
    fontFamily: 'Open Sans',
    fontWeigth: '400',
    marginBottom: '10px'
  },
  popupSummary: {
    FontFamily: 'Open Sans',
    fontWeight: '600 !important',
    fontSize: '16px !important',
    color: ' #152536'
  },
  programDialogTitle: {
    fontFamily: 'Open Sans',
    textAlign: 'center',
    fontSize: '22px',
    fontWeight: '600 !important',
    color: appColors.ChatTitle
  }
}));
