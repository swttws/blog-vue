import request from '@/utils/request'

export default{

    //获取一级二级标题
    getOneAndTwo(){
        return request({
            url:`/blogservice/subject/getOneAndTwo`,
            method:'get'
        })
    },

    //根据二级id查询标题
    getTitleByTwoId(twoId){
        return request({
            url:`/blogservice/subject/getTitleByTwoId/${twoId}`,
            method:'get'
        })
    }



}