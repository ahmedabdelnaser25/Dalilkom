import AppThemeActions from "./actions.js";
import AppThemeGetters from "./getters.js";
import AppThemeMutations from "./mutations";

export default {
  namespaced: true,

  state: {
    // START:: THEME DATA
    dalilkum_admin_dashboard_theme: localStorage.getItem(
      "dalilkum_admin_dashboard_theme"
    ),
    // END:: THEME DATA
  },

  mutations: AppThemeMutations,
  actions: AppThemeActions,
  getters: AppThemeGetters,
};
