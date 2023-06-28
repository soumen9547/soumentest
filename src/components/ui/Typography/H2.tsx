/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable prettier/prettier */
import { Typography } from "@mui/material";
import React from "react";

type Props = {
  content: string;
};

const H2 = ({ content }: Props) => {
  return (
    <Typography
      sx={{
        fontWeight: 600,
        fontSize: "24px",
        fontFamily: "Open Sans",
        lineHeight: "24px",
      }}
    >
      {content}
    </Typography>
  );
};

export default H2;
