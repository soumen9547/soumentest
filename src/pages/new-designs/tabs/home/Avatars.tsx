import React from "react";

/** Added How many user image we'll show */
const MAX_AVATARS_DISPLAYED = 5;

const AvatarRow: React.FC<{ avatars: string[] }> = ({ avatars }) => {
  const displayedAvatars = avatars?.slice(0, MAX_AVATARS_DISPLAYED);
  const extraAvatarsCount = avatars?.length - MAX_AVATARS_DISPLAYED;

  return (
    <div className="avatarRow">
      {/* Printing Requerd user images */}
      {displayedAvatars?.map((avatar, index) => (
        <img
          key={index}
          alt={`img ${index + 1}`}
          src={avatar}
          width="30"
          height="30"
        />
      ))}

      {/* pronting Extra Avatar */}
      {extraAvatarsCount > 0 && (
        <div className="moreAvatars">+{extraAvatarsCount}</div>
      )}
    </div>
  );
};

export default AvatarRow;
