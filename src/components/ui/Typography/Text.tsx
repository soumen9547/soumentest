/* eslint-disable prettier/prettier */
import { Typography, TypographyProps } from "@mui/material";
import React from "react";
import { appColors } from "../../../utils/theme";

interface IText extends TypographyProps {
  content: string;
  type: "T5" | "T6" | "T7" | "T8" | "T9";
  color?: string;
}

const Text: React.FC<IText> = ({
  content,
  type,
  color = appColors.black,
  ...rest
}) => {
  switch (type) {
    case "T5":
      return (
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "19px",
            fontFamily: "Open Sans",
            color: color,
            wordBreak: "break-all",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            maxWidth: "200px",
          }}
          {...rest}
        >
          {content}
        </Typography>
      );
    case "T6":
      return (
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: "16px",
            fontFamily: "Open Sans",
            lineHeight: "21.79px",
            color: color,
            wordBreak: "break-all",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            maxWidth: "200px",
          }}
          {...rest}
        >
          {content}
        </Typography>
      );
    case "T7":
      return (
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: "12px",
            fontFamily: "Open Sans",
            lineHeight: "16.34px",
            color: color,
            wordBreak: "break-all",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            maxWidth: "200px",
          }}
          {...rest}
        >
          {content}
        </Typography>
      );
    case "T8":
      return (
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: "18px",
            fontFamily: "Open Sans",
            lineHeight: "16.34px",
            color: color,
            wordBreak: "break-all",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            maxWidth: "200px",
          }}
          {...rest}
        >
          {content}
        </Typography>
      );
    case "T9":
      return(
        <Typography
        sx={{
          fontWeight: 600,
          fontSize: "18px",
          fontFamily: "Open Sans",
          color: color,
          wordBreak: "break-all",
          overflow: "hidden",
        }}
        {...rest}
      >
        {content}
      </Typography>
      )
    default:
      return <Typography {...rest}>{content}</Typography>;
  }
};

export default Text;
