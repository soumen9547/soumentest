/* eslint-disable no-useless-catch */
/* eslint-disable no-param-reassign */
import axios from 'axios';
import _ from 'lodash';
import { FieldValues } from 'react-hook-form';
import { Social } from '../pages/new-designs/components/SocialHandles';
import { IWorkHistory } from '../pages/new-designs/components/WorkHistory';
import { getUserDetails } from '../utils/orgName';

const getOrganizations = (token: string, currentPageNumber: number, perPage: number) => {
  return axios({
    method: 'get',
    // url: `${process.env.REACT_APP_API}/organizationsListGet?page=${currentPageNumber}&per_page=${perPage}`,
    url: `${process.env.REACT_APP_API}/organizationsListGet?page=0&per_page=100`,
    headers: {
      authorization: `Bearer ${token}`
    }
  });
};

const updateHobbies = ({
  orgId,
  data,
  idtoken,
  token
}: {
  orgId: string;
  idtoken: string;
  token: string;
  data: string[];
}) => {
  return axios({
    method: 'post',
    url: `${process.env.REACT_APP_API}/createHobies`,
    headers: {
      orgId: orgId,
      idtoken: idtoken,
      token: token
    },
    data: { hobbies: data }
  });
};

const getTagsList = (orgId: string, location: string) => {
  return axios({
    method: 'get',
    url: `${process.env.REACT_APP_API}/getTagsList?type=Hobbies and Interests&isFullList=true`,
    headers: {
      orgId: orgId,
      location: location
    }
  });
};

const getTagsListnew = (orgId: string, location: string, type: string, value: string, isFullList?: Boolean) => {
  if (typeof isFullList === 'undefined') {
    isFullList = false;
  }

  return axios({
    method: 'get',

    url: `${process.env.REACT_APP_API}/getTagsList?type=${type}&value=${value}`,
    headers: {
      orgId: orgId,

      location: location
    }
  });
};

const getCommunityMembers = (orgId: string, location: string, role?: string, category?: string) => {
  let url = `${process.env.REACT_APP_API}/getCommunityGroupsUsersList`;

  if (role) {
    url += `?role=${role}`;
  }

  if (category) {
    if (role) {
      url += `&category=${category}`;
    } else {
      url += `?category=${category}`;
    }
  }

  return axios({
    method: 'POST',
    url: url,
    headers: {
      orgId: orgId,
      location: location
    }
  });
};

const removeOrganization = (token: string, orgId: string, dataLocation: string) => {
  return axios({
    method: 'delete',
    url: `${process.env.REACT_APP_API}/organizationDelete/${orgId}`,
    headers: {
      authorization: `Bearer ${token}`,
      location: dataLocation
    }
  });
};

const getUsersMetaByOrgId = (token: string, orgId: string) => {
  return axios({
    method: 'get',
    url: `${process.env.REACT_APP_API}/getUsersWithMetadata/${orgId}`,
    headers: {
      orgId: orgId,
      authorization: `Bearer ${token}`
    }
  });
};

const getUsersByOrgId = (token: string, orgId: string) => {
  return axios({
    method: 'get',
    url: `${process.env.REACT_APP_API}/getUsersByOrg/${orgId}`,

    headers: {
      authorization: `Bearer ${token}`,
      orgId: orgId !== '' ? orgId : null
    }
  });
};

const getUserMetadData = (token: string, orgId: string) => {
  return axios({
    method: 'get',
    url: `${process.env.REACT_APP_API}/createUserMetadata`,
    headers: {
      authorization: `Bearer ${token}`,
      orgId: orgId !== '' ? orgId : null
    }
  });
};

const updateUserFtue = (ftue: boolean) => {
  const body = {
    ftue
  };
  return axios({
    method: 'patch',
    url: `${process.env.REACT_APP_API}/updateUserMetadata`,
    headers: {},
    data: JSON.stringify(body)
  });
};

const getOrgName = (orgId: string) => {
  return axios({
    method: 'get',
    url: `${process.env.REACT_APP_API}/organizationGetById/${orgId}`
  });
};
// eslint-disable-next-line no-undef
const addOrganization = (token: string, data: IOrgSubmitValues) => {
  const data2 = {
    display_name: data.name,
    oid: data.orgId,
    location: data.dataLocation
  };
  return axios({
    method: 'post',
    url: `${process.env.REACT_APP_API}/organizationCreate`,
    headers: {
      authorization: `Bearer ${token}`,
      location: data.dataLocation
    },
    data: data2
  });
};

