import { Octokit } from "octokit";
import { UserData } from "../types";

let timeout: ReturnType<typeof setTimeout> | null;
let currentValue: string;

export const fetchUsers = (value: string, callback: Function, fetching: Function) => {
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }
    currentValue = value;

    timeout = setTimeout(() => {
        fetch(`https://api.github.com/search/users?q=${value}`)
            .then((response: any) => response.json())
            .then((response: any) => {
                if (currentValue === value) {
                    const { items } = response;
                    const data = items.map((item: any) => ({
                        value: item.login,
                        text: item.login,
                    }));
                    callback(data);
                    fetching(false);
                }
            });
    }, 500);
};

export const fetchUser = (value: string, userData: Function) => {
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }

    timeout = setTimeout(() => {
        fetch(`https://api.github.com/users/${value}`)
            .then((response: any) => response.json())
            .then((response: UserData) => {
                userData(response);
            });
    }, 500);
};

export const fetchDetails = (username: string, type: string, data: Function) => {
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }

    timeout = setTimeout(() => {
        fetch(`https://api.github.com/users/${username}/${type}?sort=updated`)
            .then((response: any) => response.json())
            .then((response: UserData) => {
                data(response);
            });
    }, 500);
}