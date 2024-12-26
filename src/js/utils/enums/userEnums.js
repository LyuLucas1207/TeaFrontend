const userLogin = (email, password) => {
    const userLoginModel = {
        flag: "user",
        event: "user",
        action: "login",
        fields: {
            email: email,
            password: password
        }
    }
    return userLoginModel;
};

const userInfoGetByEmail = (email) => {
    const userInfoGetByEmailModel = {
        flag: "user",
        event: "user",
        action: "getbyemailandphone",
        fields: {
            email: email
        }
    }
    return userInfoGetByEmailModel;

};

const userInfoGetByPhone = (phone) => {
    const userInfoGetByPhoneModel = {
        flag: "user",
        event: "user",
        action: "getbyemailandphone",
        fields: {
            phone_number: phone
        }
    }
    return userInfoGetByPhoneModel;
};

const userAll = () => {
    const userAllModel = {
        flag: "user",
        event: "user",
        action: "getall",
        fields: {
            user_id: 999
        }
    }
    return userAllModel;
};


const userEnums = {
    userLogin,
    userInfoGetByEmail,
    userInfoGetByPhone,
    userAll
};

export default userEnums;