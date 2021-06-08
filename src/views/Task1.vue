<template>
<form  action = '#' method = 'GET'>
  <div id="searchBlock" class="search-block">

   <div id="placeBlock" class="place-block">
     <p id="placeBlockTitle" class="block-title">
        Место или название отеля
     </p>
     <div class="wrap">
       <img src="../assets/icon1.png" alt="place" class="place-icon">
       <input id="placeBlockInput" class="place-block-input" type="text" name="place" placeholder="Введите здесь место">
     </div>
    </div>

    
    <div id="dateBlock" class="date-block">
      <div class="wrap">
          <p id="startDateTitle" class="block-title">
              Заезд
          </p>
          <date-picker :lang="lang" v-model="time1" valueType="format" format="DD MMMM" id="start-date-input" placeholder="Введите дату"></date-picker>
      </div>
      <p>•</p>
      <div class="wrap">
        <p id="endDateTitle" class="block-title">
            Выезд
        </p>
        <date-picker :lang="lang" v-model="time2" valueType="format" format="DD MMMM" id="end-date-input" placeholder="Введите дату"></date-picker>
      </div>
    </div>

    <div id="roomBlock" class="room-block">
      <div class="wrap">
          <p id="roomTitle" class="block-title">
              Номера
          </p>
          <div class="flex-wrapper">
            <input id="roomInput" class="room-block-input" type="text"  name="room"  v-model="roomInputValue">
            <div class="buttons-wrap">
              <button type="button" @click="roomInputValue++" class="arrow-button">
                <img src="../assets/button1.png" alt="+">
              </button>
              <button type="button" @click="roomInputValue > 1 ? roomInputValue-- : roomInputValue" class="arrow-button">
                <img src="../assets/button2.png" alt="-">
              </button>
            </div>
          </div>
      </div>
      <div class="wrap">
          <p id="adultsTitle" class="block-title">
              Взрослые
          </p>
          <div class="flex-wrapper">
            <input id="adultsInput" class="room-block-input" type="text" name="adults" v-model="adultsInputValue" >
            <div class="buttons-wrap">
              <button type="button" @click="adultsInputValue++" class="arrow-button">
                <img src="../assets/button1.png" alt="+">
              </button>
              <button type="button" @click="adultsInputValue > 1 ? adultsInputValue-- : adultsInputValue" class="arrow-button">
                <img src="../assets/button2.png" alt="-">
              </button>
            </div>
          </div>
      </div>
      <div class="wrap">
          <p id="childrenTitle" class="block-title">
              Дети
          </p>
          <div class="flex-wrapper">
            <input id="childrenInput" class="room-block-input" type="text" name="children" v-model="childrenInputValue">
            <div class="buttons-wrap">
              <button type="button" @click="childrenInputValue++" class="arrow-button">
                <img src="../assets/button1.png" alt="+">
              </button>
              <button type="button" @click="childrenInputValue > 0 ? childrenInputValue-- : childrenInputValue" class="arrow-button">
                <img src="../assets/button2.png" alt="-">
              </button>
            </div>
          </div>
      </div>
    </div>

    <!--I did not understand the functionality of Plus button -->
    <div id="submitBlock" class="submit-block">
      <button  class="plus-button">
        <img src="../assets/button3.png" alt="Plus button">
      </button>

      <button type="submit" class="submit-button">
        <span class="submit-text">Найти</span>
      </button>
    </div>

  </div>
</form>
</template>

<script>
  import DatePicker from 'vue2-datepicker';
  import 'vue2-datepicker/index.css';

  import 'vue2-datepicker/locale/ru.js';

  export default {
    components: { DatePicker },
    data() {
      return {
        time1: null,
        time2: null,
        lang: {
          formatLocale: {
            months: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
          }
        },
        roomInputValue: 1,
        adultsInputValue: 1,
        childrenInputValue: 0
      };
    }
  };
</script>


