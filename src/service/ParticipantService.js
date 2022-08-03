import API from "../utils/API.js"

const ParticipantService = {
    checkIfKeyExists:(key) =>{
        API.getSessionUid(key).then(
            (response) => {
                console.log(response)
                return response
            },
            (error) =>{
                console.log(error)
                return error
            }
        )
    },

    

}

export default ParticipantService