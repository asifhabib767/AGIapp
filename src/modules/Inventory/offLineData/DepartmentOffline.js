var SQLite = require('react-native-sqlite-storage');
// SQLite.DEBUG(true);

export function offlineDepartmentStore(data) {
  let department = data;

  let db = SQLite.openDatabase({
    name: 'Iapps.db',
    createFromLocation: '~WWW/Iapps.db',
  });
  db.transaction(
    (tx) => {
      tx.executeSql(
        `DROP TABLE IF EXISTS tblDepartment`,
        [],
        (tx, results) => {
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS tblDepartment(id INTERGER PRIMARY KEY, intDeptID VARCHAR(255), strDepartmentName VARCHAR(255))',
            [],
          );
          department.forEach((element, index) => {
            // console.log('results is department', results.rows.item(index));

            tx.executeSql(
              'INSERT INTO tblDepartment (intDeptID, strDepartmentName)  VALUES (?,?)',
              [element.intDeptID, element.strDepartmentName],
              (tx, results) => {
                // console.log('results is department', results);
              },
              (tx, error) => {
                // console.log('results is department error', error);
              },
            );
          });
        },
        (tx, error) => {
          console.log('success tx error', error);
        },
      );
    },
    (error) => {
      console.log('error', error);
    },
    (ex) => {
      console.log('ex exception', ex);
    },
  );
}

export function departmentgetbyOffline() {
  let db = SQLite.openDatabase({
    name: 'Iapps.db',
    createFromLocation: '~WWW/Iapps.db',
  });

  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `SELECT * FROM tblDepartment`,
          [],
          (tx, results) => {
            let department = results.rows.length;
            console.log('deparmtn', department);

            let data = [];
            for (let i = 0; i < department; i++) {
              const element = results.rows.item(i);
              data.push(element);
            }
            resolve(data);

            // dispatch({type: Types.GET_DEPARTMENT, payload: responseList});
          },

          (tx, error) => {
            console.log('error', error);
            reject(error);
          },
        );
      },
      (error) => {
        console.log('error', error);
      },
      (ex) => {
        console.log('ex', ex);
      },
    );
  });

  return data;
}
