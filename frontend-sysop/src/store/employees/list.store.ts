import { defineStore } from 'pinia';
import { RequestStatus } from "~/modules/shared/domain/RequestStatus";
import type { PaginationDomain } from "~/modules/shared/domain/Pagination";
import { useFeedBackStore } from "~/store/feedback.store";
import type { PaginationOptionsDomain } from '~/modules/shared/domain/PaginationOptions';
import type { EmployeeRepository } from '~/modules/employee/domain/employee.repository.domain';
import type { EmployeeDomain } from '~/modules/employee/domain/employee.domain';
import { useCaselistEmployees } from '~/modules/employee/application/useCaseList';

export function useListEmployeeStore(repository: EmployeeRepository) {
  return defineStore('EMPLOYEES_LIST',{
    state: ():{status: RequestStatus, pagination: PaginationDomain<EmployeeDomain>}=> {
      return {
        status:RequestStatus.INITIAL,
        pagination:{
          data:[],
        }
      }
    },
    getters: {
      get_status: (state):RequestStatus => state.status,
    },
    actions: {
      async getEmployees(data: PaginationOptionsDomain) {
        const feedback = useFeedBackStore();

        this.$reset();
        this.status = RequestStatus.LOADING;
        return await await useCaselistEmployees(
            repository,
          )(data)
          .then(response => {
            
            this.status = RequestStatus.SUCCESS;
            this.pagination = response as  PaginationDomain<EmployeeDomain>;
            return response;
          })
          .catch(error => {
            this.status = RequestStatus.ERROR;
            try {
              const [error_message]= error.errors;
              feedback.openError({message:`${error_message}`});
              return error;
            } catch (error) {
              feedback.openError({message:'Error en el servidor'});
              return null;
            }
          });
      }
    }
  })();
}