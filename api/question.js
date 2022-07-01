import request from '@/utils/request'

export default{

    //问题发布保存
    savequestion(questionVo){
        return request({
            url:`/questionservice/question/savequestion`,
            method:'post',
            data:questionVo
        })
    },

    //带条件分页查询问题
    getQuestPage(pageBean){
        return request({
            url:`/questionservice/question/getQuestPage`,
            method:'post',
            data:pageBean
        })
    },

    //通过问题id查找问题信息,相关回答信息
    getQuestById(questId,pageBean,userId){
        return request({
            url:`/questionservice/question/getQuestById/${questId}/${userId}`,
            method:'post',
            data:pageBean
        })
    },

    //根据问题id修改浏览量
    updateReadNumById(questId){
        return request({
            url:`/questionservice/question/updateReadNumById/${questId}`,
            method:'get'
        })
    },
    
    //根据用户id分页查询问题
    getQuestByUserId(userId,pageBean){
        return request({
            url:`/questionservice/question/getQuestByUserId/${userId}`,
            method:'post',
            data:pageBean
        })
    },
    
    //根据问题id查找问题信息
    getQuestInfoById(questId){
        return request({
            url:`/questionservice/question/getQuestInfoById/${questId}`,
            method:'get'
        })
    },

    //根据id修改问题
    updateQuestById(questionVo,questId){
        return request({
            url:`/questionservice/question/updateQuestById/${questId}`,
            method:'post',
            data:questionVo
        })
    },




}