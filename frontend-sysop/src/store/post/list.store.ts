import { defineStore } from 'pinia';
import { RequestStatus } from "~/modules/shared/domain/RequestStatus";
import type { PaginationDomain } from "~/modules/shared/domain/Pagination";
import { useFeedBackStore } from "~/store/feedback.store";
import type { PaginationOptionsDomain } from '~/modules/shared/domain/PaginationOptions';
import type { PostRepositoryDomain } from '~/modules/posts/domain/post.repository.domain';
import { useCaselistPosts } from '~/modules/posts/application/useCaseListApplication';
import type { PostListDomain } from '~/modules/posts/domain/post.domain';
import type { ResponseFailure } from '~/modules/shared/domain/ResponseFailure';

export function useListPostStore(repository: PostRepositoryDomain) {
  return defineStore('POST_LIST',{
    state: ():{status: RequestStatus, pagination: PaginationDomain<PostListDomain>}=> {
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
      async getPosts(data: PaginationOptionsDomain) {
        const feedback = useFeedBackStore();

        this.$reset();
        this.status = RequestStatus.LOADING;
        return await useCaselistPosts(
            repository,
          )(data)
          .then(response => {
            
            this.status = RequestStatus.SUCCESS;
            this.pagination = response as  PaginationDomain<PostListDomain>;
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