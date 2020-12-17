import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import Countries from '../../../Countries/Countries';
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

const Results = ({ className, rates, handleClickListner, ...rest }) => {
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
                <TableCell style={{fontWeight:'bold'}}>
                  Country
                </TableCell>
                <TableCell style={{fontWeight:'bold'}}>
                  Rate
                </TableCell>
                <TableCell style={{fontWeight:'bold'}}>
                  Fee
                </TableCell>
                <TableCell style={{fontWeight:'bold'}}>
                  Tax
                </TableCell>
                <TableCell style={{fontWeight:'bold'}}>
                  Amount Receiveable
                </TableCell>
                <TableCell style={{fontWeight:'bold'}}>
                  Transfer Time
                </TableCell>
                <TableCell style={{fontWeight:'bold'}}>
                  Provider
                </TableCell>
                <TableCell style={{fontWeight:'bold'}}>
                  Website
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rates.map((e) => (
                <TableRow
                  hover
                  key={Math.random()+e._id}
                  style={{ cursor: 'pointer' }}
                  onClick={handleClickListner.bind(this, e)}
                >
                  <TableCell>
                    <Box
                      alignItems="center"
                      display="flex"
                    >
                      <Avatar
                        style={{border:'1px solid lightblue'}}
                        className={classes.avatar}
                        src={`https://flagcdn.com/w2560/${e.Country.split('(')[1].split(')')[0].toLowerCase()}.png`}
                      >
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {e.Country}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {e.Rate}
                  </TableCell>
                  <TableCell>
                    {e.Tax}
                  </TableCell>
                  <TableCell>
                    {e.Fee}
                  </TableCell>
                  <TableCell>
                    {e.AmountReceivable}
                  </TableCell>
                  <TableCell>
                    {e.TransferTime} hours
                  </TableCell>
                  <TableCell>
                    {e.Name}
                  </TableCell>
                  <TableCell>
                    {e.WebsiteURL!==undefined?<a href={e.WebsiteURL}>{e.WebsiteURL}</a>:'-'} 
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );

};

Results.propTypes = {
        className: PropTypes.string,
};

export default Results;
