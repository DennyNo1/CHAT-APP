const register = (req, res, next) => {
    // 处理注册逻辑
    console.log(req.body)
};

module.exports = {
    register: register
};