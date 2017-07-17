export function responseOK(body) {
  const resp = new Response(JSON.stringify(body), { // eslint-disable-line no-undef
    status: 200,
    'Content-type': 'application/json',
  });
  return Promise.resolve(resp);
}

export function responseError(status, body) {
  const resp = new Response(JSON.stringify(body), { // eslint-disable-line no-undef
    status,
    'Content-type': 'application/json',
  });
  return Promise.reject(resp);
}
