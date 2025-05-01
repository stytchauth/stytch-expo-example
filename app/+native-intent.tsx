export function redirectSystemPath({ path }) {
    const url = new URL(path);
    if (url.protocol.startsWith("stytch-ui")) {
        return null
    }
    return path;
}