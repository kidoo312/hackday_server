/**
 * Created by kidoo.han on 29/04/2019
 */
import * as utf8 from 'utf8';
import * as base64 from 'base-64';

export const encode = (plainText: string): string => {
   const bytes = utf8.encode(plainText);
   return base64.encode(bytes);
};

export const decode = (encoded: string): string => {
   const bytes = base64.decode(encoded);
   return utf8.decode(bytes);
}