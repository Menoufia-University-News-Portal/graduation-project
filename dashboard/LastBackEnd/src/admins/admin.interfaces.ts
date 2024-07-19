interface Permission {
  "permission_id": number;
  "type": string;
}

interface Faculty {
  "faculty_id": number;
  "name": string;
  "dean_name": string;
}

interface AdminInfo {
    "admin_id": number;
    "name": string;
    "email": string;
    "password": string;
    "is_active": boolean;
    "permissions": Permission[];
    "faculties": Faculty[];
  }