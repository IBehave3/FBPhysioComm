import * as document from 'document';

export const getPercentageHeight = (percentage) => {
  let root = document.getElementById('root');
  return root.height * (percentage / 100); 
}

export const getPercentageWidth = (percentage) => {
  let root = document.getElementById('root');
  return root.width * (percentage / 100); 
}


