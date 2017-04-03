export function getHeaders() {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  return headers;
}
export function getParams(params) {
    const esc = encodeURIComponent;
    let query =[];
    Object.keys(params).forEach(k => {
            if(params[k]) {
                query.push(esc(k) + '=' + esc(params[k]))
            }
        });
    query = query.join('&');
    return query;
}