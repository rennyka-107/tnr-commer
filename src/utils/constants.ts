import { TypeRoleList } from "types";

const baseURL = process.env.REACT_APP_BASE_URL
  ? process.env.REACT_APP_BASE_URL
  : 'http://localhost:3000';

const version = process.env.REACT_APP_VERSION;

const RoleList: TypeRoleList = {
  SA :'SA',
  TTKD : 'TTKD',
  MKT : 'MKT',
  BKT : 'BKT',
  TTDVKH : 'TTDVKH',
}

const validateLine = {
  regexPassword: 'Mật khẩu phải chứa 1 chữ hoa, 1 chữ thường và 1 số',
  required: 'Không được để trống',
  trim: 'Không được chứa khoảng trắng đầu và cuối',
  email: 'Email không hợp lệ',
  confirmPassword: 'Mật khẩu nhập lại phải giống với mật khẩu đã nhập mới',
};

export { baseURL, version, validateLine, RoleList };
