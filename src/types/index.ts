// src/types/index.ts

export interface AccessReview {
  review_id: number;
  application_id: number;
  user_id: string;
  access_level: string;
  access_justification: string;
  access_review_date: Date;
  access_approver: string;
}

export interface NewAccessReview {
  application_id: number;
  user_id: string;
  access_level: string;
  access_justification: string;
  access_approver: string;
}

export interface ApplicationReviewer {
  application_id: number;
  user_id: string;
}

export interface Application {
  application_name: string;
  application_owner: string;
  auth_method: string;
  pii: boolean;
  financial_data: boolean;
  intellectual_property: boolean;
  latest_access_review: Date;
  application_id: number;
  application_status: string;
  application_purpose: string;
}

export interface NewApplication {
  application_name: string;
  application_owner: string;
  auth_method: string;
  pii: boolean;
  financial_data: boolean;
  intellectual_property: boolean;
  application_status: string;
  application_purpose: string;
}

export interface ExternalUser {
  user_id: string;
  full_name: string;
  email: string;
  company: string;
}

export interface NewExternalUser {
  full_name: string;
  email: string;
  company: string;
}

export interface User {
  user_id: string;
  display_name: string;
  email: string;
  first_name: string;
  last_name: string;
  job_title: string;
  department: string;
  is_active: boolean;
}
