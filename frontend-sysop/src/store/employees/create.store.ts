import { defineStore } from 'pinia';
import { RequestStatus } from "~/modules/shared/domain/RequestStatus";
import { useFeedBackStore } from "~/store/feedback.store";
import type { ResponseSuccess } from '~/modules/shared/domain/ResponseSucces';
import type { ResponseFailure } from '~/modules/shared/domain/ResponseFailure';
import type { EmployeeDomain } from '~/modules/employee/domain/employee.domain';
import { createEmployee } from '~/modules/employee/application/useCaseCreate';
import type { EmployeeRepository } from '~/modules/employee/domain/employee.repository.domain';

export function useCreateEmployeesStore(repository: EmployeeRepository) {
  return defineStore('EMPLOYEE_CREATE',{
    state: ():{status: RequestStatus, message:  ResponseSuccess | ResponseFailure | null, errors: ResponseFailure["errors"]}=> {
      return {
        status:RequestStatus.INITIAL,
        message: null,
        errors: []
      }
    },
    getters: {
      get_status: (state):RequestStatus => state.status,
    },
    actions: {
      async save(data: EmployeeDomain) {
        const feedback = useFeedBackStore();
        this.status = RequestStatus.LOADING;
        return await createEmployee(
            repository,
          )(data)
          .then(response => {
            console.log( response  );
            this.status = RequestStatus.SUCCESS;
            const message = (response as  ResponseSuccess).message
            feedback.openSuccess({message:`${message}`});
            return response;
          })
          .catch(error => {
            this.status = RequestStatus.ERROR ;
            try {
              this.message = error as ResponseFailure;
              const {errors, message} = error as ResponseFailure;
              if(errors){
                for (const key in errors) {
                  if (Object.prototype.hasOwnProperty.call(errors, key)) {
                    const element = errors[key];
                    for (const msg of element) {
                      feedback.openError({message:`${msg}`});
                    }
                  }
                }
                this.errors = errors;
              }
              if(message){
                feedback.openError({message:`${message}`});
              }
              return errors;
            } catch (error) {
              feedback.openError({message:'Error en el servidor'});
              return null;
            }
          });
      }
    }
  })();
}

