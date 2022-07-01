import request from '@/utils/request'

export default{

    //添加小节信息
    addChapter(chapter){
        return request({
            url:`/courseservice/chapter/addChapter`,
            method:'post',
            data:chapter
        })
    },

    //分页插叙对应课程小节信息
    getPageChapter(courseId,pageBean){
        return request({
            url:`/courseservice/chapter/getPageChapter/${courseId}`,
            method:'post',
            data:pageBean
        })
    },

    //根据id回显小节信息
    getChapterById(chapterId){
        return request({
            url:`/courseservice/chapter/getChapterById/${chapterId}`,
            method:'get'
        })
    },

    //根据小节id修改小节信息
    updateChapterById(chapter){
        return request({
            url:`/courseservice/chapter/updateChapterById`,
            method:'post',
            data:chapter
        })
    },

    //根据id删除小节
    deleteById(chapterId){
        return request({
            url:`/courseservice/chapter/deleteById/${chapterId}`,
            method:'get'
        })
    },



}