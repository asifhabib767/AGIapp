var SQLite = require('react-native-sqlite-storage');
// SQLite.DEBUG(true);

export function ListSqliteStoreRequisition(data) {
  let storeReList = data;

  let db = SQLite.openDatabase({
    name: 'Iapps.db',
    createFromLocation: '~WWW/Iapps.db',
  });
  db.transaction(
    (tx) => {
      tx.executeSql(
        `DROP TABLE IF EXISTS tblRequisitionList`,
        [],
        (tx, results) => {
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS tblRequisitionList(dteReqDate INTEGER , intDeptID VARCHAR(255), intReqID VARCHAR(255), intUnitId VARCHAR(255),strCode VARCHAR(255),strDepatrment VARCHAR(255),strRequestByName VARCHAR(255),ysnActive VARCHAR(255))',
            [],
          );
          storeReList.forEach((element, index) => {
            console.log('results is', results.rows.item(index));
            console.log('element is', element);
            tx.executeSql(
              // `UPDATE departments set Id=?,Name=?,Code=?,UserId=?,Status=?,CreatedAt=?,UpdatedAt=? where Id=? ',
              // [ID, Name, Code, UserId,Status,CreatedAt,UpdatedAt,ID]`,
              'INSERT INTO tblRequisitionList (dteReqDate, intDeptID, intReqID,intUnitId,strCode,strDepatrment,strRequestByName,ysnActive) VALUES (?,?,?,?,?,?,?,?)',
              [
                element.dteReqDate,
                element.intDeptID,
                element.intReqID,
                element.intUnitId,
                element.strCode,
                element.strDepatrment,
                element.strRequestByName,
                element.ysnActive,
              ],
              (tx, results) => {
                console.log('success tbllist', results);
              },
              (tx, error) => {
                console.log('error tbllist', error);
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
export function offLineGetWarehouse(data) {
  let warehouseList = data;

  console.log('warehouseListsss', warehouseList);

  let db = SQLite.openDatabase({
    name: 'Iapps.db',
    createFromLocation: '~WWW/Iapps.db',
  });
  db.transaction(
    (tx) => {
      tx.executeSql(
        `DROP TABLE IF EXISTS tblWearHouse`,
        [],
        (tx, results) => {
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS tblWearHouse(intWHID VARCHAR(255), strWareHoseName VARCHAR(255), intJobStationId VARCHAR(255), intUnitId VARCHAR(255),intWHType VARCHAR(255))',
            [],
          );
          warehouseList.forEach((element, index) => {
            console.log('results is', results.rows.item(index));
            console.log('element ware hosue', element);
            tx.executeSql(
              // `UPDATE departments set Id=?,Name=?,Code=?,UserId=?,Status=?,CreatedAt=?,UpdatedAt=? where Id=? ',
              // [ID, Name, Code, UserId,Status,CreatedAt,UpdatedAt,ID]`,
              'INSERT INTO tblWearHouse (intWHID, strWareHoseName , intJobStationId, intUnitId,intWHType)  VALUES (?,?,?,?,?)',
              [element.intWHID, element.strWareHoseName, null, 'NULL', 'NULL'],
              (tx, results) => {
                console.log('success tbllist', results);
              },
              (tx, error) => {
                console.log('error tbllist', error);
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

export function offlineGetStoreRequisition() {
  let db = SQLite.openDatabase({
    name: 'Iapps.db',
    createFromLocation: '~WWW/Iapps.db',
  });
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `SELECT * FROM tblRequisitionList`,
          [],
          (tx, results) => {
            results.rows;
            let storeRequisition = results.rows.length;
            // let data = {
            //   message: ' Department List',
            //   status: true,
            //   data: [],
            // };
            let data = [];
            for (let i = 0; i < storeRequisition; i++) {
              const element = results.rows.item(i);
              data.push(element);
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
export function offlineGetWarehouseList() {
  let db = SQLite.openDatabase({
    name: 'Iapps.db',
    createFromLocation: '~WWW/Iapps.db',
  });

  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `SELECT * FROM tblWearHouse`,
          [],
          (tx, results) => {
            let warehouse = results.rows.length;
            console.log('warehouse', warehouse);

            let data = [];
            for (let i = 0; i < warehouse; i++) {
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
