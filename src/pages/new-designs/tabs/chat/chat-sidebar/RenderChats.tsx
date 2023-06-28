/* eslint-disable no-constant-binary-expression */
/* eslint-disable no-undef */
import _ from 'lodash';
import React from 'react';
import { getUserDetails } from '../../../../../utils/orgName';
import ChatPerson from './ChatPerson';

interface IRenderChats {
  filteredDirectMessages: IThread[];
  formattedAcsOrgUsers: IFormattedAcsOrgUser[];
  threadValue: string;
  commId: string;
  filterParticipantsFromDirectThreads: IChatThread[];
  activeItemRef: React.MutableRefObject<any>;
}

const RenderChats: React.FC<IRenderChats> = ({
  filteredDirectMessages,
  formattedAcsOrgUsers,
  threadValue,
  commId,
  filterParticipantsFromDirectThreads,
  activeItemRef
}) => {
  return (
    <>
      {_.map(filteredDirectMessages, (each, idx) => {
        const user = _.size(_.head(_.get(each, 'displayNames', [])))
          ? _.get(formattedAcsOrgUsers, `${_.head(_.get(each, 'displayNames'))}`, '')
          : '';
        const firstName = _.get(user, 'id.firstName', '');
        const lastName = _.get(user, 'id.lastName', '');
        const fullName = `${firstName} ${lastName}` || '';

        return (
          <div
            key={idx}
            ref={
              _.get(each, 'id', '') === threadValue || getUserDetails().communicationUserId === commId
                ? activeItemRef
                : null
            }
          >
            <ChatPerson
              type="personal-thread"
              activeThreadId={threadValue}
              activeCommId={commId}
              threadId={_.get(each, 'id', '')}
              image={
                _.size(_.head(_.get(each, 'displayNames', [])))
                  ? _.get(formattedAcsOrgUsers, `${_.head(_.get(each, 'displayNames'))}.id.headshot`, '')
                  : ''
              }
              lastMessageReceivedOn={_.get(each, 'lastMessageReceivedOn', '')}
              name={fullName}
            />
          </div>
        );
      })}
      {_.size(filterParticipantsFromDirectThreads)
        ? _.map(
            _.orderBy(
              filterParticipantsFromDirectThreads,
              [(messages) => _.toLower(_.get(messages, 'displayName', ''))],
              ['asc']
            ),
            (each, idx) => {
              return (
                <ChatPerson
                  key={idx}
                  activeThreadId={threadValue}
                  activeCommId={commId}
                  type="personal-user"
                  name={_.get(each, 'displayName', '') || ''}
                  image={_.get(each, 'id.headshot', '')}
                  lastMessageReceivedOn={_.get(each, 'lastMessageReceivedOn', '')}
                  communicationUserId={_.get(each, 'id.communicationUserId', '')}
                />
              );
            }
          )
        : null}
    </>
  );
};

export default RenderChats;
