<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.view_section_data") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">
          <!-- Start:: Image Upload Input -->
          <base-image-upload-input
            col="12"
            identifier="section_image"
            :preSelectedImage="data.image.path"
            :placeholder="$t('PLACEHOLDERS.image')"
            @selectImage="selectImage"
            disabled
          />
          <!-- End:: Image Upload Input -->

          <!-- Start:: Name Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.nameAr')"
            v-model.trim="data.name_ar"
            disabled
          />
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.nameEn')"
            v-model.trim="data.name_en"
            disabled
          />
          <!-- start category -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.main_category')"
            disabled
            v-model="data.mainCategory"
          />
          <!-- end category -->
          <!-- Start:: Deactivate Switch Input -->
          <div class="input_wrapper switch_wrapper my-5">
            <v-switch
              color="green"
              :label="
                data.active
                  ? $t('PLACEHOLDERS.active')
                  : $t('PLACEHOLDERS.notActive')
              "
              v-model="data.active"
              hide-details
              disabled
            ></v-switch>
          </div>
          <!-- End:: Deactivate Switch Input -->
          <!-- End:: Name Input -->
        </div>
      </form>
    </div>
    <!-- END:: Single Step Form Content -->
  </div>
</template>

<script>
export default {
  name: "EditAdmin",

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      // Start:: Data Collection To Send
      data: {
        image: {
          path: null,
          file: null,
        },
        name_ar: null,
        name_en: null,
        mainCategory: null,
        active: true,
      },
      // End:: Data Collection To Send
    };
  },

  computed: {},

  methods: {
    // Start:: Get Data To Edit
    async getDataToEdit() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `sub-categories/${this.id}`,
        });
        // console.log( "DATA TO EDIT =>", res.data.data.region );

        // Start:: Set Data
        this.data.image.path = res.data.data.SubCategory.image;
        this.data.name_ar = res.data.data.SubCategory.name_ar;
        this.data.name_en = res.data.data.SubCategory.name_en;
        this.data.mainCategory = res.data.data.SubCategory.category.name;
        // this.data.active = res.data.data.Category.is_active;

        this.data.active = res.data.data.SubCategory.is_active;
        // End:: Set Data
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    // End:: Get Data To Edit
  },

  async created() {
    // Start:: Fire Methods
    this.getDataToEdit();
    // End:: Fire Methods
  },
};
</script>
