import truncate from "lodash/truncate";

export function excerpt(string) {
  // const truncate = truncate;
  return truncate(string, {
    length: 400, // maximum 400 characters
    separator: /,?\.* +/, // separate by spaces, including preceding commas and periods
  });
}

export function convertToPercentage(num) {
  return num * 10 + '%';
}

export function convertUserRatingToPercentage(num) {
  return num * 2 * 10 + '%';
}

export function convertReleaseDateToString(dateString) {
  return dateString.substring(0, 10);
}

export function formatMovieRuntime(runtime) {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return hours + 'h' + minutes + 'm';
}

// App constants
export const OK = 1;
export const NOTOK = 0;