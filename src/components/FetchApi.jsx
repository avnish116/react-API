import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ApiFetcher = ({ apiUrl }) => {
  const [data, setData] = useState(null);       //using setData to update the created state of the data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMake, setSelectedMake] = useState(null);
  const [makeNames, setMakeNames] = useState([]);

  useEffect(() => {
    const fetchData = async () => { //defining the async function
      try {
        const response = await fetch(apiUrl);
        const result = await response.json();
        setData(result.Results);
        console.log("API Data:", result.Results);
        const eachMakeNames = [...new Set(result.Results.map((item) => item.MakeName))]; //creating a new array that only contains one of the make names from the data (using the new)
        console.log("Each Make Names:", eachMakeNames);
        setMakeNames(eachMakeNames);
        console.log("Make Names:", makeNames);
      } catch (error) {
        console.error("API Error:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]); //useeffect will end here and will only run again if the apiUrl changes 

  const handleFilter = (makeName) => { //for selecting the make name
    setSelectedMake(makeName === 'All Makes' ? null : makeName);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  const headers = Object.keys(data[0] || {}); //creating an array of the keys from the first object in the data array
  console.log("Table Headers:", headers);

  if (!headers || headers.length === 0) {
    return <p>No headers found in the data</p>;
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "rgb(0, 0, 225)",
      color: theme.palette.common.white,
      fontWeight: "bold",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      fontFamily: "Arial, sans-serif",
    },
  }));

  const filteredData = selectedMake //filtering the data based on the selected make name
    ? data.filter((item) => item.MakeName === selectedMake)
    : data;

  return (
    <div>
        <FormControl sx={{width:'fit-content', paddingBottom:'10px'}}>
          <InputLabel id="make-select-label">Make Name</InputLabel>
          <Select
            labelId="make-select-label"
            id="make-select"
            value={selectedMake || ""}
            label="Make Name"
            onChange={(e) => handleFilter(e.target.value)}
            sx={{width:'100%'}}
          >
            <MenuItem value="">All Makes</MenuItem> //value of the menu item is an empty string
            {makeNames.map((makeName) => (
              <MenuItem key={makeName} value={makeName}>
                {makeName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      <TableContainer component={Paper} >
        <Table>
          <TableHead>
            <TableRow>
            <StyledTableCell>Make ID</StyledTableCell>
            <StyledTableCell>Make Name</StyledTableCell>
            <StyledTableCell>Vehicle ID</StyledTableCell>
            <StyledTableCell>Vehicle Type</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row, index) => ( //mapping through the filtered data
              <TableRow key={index}>
                {headers.map((header) => (      //mapping through the headers array
                  <TableCell key={header}>{row[header]}</TableCell> //using the header as the key
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ApiFetcher;
