import {observable, computed} from 'mobx'
import Mobx from 'mobx'
import http from 'http'
import https from 'https'
import axios from 'axios'

import config from '../config'
import constants from '../utilities/constants'

const restClient = axios.create({
    baseURL: config.entityBaseURL,
    httpAgent: new http.Agent({ keepAlive: true }),
    httpsAgent: new https.Agent({ keepAlive: true }),
})

class EntityStore {
    @observable state = {
        documents: []
    }

    constructor() {
        this.listDocuments = this.listDocuments.bind(this)
    }

    listDocuments() {
        return restClient.get('documents/').then((response) => {
            if (response.status === 200) {
                this.state.documents = response.data
                return Promise.resolve()
            }

            return Promise.reject(new Error(JSON.stringify(response)))
        }).catch((err) => {
            return Promise.reject(err)
        })
    }
}

export default EntityStore
