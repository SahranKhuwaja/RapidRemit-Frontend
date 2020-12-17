import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const Toolbar = ({ className, add, showList, showEdit, invert, newSelectedUserIds, deleteUsers, ...rest }) => {

  const classes = useStyles();
  let displayBtns = (
    <>
      <Button className={classes.importButton}>
        Import
        </Button>
      <Button className={classes.exportButton}>
        Export
        </Button>
      <Button
        color="primary"
        variant="contained"
        onClick={deleteUsers}
        disabled={newSelectedUserIds === 0}
        style={{ marginRight: '15px' }}
      >
        Delete User
        </Button>
      <Button
        color="primary"
        variant="contained"
        onClick={add}
      >
        Add User
      </Button>
    </>
  )
  let display = (
    <>
      <TextField
        style={{ maxWidth: '500px' }}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SvgIcon
                fontSize="small"
                color="action"
              >
                <SearchIcon />
              </SvgIcon>
            </InputAdornment>
          )
        }}
        placeholder="Search user"
        variant="outlined"
      />
    </>
  )
  if (!showList) {
    displayBtns = (
      <Button
        color="primary"
        variant="contained"
        onClick={invert}
      >
        Cancel
      </Button>
    )
    if (!showEdit) {
      display = (<h2 style={{ textAlign: 'center', fontSize: '25px' }}>ADD USER</h2>)

    } else {
      display = (<h2 style={{ textAlign: 'center', fontSize: '25px' }}>EDIT USER</h2>)

    }
  }

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box
        display="flex"
        justifyContent="flex-end"
      >
        {displayBtns}
      </Box>
      <Box mt={3}>

        <Card>
          <CardContent>
            <Box>
              {display}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
