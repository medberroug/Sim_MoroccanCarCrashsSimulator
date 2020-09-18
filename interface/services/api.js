import Api from './apiRoute'
export default {
    async sendS1(credentials,IX,IY,IZ) {
        // return api().post('germs', credentials)
        var url="s1/"+IX+"/"+IY+"/"+IZ
        return Api().post(url,credentials)
    },
    async sendS2(credentials,IX,IY,IZ) {
        // return api().post('germs', credentials)
        var url="s2/"+IX+"/"+IY+"/"+IZ
        return Api().post(url,credentials)
    },
    async sendS3(credentials,IX,IY,IZ) {
        // return api().post('germs', credentials)
        var url="s3/"+IX+"/"+IY+"/"+IZ
        return Api().post(url,credentials)
    },
   
}