/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useContext, useEffect, MutableRefObject } from 'react';
import classNames from 'classnames';
import { message } from 'antd';
import ZoomContext from '../../../context/zoom-context';
import RecordingContext from '../../../context/recording-context';
import CameraButton from './camera';
import MicrophoneButton from './microphone';
import { ScreenShareButton } from './screen-share';
import AudioVideoStatisticModal from './audio-video-statistic';
import ZoomMediaContext from '../../../context/media-context';
import LiveTranscriptionContext from '../../../context/live-transcription';
import { useUnmount, useMount } from '../../../hooks';
import { MediaDevice } from '../video-types';
import './video-footer.scss';
import { isAndroidOrIOSBrowser } from '../../../utils/platform';
import { useNavigate } from 'react-router-dom';
import { getPhoneCallStatusDescription, SELF_VIDEO_ID } from '../video-constants';
import {
  getRecordingButtons
  // RecordButtonProps,
  // RecordingButton,
} from './recording';
import {
  DialoutState,
  RecordingStatus,
  // MutedSource,
  AudioChangeAction,
  DialOutOption,
  VideoCapturingState,
  SharePrivilege,
  MobileVideoFacingMode
} from '@zoom/videosdk';
import { LiveTranscriptionButton } from './live-transcription';
import { LeaveButton } from './leave';
import { TranscriptionSubtitle } from './transcription-subtitle';
// import { current } from "immer";
import IsoRecordingModal from './recording-ask-modal';
import ChatContainer from '../../chat/chat';

interface VideoFooterProps {
  className?: string;
  shareRef?: MutableRefObject<HTMLCanvasElement | null>;
  sharing?: boolean;
}

