var SQLite = require('react-native-sqlite-storage');
// SQLite.DEBUG(true);

export function offlineItemStore(data) {
  let item = data;

  let db = SQLite.openDatabase({
    name: 'Iapps.db',
    createFromLocation: '~WWW/Iapps.db',
  });
  db.transaction(
    (tx) => {
      tx.executeSql(
        `DROP TABLE IF EXISTS tblItem`,
        [],
        (tx, results) => {
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS tblItem(id INTERGER PRIMARY KEY, intItemID VARCHAR(255), monStock VARCHAR(255),strDescription VARCHAR(255),strItemFullName VARCHAR(255),strUoM VARCHAR(255))',
            [],
          );

          item.forEach((element, index) => {
            // console.log('element', element);
            if (index < 100) {
              tx.executeSql(
                // `UPDATE departments set Id=?,Name=?,Code=?,UserId=?,Status=?,CreatedAt=?,UpdatedAt=? where Id=? ',
                // [ID, Name, Code, UserId,Status,CreatedAt,UpdatedAt,ID]`,
                'INSERT INTO tblItem (intItemID,monStock,strDescription,strItemFullName, strUoM)  VALUES (?,?,?,?,?)',
                [
                  element.intItemID,
                  element.monStock,
                  element.monValue,
                  element.strItemName,
                  element.strUoM,
                ],
                (tx, results) => {
                  //   console.log('item  list', results);
                },
                (tx, error) => {
                  //   console.log('error  list', error);
                },
              );
            }
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

export function itemSearchgetbyOffline(searchText) {
  let db = SQLite.openDatabase({
    name: 'Iapps.db',
    createFromLocation: '~WWW/Iapps.db',
  });

  console.log('item', searchText);

  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `SELECT * FROM tblItem WHERE strItemFullName LIKE '%${searchText}%' `,
          [],
          (tx, results) => {
            let itemType = results.rows.length;
            // console.log('itemType seach', itemType);

            let data = [];
            for (let i = 0; i < itemType; i++) {
              const element = results.rows.item(i);
              data.push(element);
            }
            resolve(data);

            // dispatch({type: Types.GET_DEPARTMENT, payload: responseList});
          },

          (tx, error) => {
            // console.log('error', error);
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
