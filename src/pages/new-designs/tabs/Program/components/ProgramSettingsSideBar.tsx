import { Box } from '@mui/material';
import React from 'react';

interface Props {
  activeTab: string;
  setActiveTab: any;
}

export default function ProgramSettingsSideBar({ activeTab, setActiveTab }: Props) {
  const sideBarArray = [
    { name: 'Basic Settings', id: 'basicSettings' },
    { name: 'Goal Settings', id: 'goalSettings' },
    { name: 'Content Settings', id: 'contentSettings' }
    // { name: "Chat / Directory Settings", id: "chatSettings" },
    // { name: "Communication Settings", id: "communicationSettings" },
  ];
  return (
    <div>
      <Box
        // minWidth={"290px"}
        sx={{
          height: 'calc(100vh - 60px)',
          background: '#fff',
          border: '1px solid #EFF0F4',
          borderRadius: '8px'
        }}
      >
        <nav aria-label="secondary mailbox folders">
          <div className="listGroup">
            <ul className="list-group ">
              {sideBarArray.map((item) => (
                <li
                  key={item.id}
                  className={`list-group-item ${
                    activeTab === item.id ? 'listProfileSidebarActive text-white my-1' : 'listProfileSidebar'
                  }  `}
                  onClick={() => setActiveTab(item.id)}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </Box>
    </div>
  );
}
