import { defineStore } from 'pinia';
import { RequestStatus } from "~/modules/shared/domain/RequestStatus";
import { useFeedBackStore } from "~/store/feedback.store";
import type { ResponseFailure } from '~/modules/shared/domain/ResponseFailure';
import type { ResponseSuccess } from '~/modules/shared/domain/ResponseSucces';
import type { PostRepositoryDomain } from '~/modules/posts/domain/post.repository.domain';
import type { PostDomain } from '~/modules/posts/domain/post.domain';
import { useCaseUpdatePost } from '~/modules/posts/application/useCaseUpdate';

export function useUpdatePostStore(repository: PostRepositoryDomain) {
  return defineStore('POST_UPDATE',{
    state: ():{status: RequestStatus, message:  ResponseSuccess | ResponseFailure | null}=> {
      return {
        status:RequestStatus.INITIAL,
        message: null
      }
    },
    getters: {
      get_status: (state):RequestStatus => state.status,
    },
    actions: {
      async update(id: number, data: PostDomain) {
        const feedback = useFeedBackStore();
        this.status = RequestStatus.LOADING;
        return await useCaseUpdatePost(
            repository,
          )(id, data)
          .then(response => {
            this.message = response as ResponseSuccess;
            feedback.openSuccess({message:`${this.message}`});
            this.status = RequestStatus.SUCCESS;
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