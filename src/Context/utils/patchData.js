import getCookie from '../utils/getCookie'

const csrftoken = getCookie('csrftoken');

async function patchData(url, data) {
    let returnedData;
    const response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'X-CSRFToken': csrftoken,
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify(data)
    })
    const collectedData = await response.json()
    returnedData = collectedData;

    return returnedData;
}

export default patchData;