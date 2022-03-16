const environment = {
  localhost: "http://localhost:8080/skilltracker/api/",
  version: "v1/",
  engineer: "engineer/",
  admin: "admin/",
};
export const envEngineer=`${environment.localhost + environment.version + environment.engineer}`;
export const envAdmin=`${environment.localhost + environment.version + environment.admin}`;