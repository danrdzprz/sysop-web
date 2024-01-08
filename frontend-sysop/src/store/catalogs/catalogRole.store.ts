import { defineStore } from 'pinia';
import { RequestStatus } from "~/modules/shared/domain/RequestStatus";
import { useFeedBackStore } from "~/store/feedback.store";

import type { RoleRepository } from '~/modules/roles/domain/role.repository.domain';
import type { CatalogDomain } from '~/modules/shared/domain/catalog';
import { useCaseCatalogRoles } from '~/modules/roles/application/useCaseCatalogApplication';
import type { ResponseFailure } from '~/modules/shared/domain/ResponseFailure';

export function useCatalogRoleStore(repository: RoleRepository) {
  return defineStore('CATALOG_ROLEs',{
    state: ():{status: RequestStatus, catalog: CatalogDomain[]}=> {
      return {
        status:RequestStatus.INITIAL,
        catalog:[]
      }
    },
    getters: {
      get_status: (state):RequestStatus => state.status,
    },
    actions: {
      async getCatalogRoles() {
        const feedback = useFeedBackStore();

        this.$reset();
        this.status = RequestStatus.LOADING;
        return await useCaseCatalogRoles(
            repository,
          )()
          .then(response => {
            this.status = RequestStatus.SUCCESS;
            this.catalog = response as  CatalogDomain[];
            return response;
          })
          .catch(error => {
            this.status = RequestStatus.ERROR ;
            try {
            const {errors, message} = error as ResponseFailure;
            if(errors){
                for (const error of errors) {
                feedback.openError({message:`${error}`});
                }
            }
            console.log(error);
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