export const getClientIp = (request) =>
{
    if (!request) return null;
    return request.headers.get('x-client-ip') || 
           request.headers.get('x-forwarded-for') ||
           request.headers.get('x-forwarded') ||
           request.headers.get('forwarded-for') ||
           request.headers.get('forwarded') ||
           request.headers.get('cf-connecting-ip') ||
           request.headers.get('fastly-client-ip') ||
           request.headers.get('true-client-ip') ||
           request.headers.get('x-real-ip') ||
           request.headers.get('x-cluster-client-ip') ||
           request.headers.get('appengine-user-ip') ||
           request.connection?.remoteAddress ||
           request.socket?.remoteAddress ||
           request.connection?.socket?.remoteAddress ||
           request.info?.remoteAddress ||
           request.ip;
}