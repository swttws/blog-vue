import request from '@/utils/request'

export default {

    //保存博客信息
    saveblog(userId, articleVo) {
        return request({
            url: `/blogservice/article/saveblog/${userId}`,
            method: 'post',
            data: articleVo
        })
    },

    //根据id查询文章信息
    getArticleById(articleId) {
        return request({
            url: `/blogservice/article/getArticleById/${articleId}`,
            method: 'get'
        })
    },

    //修改文章信息
    updateArticleById(article) {
        return request({
            url: `/blogservice/article/updateArticleById`,
            method: 'post',
            data: article
        })
    },

    //保存文章内容，并发布
    updateBlogById(blog) {
        return request({
            url: `/blogservice/article/updateBlogById`,
            method: 'post',
            data: blog
        })
    },

    //根据id查找博客内容
    getBlogById(articleId) {
        return request({
            url: `/blogservice/article/getBlogById/${articleId}`,
            method: 'get'
        })
    },

    //分页查询博客文章
    getPageBlog(pageBean, sort) {
        return request({
            url: `/blogservice/article/getPageBlog/${sort}`,
            method: 'post',
            data: pageBean
        })
    },

    //根据文章id查找文章信息，并且查找出对应评论,点赞信息
    getArticlePraiseCollectbyId(articleId, userId, pageBean) {
        return request({
            url: `/blogservice/article/getArticlePraiseCollectbyId/${articleId}/${userId}`,
            method: 'post',
            data: pageBean
        })
    },

    //根据用户id获取文章，并分页
    getArticleByUserId(pageBean, userId) {
        return request({
            url: `/blogservice/article/getArticleByUserId/${userId}`,
            method: 'post',
            data: pageBean
        })
    },

    //删除博文
    deleteBlog(articleId) {
        return request({
            url: `/blogservice/article/deleteBlog/${articleId}`,
            method: 'get'
        })
    },

    //根据文章id修改文章浏览量
    addReadNum(articleId) {
        return request({
            url: `/blogservice/article/addReadNum/${articleId}`,
            method: 'get'
        })
    }




}