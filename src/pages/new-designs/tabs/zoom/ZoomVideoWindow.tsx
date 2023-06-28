/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState, useCallback, useReducer, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ZoomVideo, { ConnectionState, ReconnectReason } from '@zoom/videosdk';
import { Modal } from 'antd';
import 'antd/dist/antd.min.css';
import produce from 'immer';
import ZoomContext from './context/zoom-context';
import ZoomMediaContext from './context/media-context';
import ChatContext from './context/chat-context';
import CommandContext from './context/cmd-context';
import LiveTranscriptionContext from './context/live-transcription';
import RecordingContext from './context/recording-context';
import LoadingLayer from './component/loading-layer';
import Subsession from './feature/subsession/subsession';
import {
  ChatVideoClient,
  CommandChannelClient,
  LiveTranscriptionClient,
  MediaStream,
  RecordingClient,
  SubsessionClient
} from './index-types';
import './App.css';
import SubsessionContext from './context/subsession-context';
// import { isAndroidBrowser } from "./utils/platform";
interface AppProps {
  meetingArgs: {
    sdkKey: string;
    topic: string;
    signature: string;
    name: string;
    password?: string;
    webEndpoint?: string;
    enforceGalleryView?: string;
  };
}
const mediaShape = {
  audio: {
    encode: false,
    decode: false
  },
  video: {
    encode: false,
    decode: false
  },
  share: {
    encode: false,
    decode: false
  }
};
const mediaReducer = produce((draft, action) => {
  switch (action.type) {
    case 'audio-encode': {
      draft.audio.encode = action.payload;
      break;
    }
    case 'audio-decode': {
      draft.audio.decode = action.payload;
      break;
    }
    case 'video-encode': {
      draft.video.encode = action.payload;
      break;
    }
    case 'video-decode': {
      draft.video.decode = action.payload;
      break;
    }
    case 'share-encode': {
      draft.share.encode = action.payload;
      break;
    }
    case 'share-decode': {
      draft.share.decode = action.payload;
      break;
    }
    case 'reset-media': {
      Object.assign(draft, { ...mediaShape });
      break;
    }
    default:
      break;
  }
}, mediaShape);

declare global {
  interface Window {
    webEndpoint: string | undefined;
    zmClient: any | undefined;
    mediaStream: any | undefined;
    crossOriginIsolated: boolean;
    ltClient: any | undefined;
  }
}

