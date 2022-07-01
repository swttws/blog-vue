import request from '@/utils/request'

export default{

    //用户注册
    register(user){
        return request({
            url:`/userservice/user/register`,
            method:'post',
            data:user
        })
    },

    //用户登录获取token
    login(loginVo){
        return request({
            url:`/userservice/user/login`,
            method:'post',
            data:loginVo
        })
    },

    //根据token获取用户信息
    getUserByToken(){
        return request({
            url:`/userservice/user/getUserByToken`,
            method:'get'
        })
    },

    //根据用户id获取用户信息
    getUserById(id){
        return request({
            url:`/userservice/user/getUserById/${id}`,
            method:'get'
        })
    }


}