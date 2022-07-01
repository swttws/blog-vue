import request from '@/utils/request'

export default{

    //收藏或取消收藏
    collect(articleId,userId){
        return request({
            url:`/blogservice/praisecollect/collect/${articleId}/${userId}`,
            method:'get'
        })
    },

    //点赞或取消点赞
    praise(articleId,userId){
        return request({
            url:`/blogservice/praisecollect/praise/${articleId}/${userId}`,
            method:'get'
        })
    },

    //根据用户id分页查询点赞消息
    getPraiseByUserId(pageBean, userId){
        return request({
            url:`/blogservice/praisecollect/getPraiseByUserId/${userId}`,
            method:'post',
            data:pageBean
        })
    },

    //根据用户id分页查询收藏消息
    getCollectByUserId(pageBean, userId){
        return request({
            url:`/blogservice/praisecollect/getCollectByUserId/${userId}`,
            method:'post',
            data:pageBean
        })
    },

    //根据用户id分页查询收藏文章信息
    getcollectArticleLog(pageBean,userId){
        return request({
            url:`/blogservice/praisecollect/getcollectArticleLog/${userId}`,
            method:'post',
            data:pageBean
        })
    }



}