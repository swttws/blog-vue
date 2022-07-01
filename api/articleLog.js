import request from '@/utils/request'

export default{

    //用户浏览历史保存
    saveLog(userId,articleId){
        return request({
            url:`/blogservice/articlelog/saveLog/${userId}/${articleId}`,
            method:'get'
        })
    },

    //getArticleLogByUserId
    getArticleLogByUserId(pageBean,userId){
        return request({
            url:`/blogservice/articlelog/getArticleLogByUserId/${userId}`,
            method:'post',
            data:pageBean
        })
    },




}