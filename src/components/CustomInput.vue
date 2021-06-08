<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div >
      <form id="form" @submit.prevent>
        <input 
          type="file"
          multiple="false"
          ref="myFile" 
          id="input_upload_file" 
          class="input_file" 
          accept=".xls, .xlsx"
          v-on:change="onchange"
        >
        <label 
          for="input_upload_file" 
          id="drop-area" 
          @dragenter="dragenter"
          @dragover="dragover"
          @dragleave="dragleave"
          @drop="drop"
          :class="{highlight: isHighlight}"
        >{{placeholderText}}</label>
        <button type="submit" id="button_submit" class="btn_submit" @click="onSubmit">Отправить</button>
      </form>
    </div>
  </div>
</template>

<script>
import XLSX from 'xlsx';
export default {
  name: 'HelloWorld',
  data() {
    return {
      dropArea: "",
      isHighlight: false,
      fileList: [],
      customFile: {},
      isFileTypeValid: false,
      isFileSizeValid: false,
      parsedArray: []
      
    }
  },
  props: {
    msg: String,
    placeholderText: {
      type: String,
      default: "Нажмите для выбора или перетащите сюда файл"
    },
    fileSizeLimit: {
      type: Number,
      default: 10
    }
  },
  methods: {
    dragenter(e) {
      e.stopPropagation();
      e.preventDefault();
      this.isHighlight=true
    },
    dragover(e) {
      e.stopPropagation();
      e.preventDefault();
      this.isHighlight=true
    },
    dragleave(e) {
      e.stopPropagation();
      e.preventDefault();
      this.isHighlight=false
    },
    drop(e) {
      e.stopPropagation();
      e.preventDefault();
      this.isHighlight=false
      console.log(e.dataTransfer.files[0]);
      this.fileList = e.dataTransfer.files;
      this.customFile = this.fileList[0];
      this.validationFile();
    },
    onchange() {
      console.log('onchange', this.$refs.myFile.files )
      this.fileList = this.$refs.myFile.files;
      this.customFile = this.fileList[0];
      this.validationFile();
    },
    validationFile() {
      this.fileTypeValidation();
      this.fileSizeValidation();
      if (this.isFileTypeValid && this.isFileSizeValid) {
        this.$refs.myFile.files = this.fileList;
        this.$emit('showFileName', this.customFile);
        console.log('this.fileList', this.fileList);  
        this.sheetToJson()
      } else {
        console.log(this.$refs.myFile)
        console.log(this.$refs.myFile.files)
        this.$refs.myFile.value=''
      }
    },
    fileTypeValidation() {
      if (this.customFile.name.endsWith('.xls') || this.customFile.name.endsWith('.xlsx')) {
        this.isFileTypeValid = true;
      } else {
        this.isFileTypeValid = false;
        this.showErrorMsg('failType');       
      } 
    },
    fileSizeValidation() {
      if (this.customFile.size / 1024 / 1024 < this.fileSizeLimit) {
        this.isFileSizeValid = true;
      } else {
        this.isFileSizeValid = false;
        this.showErrorMsg('failSize');       
      } 
    },
    sheetToJson(){
      var reader = new FileReader();
        reader.onload = (e)=> {
        var data = new Uint8Array(e.target.result);
        var workbook = XLSX.read(data, {type: 'array'});
        console.log(workbook)
        
        var first_sheet_name = workbook.SheetNames[0];

        var worksheet = workbook.Sheets[first_sheet_name];
        
        this.parsedArray=XLSX.utils.sheet_to_json(worksheet,{raw:true})
        console.log("child", this.parsedArray);
      };
      reader.readAsArrayBuffer(this.customFile);
          },
    showErrorMsg(error) {
      this.$emit('validationfail', error)
    },
    onSubmit() {
      let xhr = new XMLHttpRequest();
      
      xhr.open("POST", "http://193.243.158.230:4500/api/import", true);
      xhr.setRequestHeader("Authorization", "test-task");
      xhr.send({
        resultArray: this.parsedArray
      }
      );
      
      xhr.onload = ()=> {
        if (xhr.status != 200) { 
          console.log(`Ошибка ${xhr.status}: ${xhr.statusText}`);
        } else {
          console.log(`Готово, получили ${xhr.response.length} байт`); 
          this.$emit("passresponse", this.parsedArray);
          console.log(this.parsedArray)
        }
      };
    }
  }
}
</script>

<style scoped lang="scss">

a {
  color: #42b983;
}
input {
  display: block;
  margin: 20px auto;
}
.input_file {
  display: none;
}

#drop-area {
  width: 90%;
  height: 200px;
  border: 2px gray dashed;
  display: flex;
  margin: 20px auto;
  justify-content: center;
  align-items: center;
  background: #c0f3e7;
  cursor: pointer;
}
#drop-area.highlight {
  border-color: rgb(51, 5, 179);
}
.btn_submit {
  width: 150px;
  height: 50px;
}
</style>
