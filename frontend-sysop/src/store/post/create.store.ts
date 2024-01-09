import { defineStore } from 'pinia';
import { RequestStatus } from "~/modules/shared/domain/RequestStatus";
import { useFeedBackStore } from "~/store/feedback.store";
import type { ResponseSuccess } from '~/modules/shared/domain/ResponseSucces';
import type { ResponseFailure } from '~/modules/shared/domain/ResponseFailure';
import type { PostRepositoryDomain } from '~/modules/posts/domain/post.repository.domain';
import { useCaseCreatePost } from '~/modules/posts/application/useCaseCreate';
import type { PostDomain } from '~/modules/posts/domain/post.domain';

export function useCreatePostStore(repository: PostRepositoryDomain) {
  return defineStore('POST_CREATE',{
    state: ():{status: RequestStatus, message:  ResponseSuccess | ResponseFailure | null, errors: ResponseFailure["errors"]}=> {
      return {
        status:RequestStatus.INITIAL,
        message: null,
        errors:[]
      }
    },
    getters: {
      get_status: (state):RequestStatus => state.status,
    },
    actions: {
      async save(data: PostDomain) {
        const feedback = useFeedBackStore();
        this.status = RequestStatus.LOADING;
        return await useCaseCreatePost(
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