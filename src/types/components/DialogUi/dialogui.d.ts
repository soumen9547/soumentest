interface IDialogUi {
  open: boolean;
  handleToggle: (flag: boolean) => void;
  children?: React.ReactElement;
}
