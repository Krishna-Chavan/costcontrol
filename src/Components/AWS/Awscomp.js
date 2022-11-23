import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Awscomp() {
  return (
    <>
    <div className='col-md-2 inp-field'>
        <span>Account: </span>
        1787632176
    </div>
     <FormControl className='col-md-2 inp-field' sx={{ m: 1, minWidth: 200}} size="small">
      <InputLabel id="demo-select-small">Select Region</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        defaultValue={'us-east-1'}
        label="Select Region"
        // onChange={handleChange}
        style={{ borderRadius: "10px" }}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={'us-east-1'}>us-east-1</MenuItem>
        <MenuItem value={'us-east-2'}>us-east-2</MenuItem>
        <MenuItem value={'us-west-1'}>us-west-1</MenuItem>
        <MenuItem value={'us-west-2'}>us-west-2</MenuItem>
      </Select>
    </FormControl>
    <FormControl className='col-md-2 inp-field' sx={{ m: 1, minWidth: 200 }} size="small">
      <InputLabel id="demo-select-small">Select Resource Type</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        defaultValue={'ec2'}
        label="Select Resource Type"
        // onChange={handleChange}
        style={{ borderRadius: "10px" }}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={'ec2'}>ec2</MenuItem>
        <MenuItem value={'rds'}>rds</MenuItem>
      </Select>
    </FormControl>
    <div className="inp-field" style={{ position: 'relative', left: '30%'}}>
        <button
          style={{
            width: "120px",
            padding: "7px",
            borderRadius: "18px",
            backgroundColor: "green",
            color: "white",
          }}
        >
          <i class="fa-solid fa-magnifying-glass"></i>
          Search
        </button>
      </div>
    </>
  )
}

export default Awscomp;