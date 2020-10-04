import AsyncStorage from '@react-native-community/async-storage';

export async function getModulePermissionData() {
  let userData = (await AsyncStorage.getItem('userData')) || 'none';
  let dataParse = JSON.parse(userData);
  return dataParse.moduleLists;
}

export async function checkModulePermission(moduleName) {
  let permissionModule = await getModulePermissionData();
  const filters = permissionModule.filter(
    (element) => element.strModuleShortName == moduleName,
  );
  if (filters.length > 0) {
    return true;
  }
  return false;

  let hasPermission = false;
  // permissionModule.forEach(element => {
  //     if (moduleName == element.strModuleShortName) {
  //         hasPermission = true;
  //         break;
  //     }
  // });
  // console.log('permissionModule', permissionModule)
  // for (let index = 0; index < permissionModule.length; index++) {
  //     const element = permissionModule[index];
  //     if (moduleName == element.strModuleShortName) {
  //         hasPermission = true;
  //         return hasPermission;
  //     }
  // }
  console.log('hasPermission of ' + moduleName + ' : ', hasPermission);
  return hasPermission;
}
