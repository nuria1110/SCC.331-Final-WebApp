export const useUserData = () => {

    const setRole = (role) => {
        localStorage.setItem('role', role)
    }

    const getRole = () => {
        return localStorage.getItem('role')
    }

    const setInstitute = (id, name) => {
        localStorage.setItem('instituteID', id)
        localStorage.setItem('instituteName', name)
    }

    const getInstituteData = () => {
        return [localStorage.getItem('instituteID'), localStorage.getItem('instituteName')]
    }

    return {setRole, getRole, setInstitute, getInstituteData}
}