<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@1,700&display=swap');
@font-face {
  font-family: 'ProximaNova-Bold';
  src: url('../assets/fonts/ProximaNova-Bold.woff');
  font-weight: bold;
  font-style: normal;
}
form {
  position: relative;
    .search-block {
      width: 100%;
      min-height: 90px;
      position: absolute;
      top: 50px;
      background-color: #ffffff;
      display: flex;
      box-shadow: 0px 0px 12px 0px rgba(0,0,0,0.55);
      border-radius: 5px;
      justify-content: space-between;
    p {
      text-align: left;
    }
    .wrap {
      text-align: left;
      position: relative;
    }
  }
  .place-block {
    width: 20%;
    padding: 10px 5px 10px 40px;
    position: relative;
    .wrap {
      align-items: center;
      display: block;
    }
  }
  .block-title {
    font-size: 12px;
    color: #232323;
  }
  .place-icon {
    margin-right: 7px;
    position: relative;
    top: 2px;
  }
  .place-block-input {
    border: none;
    font-size: 'Fira Sans', sans-serif;
    font-size: 18px;
    color: #6b6b6b;
    font-style: italic;
    font-weight: bold;
  }
  
  .block-text {
    font-size: 12px;
    color: #232323;
    font-style: italic;
  }
  .place-block-input {
    border: none;
    font-family: 'Fira Sans', sans-serif;
    font-size: 18px;
    color: #383838;
    font-style: italic;
    font-weight: bold;
  }
  .date-block {
    width: 35%;
    display: flex;
    padding: 10px 5px;
    justify-content: space-between;
    position: relative;
    &::before {
      content: url('../assets/line.png');
      position: absolute;
      left: -8%;
      top: 35px;
    }
    &::after {
      content: url('../assets/line.png');
      position: absolute;
      right: -3%;
      top: 35px;
    }
    &>p {
      font-size: 10px;
      padding-right: 36px;
      padding-top: 33px;
      color: #383838;
    }

  }
  .mx-datepicker {
    width: 100%;
  }
    input.mx-input {
      outline: none;
      border: none;
      font-size: 18px;
      font-family: 'Fira Sans', sans-serif;
      color: #383838;
      font-style: italic;
      font-weight: bold;
      padding: 6px 10px 6px 30px;
      width: 100%;
      box-shadow: none;
    }
  #start-date-input .mx-input-wrapper {
   top: -5px;
    &::before {
        content: url('../assets/icon2.png');
        position: absolute;
        left: 0px;
        top: 7px;
  }
    .mx-icon-calendar {
      left: 8px;
      display: none;
      
    }
  }
 
  #end-date-input .mx-input-wrapper {
    top: -5px;
    &::after {
        content: url('../assets/icon3.png');
        position: absolute;
        right: 5%;
        top: 7px;
  }
    .mx-icon-calendar {
      display: none;
      
    }
    input.mx-input {
      padding-left: 0;
    }
  }
  .flex-wrapper {
    display: flex;
  }
  .room-block {
    display: flex;
    width: 22%;
    padding: 10px 5px;
    .wrap {
      width: 33%;
      padding-left: 20px;
    }
    p {
      margin-bottom: 1px;
    }
    .room-block-input {
      width: 24px;
      height: 24px;
      border: 1px #8b9198 solid;
      box-shadow: none;
      text-align: center;
      margin-top: 5px;
      color: #8b9198;
    }
  }
    .arrow-button,
    .plus-button {
      background-color: transparent;
      border: none;
      cursor: pointer;
      display: block;
    }
    .plus-button img {
      position: relative;
      top: 2px;
    }
    .submit-block {
      width: 23%;
      display: flex;
      justify-content: flex-end;
    }
  .submit-button {
    border-radius: 1px;
    background-color: #ed9915;
    width: 175px;
    height: 65px;
    border: none;
    margin: 12px;
  }
  .submit-text {
    text-transform: uppercase;
    font-family: "ProximaNova-Bold";
    color: #ffffff;
    font-size: 16px;
    letter-spacing: 2px;
  }
}
@media screen and (min-width: 1350px)  {
  form .date-block::before {
    // left: -5%;
  }
  form .date-block > p {
    padding-right: 66px;
  }
  form .submit-block {
    width: 17%;
    justify-content: space-between;
  }
}
@media screen  and (min-width: 1141px) {
  form .place-block {
    padding-left: 20px;
  }
  
  form .place-block {
    width: 21%;
  }
  form .date-block {
    width: 33%;
}
  form .room-block {
    width: 16%;
}
  
}
@media screen  and (max-width: 1140px) {
  form .search-block {
    flex-direction: column;
    width: fit-content;
  }
  form .date-block,
  form .place-block,
  form .submit-block {
    width: 96%;
    padding-left: 20px;
  }
  form .room-block {
    width: 96%;
    padding-left: 0px;
  }
  
form .submit-block {
    justify-content: space-evenly;
}
  form .date-block::after,
  form .date-block::before {
    display: none;
  }
  form .date-block .wrap {
    width: 40%;
  }
  form #end-date-input .mx-input-wrapper::after {
    right: 22%;
  }
  
}
@media screen  and (max-width: 520px) {
  form .date-block {
    width: 90%;
  }
  form #end-date-input .mx-input-wrapper::after {
    right: 10%;
  }
}
@media screen  and (max-width: 460px) {
  form .date-block .wrap {
    width: auto;
  }
}
@media screen  and (max-width: 430px) {
  form input.mx-input,
  form .place-block-input {
    font-size: 14px;
  }
}
@media screen  and (max-width: 360px) {
  form .date-block > p {
    padding-right: 20px;
}
form #end-date-input .mx-input-wrapper::after {
    right: 3%;
}
form input.mx-input {
  padding-left: 25px;
}
}
</style>
