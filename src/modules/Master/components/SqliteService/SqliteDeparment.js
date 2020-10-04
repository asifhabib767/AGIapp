import React, {useEffect} from 'react';
var SQLite = require('react-native-sqlite-storage');
import * as Types from '../../../../modules/HR/actions/types/Types';
SQLite.DEBUG(true);

export function SqliteDeparment(data) {
  let departmentData = data.data;
  console.log('server data', departmentData);
  let {
    ID,
    Name,
    Code,
    UserId,
    BusinessId,
    Status,
    CreatedAt,
    UpdatedAt,
  } = data.data;

  let db = SQLite.openDatabase({
    name: 'sqliteexample.db',
    createFromLocation: '~sqliteexample.db',
  });
  db.transaction(
    (tx) => {
      tx.executeSql(
        `DELETE FROM departments`,
        [],
        (tx, results) => {
          departmentData.forEach((element, index) => {
            console.log('results is', results.rows.item(index));
            tx.executeSql(
              // `UPDATE departments set Id=?,Name=?,Code=?,UserId=?,Status=?,CreatedAt=?,UpdatedAt=? where Id=? ',
              // [ID, Name, Code, UserId,Status,CreatedAt,UpdatedAt,ID]`,
              'INSERT INTO departments (Id, Name, Code,UserId,Status,CreatedAt,UpdatedAt) VALUES (?,?,?,?,?,?,?)',
              [
                element.Id,
                element.Name,
                element.Code,
                element.UserId,
                element.Status,
                element.CreatedAt,
                element.UpdatedAt,
              ],
              (tx, results) => {},
              (tx, error) => {},
            );
          });
        },
        (tx, error) => {},
      );
    },
    (error) => {},
    (ex) => {},
  );
}
export function offLineAddDepartment(data) {
  let departmentData = data;

  let db = SQLite.openDatabase({
    name: 'sqliteexample.db',
    createFromLocation: '~sqliteexample.db',
  });
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          // `UPDATE departments set Id=?,Name=?,Code=?,UserId=?,Status=?,CreatedAt=?,UpdatedAt=? where Id=? ',
          // [ID, Name, Code, UserId,Status,CreatedAt,UpdatedAt,ID]`,
          'INSERT INTO departments (Id, Name, Code,UserId,Status,CreatedAt,UpdatedAt) VALUES (?,?,?,?,?,?,?)',
          [
            1000,
            departmentData.Name,
            departmentData.Code,
            departmentData.UserId,
            departmentData.Status,
            '2020-07-08 04:37:40',
            '2020-07-08 04:37:40',
          ],
          (tx, results) => {
            resolve(results);
          },
          (tx, error) => {
            reject(error);
            //   console.log('Could not execute query', error, tx);
          },
        );
      },
      (error) => {},
      (ex) => {},
    );
  });
}

export function offLineGetDepartment() {
  let db = SQLite.openDatabase({
    name: 'sqliteexample.db',
    createFromLocation: '~sqliteexample.db',
  });
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `SELECT * FROM departments`,
          [],
          (tx, results) => {
            results.rows;
            let daparmentData = results.rows.length;
            let data = {
              message: ' Department List',
              status: true,
              data: [],
            };
            let dataList = [];
            for (let i = 0; i < daparmentData; i++) {
              const element = results.rows.item(i);

              data.data.push(element);
            }
            resolve(data);

            // dispatch({type: Types.GET_DEPARTMENT, payload: responseList});
          },

          (tx, error) => {
            reject(error);
          },
        );
      },
      (error) => {},
      (ex) => {},
    );
  });

  return data;
}
