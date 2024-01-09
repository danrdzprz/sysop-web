import { defineStore } from 'pinia';
import { RequestStatus } from "~/modules/shared/domain/RequestStatus";
import { useFeedBackStore } from "~/store/feedback.store";
import type { ResponseFailure } from '~/modules/shared/domain/ResponseFailure';
import type { PostRepositoryDomain } from '~/modules/posts/domain/post.repository.domain';
import type { PostDomain } from '~/modules/posts/domain/post.domain';
import { useCaseDetailPost } from '~/modules/posts/application/usCaseDetail';


export function useDetailPostStore(repository: PostRepositoryDomain) {
  return defineStore('POST_DETAIL',{
    state: ():{status: RequestStatus, data:  PostDomain | null}=> {
      return {
        status:RequestStatus.INITIAL,
        data: null
      }
    },
    getters: {
      get_status: (state):RequestStatus => state.status,
    },
    actions: {
      async detail(data: number) {
        const feedback = useFeedBackStore();
        this.status = RequestStatus.LOADING;
        return await useCaseDetailPost(
            repository,
          )(data)
          .then(response => {
            this.status = RequestStatus.SUCCESS;
            this.data = response as PostDomain
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