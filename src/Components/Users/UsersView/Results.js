import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles,
  Button,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, users, handleSelectAll, handleSelectOne, newSelectedUserIds, openEdit, ...rest }) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card className={clsx(classes.root, className)}{...rest} style={{ marginBottom: '20px' }}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={newSelectedUserIds.length === users.length}
                    color="primary"
                    indeterminate={
                      newSelectedUserIds.length > 0
                      && newSelectedUserIds.length < users.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell style={{fontWeight:'bold'}}>
                  Name
                </TableCell>
                <TableCell style={{fontWeight:'bold'}}>
                  Email
                </TableCell>
                <TableCell style={{fontWeight:'bold'}}>
                  Gender
                </TableCell>
                <TableCell style={{fontWeight:'bold'}}>
                  Role
                </TableCell>
                <TableCell style={{fontWeight:'bold'}}>
                  Location
                </TableCell>
                <TableCell style={{fontWeight:'bold'}}>
                  Registration date
                </TableCell>
                <TableCell style={{fontWeight:'bold'}}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  hover
                  key={user._id}
                  selected={newSelectedUserIds.indexOf(user._id) !== -1}
                  style={{ cursor: 'pointer' }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={newSelectedUserIds.indexOf(user._id) !== -1}
                      onChange={handleSelectOne.bind(this, user._id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      alignItems="center"
                      display="flex"
                    >
                      <Avatar
                        className={classes.avatar}
                        src={user.Dp ? `data:image/png;base64,${Buffer.from(user.Dp).toString('base64')}` : null}
                      >
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {user.FirstName} {user.LastName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {user.Email}
                  </TableCell>
                  <TableCell>
                    {user.Gender}
                  </TableCell>
                  <TableCell>
                    {user.Role}
                  </TableCell>
                  <TableCell>
                    {`${user.City}, ${user.Country}`}
                  </TableCell>
                  <TableCell>
                    {moment(user.createdAt).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>
                    <Button color="primary" variant="contained" onClick={openEdit.bind(this,user)}>Edit </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
        <TablePagination
          component="div"
          count={users.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
    </Card>
  );

};

Results.propTypes = {
        className: PropTypes.string,
  users: PropTypes.array.isRequired
};

export default Results;
