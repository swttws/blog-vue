import request from '@/utils/request'

export default{

    //发布评论
    sendComment(commentVo,userId){
        return request({
            url:`/blogservice/comment/sendComment/${userId}`,
            method:'post',
            data:commentVo
        })
    },

    //根据用户id获取评论消息
    getCommentByUserId(userId,pageBean){
        return request({
            url:`/blogservice/comment/getCommentByUserId/${userId}`,
            method:'post',
            data:pageBean
        })
    },

    //未读消息清除
    deleteLogByUserId(userId,type){
        return request({
            url:`/blogservice/articlelog/deleteLogByUserId/${userId}/${type}`,
            method:'get'
        })
    }



}