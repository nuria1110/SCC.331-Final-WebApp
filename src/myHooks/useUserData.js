export const useUserData = () => {

    const setRole = (role) => {
        localStorage.setItem('role', role)
    }

    const getRole = () => {
        return localStorage.getItem('role')
    }

    return {setRole, getRole}
}
