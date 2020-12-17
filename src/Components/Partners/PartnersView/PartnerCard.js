import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import { AccessTime, Delete, Edit } from '@material-ui/icons';
import Logo from './avatar.jpg';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  }
}));

const PartnerCard = ({ className, partner, deletePartners, openEdit, ...rest }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="center"
          mb={3}
        >
          <img
            style={{ height: '150px', borderRadius:'50%' }}
            src={partner.Logo !== undefined ? `data:image/png;base64,${Buffer.from(partner.Logo).toString('base64')}` : Logo}
          />
        </Box>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
          style={{fontWeight:'bold'}}
        >
          {partner.Name.toUpperCase()}
        </Typography>
        <Typography
          align="center"
          color="textPrimary"
          variant="body1"
        >
          {partner.AboutExchange}
        </Typography>
      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      <Box p={2}>
        <Grid
          container
          justify="space-between"
          spacing={2}
        >
          <Grid
            className={classes.statsItem}
            item
          >
            <AccessTime
              className={classes.statsIcon}
              color="action"
            />
            <Typography
              color="textSecondary"
              display="inline"
              variant="body2"
            >
              Created {moment(partner.createdAt).fromNow()}
            </Typography>
          </Grid>
          <Grid
            className={classes.statsItem}
            item
          >
            <IconButton style={{paddingRight:'0px'}} onClick={openEdit.bind(this,partner)}>
              <Edit
                className={classes.statsIcon}
                color="action"
              />
            </IconButton>
            <IconButton style={{paddingRight:'0px'}} onClick={deletePartners.bind(this,partner._id)}>
              <Delete
                className={classes.statsIcon}
                color="action"
              />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

PartnerCard.propTypes = {
  className: PropTypes.string,
  partner: PropTypes.object.isRequired
};

export default PartnerCard;
