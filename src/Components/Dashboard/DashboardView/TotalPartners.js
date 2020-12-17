import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
import {Business} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.red[600],
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.red[900]
  },
  differenceValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1)
  }
}));

const TotalPartners = ({ className, totalPartners, ...rest }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              TOTAL PARTNERS
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
               {totalPartners<10&&totalPartners!==0?`0${totalPartners}`:totalPartners}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <Business/>
            </Avatar>
          </Grid>
        </Grid>
    </CardContent>
    </Card>
  );
};

TotalPartners.propTypes = {
  className: PropTypes.string
};

export default TotalPartners;
