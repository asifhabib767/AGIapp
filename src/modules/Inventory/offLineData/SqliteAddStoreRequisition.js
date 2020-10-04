import {getUnit} from '../../Sales/service/auth/AuthService';
import {getUserId} from '../../User/util/AuthData';
import {currentdate} from '../../HR/Utils/DateConfigure';
import {Alert} from 'react-native';
var SQLite = require('react-native-sqlite-storage');
SQLite.DEBUG(true);

export async function addSqliteStoreRequisition(data) {
  let unitId = await getUnit();
  let actionId = await getUserId();
  let currentData = currentdate();

  let multipleData = data.multipleWarehouse;

  let db = SQLite.openDatabase({
    name: 'Iapps.db',
    createFromLocation: '~WWW/Iapps.db',
  });

  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        // tx.executeSql('DROP TABLE IF EXISTS tblRequisition', []);
        // tx.executeSql('DROP TABLE IF EXISTS tblRequisitionDetail', []);
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS tblRequisitionDetail(intReqID VARCHAR(255), intItemID VARCHAR(255),dteDueDate VARCHAR(255),strRemarks VARCHAR(255),numReqQty VARCHAR(255),intApproveBy VARCHAR(255),dteApproveDate VARCHAR(255),numApproveQty VARCHAR(255),numIssueQty VARCHAR(255),ysnEdited VARCHAR(255),numActualProduction VARCHAR(255),numIndentQty VARCHAR(255),numSupervisorApproveQty VARCHAR(255),dteSupervisorApproveDate VARCHAR(255),ysnSupervisorApprove VARCHAR(255),intDeptHeadApproveBy VARCHAR(255),numDeptHeadApproveQty VARCHAR(255),dteDeptHeadApproveDate VARCHAR(255),ysnDeptHeadApprove VARCHAR(255),intTechnicalApproveBy VARCHAR(255),numTechnicalApproveQty VARCHAR(255),dteTechnicalApproveDate VARCHAR(255),ysnTechnicalApprove VARCHAR(255),intAdminApproveBy VARCHAR(255),numAdminApproveQty VARCHAR(255),dteAdminApproveDate VARCHAR(255),ysnAdminApprove VARCHAR(255))',
          [],
        );
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS tblRequisition(intReqID VARCHAR(255),intDeptID VARCHAR(255), intSectionID VARCHAR(255), intReqBy VARCHAR(255),dteReqDate VARCHAR(255),intUnitID VARCHAR(255),ysnActive Varchar(255),intWHID VARCHAR(255),strCode VARCHAR(255),strSection VARCHAR(255),intMaintenanceID VARCHAR(255),intProdOrderID VARCHAR(255),intCCenterID VARCHAR(255),intIndentId VARCHAR(255),intInsertBy VARCHAR(255),dteInsertDateTime VARCHAR(255))',
          [],
          (tx, results) => {
            tx.executeSql(
              'INSERT INTO tblRequisition (dteInsertDateTime,intDeptID, intUnitID,intWHID,dteReqDate,intSectionID,intReqBy,ysnActive,strCode,strSection,intMaintenanceID,intProdOrderID,intCCenterID,intIndentId,intInsertBy) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
              [
                currentData,
                data.deptId,
                unitId,
                data.warehouseId,
                null,
                null,
                null,
                unitId,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                actionId,
              ],
              (tx, results) => {
                // console.log('success tbllist', results.insertId);
                if (results.insertId > 0) {
                  multipleData.forEach((element, index) => {
                    tx.executeSql(
                      'INSERT INTO tblRequisitionDetail(intReqID, intItemID,dteDueDate,strRemarks,numReqQty,intApproveBy,dteApproveDate,numApproveQty,numIssueQty,ysnEdited,numActualProduction,numIndentQty,numSupervisorApproveQty,dteSupervisorApproveDate,ysnSupervisorApprove,intDeptHeadApproveBy,numDeptHeadApproveQty,dteDeptHeadApproveDate,ysnDeptHeadApprove,intTechnicalApproveBy,numTechnicalApproveQty,dteTechnicalApproveDate,ysnTechnicalApprove,intAdminApproveBy,numAdminApproveQty,dteAdminApproveDate,ysnAdminApprove) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
                      [
                        results.insertId,
                        element.itemId,
                        element.dueDate,
                        element.purpose,
                        null,
                        null,
                        null,
                        null,
                        element.quantity,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                      ],
                      (tx, results) => {
                        // console.log('success tbllist', results);
                      },
                      (tx, error) => {
                        console.log('error', error);
                      },
                    );
                  });
                }
              },
              (tx, error) => {},
            );

            // resolve(results);
          },
          (tx, error) => {
            console.log('error', error);
            // reject(error);
            //   console.log('Could not execute query', error, tx);
          },
          (tx, error) => {
            console.log('success tx error', error);
          },
        );
      },
      (error) => {
        console.log('success tx error', error);
      },
      (ex) => {
        console.log('success tx error', ex);
      },
    );
  });
}
export async function offlineRequistionObjectStore(storeRequisition) {
  let db = SQLite.openDatabase({
    name: 'Iapps.db',
    createFromLocation: '~WWW/Iapps.db',
  });

  let responseList = {
    isLoading: true,
    data: {
      message: '',
    },
    status: false,
  };

  let jsonObjCreate = JSON.stringify(storeRequisition);

  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS tblReqObj(id INTEGER PRIMARY KEY, process_name VARCHAR(255),url VARCHAR(255), state VARCHAR(255), dataset1 VARCHAR(255), dataset2 VARCHAR(255),isSyncd VARCHAR(255))',
          [],
          (tx, results) => {
            tx.executeSql(
              'INSERT INTO tblReqObj (process_name ,url, state ,dataset1 , dataset2 ,isSyncd) VALUES (?,?,?,?,?,?)',
              [
                'store_requisition',
                'http:url',
                jsonObjCreate,
                null,
                null,
                false,
              ],
              (tx, results) => {
                console.log('add store data', results.insertId);
                responseList.status = true;
                responseList.data.message = 'Store requisition created';
                resolve(responseList);
              },
              (tx, error) => {},
            );

            // resolve(responseList);
          },
          (tx, error) => {
            console.log('error', error);
            reject(error);
            //   console.log('Could not execute query', error, tx);
          },
          (tx, error) => {
            console.log('success tx error', error);
          },
        );
      },
      (error) => {
        console.log('success tx error', error);
      },
      (ex) => {
        console.log('success tx error', ex);
      },
    );
  });
}
