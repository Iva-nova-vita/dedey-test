<template>
  <div class="home" >
    <img alt="Vue logo" src="../assets/logo.png">
    <CustomInput msg="Test" 
    :placeholder-text="placeholderText" 
    :file-size-limit="fileSizeLimit"
    @showFileName="showFileName"
    @validationfail="showErrorMsg"
    @passresponse="showResultArray"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import CustomInput from '@/components/CustomInput.vue'

export default {
  name: 'Home',
  data() {
    return {
      placeholderText: 'Перетащите сюда файл или нажмите чтобы выбрать',
      fileSizeLimit: 10
    }
  },
  components: {
    CustomInput
  },
  methods: {
    showFileName(file) {
      this.placeholderText=file.name;
      console.log(this.placeholderText)
    },
    showErrorMsg(error) {
      if (error=='failType') {
      this.placeholderText='Недопустимый тип файла';
      }
      if (error=='failSize') {
      this.placeholderText=`Допустимый размер файла ${this.fileSizeLimit}Мб, выберите другой файл`
      }
    },
    showResultArray(resultArray) {
      console.log("parent", resultArray)
    }

  }
}
</script>
