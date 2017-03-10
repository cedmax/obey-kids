import databind from 'store/databind';

function normaliseStars(stars) {
  return Math.min(Math.max(stars, 0), 3);
}

function changeStar(kidName, action) {
  databind.getStars(kidName).then((stars) => {
    const newStars = normaliseStars((action === 'up')?  ++stars : --stars);
    databind.setStars(kidName, newStars);
  });
}

export function addStar(kidName) {
  return () => changeStar(kidName, 'up');
}

export function removeStar(kidName) {
  return () => changeStar(kidName, 'down');
}

export function addKid(kidName) {
  databind.setStars(kidName);
}

export function setDay(day) {
  databind.fetchData(day);
}