export const Respond = (statusCode, success, message, data = undefined) => {
    const body = {
        success,
        message,
        ...(data !== undefined && { data }),
    }

    return new Response(JSON.stringify(body), {
        status: statusCode,
        headers: { "Content-Type": "application/json" },
    })
}
