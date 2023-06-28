/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import {
  Box,
  Grid,
  Stack,
  Button,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import DragHandleIcon from '@mui/icons-material/DragHandle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {
  MyCheckbox,
  MyTextField,
  MyInputLabel,
  MyCheckboxBox,
} from "../../../../../../style-components/FormInput";

const LevelsDialog = () => {
  const [levelCount, setLevelCount] = useState(1);

  const handleAddLevel = () => {
    setLevelCount(prevCount => prevCount + 1);
  };

  interface MenteeLevelsProps {
    levelNumber: number;
  }

  const MenteeLevels: React.FC<MenteeLevelsProps> = ({ levelNumber }) => {
    return (
      <Stack py={2}>
          <Stack direction="row" spacing={1}>
            <DragHandleIcon
              sx={{
                color: "#ABB5BE",
              }}
            />
            <Stack
              sx={{
                width: "100%",
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px !important",
                  fontFamily: "Open Sans !important",
                  fontWeight: "600 !important",
                  color: "#ABB5BE",
                  marginBottom: "16px"
                }}
              >
                Level {levelNumber}
              </Typography>
              <Box>
                <MyInputLabel>Level Name *</MyInputLabel>
                <MyTextField fullWidth />
              </Box>
              <Grid container alignItems="center">
                <Grid item xs={8}>
                  <MyCheckboxBox control={<MyCheckbox />} label="Check in with mentor" />
                </Grid>
                <Grid item xs={4}
                  sx={{
                    textAlign: "right",
                  }}
                >
                  <Button variant="text" color="error" size="small"
                    sx={{
                      textAlign: "right",
                      fontSize: "10px",
                      fontFamily: "Open Sans",
                      padding: "5px 0"
                    }}
                  >
                    Remove
                  </Button>
                </Grid>
              </Grid>
            </Stack>
          </Stack>
        </Stack>
    );
  };

  const renderedLevels = [];

  for (let i = 0; i < levelCount; i++) {
    renderedLevels.push(
      <React.Fragment key={i}>
        <MenteeLevels levelNumber={i + 1} />
        {/* Divider last one removing */}
        {i !== levelCount - 1 && <Divider />} 
      </React.Fragment>
    );
  }

  return (
    <Grid>
        {renderedLevels}
        <Box
          sx={{
            textAlign: "right",
          }}
        >
          <IconButton onClick={handleAddLevel}>
            <AddCircleOutlineIcon
              sx={{
                color: "#0082B6",
                width: "20px",
                height: "20px",
              }}
            />
          </IconButton>
        </Box>
      </Grid>
  )
};

export default LevelsDialog;
