import crypto from "node:crypto";

const PASSWORD_LENGTH = 256;
const SALT_LENGTH = 64;
const ITERATIONS = 10000;
const DIGEST = "sha256";
const BYTE_TO_STRING_ENCODING = "hex"; // this could be base64, for instance

export default async function hash(
  password
): Promise<{ hash: string; salt: string; iterations: number }> {
  var salt = crypto.randomBytes(SALT_LENGTH).toString(BYTE_TO_STRING_ENCODING);
  return new Promise((accept, reject) => {
    return crypto.pbkdf2(
      password,
      salt,
      ITERATIONS,
      PASSWORD_LENGTH,
      DIGEST,
      (error, hash) => {
        if (error) {
          return reject(error);
        }

        accept({
          salt,
          hash: hash.toString(BYTE_TO_STRING_ENCODING),
          iterations: ITERATIONS,
        });
      }
    );
  });
}