// eslint-disable-next-line no-undef
const updateOrganization = (token: string, orgId: string, data: IOrgSubmitValues) => {
  return axios({
    method: 'patch',
    url: `${process.env.REACT_APP_API}/organizationUpdate/${orgId}`,
    headers: {
      authorization: `Bearer ${token}`
    },
    data: data
  });
};

// eslint-disable-next-line no-undef
const inviteOrgAdmin = (token: string, orgId: string, data: IInviteOrgAdmin) => {
  return axios({
    method: 'POST',
    url: `${process.env.REACT_APP_API}/inviteOrgAdmin/${orgId}`,
    headers: {
      authorization: `Bearer ${token}`
    },
    data: data
  });
};

// eslint-disable-next-line no-undef
const inviteMember = (token: string, orgId: string, data: IInviteOrgAdmin) => {
  return axios({
    method: 'POST',
    url: `${process.env.REACT_APP_API}/inviteMembers/${orgId}`,
    headers: {
      authorization: `Bearer ${token}`
    },
    data: data
  });
};
const getOrgId = (orgName: string) => {
  return axios({
    method: 'get',
    url: `${process.env.REACT_APP_API}/organization/${orgName}`,
    headers: {}
  });
};

// eslint-disable-next-line no-undef
const inviteApi = (token: string, orgId: string, data: IInviteOrgAdmin) => {
  return axios({
    method: 'post',
    url: `${process.env.REACT_APP_API}/invitations/${orgId}`,
    headers: {
      authorization: `Bearer ${token}`,
      orgId: orgId
    },
    data: data
  });
};

// const getMemberRoles = (token:string, orgId: string, userId:string)=>{
//   return axios({
//     method:'GET',
//     url:`${process.env.REACT_APP_API}/getOrgMemRoles/${orgId}/${userId}`,
//     headers:{
//       authorization:`Bearer ${token}`
//     }
//   })
// }

const getMemberRoles = (token: string, orgId: string, userId: string) => {
  let url = `${process.env.REACT_APP_API}/user-role`;
  return axios({
    method: 'GET',
    url,
    headers: {
      authorization: `Bearer ${token}`,
      orgId: orgId ? orgId : null
    }
  });
};

const getACSToken = (communicationId: string) => {
  return axios({
    method: 'POST',
    url: `${process.env.REACT_APP_API}/azureToken`,
    data: {
      communicationId: communicationId
    }
  });
};

const getACSThreads = (acsToken: string, orgId: string) => {
  return axios({
    method: 'POST',
    url: `${process.env.REACT_APP_API}/getChatThread`,
    headers: {
      orgId: orgId
    },
    data: {
      azureToken: acsToken
    }
  });
};

const deleteACSThread = (acsToken: string, threadId: string, orgId: string) => {
  return axios({
    method: 'DELETE',
    url: `${process.env.REACT_APP_API}/deleteChatThread`,
    headers: {
      orgId: orgId
    },
    data: {
      threadId: threadId,
      azureToken: acsToken
    }
  });
};

// const getACSOrgUsers = (orgId: string) => {
//   return axios({
//     method: "GET",
//     url: `${process.env.REACT_APP_API}/ACSusers/${orgId}`,
//     headers: {
//       orgId: orgId,
//     },
//   });
// };

const getACSOrgUsers = (
  orgId: string
  // location: string,
) => {
  return axios({
    method: 'POST',
    url: `${process.env.REACT_APP_API}/getCommunityGroupsUsersList`,
    headers: {
      orgId: orgId,
      location: getUserDetails().location
    }
  });
};

const createACSThread = (acsToken: string, data: any, orgId: string) => {
  return axios({
    method: 'POST',
    url: `${process.env.REACT_APP_API}/createChatThread`,
    // headers: {
    //   orgid: orgId,
    // },
    data
    // data: {
    //   ...data,
    //   participants: [
    //     { id: data?.participants[0]?.id, displayName: data?.participants[0]?.id?.communicationUserId},
    //   ],
    //   azureToken: acsToken,
    // },
  });
};

