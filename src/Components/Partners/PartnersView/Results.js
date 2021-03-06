import React, { useState } from 'react';
import {
  Box,
  Grid,
  makeStyles
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import ProductCard from './PartnerCard';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  productCard: {
    height: '100%'
  }
}));

const PartnersList = (props) => {

  const classes = useStyles();
  return (
    <>
      <Box mt={3}>
        <Grid
          container
          spacing={3}
        >
          {props.partners.map((partner) => (
            <Grid
              item
              key={partner._id}
              lg={4}
              md={6}
              xs={12}
            >
              <ProductCard
                className={classes.productCard}
                partner={partner}
                deletePartners={props.delete}
                openEdit={props.openEdit}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box
        mt={3}
        display="flex"
        justifyContent="center"
      >
        <Pagination
          color="primary"
          count={3}
          size="small"
        />
      </Box>
    </>
  );
};

export default PartnersList;
