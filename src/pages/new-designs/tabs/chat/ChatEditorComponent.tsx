/* eslint-disable no-duplicate-imports */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useCallback } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { Box, Grid, Stack, IconButton, ThemeProvider } from '@mui/material';
import { reactDraftWysiwygToolbarOptions } from '../../../../utils/react-draft-wysiwyg-options';
import { Send } from '@mui/icons-material';
import { chatTheme } from '../../../../utils/theme';
import { Modifier, convertToRaw } from 'draft-js';
import CloseIcon from '@mui/icons-material/Close';
import _ from 'lodash';
import '../../../../utils/richEditor.scss';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../../../redux/hooks';
import { getCurrentChannelName } from '../../../../routes/helpers';
import { EditorState, SelectionState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { chatEditorActions } from '../../../../redux/slices/chat-editor/chatEditorSlice';
import { useDispatch } from 'react-redux';
import { ChatStyle } from './ChatStyling';

interface IChatEditorComponent {
  editorState: any;
  setEditorState: React.Dispatch<any>;
  disableSendButton: boolean;
  handlePostMessage: () => void;
  handleEditCancel: any;
  showEditCancel: boolean;
  setEditCancel: any;
  channelName: string;
  activeMessageId: any;
}
let threadValue = '';

const ChatEditorComponent: React.FC<IChatEditorComponent> = ({
  editorState,
  setEditorState,
  disableSendButton,
  handlePostMessage,
  handleEditCancel,
  showEditCancel,
  channelName,
  activeMessageId
}) => {
  // const queryClient = useQueryClient();
  // const dispatch = useAppDispatch()

  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const content = convertToRaw(editorState.getCurrentContent());
  // const text = _.get(_.head(_.get(content, "blocks")), "text", "");
  const contentText = _.map(_.get(content, 'blocks'), (each) => _.get(each, 'text', '')).join('');

  // const editorValue = useAppSelector(state => _.get(_.find(_.get(state,'chatEditorState'), each => _.get(each,'threadId') === threadValue),'value',EditorState.createEmpty()))

  const threadId = searchParams.get('threadid') || '';
  threadValue = threadId || '';
  const type = searchParams.get('type') || '';

  let hidePlaceholder = 'RichEditor-editor';
  let contentState = editorState.getCurrentContent();
  if (!contentState.hasText()) {
    if (contentState.getBlockMap().first().getType() !== 'unstyled') {
      hidePlaceholder += ' RichEditor-hidePlaceholder';
    }
  }

  const editorRef = React.createRef<Editor>();
  const [isFocused, setIsFocused] = useState(false);
  const moveCursorToEnd = (editorState: any, setEditorState: any) => {
    const content = editorState.getCurrentContent();
    const blockArray = content.getBlocksAsArray();
    const lastBlock = blockArray[blockArray.length - 1];
    const lastBlockKey = lastBlock.getKey();
    const lastBlockLength = lastBlock.getLength();

    const selection = new SelectionState({
      anchorKey: lastBlockKey,
      anchorOffset: lastBlockLength,
      focusKey: lastBlockKey,
      focusOffset: lastBlockLength
    });

    const nextState = EditorState.forceSelection(editorState, selection);
    setEditorState(nextState);
  };

  useEffect(() => {
    if (showEditCancel) {
      moveCursorToEnd(editorState, setEditorState);
    }
  }, [activeMessageId]);

  const handleKeyDown = (e: any) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      const rawContentState = convertToRaw(editorState.getCurrentContent());
      const draftToHtmlV = draftToHtml(rawContentState);
      if (draftToHtmlV === '<ul>\n<li></li>\n</ul>\n' || draftToHtmlV === '<ol>\n<li></li>\n</ol>\n') {
        setEditorState(EditorState.createEmpty());
      }
    }
  };

  const handleEditorStateChange = (state: any) => {
    setEditorState(state);
  };

  const handleReturn = (e: any) => {
    if (e.shiftKey && (e.code === 'Enter' || e.code === 'NumpadEnter')) {
      return false;
    } else {
      if (!e.shiftKey && (e.code === 'Enter' || e.code === 'NumpadEnter')) {
        if (contentText.trim().length > 0) {
          handlePostMessage();
        }
        return true;
      } else {
        return true;
      }
    }
  };
  const classes = ChatStyle();

  return (
    <ThemeProvider theme={chatTheme}>
      <Box className={classes.chatArea}>
        <Box className={classes.chatTextBox}>
          <Box className={hidePlaceholder} onKeyDown={handleKeyDown}>
            <Editor
              onBlur={() => setIsFocused(false)}
              onFocus={() => setIsFocused(true)}
              ref={editorRef}
              editorState={editorState}
              editorStyle={{ fontFamily: 'Open Sans' }}
              // wrapperStyle={{ padding: 0, border: "none" }}
              toolbarClassName="toolBarStyle"
              wrapperClassName="wrapperClassName p-0 b-0"
              editorClassName="editorClassName word-wrap"
              toolbar={reactDraftWysiwygToolbarOptions()}
              placeholder={`Message ${channelName}`}
              handleReturn={handleReturn}
              onEditorStateChange={handleEditorStateChange}
              //   //TODO: Need to save editor state in redux
              //   // dispatch(chatEditorActions.atnSetEditorState({status: "new", threadId:threadValue,value: state }))
              //   setEditorState(state);
              // }}
            />
          </Box>
          {/* Send Icon */}
          <Box
            position="absolute"
            sx={{
              cursor: 'pointer',
              bottom: 3,
              right: 10
            }}
          >
            <IconButton onClick={handleEditCancel}>{showEditCancel && <CloseIcon fontSize="small" />}</IconButton>
            <IconButton
              sx={{
                background: '#0082B6 !important',
                border: '1px solid #0071A9',
                boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.08)',
                borderRadius: '8px',
                width: '32px',
                height: '32px'
              }}
              color="primary"
              disabled={disableSendButton || contentText.trim().length <= 0}
              onClick={() => {
                handlePostMessage();
              }}
            >
              <Send
                fontSize="small"
                sx={{
                  color: '#D9D9D9',
                  width: '16.65px',
                  height: '16.06px'
                }}
              />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ChatEditorComponent;
