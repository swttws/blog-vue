import request from '@/utils/request'

export default{

    //根据用户id和课程id，判断用户是否点赞过
    getCountByUserIdAndCourseId(courseId,userId){
        return request({
            url:`/courseservice/coursepraise/getCountByUserIdAndCourseId/${courseId}/${userId}`,
            method:'get'
        })
    },

    //课程点赞,点赞过的取消点赞，未点赞点赞
    praise(userId,courseId){
        return request({
            url:`/courseservice/coursepraise/praise/${userId}/${courseId}`,
            method:'get'
        })
    },

    //根据用户id查询点赞消息
    getPraiseByUserId(userId){
        return request({
            url:`/courseservice/coursepraise/getPraiseByUserId/${userId}`,
            method:'get'
        })
    },

    //清除未点赞消息
    updatePraiseMsgById(praiseId){
        return request({
            url:`/courseservice/coursepraise/updatePraiseMsgById/${praiseId}`,
            method:'get'
        })
    }




}