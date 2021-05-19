import React, { useEffect, useState }  from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import { getMovieReviews } from "../../api/movie-api";
import { excerpt } from "../../../src/utils";

const useStyles = makeStyles({
  table: {
    minWidth: 550,
  },
});

export default function MovieReviews({ movie }) {
  const classes = useStyles();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getMovieReviews(movie._id).then((r) => {
      // Did the user review this?
      // const userReview = localStorage.getItem(`Review${movie.id}`);
      // const userName = localStorage.getItem('UserName');
      if(r !== null) {
        console.log('user review is not null: ', r);
        for(let rev in r){
          console.log('in loop r: ', r);
          // const review = {
          //   author: r[rev].author,
          //   content: r[rev].content
          // };
          // reviews.push(review);
        }

        // console.log('getMovieReviews reviews: ', r);
        // //reviews.push(review);
        // console.log('reviews list: ', r);
        
        console.log('reviews: ', reviews);
      }

      setReviews(r);
      
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="reviews table">
        <TableHead>
          <TableRow>
            <TableCell >Author</TableCell>
            <TableCell align="center">Excerpt</TableCell>
            <TableCell align="right">More</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reviews.map((r) => (
            <TableRow key={r._id}>
              <TableCell component="th" scope="row">
                {r.author}
              </TableCell>
              <TableCell >{excerpt(r.content)}</TableCell>
              <TableCell >
                {/* <Link
                  to={{
                    pathname: `/reviews/${r.id}`,
                    state: {
                      review: r,
                      movie: movie,
                    },
                  }}
                >
                  Full Review
                </Link> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}