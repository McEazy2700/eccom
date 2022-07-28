import getCookie from '../utils/getCookie'

const csrftoken = getCookie('csrftoken');

async function makePostRequest(url, data) {
    let returnedData;
    const response = await fetch(url, {
        method: 'POST',
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

export default makePostRequest;

export async function makePostRequestWithResponse(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'X-CSRFToken': csrftoken,
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify(data)
    })

    return response;
}
