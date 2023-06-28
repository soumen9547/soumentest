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
import { filterAcsUsersWithExistingUsers } from "../../../routes/helpers";
import { useQueryClient } from "@tanstack/react-query";
import { fetchAcsChannelParticipants } from "../../../redux/slices/acs-channel-participants/acsChannelParticipants";
import { useSearchParams } from "react-router-dom";

const schema = yup
  .object({
    participants: yup
      .array()
      .of(
        yup.object({
          displayName: yup.string().required("display name required"),
          id: yup.object({
            communicationUserId: yup
              .string()
              .required("communication id required"),
          }),
        })
      )
      .test("required", "Participants are required", (value, context) => {
        if (value?.length) return true;
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
let threadValue: string = "";

const AcsAddUserToExistingChannel: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const threadId = searchParams.get("threadid") || "";
  threadValue = threadId || "";
  const { user, getIdTokenClaims } = useAuth0();
  const [channelCreateLoading, setChannelCreateLoading] = useState(false);
  const acsToken = useAppSelector((state) => state.acsToken.data.token);
  const acsOrgUsers = useAppSelector((state) => state.acsCommunityUsers.data);
  const existingUsers = useAppSelector(
    (state) => state.acsChannelParticipants.data
  );
  const dialogDetails = useAppSelector(
    (state) => state.dialogActions.dialogDetails
  );
  const queryClient = useQueryClient();

  const filteredUsers = filterAcsUsersWithExistingUsers(
    acsOrgUsers,
    existingUsers
  );

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values: any) => {
    // const token = await getAccessTokenSilently()
    const idToken = await getIdTokenClaims();
    const orgId = _.get(user, "org_id");
    const data = {
      ...values,
      threadId: _.get(dialogDetails, "threadId"),
      azureToken: acsToken,
    };
    setChannelCreateLoading(true);
    try {
      const { status } = await API.addParticipantsToExistingChannel({
        idtoken: _.get(idToken, "__raw", ""),
        data,
        orgId,
      });
      if (status === 200) {
        setChannelCreateLoading(false);
        dispatch(dialogActions.atnCloseDialog());
        dispatch(
          fetchAcsChannelParticipants({
            acsToken: acsToken,
            threadId: threadValue,
          })
        );
        queryClient.fetchQuery({
          queryKey: ["recieveMessages", _.get(dialogDetails, "threadId", "")],
          queryFn: () => {}
        });
        toast.success("Participant added successfully");
      }
    } catch (err) {
      setChannelCreateLoading(false);
      toast.error(_.get(err, "response.data", ""));
    }
  };


  const getName = (mem: any) => {
    const chatProfileFirstName: any = _.get(mem, "id.firstName", "");
    const chatProfileLastName: any = _.get(mem, "id.lastName", "");
    return chatProfileFirstName
      ?.charAt(0)
      ?.toUpperCase()
      ?.concat(chatProfileFirstName?.slice(1)?.toLowerCase())
      ?.concat(
        " ",
        chatProfileLastName
          ?.charAt(0)
          ?.toUpperCase()
          ?.concat(chatProfileLastName?.slice(1)?.toLowerCase())
      );
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
                onChange([]);
              }

              return (
                <Autocomplete
                  multiple
                  id="tags-standard"
                  options={filteredUsers}
                  getOptionLabel={(option) => getName(option)}
                  defaultValue={[]}
                  onChange={(e, value) => {
                    onChange(value);
                  }}
                  value={value || []}
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
                        {getName(option)}
                      </li>
                    );
                  }}
                  renderInput={(params) => (
                    <TextField className="chooseUser"
                      {...params}
                      variant="outlined"
                      size="small"
                      label="Add Participants"
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
      <DialogActions>
        <LoadingButton
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          size="small"
          color="primary"
          loading={channelCreateLoading}
          disabled={channelCreateLoading}
        >
          Add
        </LoadingButton>
      </DialogActions>
    </Grid>
  );
};

export default AcsAddUserToExistingChannel;
