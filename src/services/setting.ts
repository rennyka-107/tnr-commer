import { CommonResponse, FilterParams } from 'types/common';
import HttpClient from 'utils/HttpClient';

export interface company {
  id: number;
  companyName: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  foundingDate: string;
  district: string;
}

export const getListCompany = async (params: FilterParams) => {
  return HttpClient.post<typeof params, CommonResponse<company[]>>(
    '/Example/CRUD/ListCRUD',
    params
  );
};

export const deleteCompany = async (id: number) => {
  return HttpClient.delete<number, CommonResponse<company[]>>(
    `/Example/CRUD/Delete?id=${id}`
  );
};

interface CreateParams {
  id: number;
  companyName: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  foundingDate: string;
  district: string;
}

export const createCompany = async (params: CreateParams) => {
  return HttpClient.post<typeof params, CommonResponse>(
    '/Example/CRUD/Create',
    params
  );
};

export const getCompanyDetails = async (id: string) => {
  return HttpClient.get<string, CommonResponse>(
    `/Example/CRUD/Detail?id=${id}`
  );
};

export const editCompany = async (params: CreateParams) => {
  return HttpClient.put<CreateParams, CommonResponse>('/Example/CRUD/Edit');
};
