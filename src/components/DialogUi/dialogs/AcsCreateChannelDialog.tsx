/* eslint-disable react-hooks/exhaustive-deps */
import React, {  useState } from "react";
import {
  TextField,
  DialogActions,
  Stack,
  Typography,
  Grid,
  Autocomplete,
  Button,
  Box,
} from "@mui/material";
import _ from "lodash";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { LoadingButton } from "@mui/lab";
import { API } from "../../../api";
import { toast } from "react-toastify";
import { dialogActions } from "../../../redux/slices/dialog-slice/dialogSlice";
import { getUserDetails } from "../../../utils/orgName";
import { acsChannelActions } from "../../../redux/slices/acs-channels/acsChannels";
// import axios from "axios";

const schema = yup
  .object({
    topic: yup.string().required("Channel name is required"),
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

const AcsCreateChannelDialog: React.FC = () => {
  const dispatch = useAppDispatch();
  const [channelCreateLoading, setChannelCreateLoading] = useState(false);
  const acsToken = useAppSelector((state) => state.acsToken.data.token);
  const acsOrgUsers = useAppSelector((state) => state.acsCommunityUsers.data);
  const acsChannels = useAppSelector((state) => state.acsChannels);

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values: any) => {
    if (acsChannels?.groupThreads) {
      const filtered = acsChannels?.groupThreads?.findIndex((each, idx) => {
        return each?.topic === values?.topic;
      })
      if (filtered === -1) {
        let url = "";
        const { orgId, location } = getUserDetails();
        setChannelCreateLoading(true);
        const modifiedValues = {
          ...values,
          participants: _.map(values?.participants, (each) => ({
            ...each,
            id: { communicationUserId: _.get(each, "id.communicationUserId", "") },
          })),
          azureToken: acsToken,
        };
        let imageResponse = 200;
        try {
          const response = await API.createACSThread(
            acsToken,
            modifiedValues,
            orgId
          );
          const status = response.status;

          if (values.image) {
            url = URL.createObjectURL(values.image[0]);
            const formData = new FormData();
            formData.append("threadId", response.data.threadId);
            formData.append("image", values.image[0]);
            const response01 = await API.updateGroupPic({
              orgId,
              location,
              formData,
            });
            imageResponse = response01?.status;
          }

          const response1 = await API.getACSChatThreads({
            acsToken,
            orgId
          });

          if (status === 200 && imageResponse === 200 && response1) {
            dispatch(acsChannelActions.updateAcsGroupChannesls(response1?.groupThreads));
            dispatch(acsChannelActions.updateAcsDirectChannesls(response1?.personalThreadsArr));
            dispatch(
              acsChannelActions.createGroupThread({
                id: response.data.threadId,
                topic: values.topic,
                lastMessageReceivedOn: new Date().toISOString(),
                image: url,
              })
            );

            setValue("image", "");
            setChannelCreateLoading(false);
            toast.success("Channel created successfully");
            dispatch(dialogActions.atnCloseDialog());
          }
          else {
          }

        } catch (err) {
          setChannelCreateLoading(false);
          toast.error("Something went wrong");
          dispatch(dialogActions.atnCloseDialog());
        }
      }
      else {
        setChannelCreateLoading(false);
        toast.error("Channel Name Already Exists");
      }
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
      <Stack width="90%">
        <Typography variant="subtitle2" my={1}>
          Channels are where your team communicates. They’re best when organized
          around a topic — #marketing, for example.
        </Typography>
      </Stack>

      <Grid container spacing={2} mt={2} px={1}>
        <Grid item xs={12}>
          <Controller
            name={"topic"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                fullWidth
                size="small"
                onChange={onChange}
                value={value || ""}
                label={"Channel Name"}
              />
            )}
          />
          <ValidationError errors={errors} fieldName="topic" />
        </Grid>
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
                    options={acsOrgUsers}
                    getOptionLabel={(option) => {return getName(option)}}
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
        <Grid item xs={12}>
          <Controller
            name="image"
            control={control}
            render={({ field: { onChange, value } }) => (
              <>
                <input
                  type="file"
                  onChange={(e) => onChange(e.target.files)}
                  accept="image/*,.jpeg,.jpg,.png,.gif"
                  id="image-upload"
                  style={{ display: "none" }}
                />
                <label htmlFor="image-upload">
                  <Button variant="contained" component="span">
                    Upload Image
                  </Button>
                </label>

                <Box
                  width="70px"
                  height="70px"
                  display={"flex"}
                  position="relative"
                  marginTop={"3%"}
                >
                  <Box
                    display="flex"
                    width="70px"
                    height="70px"
                    borderRadius={"50%"}
                  >
                    {value && value[0] && (
                      <img
                        src={URL.createObjectURL(value[0])}
                        alt="profie img "
                      />
                    )}
                  </Box>
                </Box>
              </>
            )}
          />
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
          Create
        </LoadingButton>
      </DialogActions>
    </Grid>
  );
};

export default AcsCreateChannelDialog;