const getACSThreadParticipants = (acsToken: string, threadId: string) => {
  return axios({
    method: 'POST',
    url: `${process.env.REACT_APP_API}/getParticipantsFromThreads`,
    data: {
      threadId: threadId,
      azureToken: acsToken
    }
  });
};

const sendMessageToACSThread = (acsToken: string, threadId: string, message: string, contentId: number) => {
  return axios({
    method: 'POST',
    url: `${process.env.REACT_APP_API}/sendMessages`,
    data: {
      threadId: threadId,
      message: message,
      contentId: contentId,
      azureToken: acsToken
    }
  });
};

const readMessagesFromThreads = ({
  orgId,
  threadId,
  acsToken,
  idtoken
}: {
  orgId: string;
  threadId: string;
  acsToken: string;
  idtoken: string;
}) => {
  return axios({
    method: 'GET',
    url: `${process.env.REACT_APP_API}/receiveMessages?azureToken=${acsToken}&threadId=${threadId}&pageSize=50&pageNumber=4`,
    headers: {
      orgId: orgId,
      idtoken: idtoken
    }
  }).then((res) => {
    return _.reverse(_.get(res, 'data.recieved Messages', []));
  });
};

const readMessagesFromThreadsByNextLink = ({ link, azureToken }: { link: string; azureToken: string }) => {
  return fetch(`${link}`, {
    headers: { authorization: `Bearer ${azureToken}` }
  }).then((res) => res.json());
};

const readMessagesFromThreadsByPage = ({
  threadId,
  acsToken,
  pageSize,
  pageNumber
}: {
  threadId: string;
  acsToken: string;
  pageSize: string;
  pageNumber: string;
}) => {
  return axios({
    method: 'GET',
    url: `${process.env.REACT_APP_API}/receiveMessages?azureToken=${acsToken}&threadId=${threadId}&pageSize=${pageSize}&pageNumber=${pageNumber}`
  }).then((res) => {
    return _.reverse(_.get(res, 'data.recieved Messages', []));
  });
};

const addParticipantsToExistingChannel = ({ idtoken, orgId, data }: { idtoken: string; orgId: string; data: any }) => {
  return axios({
    method: 'POST',
    url: `${process.env.REACT_APP_API}/addParticipants`,
    headers: {
      orgId: orgId,
      idtoken: idtoken
    },
    data: data
  });
};

const updateGroupChatName = ({
  orgId,
  acsToken,
  topic,
  threadId
}: {
  orgId: string;
  acsToken: string;
  topic: string;
  threadId: string;
}) => {
  return axios({
    method: 'patch',
    url: `${process.env.REACT_APP_API}/renameGroupChat`,
    headers: {
      orgId: orgId
    },
    data: {
      azureToken: acsToken,
      topic,
      threadId
    }
  });
};

export const uploadGroupChatPic = async ({
  orgId,
  tokens,
  values,
  threadId
}: {
  orgId: string;
  tokens: {
    access_token: string;
    id_token: string;
  };
  values: {
    image: File[];
  };
  threadId: string;
}) => {
  const url = `${process.env.REACT_APP_API}/groupChatPicUpload`;
  const formData = new FormData();
  formData.append('image', values.image[0]);
  formData.append('threadId', threadId);
  const headers = {
    orgId: orgId,
    Authorization: `Bearer ${tokens.access_token}`,
    idtoken: tokens.id_token,
    location: 'us'
  };
  const response = await axios.post(url, formData, { headers });
  return response.data;
};

// const removeParticipantFromThread = ({
//   orgId,
//   acsToken,
//   commId,
//   threadId,
// }: {
//   orgId: string;
//   acsToken: string;
//   commId: string;
//   threadId: string;
// }) => {
//   return axios({
//     method: "delete",
//     url: `${process.env.REACT_APP_API}/removeParticipantsFromThreads`,
//     headers: {
//       orgId: orgId,
//     },
//     data: {
//       azureToken: acsToken,
//       threadId,
//     },
//   });
// };
const removeParticipantFromThread = ({
  acsToken,
  threadId,
  communicationId
}: {
  acsToken: string;
  communicationId: string;
  threadId: string;
}) => {
  return axios({
    method: 'delete',
    url: `${process.env.REACT_APP_API}/removeParticipantsFromThreads`,

    data: {
      azureToken: acsToken,
      threadId,
      communicationId
    }
  });
};

