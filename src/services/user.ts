import request from '@/utils/request';

export async function query(): Promise<any> {
  return request('/b2b-back/users');
}

export async function queryCurrent(): Promise<any> {
  return request('/b2b-back/currentUser');
}

export async function queryNotices(): Promise<any> {
  return request('/b2b-back/notices');
}
