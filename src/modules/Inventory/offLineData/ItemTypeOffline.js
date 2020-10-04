var SQLite = require('react-native-sqlite-storage');
// SQLite.DEBUG(true);

export function offlineItemTypeStore(data) {
  let itemType = data;

  let db = SQLite.openDatabase({
    name: 'Iapps.db',
    createFromLocation: '~WWW/Iapps.db',
  });
  db.transaction(
    (tx) => {
      tx.executeSql(
        `DROP TABLE IF EXISTS tblItemList`,
        [],
        (tx, results) => {
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS tblItemList(id INTERGER PRIMARY KEY, intItemTypeID VARCHAR(255), strItemTypeName VARCHAR(255))',
            [],
          );
          itemType.forEach((element, index) => {
            // console.log('results is', results.rows.item(index));

            tx.executeSql(
              // `UPDATE departments set Id=?,Name=?,Code=?,UserId=?,Status=?,CreatedAt=?,UpdatedAt=? where Id=? ',
              // [ID, Name, Code, UserId,Status,CreatedAt,UpdatedAt,ID]`,
              'INSERT INTO tblItemList (intItemTypeID, strItemTypeName)  VALUES (?,?)',
              [element.intItemTypeID, element.strItemTypeName],
              (tx, results) => {
                // console.log('item type list', results);
              },
              (tx, error) => {
                // console.log('error type list', error);
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
      // console.log('error', error);
    },
    (ex) => {
      console.log('ex exception', ex);
    },
  );
}

export function itemTypegetbyOffline() {
  let db = SQLite.openDatabase({
    name: 'Iapps.db',
    createFromLocation: '~WWW/Iapps.db',
  });

  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `SELECT * FROM tblItemList`,
          [],
          (tx, results) => {
            let itemType = results.rows.length;
            // console.log('itemType', itemType);

            let data = [];
            for (let i = 0; i < itemType; i++) {
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