const editMessage = ({
  orgId,
  acsToken,
  messageId,
  content,
  threadId
}: {
  orgId: string;
  content: string;
  acsToken: string;
  messageId: string;
  threadId: string;
}) => {
  return axios({
    method: 'patch',
    url: `${process.env.REACT_APP_API}/updateChatMessage`,
    headers: {
      orgId: orgId
    },
    data: {
      azureToken: acsToken,
      messageId,
      threadId,
      content
    }
  });
};

const deleteMessage = ({
  orgId,
  acsToken,
  messageId,
  threadId
}: {
  orgId: string;
  acsToken: string;
  messageId: string;
  threadId: string;
}) => {
  return axios({
    method: 'delete',
    url: `${process.env.REACT_APP_API}/deleteChatMessage`,
    headers: {
      orgId: orgId
    },
    data: {
      azureToken: acsToken,
      messageId,
      threadId
    }
  });
};

const getACSChatThreads = ({ acsToken, orgId }: { acsToken: string; orgId: string }) => {
  return axios({
    method: 'GET',
    url: `${process.env.REACT_APP_API}/getChatThread?azureToken=${acsToken}`,
    headers: {
      orgId: orgId
    }
  }).then((res) => res?.data);
};

const createUserProfile = ({ data, orgId }: { data: FormData; orgId: string }) => {
  return axios({
    method: 'post',
    url: `${process.env.REACT_APP_API}/createUserProfile`,
    headers: {
      orgId: orgId
    },
    data
  });
};

const createArticle = ({ data, orgId, groupId }: { data: FormData; orgId: string; groupId: string }) => {
  return axios({
    method: 'post',
    url: `${process.env.REACT_APP_API}/group/${groupId}/createArticle`,
    headers: {
      orgId: orgId
    },
    data
  });
};

const getAllArticle = ({ orgId, groupId }: { orgId: string; groupId: string }) => {
  return axios({
    method: 'get',
    url: `${process.env.REACT_APP_API}/group/${groupId}/getArticleList`,
    headers: {
      orgId: orgId
    }
  });
};

const getAllArticleById = ({ orgId, articleId, groupId }: { orgId: string; articleId: string; groupId: string }) => {
  return axios({
    method: 'get',
    url: `${process.env.REACT_APP_API}/getArticleById/${articleId}`,
    headers: {
      orgId: orgId,
      location: 'us'
    }
  });
};

