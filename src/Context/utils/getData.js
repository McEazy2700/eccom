const getData = async (url) => {
    let collectedData
    console.log('URL:', url)
    await fetch(url)
    .then(response => response.json())
    .then(data => collectedData = data)
    .catch(error => {
        console.log('Error:', error)
        return collectedData = null
    })

    return collectedData;
}

export default getData;