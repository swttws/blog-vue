import request from '@/utils/request'

export default {

    //保存博客信息
    countAllNum(userId) {
        return request({
            url: `/staservice/countAllNum/${userId}`,
            method: 'get'
        })
    },

    //近七天点赞量统计
    countReadNum(userId){
        return request({
            url: `/staservice/countReadNum/${userId}`,
            method: 'get'
        })
    },

     //近七天点赞量统计
     countComment(userId){
        return request({
            url: `/staservice/countComment/${userId}`,
            method: 'get'
        })
    },

    //近七天发布数
    countSend(userId){
        return request({
            url: `/staservice/countSend/${userId}`,
            method: 'get'
        })
    }



}