/* eslint-disable @typescript-eslint/prefer-optional-chain */
import React, { useState } from 'react';
import { Grid, InputLabel, FormControl, Autocomplete, TextField, Box } from '@mui/material';
// import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Controller } from 'react-hook-form';

interface CountryType {
  name: string;
  dial_code: string;
  code: string;
}

interface Props {
  countryCodeArray: CountryType[];
  data?: any;
  control: any;
  errors: any;
  onChange: (value: CountryType | null) => void;
  name: string;
  showMark: boolean;
}

const PhoneInput: React.FC<Props> = ({ countryCodeArray, data, control, errors, onChange, name, showMark }) => {
  // const selectedCountryObject = countryCodeArray.find(
  //   (country) => country.dial_code === data.phonePrefix
  // );

  const selectedCountryObject =
    data && data.phonePrefix ? countryCodeArray.find((country) => country.dial_code === data.phonePrefix) : null;

  const [selectedCountry, setSelectedCountry] = useState<CountryType | null>(selectedCountryObject || null);

  const handleCountryChange = (event: React.ChangeEvent<{}>, value: CountryType | null) => {
    setSelectedCountry(value);
    onChange(value); // Call the onChange function from the Controller component
  };

  const getOptionLabel = (option: CountryType | null) => {
    if (option) {
      return `${option.dial_code}`;
    }
    return '';
  };

  return (
    <Grid item md={6}>
      <InputLabel
        id="demo-simple-select-label"
        style={{
          marginBottom: '10px',
          fontFamily: 'Open Sans',
          fontSize: '14px',
          fontWeight: '400',
          color: '#68717A',
          marginTop: '-6px'
        }}
      >
        Phone Number {showMark && '*'}{' '}
        {/* <span>
          {" "}
          <HelpOutlineIcon
            sx={{
              width: "15px !important",
              height: "15px !important",
              color: "#ABB5BE",
              marginLeft: "4px",
            }}
          />
        </span> */}
      </InputLabel>
      <Grid container spacing={1}>
        <Grid item md={6} className="editPhonePrefix">
          <FormControl fullWidth>
            <Autocomplete
              id="country-select-demo"
              // sx={{ width: 300 }}
              options={countryCodeArray}
              autoHighlight
              getOptionLabel={getOptionLabel}
              renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                  <img
                    className="phone-img"
                    loading="lazy"
                    width="20"
                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                    alt=""
                  />
                  {option.dial_code}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  // style={{ width: "100px" }}
                  {...params}
                  placeholder="+91"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'none'
                  }}
                  // helperText={
                  //   !selectedCountry && "Phone Prefix is required"
                  // }
                  // FormHelperTextProps={{
                  //   style: { color: 'red' }
                  // }}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: selectedCountry && (
                      <img
                        className="phone-img"
                        loading="lazy"
                        width="20"
                        src={`https://flagcdn.com/w20/${selectedCountry.code.toLowerCase()}.png`}
                        srcSet={`https://flagcdn.com/w40/${selectedCountry.code.toLowerCase()}.png 2x`}
                        alt=""
                      />
                    )
                  }}
                />
              )}
              onChange={handleCountryChange}
              value={selectedCountry}
            />
          </FormControl>
        </Grid>

        <Grid item md={6} className="PhonePrefix">
          <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                required
                name={name}
                value={value || ''}
                type="text"
                placeholder="1234567890"
                variant="outlined"
                style={{ width: '100%' }}
                onChange={onChange}
                error={Boolean(errors[name])}
                helperText={errors[name] ? String(errors[name].message) : ''}
                inputProps={{
                  maxLength: 15
                }}
                FormHelperTextProps={{
                  style: { color: 'red' }
                }}
              />
            )}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PhoneInput;
