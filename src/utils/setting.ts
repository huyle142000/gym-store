
export const TOKEN: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCDEkMOgIE7hurVuZyAwNCIsIkhldEhhblN0cmluZyI6IjExLzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MTE3MTIwMDAwMCIsIm5iZiI6MTY1MjYzNDAwMCwiZXhwIjoxNjgxMzE4ODAwfQ.gSqRPtAGanL6NGpTCUadxaDv8iCWNHz1-5NHHkRP43A"

export const DOMAIN: string = "http://localhost:3001"

export const ACCESS_TOKEN: string = "access_token"
export const USER_LOGIN: string = "userLogin"

export const setting = {
    clearStorage: (name: string): void => {
        localStorage.removeItem(name)
    },
    setStorageJson: (name: string, data: any): void => {
        data = JSON.stringify(data)
        localStorage.setItem(name, data)
    },
    setStorage: (name: string, data: string): void => {
        localStorage.setItem(name, data)
    },
    getStorageJson: (name: string): any | undefined => {

        if (localStorage.getItem(name)) {
            let dataStore: string | undefined | null = localStorage.getItem(name)
            if (typeof dataStore == "string") {
                const data = JSON.parse(dataStore)
                return data
            }
            return undefined
        }
        return
    },
    getStore: (name: string): string | null | undefined | boolean | any => {
        if (localStorage.getItem(name)) {
            let data: string | undefined | null | any = localStorage.getItem(name)
            return data
        }
        return
    },
    setCookieJson: (name: string, value: any, days: number): void => {
        let expires = "";
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
            expires = "; expires=" + date.toUTCString()
        }
        value = JSON.stringify(value)
        document.cookie = name + "=" + (value || "") + expires + "; path=/"

    },
    setCookie: (name: string, value: any, days: number): void => {
        let expires = "";
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
            expires = "; expires=" + date.toUTCString()
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/"

    },
    getCookie: (name: string): string | null => {
        let nameEQ = name + "=";
        let ca = document.cookie.split(";")
        for (const element of ca) {
            let c = element;
            while (c.charAt(0) == "") {
                c = c.substring(1, c.length)
            }
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length)
        }
        return null

    },
    eraseCookie: (name: string): void => {
        document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;"
    }


}
