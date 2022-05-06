const isObject = function (o: any) {
  return o === Object(o) && !isArray(o) && typeof o !== 'function';
};

const isArray = function (a: any) {
  return Array.isArray(a);
};

const toCamel = (s: string) => {
  return s.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace('-', '').replace('_', '');
  });
};

// export function convertKeysToCamel(o: any) {
//   if (isObject(o)) {
//     const n = {};

//     Object.keys(o).forEach((k: string) => {
//       n[toCamel(k)] = convertKeysToCamel(o[k]);
//     });

//     return n;
//   } else if (isArray(o)) {
//     return o.map((i: any) => {
//       return convertKeysToCamel(i);
//     });
//   }

//   return o;
// }

export function convertCamelCaseKeysToSnakeCase(obj: any) {
  if (typeof obj != 'object') return obj;

  for (let oldName in obj) {
    // Camel to underscore
    let newName = oldName.replace(/([A-Z])/g, function ($1) {
      return '_' + $1.toLowerCase();
    });

    // Only process if names are different
    if (newName != oldName) {
      // Check for the old property name to avoid a ReferenceError in strict mode.
      if (obj.hasOwnProperty(oldName)) {
        obj[newName] = obj[oldName];
        delete obj[oldName];
      }
    }

    // Recursion
    if (typeof obj[newName] == 'object') {
      obj[newName] = convertCamelCaseKeysToSnakeCase(obj[newName]);
    }
  }
  return obj;
}
