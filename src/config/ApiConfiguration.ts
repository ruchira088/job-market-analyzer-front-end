import {Maybe} from "monet"

const apiUrlFromQuerystring =
    (location: Location): Maybe<string> => {
        const urlSearchParams = new URLSearchParams(location.search)
        return Maybe.fromFalsy(urlSearchParams.get("api-url"))
    }

export const apiUrl =
    apiUrlFromQuerystring(window.location)
        .orElse(Maybe.fromFalsy(process.env.REACT_APP_API_URL))
        .orLazy(() => `https://api.${window.location.hostname}`)