
import React from 'react'
import axios from 'axios';


export const ApiAuthentication = async (data) => {
    try {
        const response = await axios.post("http://192.168.0.4:8081/kaax/api/" + "v1/auth/authenticate", data)
        return response;
    } catch (error) {
        console.log("error en la api",error)
        return {response: null, error: error.message}
    }
}