const isAudioEnable = typeof AudioWorklet === 'function';
const VideoFooter = (props: VideoFooterProps) => {
  const navigate = useNavigate();
  const { className, shareRef, sharing } = props;
  const [isStartedAudio, setIsStartedAudio] = useState(false);
  const [isStartedVideo, setIsStartedVideo] = useState(false);
  let audio: any;
  const [isSupportPhone, setIsSupportPhone] = useState(false);
  const [phoneCountryList, setPhoneCountryList] = useState<any[]>([]);
  const [phoneCallStatus, setPhoneCallStatus] = useState<DialoutState>();
  const [isStartedScreenShare, setIsStartedScreenShare] = useState(false);
  const [isStartedLiveTranscription, setIsStartedLiveTranscription] = useState(false);
  const [isMirrored, setIsMirrored] = useState(false);
  const [isBlur, setIsBlur] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeMicrophone, setActiveMicrophone] = useState('');
  const [activeSpeaker, setActiveSpeaker] = useState('');
  const [activeCamera, setActiveCamera] = useState('');
  const [micList, setMicList] = useState<MediaDevice[]>([]);
  const [speakerList, setSpeakerList] = useState<MediaDevice[]>([]);
  const [cameraList, setCameraList] = useState<MediaDevice[]>([]);
  const [statisticVisible, setStatisticVisible] = useState(false);
  const [selecetedStatisticTab, setSelectedStatisticTab] = useState('audio');
  const [isComputerAudioDisabled, setIsComputerAudioDisabled] = useState(false);
  const [sharePrivilege, setSharePrivileg] = useState(SharePrivilege.Unlocked);
  const caption = { text: '', isOver: false };
  // const queryString = window.location.hash.split("?")[1];
  // const urlParams = new URLSearchParams(queryString);

  // const baseurl = urlParams.get("baseUrl");
  // const role = urlParams.get("role");
  const { mediaStream } = useContext(ZoomMediaContext);
  const liveTranscriptionClient = useContext(LiveTranscriptionContext);
  const recordingClient = useContext(RecordingContext);
  const [recordingStatus, setRecordingStatus] = useState<'' | RecordingStatus>(
    recordingClient?.getCloudRecordingStatus() || ''
  );
  const [recordingIsoStatus, setRecordingIsoStatus] = useState<'' | RecordingStatus>('');
  const zmClient = useContext(ZoomContext);
  const onCameraClick = useCallback(async () => {
    if (isStartedVideo) {
      await mediaStream?.stopVideo();
      setIsStartedVideo(false);
    } else {
      if (mediaStream?.isRenderSelfViewWithVideoElement()) {
        const videoElement = document.querySelector(`#${SELF_VIDEO_ID}`) as HTMLVideoElement;
        if (videoElement) {
          await mediaStream?.startVideo({ videoElement });
        }
      } else {
        const startVideoOptions = {
          hd: true,
          ptz: mediaStream?.isBrowserSupportPTZ()
        };
        if (mediaStream?.isSupportVirtualBackground() && isBlur) {
          Object.assign(startVideoOptions, {
            virtualBackground: { imageUrl: 'blur' }
          });
        }
        await mediaStream?.startVideo(startVideoOptions);
        if (!mediaStream?.isSupportMultipleVideos()) {
          const canvasElement = document.querySelector(`#${SELF_VIDEO_ID}`) as HTMLCanvasElement;
          mediaStream?.renderVideo(canvasElement, zmClient.getSessionInfo().userId, 254, 143, 0, 0, 3);
        }
      }

      setIsStartedVideo(true);
    }
  }, [mediaStream, isStartedVideo, zmClient, isBlur]);
  const onMicrophoneClick = useCallback(async () => {
    if (isStartedAudio) {
      if (isMuted) {
        await mediaStream?.unmuteAudio();
        setIsMuted(false);
      } else {
        await mediaStream?.muteAudio();
        setIsMuted(true);
      }
    } else {
      // await mediaStream?.startAudio({ speakerOnly: true });
      await mediaStream?.startAudio();
      setIsStartedAudio(true);
    }
  }, [mediaStream, isStartedAudio, isMuted]);
  const onMicrophoneMenuClick = async (key: string) => {
    if (mediaStream) {
      const [type, deviceId] = key.split('|');
      if (type === 'microphone') {
        if (deviceId !== activeMicrophone) {
          await mediaStream.switchMicrophone(deviceId);
          setActiveMicrophone(mediaStream.getActiveMicrophone());
        }
      } else if (type === 'speaker') {
        if (deviceId !== activeSpeaker) {
          await mediaStream.switchSpeaker(deviceId);
          setActiveSpeaker(mediaStream.getActiveSpeaker());
        }
      } else if (type === 'leave audio') {
        if (audio === 'computer') {
          await mediaStream.stopAudio();
        } else if (audio === 'phone') {
          await mediaStream.hangup();
          setPhoneCallStatus(undefined);
        }
        setIsStartedAudio(false);
      } else if (type === 'statistic') {
        setSelectedStatisticTab('audio');
        setStatisticVisible(true);
      }
    }
  };
  const onSwitchCamera = async (key: string) => {
    if (mediaStream) {
      if (activeCamera !== key) {
        await mediaStream.switchCamera(key);
        setActiveCamera(mediaStream.getActiveCamera());
      }
    }
  };
  const onMirrorVideo = async () => {
    await mediaStream?.mirrorVideo(!isMirrored);
    setIsMirrored(!isMirrored);
  };
  const onBlurBackground = async () => {
    const vbStatus = mediaStream?.getVirtualbackgroundStatus();
    if (vbStatus?.isVBPreloadReady) {
      if (vbStatus?.isVBConfigured) {
        if (!isBlur) {
          await mediaStream?.updateVirtualBackgroundImage('blur');
        } else {
          await mediaStream?.updateVirtualBackgroundImage(undefined);
        }
      } else {
        if (!isBlur) {
          await mediaStream?.stopVideo();
          await mediaStream?.startVideo({
            hd: true,
            virtualBackground: { imageUrl: 'blur' }
          });
        }
      }

      setIsBlur(!isBlur);
    }
  };
  const onPhoneCall = async (code: string, phoneNumber: string, name: string, option: DialOutOption) => {
    await mediaStream?.inviteByPhone(code, phoneNumber, name, option);
  };
  const onPhoneCallCancel = async (code: string, phoneNumber: string, option: { callMe: boolean }) => {
    if ([DialoutState.Calling, DialoutState.Ringing, DialoutState.Accepted].includes(phoneCallStatus as any)) {
      await mediaStream?.cancelInviteByPhone(code, phoneNumber, option);
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 3000);
      });
    }
    return Promise.resolve();
  };
  const onHostAudioMuted = useCallback((payload: { action: string; source: string; type: string }) => {
    const { action } = payload;
    if (action === AudioChangeAction.Join) {
      setIsStartedAudio(true);
    }
  }, []);

  const onScreenShareClick = useCallback(async () => {
    // Check if screen sharing is not already started and a reference to the shareRef exists
    if (!isStartedScreenShare && shareRef && shareRef.current) {
      // Start screen sharing using the mediaStream with the shareRef.current element
      await mediaStream?.startShareScreen(shareRef.current, {
        requestReadReceipt: true
      });
      // Update the state variable to indicate that screen sharing has started
      setIsStartedScreenShare(true);
    } else if (isStartedScreenShare) {
      // Stop screen sharing using the mediaStream
      await mediaStream?.stopShareScreen();
      // Update the state variable to indicate that screen sharing has stopped
      setIsStartedScreenShare(false);
    }
  }, [mediaStream, isStartedScreenShare, shareRef]);

  const onLiveTranscriptionClick = useCallback(async () => {
    if (!isStartedLiveTranscription) {
      await liveTranscriptionClient?.startLiveTranscription();
      setIsStartedLiveTranscription(true);
    }
  }, [isStartedLiveTranscription, liveTranscriptionClient]);

  const onLeaveClick = useCallback(async () => {
    await zmClient.leave();
    // console.log('leaveing.....')
    // navigate('/app/calls');
    navigate(-1);
  }, [zmClient]);

  const onEndClick = useCallback(async () => {
    // console.log('onEndClick');
    await zmClient.leave(true);
    // navigate('/app/calls');
    navigate(-1);
  }, [zmClient]);

  const onPassivelyStopShare = useCallback(({ reason }: { reason: string }) => {
    setIsStartedScreenShare(false);
  }, []);

  const onDeviceChange = useCallback(() => {
    if (mediaStream) {
      setMicList(mediaStream.getMicList());
      setSpeakerList(mediaStream.getSpeakerList());
      if (!isAndroidOrIOSBrowser()) {
        setCameraList(mediaStream.getCameraList());
      }
      setActiveMicrophone(mediaStream.getActiveMicrophone());
      setActiveSpeaker(mediaStream.getActiveSpeaker());
      setActiveCamera(mediaStream.getActiveCamera());
    }
  }, [mediaStream]);

  const onRecordingChange = useCallback(() => {
    setRecordingStatus(recordingClient?.getCloudRecordingStatus() || '');
  }, [recordingClient]);

  const onRecordingISOChange = useCallback(
    (payload: any) => {
      if (payload?.userId === zmClient.getSessionInfo().userId || payload?.status === RecordingStatus.Ask) {
        setRecordingIsoStatus(payload?.status);
      }
      // console.log('recording-iso-change', payload);
    },
    [zmClient]
  );

  const onDialOutChange = useCallback((payload: { code: number }) => {
    setPhoneCallStatus(payload.code);
  }, []);

  // const onRecordingClick = async (key: string) => {
  //   switch (key) {
  //     case "Record": {
  //       await recordingClient?.startCloudRecording();
  //       break;
  //     }
  //     case "Resume": {
  //       await recordingClient?.resumeCloudRecording();
  //       break;
  //     }
  //     case "Stop": {
  //       await recordingClient?.stopCloudRecording();
  //       break;
  //     }
  //     case "Pause": {
  //       await recordingClient?.pauseCloudRecording();
  //       break;
  //     }
  //     case "Status": {
  //       break;
  //     }
  //     default: {
  //       await recordingClient?.startCloudRecording();
  //     }
  //   }
  // };
  const onVideoCaptureChange = useCallback((payload: { state: string }) => {
    if (payload.state === VideoCapturingState.Started) {
      setIsStartedVideo(true);
    } else {
      setIsStartedVideo(false);
    }
  }, []);
  const onShareAudioChange = useCallback((payload: { state: string }) => {
    const { state } = payload;
    if (state === 'on') {
      setIsComputerAudioDisabled(true);
    } else {
      setIsComputerAudioDisabled(false);
    }
  }, []);
  const onHostAskToUnmute = useCallback((payload: { reason: string }) => {
    // const { reason } = payload;
    // Handle host ask to unmute
  }, []);

  const onCaptionStatusChange = useCallback((payload: { autoCaption: boolean }) => {
    const { autoCaption } = payload;
    if (autoCaption) {
      message.info('Auto live transcription enabled!');
    } else {
      message.info('Auto live transcription disabled!');
    }
  }, []);

  const onCaptionMessage = useCallback((payload: { text: string; done: boolean }) => {
    // const { text, done } = payload;
    // Handle caption message
  }, []);
  const onCanSeeMyScreen = useCallback(() => {
    message.info('Users can now see your screen', 1);
  }, []);

  useEffect(() => {
    zmClient.on('current-audio-change', onHostAudioMuted);
    zmClient.on('passively-stop-share', onPassivelyStopShare);
    zmClient.on('device-change', onDeviceChange);
    zmClient.on('recording-change', onRecordingChange);
    zmClient.on('individual-recording-change', onRecordingISOChange);
    zmClient.on('dialout-state-change', onDialOutChange);
    zmClient.on('video-capturing-change', onVideoCaptureChange);
    zmClient.on('share-audio-change', onShareAudioChange);
    zmClient.on('host-ask-unmute-audio', onHostAskToUnmute);
    zmClient.on('caption-status', onCaptionStatusChange);
    zmClient.on('caption-message', onCaptionMessage);
    zmClient.on('share-can-see-screen', onCanSeeMyScreen);
    return () => {
      zmClient.off('current-audio-change', onHostAudioMuted);
      zmClient.off('passively-stop-share', onPassivelyStopShare);
      zmClient.off('device-change', onDeviceChange);
      zmClient.off('recording-change', onRecordingChange);
      zmClient.off('individual-recording-change', onRecordingISOChange);
      zmClient.off('dialout-state-change', onDialOutChange);
      zmClient.off('video-capturing-change', onVideoCaptureChange);
      zmClient.off('share-audio-change', onShareAudioChange);
      zmClient.off('host-ask-unmute-audio', onHostAskToUnmute);
      zmClient.off('caption-status', onCaptionStatusChange);
      zmClient.off('caption-message', onCaptionMessage);
      zmClient.off('share-can-see-screen', onCanSeeMyScreen);
    };
  }, [
    zmClient,
    onHostAudioMuted,
    onPassivelyStopShare,
    onDeviceChange,
    onRecordingChange,
    onDialOutChange,
    onVideoCaptureChange,
    onShareAudioChange,
    onHostAskToUnmute,
    onCaptionStatusChange,
    onCaptionMessage,
    onCanSeeMyScreen
  ]);
  useUnmount(() => {
    if (isStartedAudio) {
      mediaStream?.stopAudio();
    }
    if (isStartedVideo) {
      mediaStream?.stopVideo();
    }
    if (isStartedScreenShare) {
      mediaStream?.stopShareScreen();
    }
  });
  useMount(() => {
    if (mediaStream) {
      setIsSupportPhone(!!mediaStream.isSupportPhoneFeature());
      setPhoneCountryList(mediaStream.getSupportCountryInfo() || []);
      setSharePrivileg(mediaStream.getSharePrivilege());
      if (isAndroidOrIOSBrowser()) {
        setCameraList([
          { deviceId: MobileVideoFacingMode.User, label: 'Front-facing' },
          { deviceId: MobileVideoFacingMode.Environment, label: 'Rear-facing' }
        ]);
      }
    }
  });
  useEffect(() => {
    if (mediaStream && zmClient.getSessionInfo().isInMeeting) {
      mediaStream.subscribeAudioStatisticData();
      mediaStream.subscribeVideoStatisticData();
    }
    return () => {
      if (zmClient.getSessionInfo().isInMeeting) {
        mediaStream?.unsubscribeAudioStatisticData();
        mediaStream?.unsubscribeVideoStatisticData();
      }
    };
  }, [mediaStream, zmClient]);
  getRecordingButtons(recordingStatus, zmClient.isHost());

  return (
    <div className={classNames('video-footer', className)}>
      {isAudioEnable && (
        <MicrophoneButton
          isStartedAudio={isStartedAudio}
          isMuted={isMuted}
          isSupportPhone={isSupportPhone}
          audio={audio}
          phoneCountryList={phoneCountryList}
          onPhoneCallClick={onPhoneCall}
          onPhoneCallCancel={onPhoneCallCancel}
          phoneCallStatus={getPhoneCallStatusDescription(phoneCallStatus)}
          onMicrophoneClick={onMicrophoneClick}
          onMicrophoneMenuClick={onMicrophoneMenuClick}
          microphoneList={micList}
          speakerList={speakerList}
          activeMicrophone={activeMicrophone}
          activeSpeaker={activeSpeaker}
          disabled={isComputerAudioDisabled}
        />
      )}
      <CameraButton
        isStartedVideo={isStartedVideo}
        onCameraClick={onCameraClick}
        onSwitchCamera={onSwitchCamera}
        onMirrorVideo={onMirrorVideo}
        onVideoStatistic={() => {
          setSelectedStatisticTab('video');
          setStatisticVisible(true);
        }}
        onBlurBackground={onBlurBackground}
        cameraList={cameraList}
        activeCamera={activeCamera}
        isMirrored={isMirrored}
        isBlur={isBlur}
      />

      <ChatContainer />

      {sharing && (
        <ScreenShareButton
          sharePrivilege={sharePrivilege}
          isHostOrManager={zmClient.isHost() || zmClient.isManager()}
          isStartedScreenShare={isStartedScreenShare}
          onScreenShareClick={onScreenShareClick}
          onSharePrivilegeClick={async (privilege) => {
            await mediaStream?.setSharePrivilege(privilege);
            setSharePrivileg(privilege);
          }}
        />
      )}
      {/* {recordingButtons.map((button: RecordButtonProps) => {
        return (
          <RecordingButton
            key={button.text}
            onClick={() => {
              onRecordingClick(button.text);
            }}
            {...button}
          />
        );
      })} */}
      {liveTranscriptionClient?.getLiveTranscriptionStatus().isLiveTranscriptionEnabled && (
        <>
          <LiveTranscriptionButton
            isStartedLiveTranscription={isStartedLiveTranscription}
            onLiveTranscriptionClick={onLiveTranscriptionClick}
          />
          <TranscriptionSubtitle text={caption.text} />
        </>
      )}
      <LeaveButton onLeaveClick={onLeaveClick} isHost={zmClient.isHost()} onEndClick={onEndClick} />

      <AudioVideoStatisticModal
        visible={statisticVisible}
        setVisible={setStatisticVisible}
        defaultTab={selecetedStatisticTab}
        isStartedAudio={isStartedAudio}
        isMuted={isMuted}
        isStartedVideo={isStartedVideo}
      />

      {recordingIsoStatus === RecordingStatus.Ask && (
        <IsoRecordingModal
          onClick={() => {
            recordingClient?.acceptIndividualRecording();
          }}
          onCancel={() => {
            recordingClient?.declineIndividualRecording();
          }}
        />
      )}
    </div>
  );
};
export default VideoFooter;