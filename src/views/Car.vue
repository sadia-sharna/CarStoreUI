<style>

  .search-input {
      border: 0;
      margin: 0;
      padding: 0.5rem calc(5rem + 0.5rem) 0.5rem 0.5rem;
      border-radius: 8px;
      width: 100% !important;
      background: #ddd;
      -webkit-appearance: none;
      font-size: 13px;
      border-radius: 32px !important;
  }

  .search-input:focus {
      outline: 0;
      background: white;
  }

  .search-form {
      margin-bottom: 0rem !important;
  }

  .has-search .form-control {
      padding-left: 2.375rem;
  }

  .has-search .form-control-feedback {
      position: absolute;
      z-index: 2;
      display: block;
      width: 1.1rem;
      height: 2.375rem;
      line-height: 2.375rem;
      margin-left: 1.8%;
      text-align: center;
      pointer-events: none;
      color: #00ADEE;
  }

  .form-control {
      border-radius: 5px !important;
      border: 1px solid #00ADEE !important;
  }

  .hover_class {
      position: absolute;
      z-index: 1;
  }

  .hover_class_advice {
      position: absolute;
      z-index: 1;
  }

  .dd-menu {
      position: absolute;
      top: 0px;
      left: 16px;
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 0;
      margin: 2px 0 0 0;
      box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.1);
      background-color: #ffffff;
      list-style-type: none;
      min-width: 508px !important;
  }

  .dd-input+.dd-menu {
      display: none;
  }

  .dd-input:checked+.dd-menu {
      display: block;
  }

  .dd-menu li {
      white-space: nowrap;
  }

  .dd-menu li:hover {
      background-color: #f7f7f7;
  }

  .scroll_search_list {
      max-height: 131px;
      overflow-y: scroll;
      overflow-x: hidden;
  }

  .scroll_details::-webkit-scrollbar {
      width: 7px;
  }


  /* Track */

  .scroll_details::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px #e4e5e6;
      border-radius: 10px;
      height: 15px;
  }


  /* Handle */

  .scroll_details::-webkit-scrollbar-thumb {
      /* background: rgb(40, 194, 250);  */
      background: rgb(171, 178, 180);
      border-radius: 10px;
  }

  .per_list {
      padding: 11px 20px 5px 20px;
      /* margin-top: 2px; */
      border-bottom: 1px solid #f1f1f1;
  }

  .per_list label {
      font-weight: 400 !important;
      color: #707379;
      text-transform: capitalize;
      margin-bottom: 0rem !important;
  }

  .per_list label:hover {
      cursor: pointer;
  }

  input:checked+label {
      color: rgb(56, 56, 56);
      font-weight: 500 !important;
  }

  .position_add_advice {
      left: 705px!important;
  }

  .width_97 {
      width: 96%!important;
  }
</style>

<template>

<div>
    <div class="container">
        <div class="input-group ">
            <input type="text" class="form-control" placeholder="Enter Menufacture Name..." aria-label="Recipient's username" aria-describedby="basic-addon2">
            <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button">Search</button>
            </div>
        </div>
        <ul class="list-group">
    <li class="list-group-item d-flex justify-content-between align-items-center">
      BMW

    </li>
    <li class="list-group-item d-flex justify-content-between align-items-center">
      Toyota

    </li>
    <li class="list-group-item d-flex justify-content-between align-items-center">
      Corolla

    </li>
  </ul>
    </div>





</div>

</template>

<script>

// @ is an alias to /src

export default {
    name: 'Car',

}

</script>
