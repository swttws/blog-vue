import request from '@/utils/request'

export default{

    //回答发布
    sendAnswer(answerVo, userId){
        return request({
            url:`/questionservice/answer/sendAnswer/${userId}`,
            method:'post',
            data:answerVo
        })
    },

    //回答点赞
    praiseAnswer(userId,answerId){
        return request({
            url:`/questionservice/answerpraise/praiseAnswer/${userId}/${answerId}`,
            method:'get'
        })
    },

    //根据用户id分页查询被回答消息
    getAnswerByAuserId(pageBean,userId){
        return request({
            url:`/questionservice/answer/getAnswerByAuserId/${userId}`,
            method:'post',
            data:pageBean
        })
    },

    //清空一条未读回答未读消息
    updateMsg(answerId){
        return request({
            url:`/questionservice/answer/updateMsg/${answerId}`,
            method:'get'
        })
    },

    //清空所有回答未读消息
    updateAllMsg(userId){
        return request({
            url:`/questionservice/answer/updateAllMsg/${userId}`,
            method:'get'
        })
    },

    //查询回答被点赞消息
    getAnswerPraise(pageBean,userId){
        return request({
            url:`/questionservice/answerpraise/getAnswerPraise/${userId}`,
            method:'post',
            data:pageBean
        })
    },

    //清空一条点赞未读消息
    updateAnswerMsg(praiseId){
        return request({
            url:`/questionservice/answerpraise/updateAnswerMsg/${praiseId}`,
            method:'get'
        })
    },

    //清空所有点赞未读消息
    updateAllAnswerMsg(userId){
        return request({
            url:`/questionservice/answerpraise/updateAllAnswerMsg/${userId}`,
            method:'get'
        })
    },

    //采纳回答，根据回答id修改回答状态
    updateAnswerAdopt(answerId){
        return request({
            url:`/questionservice/answer/updateAnswerAdopt/${answerId}`,
            method:'get'
        })
    }

  



}