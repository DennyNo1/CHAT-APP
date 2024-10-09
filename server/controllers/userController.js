const User = require("../model/userModel");
const brcypt = require("bcrypt");

// 处理注册逻辑
const register = async (req, res, next) => {
    try{
        console.log(req.body);
        //解构赋值
        const { username, email, password } = req.body;
        //去数据库mongodb查询,是否存在这一条u document包含相同的username或email
        const usernameCheck = await User.findOne({ username });
        if (usernameCheck) return res.json({msg:"Username already used", status:false});
        const emailCheck = await User.findOne({ email});
        if (emailCheck) return res.json({msg:"Email already used", status:false});
        //在后端对密码加密.10 是盐值（salt rounds）的数量，表示在生成密码哈希时要执行的加密运算次数。
        const hashedPassword=await brcypt.hash(password,10);
        const user=await User.create({
          email,
          username,
          password:hashedPassword,
        });
        //用于从对象 user 中删除 password 属性。
        delete user.password;
        return res.json({status:true,user})
    }
    catch(ex){
        next(ex)//将错误传递给下一个中间件，
    }
}
// 处理注册逻辑
const login = async (req, res, next) => {
    try{
        console.log(req.body);
        //解构赋值
        const { username, password } = req.body;
     
        const user = await User.findOne({ username });//返回是一个对象。没找到返回null
        //如果username不存在
        if (!user) return res.json({msg:"Incorrect username", status:false});
        //比较两者密码
        const isPasswordValid=await brcypt.compare(password,user.password)//这是一个异步函数
        if(!isPasswordValid) return res.json({msg:"Incorrect password", status:false});


        delete user.password;//前端是不允许获取密码的
        return res.json({status:true,user})
    }
    catch(ex){
        next(ex)//将错误传递给下一个中间件，
    }
}
module.exports = {
  register: register,
  login:login
};
