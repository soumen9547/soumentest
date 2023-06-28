/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { useLogout } from '../../../hooks';
import { useNavigate } from 'react-router-dom';
import ROLES from '../../../utils/roles';

const ProfileSidebar = () => {
  const { doLogout } = useLogout();
  const navigate = useNavigate();
  const url = window.location.hash;
  const role = localStorage.getItem('role') || '';

  let tabs: any = [];
  // {
  //   id: "security",
  //   name: "Password and Security",
  //   route: "/app/profile/security",
  // },
  // ];

  if (role !== ROLES.platAdmin) {
    if (Array.isArray(tabs) && tabs.length > 0) {
      tabs = [
        {
          id: 'profile',
          name: 'Profile',
          route: '/app/profile'
        },
        ...tabs
      ];
    } else {
      tabs = [
        {
          id: 'profile',
          name: 'Profile',
          route: '/app/profile'
        }
      ];
    }
  }
  if (role === ROLES.orgAdmin) {
    if (Array.isArray(tabs) && tabs.length > 0) {
      tabs = [
        ...tabs,
        {
          id: 'settings',
          name: 'Settings',
          route: '/app/profile/settings'
        },
        {
          id: 'orgsettings',
          name: 'Organization Settings',
          route: '/app/profile/orgsettings'
        }
      ];
    } else {
      tabs = [
        {
          id: 'settings',
          name: 'Settings',
          route: '/app/profile/settings'
        },
        {
          id: 'orgsettings',
          name: 'Organization Settings',
          route: '/app/profile/orgsettings'
        }
      ];
    }
  }
  if (Array.isArray(tabs) && tabs.length > 0) {
    tabs = [
      ...tabs,
      {
        id: 'logout',
        name: 'Logout',
        route: 'logout'
      }
    ];
  } else {
    tabs = [
      {
        id: 'logout',
        name: 'Logout',
        route: 'logout'
      }
    ];
  }

  const activeStyle = 'list-group-item listProfileSidebarActive text-white';
  const inActiveStyle = 'list-group-item listProfileSidebar';
  return (
    <Grid item lg={3}>
      <Box
        // minWidth={"290px"}
        sx={{ height: 'calc(100vh - 60px)', background: '#fff' }}
      >
        <nav aria-label="secondary mailbox folders">
          <div className="listGroup">
            <ul className="list-group ">
              {Array.isArray(tabs) &&
                tabs?.length > 0 &&
                tabs?.map((tab: any) => {
                  return (
                    <li
                      key={tab.id}
                      className={url === `#${tab.route}` ? activeStyle : inActiveStyle}
                      onClick={() => {
                        if (tab.route !== 'logout') {
                          navigate(tab.route);
                        } else {
                          doLogout();
                        }
                      }}
                    >
                      {tab.name}
                    </li>
                  );
                })}
              {/* <li className="list-group-item listProfileSidebarActive text-white my-1">
                Profile{" "}
              </li>
              <li className="list-group-item listProfileSidebar">Settings </li>
              <li className="list-group-item listProfileSidebar">
                Organization Settings{" "}
              </li>
              <li className="list-group-item listProfileSidebar">
                Password and Security{" "}
              </li>
              <li
                className="list-group-item listProfileSidebar"
                onClick={doLogout}
              >
                Logout{" "}
              </li> */}
            </ul>
          </div>
        </nav>
      </Box>
    </Grid>
  );
};

export default ProfileSidebar;
