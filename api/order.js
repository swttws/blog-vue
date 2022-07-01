import request from '@/utils/request'

export default{

    //根据用户id和课程id，判断用户是否点赞过
    saveOrder(course, userId){
        return request({
            url:`/orderservice/order/saveOrder/${userId}`,
            method:'post',
            data:course
        })
    },

    //根据用户id和课程id查询是否有购买过该课程
    getOrderByUserIdAndCourseId(userId,courseId){
        return request({
            url:`/orderservice/order/getOrderByUserIdAndCourseId/${userId}/${courseId}`,
            method:'get'
        })
    },

    //查询购买课程
    getPageOrderById(pageBean, userId){
        return request({
            url:`/orderservice/order/getPageOrderById/${userId}`,
            method:'post',
            data:pageBean
        })
    },

    //查询课程被购买消息
    getOrderMsg(userId){
        return request({
            url:`/orderservice/order/getOrderMsg/${userId}`,
            method:'get'
        })
    },

    //修改课程消息状态为已读
    updateOrderMsg(orderId){
        return request({
            url:`/orderservice/order/updateOrderMsg/${orderId}`,
            method:'get'
        })
    }




}