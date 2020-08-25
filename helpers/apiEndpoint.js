import { getEnvVars } from '../environment';

const { apiUrl } = getEnvVars();

export default function getApiEndpoint(endpoint = []) {
    if (!endpoint.length) {
        return '';
    }

    return `${apiUrl}/${endpoint.join(__DEV__ ? '_' : '-')}/`;
}
