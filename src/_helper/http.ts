import Axios from 'axios';
import { Logger } from '@nestjs/common';

export class HttpHelper {
  static async get({ url, headers = null }) {
    const res = await send({ url, method: 'GET', headers });

    return res;
  }

  static async post({ url, body = null, headers = null }) {
    const res = await send({ url, method: 'POST', headers, body });

    return res;
  }

  static async put({ url, body = null, headers = null }) {
    const res = await send({ url, method: 'PUT', headers, body });

    return res;
  }

  static async delete({ url, headers = null }) {
    const res = await send({ url, method: 'DELETE', headers });

    return res;
  }

  static async send({ url, method, headers, body }) {
    const res = await send({ url, method, headers, body });

    return res;
  }
}

async function send({ url, method, headers = null, body = null }) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  headers = initAuthorizationHeaders(headers);

  const options = {
    url,
    method,
    headers,
    data: body,
  };

  try {
    const result = await Axios(options);
    return result;
  } catch (error) {
    Logger.error(error);
  }
}

function initAuthorizationHeaders(headers) {
  if (headers) {
    headers['x-api-key'] = process.env.INTERNAL_API_KEY;
  } else {
    headers = {
      'x-api-key': process.env.INTERNAL_API_KEY,
    };
  }

  return headers;
}
