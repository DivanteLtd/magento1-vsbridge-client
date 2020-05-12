export type RequestResponse = any|boolean
export type CustomerToken = string

export function getResponse(data: any): RequestResponse {
  if(isResponseValid(data)){
    return data.result;
  }
  return false;
}

export function isResponseValid(data: any): boolean {
  return data.code === 200;
}
