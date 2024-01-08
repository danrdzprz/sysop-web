// import { defineStore } from 'pinia';
// import service from '../services/catalog.service';
// import { useFeedBackStore } from './feedback.store';

// export const useCatalogs = defineStore('CATALOGS', {
//     state: () => ({ 
//         roles:{
//           loading:false,
//           status:false,
//           data:[]
//         },
//         categories:{
//           loading:false,
//           status:false,
//           data:[]
//         },
//      }),
//     getters: {
//       get_roles: (state) => state.roles,
//       get_categories: (state) => state.categories,
//     },
//     actions: {
//       async getRoles() {
//         this.roles.data = [];
//         const feedback = useFeedBackStore();
//         this.roles.loading = true;
//         this.roles.status = false;
//         return await service.roles()
//         .then(response => {
//           this.roles.loading = false;
//           this.roles.status = true;
//           this.roles.data = response.data;
//           return response.data;
//         })
//         .catch(error => {
//           this.roles.data = [];
//           this.roles.loading = false;
//           this.roles.status = false;
//           try {
//             feedback.openError({message:error.response.statusText});
//             this.roles.data = error.response.data.errors;
//             return error.response.data;
//           } catch (error) {
//             feedback.openError({message:'Error en el servidor'});
//             return null;
//           }
//         });
//       },
//       async getCategories() {
//         this.categories.data = [];
//         const feedback = useFeedBackStore();
//         this.categories.loading = true;
//         this.categories.status = false;
//         return await service.categories()
//         .then(response => {
//           this.categories.loading = false;
//           this.categories.status = true;
//           this.categories.data = response.data;
//           return response.data;
//         })
//         .catch(error => {
//           this.categories.data = [];
//           this.categories.loading = false;
//           this.categories.status = false;
//           try {
//             feedback.openError({message:error.response.statusText});
//             return error.response.data;
//           } catch (error) {
//             feedback.openError({message:'Error en el servidor'});
//             return null;
//           }
//         });
//       },
//     }
// });