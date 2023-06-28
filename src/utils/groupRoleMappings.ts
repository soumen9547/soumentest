interface IRole {
  [key: string]: string;
}
interface SideBarComponents {
  [key: string]: IRole;
}

const groupRoleMappings: SideBarComponents = {
  starventure: {
    member: 'Member',
    admin: 'Admin',
    mentor: 'Mentor',
    programFriend: ' Program Friend'
  },
  default: {
    member: 'Member',
    admin: 'Admin',
    mentor: 'Mentor',
    programFriend: ' Program Friend'
  }
};

export default groupRoleMappings;
