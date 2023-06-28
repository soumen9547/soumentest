/* eslint-disable @typescript-eslint/prefer-optional-chain */
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import * as React from 'react';

const filter = createFilterOptions<FilmOptionType>();

export default function DroupDownCustomValue() {
  const [value, setValue] = React.useState<FilmOptionType | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newOption = {
      title: dialogValue.title,
      type: 'University Name'
    };
    setValue(newOption);
    setAllList([...AllList, newOption]);
    setDialogValue({
      title: ''
    });
  };

  const [dialogValue, setDialogValue] = React.useState({
    title: ''
  });

  const [allList, setAllList] = React.useState(AllList);

  return (
    <Autocomplete
      style={{
        width: '100%'
      }}
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          // timeout to avoid instant validation of the dialog's form.
          setTimeout(() => {
            setDialogValue({
              title: newValue
            });
          });
        } else if (newValue && newValue.inputValue) {
          // Create a new option
          const newOption = {
            inputValue: newValue.inputValue,
            title: newValue.inputValue,
            type: 'University Name'
          };
          // Add the new option to the options list
          setAllList([...allList, newOption]);
          setValue(newOption);
          setDialogValue({
            title: ''
          });
        } else {
          setValue(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        if (params.inputValue !== '') {
          filtered.push({
            inputValue: params.inputValue,
            title: `Add "${params.inputValue}"`
          });
        }

        return filtered;
      }}
      id="free-solo-dialog-demo"
      options={allList}
      getOptionLabel={(option) => {
        // e.g value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        if (option.inputValue) {
          return option.inputValue;
        }
        return option.title;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      renderOption={(props, option) => <li {...props}>{option.title}</li>}
      sx={{ width: 300 }}
      freeSolo
      renderInput={(params) => <TextField {...params} label="College / University *" size="small" />}
    />
  );
}

interface FilmOptionType {
  inputValue?: string;
  title: string;
  type?: string;
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const AllList: readonly FilmOptionType[] = [
  {
    title: '15th Duke of Norfolk',
    type: 'University Name'
  },
  {
    title: '4-year institution USG average',
    type: 'University Name'
  },
  {
    title: 'A. Baitursynov Kostanay State University',
    type: 'University Name'
  },
  {
    title: 'A. Gary Anderson Graduate School of Management',
    type: 'University Name'
  }
];
