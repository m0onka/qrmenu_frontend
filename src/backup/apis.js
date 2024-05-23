import { toast } from "react-toastify";

function request(path, { data = null, token = null, method = "GET" }) {
    return fetch(path, {
        method,
        headers: {
            Authorization: token ? `Token ${token}` : "",
            "Content-Type": "application/json",
        },
        body: method !== "GET" && method !== "DELETE" ? JSON.stringify(data) : null,
    })
    .then((response) => {

        //Все ок
        if(response.ok) {
            if(method === "DELETE") {
                return true;
            }
            return response.json();
        }

        //Ошибки входа
        return response.json().then((json) => {
            //Обработка json ошибки
            if (response.status === 400) {
                const errors = Object.keys(json).map(
                    (k) => `${(json[k].join(" "))}` //Понятия не имею как работает
                );
                throw new Error(errors.join(" "));
            }
            throw new Error(JSON.stringify(json));
        })
        .catch((e) => {
            if (e.name === "SyntaxError") {
                throw new Error(response.statusText);
            }
            throw new Error(e);
        })
    })
    .catch((e) => {
        //Обработка всех ошибок
        toast(e.message, {type: "error"});
    })
}

export function signIn(username, password) {
    return request("/auth/token/login/", {
        data: {username, password},
        method: "POST",
    })
}

export function register(username, password) {
    return request("/auth/users/", {
        data: {username, password},
        method: "POST",
    })
}

export function fetchPlaces(token) {
    return request("/api/places/", {token});
}

export function addPlace(data, token) {
    return request("/api/places/", { data, token, method: "POST" });
}

export function uploadImage(image) {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "qrmenu");

    return fetch("https:api.cloudinary.com/v1_1/djibswyan/image/upload", {
        method: "POST",
        body: formData,
    }).then((response) => {
        return response.json();
    });
}

export function fetchPlace(id, token) {
    return request(`/api/places/${id}`, { token });
}