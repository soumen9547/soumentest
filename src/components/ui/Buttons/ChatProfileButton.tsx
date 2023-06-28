/* eslint-disable prettier/prettier */
import { Button, ButtonProps, Stack } from "@mui/material";
import { appColors } from "../../../utils/theme";
import Text from "../Typography/Text";

interface IChatProfileButton extends ButtonProps {
    title: string,
    icon?: React.ReactElement
}

const ChatProfileButton:React.FC<IChatProfileButton> = ({title, icon, ...rest}) => {
  return (
    <Button
      variant="outlined"
      {...rest}
      sx={{
        color: appColors.blue1,
        borderColor: appColors.blue1,
        textTransform: "none",
        borderRadius: "29px",
        width: "100%",
        padding: "6px 8px",
      }}
    >
      <Stack direction="row" gap="5px" alignItems="center">
        {icon}
        <Text content={title} color={appColors.blue1} type="T5" />
      </Stack>
    </Button>
  );
};

export default ChatProfileButton;