const articleAction = async ({ orgId, articleId, data }: { orgId: string; articleId: string; data: object }) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${process.env.REACT_APP_API}/articleAction?articleId=${articleId}`,
      headers: {
        orgId: orgId,
        location: 'us'
      },
      data
    });
    return response;
  } catch (error) {
    throw error;
  }
};

const getAllArticleUser = ({ orgId }: { orgId: string }) => {
  return axios({
    method: 'get',
    url: `${process.env.REACT_APP_API}/getLibraryArticlesList`,
    headers: {
      orgId: orgId
    }
  });
};

const DeleteArticle = async ({ orgId, articleId, groupId }: { orgId: string; articleId: string; groupId: string }) => {
  try {
    const response = await axios({
      method: 'delete',
      url: `${process.env.REACT_APP_API}/group/${groupId}/deleteArticle?articleId=${articleId}`,
      headers: {
        orgId: orgId,
        location: 'us'
      }
    });
    return response;
  } catch (error) {
    throw error;
  }
};

const editArticle = async ({
  orgId,
  articleId,
  data,
  groupId
}: {
  orgId: string;
  articleId: string;
  data: FormData;
  groupId: string;
}) => {
  try {
    const response = await axios({
      method: 'patch',
      url: `${process.env.REACT_APP_API}/group/${groupId}/updateArticle?articleId=${articleId}`,
      headers: {
        orgId: orgId,
        location: 'us'
      },
      data
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// Matches

const getListToAssignMatch = ({
  orgId,
  userId,
  grpId,
  data
}: {
  orgId: string;
  userId: string;
  grpId: string;
  data: object;
}) => {
  return axios({
    method: 'post',
    url: `${process.env.REACT_APP_API}/${userId}/group/${grpId}/matches/getListToAssignMatch`,
    headers: {
      orgId: orgId
    },
    data
  });
};

const assignAMatch = ({ orgId, grpId, data }: { orgId: string; grpId: string; data: object }) => {
  return axios({
    method: 'post',
    url: `${process.env.REACT_APP_API}/group/${grpId}/matches/assignAMatch`,
    headers: {
      orgId: orgId
    },
    data
  });
};
const autoMatch = ({ orgId, grpId, data }: { orgId: string; grpId: string; data: object }) => {
  return axios({
    method: 'post',
    url: `${process.env.REACT_APP_API}/group/${grpId}/matches/autoMatch`,
    headers: {
      orgId: orgId
    },
    data
  });
};

const confirmAllMatches = ({ orgId, grpId }: { orgId: string; grpId: string }) => {
  return axios({
    method: 'post',
    url: `${process.env.REACT_APP_API}/group/${grpId}/confirmAllMatches`,
    headers: {
      orgId: orgId
    }
  });
};

const confirmMatch = ({ orgId, grpId, data }: { orgId: string; grpId: string; data: object }) => {
  return axios({
    method: 'post',
    url: `${process.env.REACT_APP_API}/group/${grpId}/confirmMatch`,
    headers: {
      orgId: orgId
    },
    data
  });
};

const getAllMatchesSetting = ({ orgId, grpId }: { orgId: string; grpId: string }) => {
  return axios({
    method: 'get',
    url: `${process.env.REACT_APP_API}/group/${grpId}/getAllMatchesSetting`,
    headers: {
      orgId: orgId
    }
  });
};

const removeMatch = ({ orgId, confirmMatchId, grpId }: { orgId: string; confirmMatchId: string; grpId: string }) => {
  return axios({
    method: 'patch',
    url: `${process.env.REACT_APP_API}/group/${grpId}/endMatch/${confirmMatchId}`,
    headers: {
      orgId: orgId
    }
  });
};

const getMatchProfile = ({ orgId, confirmMatchId }: { orgId: string; confirmMatchId: string }) => {
  return axios({
    method: 'get',
    url: `${process.env.REACT_APP_API}/getMatchProfile/${confirmMatchId}`,
    headers: {
      orgId: orgId
    }
  });
};

// -----------
const getUserProfile = () => {
  return axios({
    method: 'GET',
    url: `${process.env.REACT_APP_API}/getUserProfile`
  });
};

const updateUserProfile = ({ data, orgId }: { data: FormData; orgId: string }) => {
  return axios({
    method: 'patch',
    url: `${process.env.REACT_APP_API}/UpdateUserProfile`,
    headers: {
      orgId: orgId
    },
    data
  });
};

const updateSocialLinks = ({ orgId, data }: { orgId: string; data: Social }) => {
  return axios({
    method: 'patch',
    url: `${process.env.REACT_APP_API}/updateSocialLinks`,
    headers: {
      orgId: orgId
    },
    data
  });
};

const updateDisability = ({ orgId, data }: { orgId: string; data: string[] }) => {
  return axios({
    method: 'patch',
    url: `${process.env.REACT_APP_API}/updateUserDisability`,
    headers: {
      orgId: orgId
    },
    data: { disability: data }
  });
};

const getEducationAndSkills = ({ userId, location }: { userId: string; location: string }) => {
  return axios({
    method: 'get',
    url: `${process.env.REACT_APP_API}/getUserEducation?userId=${userId}`,
    headers: {
      location
    }
  });
};

export interface Education1 {
  minor: string | null;
  major: string;
  graduation_date: string;
  university: string;
  department: string;
}

const addEducationAndSkills = ({
  userId,
  location,
  formData
}: {
  userId: string;
  location: string;
  formData: FieldValues;
}) => {
  return axios({
    method: 'post',
    url: `${process.env.REACT_APP_API}/addUserEducation?userId=${userId}`,
    headers: {
      location
    },
    data: formData
  });
};

const updateEducationAndSkills = ({
  userId,
  location,
  formData,
  id
}: {
  userId: string;
  location: string;
  formData: Education1;
  id: string;
}) => {
  return axios({
    method: 'patch',
    url: `${process.env.REACT_APP_API}/updateUserEducation?userId=${userId}&educationId=${id}`,
    headers: {
      location
    },
    data: formData
  });
};

const deleteEducation = ({ userId, location, id }: { userId: string; location: string; id: string }) => {
  return axios({
    method: 'delete',
    url: `${process.env.REACT_APP_API}/deleteUserEducation?userId=${userId}&educationId=${id}`,
    headers: {
      location
    }
  });
};

const getWorkHistory = ({ userId, location }: { userId: string; location: string }) => {
  return axios({
    method: 'get',
    url: `${process.env.REACT_APP_API}/getUserWorkHistory?userId=${userId}`,
    headers: {
      location
    }
  });
};

const addWorkHistory = ({
  userId,
  location,
  formData
}: {
  userId: string;
  location: string;
  formData: IWorkHistory;
}) => {
  return axios({
    method: 'post',
    url: `${process.env.REACT_APP_API}/addUserWorkHistory?userId=${userId}`,
    headers: {
      location
    },
    data: formData
  });
};

const updateWorkHistory = ({
  userId,
  location,
  formData,
  id
}: {
  userId: string;
  location: string;
  formData: IWorkHistory;
  id: string;
}) => {
  return axios({
    method: 'patch',
    url: `${process.env.REACT_APP_API}/updateUserWorkHistory?userId=${userId}&workHistoryId=${id}`,
    headers: {
      location
    },
    data: formData
  });
};

const deleteWorkHistory = ({ userId, location, id }: { userId: string; location: string; id: string }) => {
  return axios({
    method: 'delete',
    url: `${process.env.REACT_APP_API}/deleteUserWorkHistory?userId=${userId}&workHistoryId=${id}`,
    headers: {
      location
    }
  });
};

const getTags = ({ location }: { location: string }) => {
  return axios({
    method: 'get',
    url: `${process.env.REACT_APP_API}/getTagsList`,
    headers: {
      location
    }
  });
};

const updateGroupPic = ({ orgId, location, formData }: { orgId: string; location: string; formData: FormData }) => {
  return axios({
    method: 'post',
    url: `${process.env.REACT_APP_API}/groupChatPicUpload`,
    headers: {
      orgId,
      location
    },
    data: formData
  });
};

const addUserVideoUpload = ({
  tokens,
  orgId,
  data
}: {
  tokens: {
    access_token: string;
    id_token: string;
  };
  orgId: string;
  data: FormData;
}) => {
  return axios({
    method: 'POST',
    url: `${process.env.REACT_APP_API}/updateUserVideoIntro`,
    headers: {
      Authorization: `Bearer ${tokens.access_token}`,
      idtoken: tokens.id_token,
      orgId: orgId
    },
    data
  });
};

const deleteVideoIntro = ({ userId }: { userId: string }) => {
  return axios({
    method: 'delete',
    url: `${process.env.REACT_APP_API}/deleteVideoBio/${userId}`
  });
};

const getGroupByOrgId = (orgId: string) => {
  return axios({
    method: 'get',
    url: `${process.env.REACT_APP_API}/group/org/${orgId}`,
    headers: {}
  });
};

const getAllGroups = ({ orgId, grpId }: { orgId: string; grpId: string }) => {
  return axios({
    method: 'post',
    url: `${process.env.REACT_APP_API}/groups/getAll`,
    headers: {},
    data: {
      orgId,
      grpId,
      pagination: {
        pageIndex: 1,
        pageSize: 100,
        sort: { direction: 'asc', column: 'name' }
      }
    }
  });
};

const createGroup = ({ name, orgId, parent }: { name: string; orgId: string; parent: string }) => {
  return axios({
    method: 'post',
    url: `${process.env.REACT_APP_API}/group/create`,
    headers: {},
    data: { orgId, name, parent }
  });
};

const deleteGroup = (grpId: string) => {
  return axios({
    method: 'delete',
    url: `${process.env.REACT_APP_API}/group/${grpId}`
  });
};

const getGroupDetails = (grpId: string) => {
  return axios({
    method: 'get',
    url: `${process.env.REACT_APP_API}/group/${grpId}`
  });
};

const getGroupUsers = (grpId: string) => {
  return axios({
    method: 'get',
    url: `${process.env.REACT_APP_API}/group/${grpId}/users/getAll`
  });
};

interface IGroupUserData {
  firstName: string;
  lastName: string;
  mobileNumber: number;
  role: string;
  email: string;
}

const inviteUserToAGroup = ({ formData, grpId, orgId }: { formData: IGroupUserData; grpId: string; orgId: string }) => {
  return axios({
    method: 'post',
    url: `${process.env.REACT_APP_API}/${orgId}/group/${grpId}`,
    data: formData
  });
};

// For Bulk upload Files
const bulkFilesUpload = ({
  // tokens,
  orgId,
  grpId,
  data
}: {
  // tokens: { id_token: string };
  orgId: string;
  grpId: string;
  data: FormData;
}) => {
  return axios({
    method: 'POST',
    url: `${process.env.REACT_APP_API}/${orgId}/group/${grpId}/bulkUpload`,
    headers: {},
    data
  });
};

// Basic Settings Page............//
interface IGroupBasicSettingsData {
  name: string;
  endDate: Date;
  programType: string;
  logo: File;
}

const addBasicSettings = ({ formData, grpId }: { formData: IGroupBasicSettingsData; grpId: string }) => {
  return axios({
    method: 'post',
    url: `${process.env.REACT_APP_API}/group/${grpId}/basicSettings`,
    data: formData
  });
};

const removeUserFromGroup = ({ grpId, userId }: { grpId: string; userId: string }) => {
  return axios({
    method: 'delete',
    url: `${process.env.REACT_APP_API}/group/${grpId}/removeParticipant/${userId}`
  });
};

const updateGroupInfo = ({ orgId, grpId, formData }: { orgId: string; grpId: string; formData: FormData }) => {
  return axios({
    method: 'patch',
    url: `${process.env.REACT_APP_API}/group/${grpId}/basicSettings`,
    headers: {
      orgId
    },
    data: formData
  });
};

const getAllMatches = ({ orgId, groupId }: { orgId: string; groupId: string }) => {
  return axios({
    method: 'get',
    url: `${process.env.REACT_APP_API}/group/${groupId}/matches/getAll`,
    headers: {
      orgId: orgId
    }
  });
};
export interface IOptionalFields {
  gender: boolean;
  ethnicity: boolean;
  firstGenerationStudent: boolean;
  disabilityType: boolean;
  dob: boolean;
  country: boolean;
}

const updateOptionalFields = ({ grpId, data }: { grpId: string; data: IOptionalFields }) => {
  return axios({
    method: 'post',
    url: `${process.env.REACT_APP_API}/group/${grpId}/optionalFields`,
    headers: {},
    data
  });
};

const updateAllMatches = ({ grpId, orgId, data }: { grpId: string; orgId: string; data: object }) => {
  return axios({
    method: 'patch',
    url: `${process.env.REACT_APP_API}/group/${grpId}/updateMatchingSettings`,
    headers: {
      orgId: orgId
    },
    data
  });
};

const getAllMatchesSettings = ({ grpId, orgId }: { grpId: string; orgId: string }) => {
  return axios({
    method: 'get',
    url: `${process.env.REACT_APP_API}/group/${grpId}/getAllMatchesSetting`,
    headers: {
      orgId: orgId
    }
  });
};

const revokeGroupInvitation = ({ orgId, invitedId }: { orgId: string; invitedId: string }) => {
  return axios({
    method: 'delete',
    url: `${process.env.REACT_APP_API}/${orgId}/user/${invitedId}`,
    headers: {}
  });
};

const getUserProfileInAGroup = (grpId: string, userId: string) => {
  return axios({
    method: 'get',
    url: `${process.env.REACT_APP_API}/group/${grpId}/user/${userId}`,

    headers: {
      // authorization: `Bearer ${token}`,
      // orgId: orgId !== "" ? orgId : null,
    }
  });
};

const getUserCommunityPeersList = (orgId: string, location: string) => {
  return axios({
    method: 'get',
    url: `${process.env.REACT_APP_API}/getUserCommunityPeersList`,

    headers: {
      // authorization: `Bearer ${token}`,
      orgId: orgId,
      location: location
    }
  });
};

const getMyMentors = ({ orgId, groupId }: { orgId: string; groupId: string }) => {
  return axios({
    method: 'get',
    url: `${process.env.REACT_APP_API}/group/${groupId}/myMentors`,
    headers: {
      orgId: orgId
    }
  });
};

const getMyMentees = ({ orgId, groupId }: { orgId: string; groupId: string }) => {
  return axios({
    method: 'get',
    url: `${process.env.REACT_APP_API}/group/${groupId}/myMentees`,
    headers: {
      orgId: orgId
    }
  });
};

const updateOrganizationSettings = ({ orgId, formData }: { orgId: string; formData: FormData }) => {
  return axios({
    method: 'POST',
    url: `${process.env.REACT_APP_API}/org/${orgId}/settings`,
    headers: {},
    data: formData
  });
};

const getAllTasks = ({ grpId, templateId }: { grpId: string; templateId: string }) => {
  return axios({
    method: 'get',
    url: `${process.env.REACT_APP_API}/group/${grpId}/template/${templateId}/getAllTasks`
  });
};
const getAllTemplates = ({ grpId }: { grpId: string }) => {
  return axios({
    method: 'get',
    url: `${process.env.REACT_APP_API}/group/${grpId}/getAllTemplates`
  });
};

const getAllLevels = ({ grpId, goalId }: { grpId: string; goalId: string }) => {
  return axios({
    method: 'get',
    url: `${process.env.REACT_APP_API}/group/${grpId}/template/${goalId}/getAllLevels`
  });
};

export interface IGoalData {
  programType: string;
  programKPIS: string;
  goalName: string;
  new: boolean;
}

const createGoal = ({ grpId, goalData }: { grpId: string; goalData: IGoalData }) => {
  return axios({
    method: 'post',
    url: `${process.env.REACT_APP_API}/group/${grpId}/createGoal`,
    data: goalData
  });
};

export const API = {
  getOrganizations,
  removeOrganization,
  getUsersByOrgId,
  addOrganization,
  updateOrganization,
  inviteMember,
  inviteOrgAdmin,
  getMemberRoles,
  getACSToken,
  getACSThreads,
  deleteACSThread,
  getACSOrgUsers,
  createACSThread,
  sendMessageToACSThread,
  getACSThreadParticipants,
  getUserMetadData,
  updateUserFtue,
  getUsersMetaByOrgId,
  getOrgName,
  inviteApi,
  getOrgId,
  readMessagesFromThreads,
  addParticipantsToExistingChannel,
  updateGroupChatName,
  editMessage,
  deleteMessage,
  removeParticipantFromThread,
  getACSChatThreads,
  readMessagesFromThreadsByPage,
  createUserProfile,
  getUserProfile,
  updateUserProfile,
  getEducationAndSkills,
  addEducationAndSkills,
  updateEducationAndSkills,
  getWorkHistory,
  addWorkHistory,
  updateWorkHistory,
  deleteWorkHistory,
  deleteEducation,
  getTags,
  updateSocialLinks,
  updateDisability,
  getTagsList,
  updateGroupPic,
  updateHobbies,
  getGroupByOrgId,
  getTagsListnew,
  addUserVideoUpload,
  getAllGroups,
  readMessagesFromThreadsByNextLink,
  createGroup,
  deleteVideoIntro,
  createArticle,
  deleteGroup,
  getGroupDetails,
  getAllArticle,
  getAllArticleUser,
  DeleteArticle,
  editArticle,
  getGroupUsers,
  inviteUserToAGroup,
  bulkFilesUpload,
  getCommunityMembers,
  getAllArticleById,
  articleAction,
  removeUserFromGroup,
  addBasicSettings,
  updateGroupInfo,
  getAllMatches,
  updateOptionalFields,
  updateAllMatches,
  getAllMatchesSettings,
  revokeGroupInvitation,
  getUserProfileInAGroup,
  getUserCommunityPeersList,
  updateOrganizationSettings,
  getListToAssignMatch,
  assignAMatch,
  confirmAllMatches,
  confirmMatch,
  getAllMatchesSetting,
  removeMatch,
  autoMatch,
  getMatchProfile,
  getAllTemplates,
  getAllLevels,
  getMyMentors,
  getMyMentees,
  getAllTasks,
  createGoal
};
