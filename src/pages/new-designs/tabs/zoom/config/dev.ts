import { getExploreName } from '../utils/platform';
export const devConfig = {
  sdkKey: 'c1AZcLpgiw5lLaf3b616dKPM4gPal1qV4THu',
  sdkSecret: 'xSDP7mZxtLivrlj3LldVUuiubkATcQQbsXK2',
  webEndpoint: 'zoom.us',
  topic: '',
  name: `${getExploreName()}-${Math.floor(Math.random() * 1000)}`,
  password: '',
  signature: '',
  sessionKey: '',
  userIdentity: '',
  // role = 1 to join as host, 0 to join as attendee. The first user must join as host to start the session
  role: 1
};
