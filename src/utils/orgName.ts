import jwt_decode from 'jwt-decode';
import _ from 'lodash';
import ROLES from './roles';

export default function getOrgFromToken() {
  const role = localStorage.getItem('role');
  const tokens = localStorage.getItem('tokens') ? JSON.parse(localStorage.getItem('tokens') || '') : {};
  const accessToken = tokens.access_token;
  const data: any = jwt_decode(accessToken);
  const orgDetails = data['https://dosen.io/organization'];

  return role === ROLES.platAdmin ? { name: 'Dosen' } : orgDetails;
}

export const getUserDetails = (): {
  orgId: string;
  communicationUserId: string;
  ftue: boolean;
  name: string;
  location: string;
  userId: string;
  picture: string;
  email: string;
  coId: string;
  orgName: string;
  firstName: string;
  lastName: string;
  exp: number;
} => {
  const tokens = localStorage.getItem('tokens') ? JSON.parse(localStorage.getItem('tokens') || '') : {};
  if (_.size(tokens)) {
    const accessToken = tokens.access_token;
    const { id_token } = tokens;
    const accessData: any = jwt_decode(accessToken);
    const idData = jwt_decode(id_token);
    const orgDetails = accessData['https://dosen.io/organization'];

    return {
      orgId: _.get(accessData, 'org_id', ''),
      communicationUserId: _.get(idData, 'user_metadata.communicationId', ''),
      ftue: _.get(idData, 'user_metadata.ftue', false),
      name: _.get(idData, 'name', ''),
      location: _.get(orgDetails, 'metadata.location', ''),
      orgName: _.get(orgDetails, 'name', ''),
      userId: _.get(idData, 'sub', ''),
      picture: _.get(idData, 'user_metadata.headshot', ''),
      email: _.get(idData, 'user_metadata.email', ''),
      coId: _.get(idData, 'user_metadata.coId', ''),
      firstName: _.get(idData, 'user_metadata.firstName', ''),
      lastName: _.get(idData, 'user_metadata.lastName', ''),
      exp: _.get(idData, 'exp', 0)
    };
  }
  return {
    orgId: '',
    communicationUserId: '',
    ftue: false,
    name: '',
    location: '',
    userId: '',
    picture: '',
    email: '',
    coId: '',
    orgName: '',
    firstName: '',
    lastName: '',
    exp: 0
  };
};
