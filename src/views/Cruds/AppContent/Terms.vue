<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("TITLES.terms") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">

          <!-- Start:: Name Input -->
          <!-- <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.titleAr')" v-model.trim="data.nameAr" required /> -->
          <!-- End:: Name Input -->

          <!-- Start:: Name Input -->
          <!-- <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.titleEn')" v-model.trim="data.nameEn" required /> -->
          <!-- Start:: Ar Content Text Editor -->
          <base-text-editor col="6" :placeholder="$t('PLACEHOLDERS.contentAr')" v-model.trim="data.contentAr" required />
          <!-- End:: Ar Content Text Editor -->

          <!-- Start:: En Content Text Editor -->
          <base-text-editor col="6" :placeholder="$t('PLACEHOLDERS.contentEn')" v-model.trim="data.contentEn" required />
          <!-- Start:: En Content Text Editor -->

          <!-- Start:: Submit Button Wrapper -->
          <div class="btn_wrapper">
            <base-button class="mt-2" styleType="primary_btn" :btnText="$t('BUTTONS.save')" :isLoading="isWaitingRequest"
              :disabled="isWaitingRequest" />
          </div>
          <!-- End:: Submit Button Wrapper -->
        </div>
      </form>
    </div>
    <!-- END:: Single Step Form Content -->
  </div>
</template>

<script>
export default {
  name: "TermsAndConditions",

  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      // Start:: Data Collection To Send
      data: {
        id: null,
        contentAr: null,
        contentEn: null
      },
      // End:: Data Collection To Send
    };
  },

  methods: {
    // Start:: Get Data To Edit
    async getDataToEdit() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `static-pages?name=terms_and_conditions`,
        });
        // Start:: Set Data
        this.data.id = res.data.data[0].id;
        this.data.contentAr = res.data.data[0].value.ar;
        this.data.contentEn = res.data.data[0].value.en;
        // End:: Set Data
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    // End:: Get Data To Edit

    // Start:: validate Form Inputs
    validateFormInputs() {
      this.isWaitingRequest = true;

      // Updated regex patterns to accept numbers and signs along with letters
      const arabicRegex = /^[\u0600-\u06FF\s0-9!@#$%^&*()\-_=+[\]{};:'",.<>?`~|]+$/;
      const englishRegex = /^[a-zA-Z\s0-9!@#$%^&*()\-_=+[\]{};:'",.<>?`~|]+$/;

      // Remove HTML tags from contentAr and contentEn
      const contentArWithoutHTML = this.stripHTMLTags(this.data.contentAr);
      const contentEnWithoutHTML = this.stripHTMLTags(this.data.contentEn);

      if (!contentArWithoutHTML) {
        this.showErrorAndReset("VALIDATION.contentAr");
      } else if (!contentEnWithoutHTML) {
        this.showErrorAndReset("VALIDATION.contentEn");
      } else if (!arabicRegex.test(contentArWithoutHTML)) {
        this.showErrorAndReset("VALIDATION.content_arabic_required");
      } else if (!englishRegex.test(contentEnWithoutHTML)) {
        this.showErrorAndReset("VALIDATION.content_english_required");
      } else {
        this.submitForm();
      }
    },

    stripHTMLTags(html) {
      // Use regex to strip HTML tags
      return html ? html.replace(/<[^>]+>/g, '') : '';
    },

    showErrorAndReset(errorMessageKey) {
      this.isWaitingRequest = false;
      this.$message.error(this.$t(errorMessageKey));
    },
    // End:: validate Form Inputs

    // Start:: Submit Form
    async submitForm() {

      const REQUEST_DATA = new FormData();
      // Start:: Append Request Data
      REQUEST_DATA.append("key", "terms_and_conditions");
      REQUEST_DATA.append("value_ar", this.data.contentAr);
      REQUEST_DATA.append("value_en", this.data.contentEn);
      REQUEST_DATA.append("_method", "PUT");

      try {
        await this.$axios({
          method: "POST",
          url: `static-pages/${this.data.id}`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.savedSuccessfully"));
        this.getDataToEdit();
        this.$router.push('/');
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.message);
      }
    },
    // End:: Submit Form
  },

  created() {
    // Start:: Fire Methods
    this.getDataToEdit();
    // End:: Fire Methods
  },
};
</script>
