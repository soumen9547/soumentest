/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import {
  TextField,
  DialogActions,
  Typography,
  Grid,
  Autocomplete,
} from "@mui/material";
import _ from "lodash";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useAuth0 } from "@auth0/auth0-react";
import { LoadingButton } from "@mui/lab";
import { API } from "../../../api";
import { toast } from "react-toastify";
import { dialogActions } from "../../../redux/slices/dialog-slice/dialogSlice";
import { useQueryClient } from "@tanstack/react-query";
//import { filterAcsUsersWithChannels } from "../../../routes/helpers";

const schema = yup
  .object({
    participants: yup
      .object({
        displayName: yup.string(),
        id: yup.object({
          communicationUserId: yup.string(),
        }),
      })
      .test("required", "Participants required to start chat", (value) => {
        if (_.size(value) && _.size(_.get(value, "id.communicationUserId"))) {
          return true;
        }
        return false;
      }),
  })
  .required();

const ValidationError = ({
  errors,
  fieldName,
}: {
  errors: Object;
  fieldName: string;
}) => (
  <Typography color="red" px={0.5} variant="subtitle2">
    {_.get(errors, `${fieldName}.message`, "")}
  </Typography>
);

const AcsCreateUserChatDialog: React.FC = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { user } = useAuth0();
  const [channelCreateLoading, setChannelCreateLoading] = useState(false);
  const acsToken = useAppSelector((state) => state.acsToken.data.token);
  const acsOrgUsers = useAppSelector((state) => state.acsCommunityUsers.data);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values: any) => {
    const orgId = _.get(user, "org_id");
    const modifiedValues = {
      participants: [{ ...values.participants }],
      topic: "#personal",
      azureToken: acsToken,
    };
    setChannelCreateLoading(true);
    try {
      const { status, data } = await API.createACSThread(
        acsToken,
        modifiedValues,
        orgId
      );
      if (status === 200) {
        dispatch(dialogActions.atnCloseDialog());
        queryClient.fetchQuery({ queryKey: ["getAcsChatThreads"] });
        setChannelCreateLoading(false);
        if (_.has(data, "threadId")) {
          toast.success("Chat created successfully");
        } else {
          toast.error(_.get(data, "message"));
        }
      }
    } catch (err) {
      setChannelCreateLoading(false);
      toast.error(_.get(err, "response.data", ""));
    }
  };

  return (
    <Grid item xs={12}>
      <Grid item xs={12}>
        <Grid item xs={12} my={2}>
          <Controller
            name={"participants"}
            control={control}
            render={({ field: { onChange, value } }) => {
              if (!value) {
                onChange({});
              }
              return (
                <Autocomplete
                  fullWidth
                  id="tags-standard"
                  options={acsOrgUsers}
                  getOptionLabel={(option) => option.displayName || ""}
                  onChange={(e, value) => {
                    onChange(value);
                  }}
                  value={
                    value ||
                    acsOrgUsers.find(
                      (option: any) => option.displayName === "Org Admin"
                    )
                  }
                  isOptionEqualToValue={(option, value) =>
                    _.get(option, "id.communicationUserId") ===
                    _.get(value, "id.communicationUserId")
                  }
                  renderOption={(props, option) => {
                    return (
                      <li
                        {...props}
                        key={_.get(option, "id.communicationUserId", "")}
                      >
                        {_.startCase(_.get(option, "displayName"))}
                      </li>
                    );
                  }}
                  renderInput={(params) => (
                    <TextField className="chooseUser"
                      {...params}
                      variant="outlined"
                      size="small"
                      label="Choose user"
                      placeholder="Enter user name"
                    />
                  )}
                />
              );
            }}
          />
          <ValidationError errors={errors} fieldName="participants" />
        </Grid>
      </Grid>
      <DialogActions style={{ marginBottom: "16px" }}>
        <LoadingButton
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          size="small"
          color="primary"
          loading={channelCreateLoading}
          disabled={channelCreateLoading}
        >
          Start Chat
        </LoadingButton>
      </DialogActions>
    </Grid>
  );
};

export default AcsCreateUserChatDialog;
