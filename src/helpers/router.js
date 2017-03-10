import { browserHistory } from 'react-router';

export default {
  navigateToKids: (date) => browserHistory.push(`/kids/${date || ''}`),
  navigateToAddKids: () => browserHistory.push('/add-kids')
};