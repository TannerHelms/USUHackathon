export async function Quote() {
    const resp = await fetch('https://api.quotable.io/random')
    const body = await resp.json()
    return body;
};