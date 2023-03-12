export const useLocation = () => {

    const setLatLong = (lat, long) => {
        localStorage.setItem('latlong', JSON.stringify([lat, long]))
        console.log(localStorage.getItem('latlong'))
    }

    const getLatLong = () => {
        let data = JSON.parse(localStorage.getItem('latlong'))
        console.log(data)
        return data
    }
    
    return {setLatLong, getLatLong}
}
