/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-duplicate-imports */
/* eslint-disable react-hooks/exhaustive-deps */
import { Grid } from '@material-ui/core';
import Box from '@mui/material/Box';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ProgramSettingsSideBar from '../ProgramSettingsSideBar';
import ContentSettings from './ContentSettings';
import { useEffect, useState } from 'react';
import ChatSettings from './settings components/ChatSettings';
import GoalSettings from './settings components/GoalSettings';
import CommunicationSettings from './settings components/CommunicationSettings';
import BasicSettings from './settings components/BasicSettings';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../../../../redux/hooks';
import { fetchAllTemplates } from '../../../../../../redux/slices/goals-templates/goalsTemplatesSlice';
import { useAppSelector } from '../../../../../../redux/hooks';
import CustomProgram from '../../../goals/components/CustomProgram';
import { customProgramActions } from '../../../../../../redux/slices/custom-program/customProgramSlice';

interface SideBarComponents {
  [key: string]: React.ReactNode;
}

const ProgramSettings = () => {
  const [activeTab, setActiveTab] = useState('basicSettings');
  const grpId = useParams().id || '';
  const sideBarComponents: SideBarComponents = {
    basicSettings: <BasicSettings />,
    contentSettings: <ContentSettings />,
    chatSettings: <ChatSettings />,
    goalSettings: <GoalSettings />,
    communicationSettings: <CommunicationSettings />
  };
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllTemplates(grpId));
  }, []);

  useEffect(() => {
    return () => {
      dispatch(customProgramActions.updateCustomProgramFlag(false));
    };
  }, []);

  const customProgramOpen = useAppSelector((state) => state.customProgarm.open);

  return (
    <>
      {customProgramOpen ? (
        <CustomProgram />
      ) : (
        <div style={{ background: '#F9FAFC', overflow: ' hidden auto' }}>
          <Box sx={{ margin: ' 10px 0 20px' }}>
            <Box>
              <Grid container spacing={2}>
                <Grid item lg={3} md={3} sm={3}>
                  <ProgramSettingsSideBar activeTab={activeTab} setActiveTab={setActiveTab} />
                </Grid>
                <Grid item lg={9}>
                  {sideBarComponents[activeTab]}
                </Grid>
              </Grid>
            </Box>
          </Box>
        </div>
      )}
    </>
  );
};

export default ProgramSettings;
