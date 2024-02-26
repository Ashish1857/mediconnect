import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  Typography,
} from "@mui/material";

/**
 *
 */

const LabTests = (props) => {
  const [isFormOpen, setFormOpen] = useState(false);
  return (
    <div>
      <Typography variant="h4">Book a lab report</Typography>
      <Grid container justifyContent="flex-end">
        <Grid item marginX={5}>
          <Button color="primary" variant="contained">
            Book a lab report
          </Button>
        </Grid>
      </Grid>

      <Table>
        <TableHead>
          <TableCell>Serial number</TableCell>
          <TableCell>Test name</TableCell>
          <TableCell>Report ID</TableCell>
          <TableCell>Actions</TableCell>
        </TableHead>
        <TableBody>
          <TableCell>1</TableCell>
          <TableCell>test 1</TableCell>
          <TableCell>test id</TableCell>
          <TableCell>test id</TableCell>
        </TableBody>
      </Table>
    </div>
  );
};

LabTests.propTypes = {};

export default LabTests;
