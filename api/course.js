import request from '@/utils/request'

export default{

    //课程信息保存，初始化
    saveCourse(userId, courseVo){
        return request({
            url:`/courseservice/course/saveCourse/${userId}`,
            method:'post',
            data:courseVo
        })
    },

    //根据课程id查询课程信息
    getCourseById(courseId){
        return request({
            url:`/courseservice/course/getCourseById/${courseId}`,
            method:'get'
        })
    },

    //根据courseId修改课程信息
    updateCourseById(courseId,courseVo){
        return request({
            url:`/courseservice/course/updateCourseById/${courseId}`,
            method:'post',
            data:courseVo
        })
    },

    //根据courseId添加课程描述
    updateCourseDescription(courseId,courseVo){
        return request({
            url:`/courseservice/course/updateCourseDescription/${courseId}`,
            method:'post',
            data:courseVo
        })
    },

    //根据课程id查找描述信息
    getDescription(courseId){
        return request({
            url:`/courseservice/course/getDescription/${courseId}`,
            method:'get'
        })
    },

    //修改课程描述信息
    updateDescriptionById(courseId,courseVo){
        return request({
            url:`/courseservice/course/updateDescriptionById/${courseId}`,
            method:'post',
            data:courseVo
        })
    },

    //根据id查询课程信息一级对应课程的小节数
    getCourseAndChapter(courseId){
        return request({
            url:`/courseservice/course/getCourseAndChapter/${courseId}`,
            method:'get'
        })
    },

    //发布课程，修改课程信息
    publishCourse(courseId){
        return request({
            url:`/courseservice/course/publishCourse/${courseId}`,
            method:'get'
        })
    },

    //带条件的分页查询课程信息
    getCoursePage(pageBean){
        return request({
            url:`/courseservice/course/getCoursePage`,
            method:'post',
            data:pageBean
        })
    },

    //根据课程id，查询课程信息，分页课时信息，作者信息
    getCourseChapterUser(courseId,pageBean){
        return request({
            url:`/courseservice/course/getCourseChapterUser/${courseId}`,
            method:'post',
            data:pageBean
        })
    },

    //查询用户发布文章
    getPageCourseByUserId(pageBean,userId){
        return request({
            url:`/courseservice/course/getPageCourseByUserId/${userId}`,
            method:'post',
            data:pageBean
        })
    },

    //根据课程id删除课程以及对应的小节
    deleteCourseAndChapter(courseId){
        return request({
            url:`/courseservice/course/deleteCourseAndChapter/${courseId}`,
            method:'get'
        })
    }



}