function ZoomVideoWindow(props: AppProps) {
  const {
    meetingArgs: { sdkKey, topic, signature, name, password, webEndpoint: webEndpointArg, enforceGalleryView }
  } = props;
  const navigate = useNavigate();
  const [loading, setIsLoading] = useState(true);
  const [loadingText, setLoadingText] = useState('');
  const [isFailover, setIsFailover] = useState<boolean>(false);
  // const [status, setStatus] = useState<string>("closed");
  const [mediaState, setDispatch] = useReducer(mediaReducer, mediaShape);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [chatVideoClient, setChatClient] = useState<ChatVideoClient | null>(null);
  const [recordingClient, setRecordingClient] = useState<RecordingClient | null>(null);
  const [commandClient, setCommandClient] = useState<CommandChannelClient | null>(null);
  const [subsessionClient, setSubsessionClient] = useState<SubsessionClient | null>(null);
  const [liveTranscriptionClient, setLiveTranscriptionClient] = useState<LiveTranscriptionClient | null>(null);
  // const [isSupportGalleryView, setIsSupportGalleryView] = useState<boolean>(
  //   true
  // );
  // const queryString = window.location.hash.split('?')[1];
  // const urlParams = new URLSearchParams(queryString);

  // const baseurl = urlParams.get("baseUrl");
  // //console.log('**********',baseurl)
  // const userRole = urlParams.get("role");
  const zmClient = useContext(ZoomContext);
  let webEndpoint: any;
  if (webEndpointArg) {
    webEndpoint = webEndpointArg;
  } else {
    webEndpoint = window?.webEndpoint ?? 'zoom.us';
  }
  const mediaContext = useMemo(() => ({ ...mediaState, mediaStream }), [mediaState, mediaStream]);
  const galleryViewWithoutSAB = Number(enforceGalleryView) === 1 && !window.crossOriginIsolated;

  useEffect(() => {
    const init = async () => {
      await zmClient.init('en-US', `${window.location.origin}/lib`, {
        webEndpoint,
        enforceMultipleVideos: galleryViewWithoutSAB,
        stayAwake: true
      });
      try {
        setLoadingText('Joining the call...');

        await zmClient.join(topic, signature, name, password).catch((e) => {
          if (e.reason === 'The token is expired or more than 2 days or ineffective.') {
            Modal.warning({
              title: 'Meeting ended',
              content: 'This meeting Has already ended'
              // onOk:{modalClick}
            });
            // navigate('/app/calls');
            navigate(-1);
          }
        });
        // const modalClick=()=>{

        // }
        const stream = zmClient.getMediaStream();
        setMediaStream(stream);
        // setIsSupportGalleryView(
        //   stream.isSupportMultipleVideos() && !isAndroidBrowser()
        // );
        const chatVideoClient = zmClient.getChatClient();
        const commandClient = zmClient.getCommandClient();
        const recordingClient = zmClient.getRecordingClient();
        const ssClient = zmClient.getSubsessionClient();
        const ltClient = zmClient.getLiveTranscriptionClient();
        setChatClient(chatVideoClient);
        setCommandClient(commandClient);
        setRecordingClient(recordingClient);
        setSubsessionClient(ssClient);
        setLiveTranscriptionClient(ltClient);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        // console.log(e)
      }
    };
    init();
    return () => {
      ZoomVideo.destroyClient();
    };
  }, [sdkKey, signature, zmClient, topic, name, password, webEndpoint, galleryViewWithoutSAB]);
  // interface ConnectionChangePayload {
  //   state: ConnectionState;
  //   reason?: ReconnectReason;
  //   subsessionName?: string;
  // }
  const onConnectionChange = useCallback(
    (payload: any) => {
      if (payload.state === ConnectionState.Reconnecting) {
        setIsLoading(true);
        setIsFailover(true);
        // setStatus("connecting");
        const { reason, subsessionName } = payload;
        if (reason === ReconnectReason.Failover) {
          setLoadingText('Session Disconnected,Try to reconnect');
        } else if (reason === ReconnectReason.JoinSubsession || reason === ReconnectReason.MoveToSubsession) {
          setLoadingText(`Joining ${subsessionName}...`);
        } else if (reason === ReconnectReason.BackToMainSession) {
          setLoadingText('Returning to Main Session...');
        }
      } else if (payload.state === ConnectionState.Connected) {
        // setStatus("connected");
        if (isFailover) {
          setIsLoading(false);
        }
        window.zmClient = zmClient;
        window.mediaStream = zmClient.getMediaStream();

        // console.log("getSessionInfo", zmClient.getSessionInfo());
      } else if (payload.state === ConnectionState.Closed) {
        // setStatus("closed");
        setDispatch({ type: 'reset-media' });
        if (payload.reason === 'ended by host') {
          Modal.warning({
            title: 'Meeting ended',
            content: 'This meeting has been ended by host'
          });
        }
      }
    },
    [isFailover, zmClient]
  );
  const onMediaSDKChange = useCallback((payload: { action: string; type: string; result: string }) => {
    const { action, type, result } = payload;
    setDispatch({ type: `${type}-${action}`, payload: result === 'success' });
  }, []);

  const onDialoutChange = useCallback((payload: any) => {
    // console.log("onDialoutChange", payload);
  }, []);

  const onAudioMerged = useCallback((payload: any) => {
    // console.log("onAudioMerged", payload);
  }, []);

  // const onLeaveOrJoinSession = useCallback(async () => {
  //   debugger;
  //   if (status === "closed") {
  //     setIsLoading(true);
  //     await zmClient.join(topic, signature, name, password);
  //     setIsLoading(false);
  //   } else if (status === "connected") {
  //     await zmClient.leave();
  //     message.warn("You have left the session.");
  //   }
  // }, [zmClient, status, topic, signature, name, password]);
  useEffect(() => {
    zmClient.on('connection-change', onConnectionChange);
    zmClient.on('media-sdk-change', onMediaSDKChange);
    zmClient.on('dialout-state-change', onDialoutChange);
    zmClient.on('merged-audio', onAudioMerged);
    return () => {
      zmClient.off('connection-change', onConnectionChange);
      zmClient.off('media-sdk-change', onMediaSDKChange);
      zmClient.off('dialout-state-change', onDialoutChange);
      zmClient.off('merged-audio', onAudioMerged);
    };
  }, [zmClient, onConnectionChange, onMediaSDKChange, onDialoutChange, onAudioMerged]);
  return (
    <div className="App">
      {loading && <LoadingLayer content={loadingText} />}
      {!loading && (
        <ZoomMediaContext.Provider value={mediaContext}>
          <ChatContext.Provider value={chatVideoClient}>
            <RecordingContext.Provider value={recordingClient}>
              <CommandContext.Provider value={commandClient}>
                <SubsessionContext.Provider value={subsessionClient}>
                  <LiveTranscriptionContext.Provider value={liveTranscriptionClient}>
                    <Subsession />
                  </LiveTranscriptionContext.Provider>
                </SubsessionContext.Provider>
              </CommandContext.Provider>
            </RecordingContext.Provider>
          </ChatContext.Provider>
        </ZoomMediaContext.Provider>
      )}
    </div>
  );
}

export default ZoomVideoWindow;
