/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config({ path: '../.development.env' });
import * as moment from 'moment';
import 'moment-timezone';
import * as jwt from 'jsonwebtoken';
import { PaginationDto } from 'src/utils/dto/pagination.dto';
const ciamTokenKeyE = process.env.CIAM_TOKEN_KEY_E || 'AQAB';
const ciamTokenKeyN =
  process.env.CIAM_TOKEN_KEY_N ||
  'qtWyj5yZnWDG1kvk6_NKyiwpPPJnjQNuWh7dlbzainC038HzBPW98NajD0Yw5kVUDNBfAT8IQ5BqXrHTNDCtdA2-OkRFkdxkQOlGo0ZNZ-3XtIzOWx4kMksgmAmZKDuKUlQVK86-f4TLHtQ2_kRVqEg9e0pZ85FtftaX-GzuvVbk9WVa59XaGHmpEqRDVDvVcJZMsouTaqKr6dXDWT7_0DZQuUwrwkYaW4PNouAkoQ3eQF1K0qgbx7BTf8r15X4IfDqomYVsmGMjwlFdL8behV1PkF7toNNuoFHNykjNVUvguUdZloRSpxC8zNjfcpvPUxpvVvUllfkHFZY5ytk2TQ';
const pubKey = rsaPublicKeyPem(ciamTokenKeyN, ciamTokenKeyE);

export const getStartOfDayUTC = (date): Date => {
  return new Date(moment(date).startOf('day').utc().toISOString());
};

export const verifyCIAMToken = (token) => {
  try {
    const data = jwt.verify(token, pubKey, { algorithms: ['RS256'] });
    return data;
  } catch (error) {
    return null;
  }
};

export const genPagination = (paginationDto: PaginationDto) => {
  const { page, perPage, getAll } = paginationDto;
  if (getAll == `true`) {
    return {};
  }
  const options = {
    skip: 0,
    take: 20,
  };
  if (page) {
    options.skip = (page - 1) * perPage;
  }
  if (perPage) {
    options.take = perPage;
  }

  return options;
};

function rsaPublicKeyPem(modulusB64, exponentB64) {
  const modulus = Buffer.from(modulusB64, 'base64');
  const exponent = Buffer.from(exponentB64, 'base64');

  const modulusHex = prepadSigned(modulus.toString('hex'));
  const exponentHex = prepadSigned(exponent.toString('hex'));

  const modlen = modulusHex.length / 2;
  const explen = exponentHex.length / 2;

  const encodedModlen = encodeLengthHex(modlen);
  const encodedExplen = encodeLengthHex(explen);
  const encodedPubkey = `30${encodeLengthHex(
    modlen + explen + encodedModlen.length / 2 + encodedExplen.length / 2 + 2,
  )}02${encodedModlen}${modulusHex}02${encodedExplen}${exponentHex}`;

  const derB64 = Buffer.from(encodedPubkey, 'hex').toString('base64');

  const pem = `-----BEGIN RSA PUBLIC KEY-----\n${derB64
    .match(/.{1,64}/g)
    .join('\n')}\n-----END RSA PUBLIC KEY-----\n`;

  return pem;
}

function prepadSigned(hexStr) {
  const msb = hexStr[0];
  if (msb < '0' || msb > '7') {
    return `00${hexStr}`;
  }
  return hexStr;
}

function encodeLengthHex(n) {
  if (n <= 127) {
    return toHex(n);
  }
  const nHex = toHex(n);
  const lengthOfLengthByte = 128 + nHex.length / 2;
  return toHex(lengthOfLengthByte) + nHex;
}

function toHex(number) {
  const nstr = number.toString(16);
  if (nstr.length % 2) {
    return `0${nstr}`;
  }
  return nstr;
}
