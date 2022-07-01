import request from '@/utils/request'

export default{

    //根据视频id获取播放凭证
    getVideoPlayAuth(videoId){
        return request({
            url:`/vodservice/getPlayAuth/${videoId}`,
            method:'get'
        })
    },



}