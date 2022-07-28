import patchData from "./patchData"

import React from 'react'

const increaseQuantityHandler = async (context, url) => {
    let response; 
    const data = {product: 1, quantity: 1}
    response = await patchData(url, data).then(data => {
        context.onUpdateCart(data)
        return data;
    })
    return response;
}

export default increaseQuantityHandler