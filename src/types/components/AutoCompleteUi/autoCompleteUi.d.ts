interface IAutoCompleteUi {
  options: any[];
  multiple: boolean;
  defaultValue?: any;
  placeholder: string;
  label: string;
  optionLabel?: string;
  filterSelectedOptions: boolean;
  onChange: (value: any) => void;
  value: any;
}
