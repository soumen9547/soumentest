/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable no-duplicate-imports */
import { Table, TableCell, TableContainer, TableHead, TableRow, Typography, TableBody } from '@mui/material';
// import Share from "../../../../../assets/images/Share.svg";
// import Filter from "../../../../../assets/images/Filter.svg";
import pluscircle from '../../../../../assets/images/pluscircle.svg';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

import { Box } from '@mui/system';
import React, { useState } from 'react';
import AddProgram from '../Dialogs/AddProgram';
import ProgramTableRow from './ProgramTableRow';
import { groupActions } from '../../../../../redux/slices/getAllGroups/getAllGroupsSlice';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { API } from '../../../../../api';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'react-router-dom';

// type Props = {
//   allGroupData: IGroup;
//   grpId: string;
// };

// const schema = yup.object({
//   name: yup
//     .string()
//     .required("Group name is required")
//     .min(3, "Min 3 Characters"),
// });

const schema = yup.object({
  name: yup
    .string()
    .required('Program name is required')
    .test('no-whitespace', 'Min 3 characters without spaces', (value) => {
      if (!value) return false; // if value is undefined or null
      return value.replace(/\s/g, '').length >= 3;
    })
});

const ProgramTable = () => {
  const allGroupData = useAppSelector((state) => state.allGroups.data);
  const grpId = useParams().id || '';
  const [addGrpLoader, setAddGrpLoader] = useState(false);
  const coId = useParams().coId || '';
  const tableStyle = {
    fontWeigth: '600 !important',
    color: ' #68717A',
    fontSize: '12px',
    fontFamily: 'Open Sans'
  };
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm({
    resolver: yupResolver(schema)
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const [open, setOpen] = React.useState(false);

  const handleAddProgramDialog = (flag: boolean) => {
    setOpen(flag);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setAddGrpLoader(true);

    try {
      const response = await API.createGroup({
        orgId: coId,
        parent: grpId,
        name: data.name
      });
      if (response.status === 200 && response.statusText === 'OK') {
        setAddGrpLoader(false);
        handleAddProgramDialog(false);
        dispatch(groupActions.addGroup(response.data.groupDetails));
        setValue('name', '');
      }
    } catch (e) {
      toast.error('Could not create a group');
      setAddGrpLoader(false);
    }
  };

  const displayGroups = () => {
    if (allGroupData && allGroupData.groups) {
      return (
        <Box
          sx={{
            margin: '20px 0 20px 0',
            background: '#ffffff',
            border: '1px solid #EFF0F4',
            borderRadius: '8px'
          }}
        >
          <TableContainer>
            <Table className="tableBody" width="100%" aria-label="simple table">
              <TableHead>
                <TableRow sx={{ borderBottom: '1px solid #EFF0F4' }}>
                  <TableCell colSpan={2} width="50%" align="left">
                    <Typography
                      sx={{
                        fontFamily: 'Open Sans',
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#152536',
                        textAlign: 'left'
                      }}
                    >
                      {allGroupData.mainGroup ? 'All Programs' : 'Groups List'}
                    </Typography>
                  </TableCell>
                  <TableCell colSpan={3} width="50%">
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      {/* <img
                        src={Share}
                        alt="Shareicon"
                        style={{
                          padding: 0,
                          margin: 0,
                          width: "32px",
                          height: "32px",
                          marginRight: "6px",
                          cursor: "pointer",
                        }}
                      /> */}

                      {/* <img
                        src={Filter}
                        alt="filtericon"
                        style={{
                          padding: 0,
                          margin: 0,
                          width: "32px",
                          height: "32px",
                          marginRight: "6px",
                          cursor: "pointer",
                        }}
                      /> */}

                      {grpId !== 'admin' && (
                        <img
                          src={pluscircle}
                          alt="pluscircle"
                          onClick={handleClickOpen}
                          style={{
                            padding: 0,
                            margin: 0,
                            width: '34px',
                            height: '34px',
                            marginRight: '6px',
                            cursor: 'pointer'
                          }}
                        />
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={tableStyle} sx={{ fontWeight: '600' }}>
                    PROGRAM NAME
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography style={tableStyle} sx={{ fontWeight: '600' }}>
                        ENROLLED
                      </Typography>{' '}
                      <ArrowUpwardIcon
                        sx={{
                          width: '15px',
                          height: '15px',
                          color: '#ABB5BE'
                        }}
                      />
                    </Box>
                  </TableCell>
                  {/* <TableCell style={tableStyle}>ACTIVE</TableCell> */}
                  {/* <TableCell style={tableStyle}>ROI</TableCell> */}
                  {/* <TableCell style={tableStyle}>GOAL PROGRESS</TableCell> */}
                  {/* <TableCell style={tableStyle}>XP</TableCell> */}
                  {/* <TableCell style={tableStyle}>DAYS REMAINING</TableCell> */}
                  <TableCell style={tableStyle} sx={{ fontWeight: '600' }}>
                    START DATE
                  </TableCell>
                  {/* <TableCell style={tableStyle}>END DATE</TableCell> */}
                  <TableCell style={tableStyle} sx={{ fontWeight: '600' }}>
                    STATUS
                  </TableCell>
                  <TableCell style={tableStyle} sx={{ fontWeight: '600' }}>
                    ACTION
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allGroupData.groups.length > 0 ? (
                  allGroupData.groups.map((item) => <ProgramTableRow data={item} key={item.grpId} />)
                ) : (
                  <TableRow>
                    <TableCell component="td">
                      <span>
                        <Typography>No Groups Found</Typography>
                      </span>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      );
    }
    return <div>No Groups</div>;
  };
  return (
    <>
      {displayGroups()}
      <AddProgram
        handleAddProgramDialog={handleAddProgramDialog}
        addProgramDialogFlag={open}
        onSubmit={onSubmit}
        addGrpLoader={addGrpLoader}
        control={control}
        errors={errors}
        handleSubmit={handleSubmit}
        reset={reset}
      />
    </>
  );
};

export default ProgramTable;
