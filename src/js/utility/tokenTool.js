import { jwtDecode } from 'jwt-decode';


function getToken() {
  return localStorage.getItem('token');
}

function setToken(token) {
    localStorage.setItem('token', token);
}

function removeToken() {
    localStorage.removeItem('token');
}

function decodeToken(token) {
    if (!token) {
        return null;
    }
    return jwtDecode(token);
    /*
    {
      "firstName": "John",
      "lastName": "Doe",
      "email": "2993798118@qq.com",
      "role": "superadmin",
      "iat": 1630000000,
      "exp": 1630003600
    }
    */
}

function getFirstName() {
    const token = getToken();
    if (!token) {
        return null;
    }
    return jwtDecode(token).firstName;
}

function getLastName() {
    const token = getToken();
    if (!token) {
        return null;
    }
    return jwtDecode(token).lastName;
}

function getEmail() {
    const token = getToken();
    if (!token) {
        return null;
    }
    return jwtDecode(token).email;
}

function getRole() {
    const token = getToken();
    if (!token) {
        return null;
    }
    return jwtDecode(token).role;
    //! 从 token 中解析出用户信息
    /* "role": "superadmin"
    ! superadmin: 超级管理员，拥有所有权限以下, 额外权限：设置admin权限 （无法提升其他用户为superadmin）
    ! admin: 管理员，拥有所有权限以下，额外权限：删除他人项目，设置其他以下用户权限（无法提升其他用户为admin）
    ! 
    * manager_admin: 管理员管理员，特殊职能, 获得用户反馈，直接处理用户问题
    ! manager_ad: 广告管理员，可以增删改查自己的项目，额外权限：增删改查自己管理部门的项目
    ! manager_ar: 艺术管理员，可以增删改查自己的项目，额外权限：增删改查自己管理部门的项目
    ! manager_bu: 建筑管理员，可以增删改查自己的项目，额外权限：增删改查自己管理部门的项目
    ! manager_cs: 计算机管理员，可以增删改查自己的项目，额外权限：增删改查自己管理部门的项目
    ! manager_en: 工程管理员，可以增删改查自己的项目，额外权限：增删改查自己管理部门的项目
    ! manager_hr: 人事管理员，可以增删改查自己的项目，额外权限：增删改查自己管理部门的项目
    ! manager_eg: 电子管理员，可以增删改查自己的项目，额外权限：增删改查自己管理部门的项目
    ! manager_fi: 金融管理员，可以增删改查自己的项目，额外权限：增删改查自己管理部门的项目
    ! user: 普通用户，可以增删改查自己的项目，查看所有项目
    ! 
    */
}

export { getToken, setToken, removeToken, decodeToken, getFirstName, getLastName, getEmail, getRole };

