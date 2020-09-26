import axios from 'axios';

import env from '../../../config/env';

export default {
    fetchAddresses({ q, limit = 1, min_confidence = 9 }) {
        return axios.get(env.geoUri, { params: { q, limit, min_confidence, key: env.geoApiKey } });
    }
}