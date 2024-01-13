const fs = require('node:fs/promises')

const URL_BASE = 'http://localhost:3000/api'

async function readItem(pref) {
    try {
        const text = await fs.readFile(`./${pref}-item.md`, { encoding: 'utf8' });
        const entries = text.split(/\n/).filter(s => s).map(s => s.split(': '))
        return Object.fromEntries(entries);
    } catch (err) {
        throw err
    }
}


const createItem = async (pref, email, token) => {
    try {
        const item = await readItem(pref)
        const res = await fetch(
            `${URL_BASE}/item/create`,
            {
                method: 'post',
                body: JSON.stringify({ ...item, email }),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json; charset=UTF-8',
                    Authorization: `Bearer ${token}`
                }
            }
        )
        const resBody = await res.json()
        if (!res.ok)
            throw new Error(`${resBody.message}: ${res.detail}`)
    } catch (err) {
        throw err
    }
}

async function main() {
    try {

        // ユーザーの作成
        const user = {
            name: "田中一郎",
            email: "tanaka@example.com",
            password: "abc123"
        }

        await fetch(
            `${URL_BASE}/user/register`,
            {
                method: 'post',
                body: JSON.stringify(user),
                headers: { 'Content-Type': 'application/json; charset=UTF-8' } }
        )

        // 作成したユーザーでログイン
        const res = await fetch(
            `${URL_BASE}/user/login`,
            {
                method: 'post',
                body: JSON.stringify({ email: user.email, password: user.password }),
                headers: { 'Content-Type': 'application/json; charset=UTF-8' }
            }
        )


        const resBody = await res.json()

        if (!res.ok)
            throw new Error(`${resBody.message}: ${resBody.detail}`)


        for (const pref of ['1st', '2nd', '3rd', '4th', '5th', '6th']) {
            await createItem(pref, user.email, resBody.token)
        }


    } catch (err) {
        console.log(err);
    }
}

main().then();
