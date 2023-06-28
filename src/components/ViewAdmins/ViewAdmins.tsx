/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable prettier/prettier */
import { Box, Modal } from "@mui/material";
import Typography from "@mui/material/Typography";
// import { TableComponent } from "../Table";

type Props = {
  showAdminsModal: boolean;
  handleShowAdminsModal: (flag: boolean) => void;
};

const ViewAdmins = ({ showAdminsModal, handleShowAdminsModal }: Props) => {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    borderRadius: "10px",
    border: "none",
    boxShadow: 24,
    p: 4,
  };
  const handleClose = () => {
    handleShowAdminsModal(false);
  };

  // const data = [
  //   {
  //     name: "vinay",
  //     email: "vinaybeesaveni@gmail.com",
  //   },
  //   {
  //     name: "varun",
  //     email: "varun@gmail.com",
  //   },
  // ];

  // const details = [
  //   {
  //     label: "Name",
  //     name: "name",
  //   },
  //   {
  //     label: "Email",
  //     name: "email",
  //   },
  // ];

  return (
    <>
      <Modal
        open={showAdminsModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <TableComponent data={data} columns={details} /> */}
          <Typography>In Progress...</Typography>
        </Box>
      </Modal>
    </>
  );
};

export default ViewAdmins;
