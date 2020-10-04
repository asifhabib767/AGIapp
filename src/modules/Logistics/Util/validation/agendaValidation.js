import {Alert} from 'react-native';
export function AgndaValidation(agendaTitle, title) {
  // let errorMsg = '';

  let errorMsg = {};

  if (agendaTitle === '') {
    errorMsg.agendaTitle = 'Please Type an Agenda Name';
  }
  if (title === '') {
    errorMsg.title = 'Please Type a discussion title';
  }

  let agendaerror = {
    errorMsg: errorMsg,
  };
  //console.log(errorMsg);
  return agendaerror;
}
