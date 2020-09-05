<style>



</style>

<template>

<div>
    <div class="container">
        <!-- <h4>Car Store</h4> -->

        <button type="button" class="btn btn-primary float-left mb-4" data-toggle="modal" data-target="#AddCarModal" @click="clear();">Add Car</button>
        <div class="modal fade" id="AddCarModal" tabindex="-1" role="dialog" aria-labelledby="AddCarModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="AddCarModalLabel">Car Form</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <label class="float-left">Manufacturer</label>
                                <input type="text" class="form-control"placeholder="BMW" v-model="CarModel.Manufacturer">
                            </div>
                            <div class="form-group">
                                <label class="float-left">Model</label>
                                <input type="text" class="form-control"placeholder="Isetta" v-model="CarModel.Model">
                            </div>
                            <div class="form-group">
                                <label class="float-left">Year</label>
                                <input type="number" class="form-control"placeholder="2000" v-model="CarModel.Year">
                            </div>
                            <div class="form-group">
                                <label class="float-left">Producing Country</label>
                                <input type="text" class="form-control" placeholder="Germany" v-model="CarModel.ProducingCountry">

                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-primary" @click="addorUpdatenewCar()" data-dismiss="modal">{{submitBtn}}</button>
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="DeleteCarModal" tabindex="-1" role="dialog" aria-labelledby="DeleteCarModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="DeleteCarModalLabel">Alert!</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        Do you really want to delete
                        <b>{{deleteModel.Manufacturer}} {{deleteModel.Model}} {{deleteModel.Year}} {{deleteModel.ProducingCountry}} </b> ?
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-primary"  data-dismiss="modal">No</button>
                      <button type="button" class="btn btn-danger" data-dismiss="modal" @click="deleteCar()">Yes</button>

                    </div>
                </div>
            </div>
        </div>


        <div class="input-group ">
            <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">
            Search
           </span>
            </div>
            <input type="text" class="form-control" placeholder="Enter Menufacture Name..." aria-label="Recipient's username" aria-describedby="basic-addon2" v-model="CarPagination.Manufacturer" @keyup="keyUponSearch()" @keydown="keyDownOnSearch()" @keyup.enter="searchCarsByManufacturerWithPagination(CarPagination.Manufacturer)"
            @input="showSearchItems=true;" ref="searchBox">
            <!-- <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button">Search</button>
            </div> -->
        </div>
        <ul class="list-group" v-if="filteredList.length>0" v-show="showSearchItems" v-closable="{
          exclude: ['searchBox'],
          handler: 'onClose'
          }">
            <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center" v-for="(item, index) in filteredList" :key="index" @click="searchCarsByManufacturerWithPagination(item);showSearchItems=false;">
                {{item}}

            </a>

        </ul>
        <div class="w-50 border border-secondary mt-4">
            <canvas id="myChart"></canvas>
        </div>
        <table class="table table-bordered table-hover mt-4">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Manufacturer</th>
                    <th scope="col">Model</th>
                    <th scope="col">Year</th>
                    <th scope="col">Producing Country</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in CarList" :key="index">
                    <th scope="row">{{index+1}}</th>
                    <td>{{item.Manufacturer}}</td>
                    <td>{{item.Model}}</td>
                    <td>{{item.Year}}</td>
                    <td>{{item.ProducingCountry}}</td>
                    <td>
                      <button type="button" class="btn btn-primary" @click="updateCarClick(item)" data-toggle="modal" data-target="#AddCarModal">Edit</button>
                      <button type="button" class="btn btn-danger ml-2" @click="deleteCarClick(item,index)" data-toggle="modal" data-target="#DeleteCarModal">Delete</button>

                    </td>
                </tr>

            </tbody>
        </table>
        <v-pagination v-show="CarList.length>0" v-model="PageNumber" :page-count="TotalCount" :classes="bootstrapPaginationClasses" :labels="paginationAnchorTexts"></v-pagination>
    </div>

</div>

</template>

<script>

// @ is an alias to /src
import axios from 'axios'
import vPagination from 'vue-plain-pagination'

export default {
    name: 'Car',
    data() {
        return {
            userdata: {},
            ResponseModel: {},
            CarPagination: {},
            CarList: [],
            CarModel:{},
            TotalCount: 1,
            PageNumber: 1,
            typingTimer: 0,
            typingInterval: 1000,
            filteredList: [],
            showSearchItems: false,
            submitBtn: "Save",
            deleteModel:{},
            deleteindex:0,
            bootstrapPaginationClasses: {
                ul: 'pagination',
                li: 'page-item',
                liActive: 'active',
                liDisable: 'disabled',
                button: 'page-link'
            },
            paginationAnchorTexts: {
                first: 'First',
                prev: 'Previous',
                next: 'Next',
                last: 'Last'
            }
        }
    },
    components: {
        vPagination
    },
    mounted() {
        this.getCarsbyPagination()
    },

    watch: {

        PageNumber: {
            handler() {
                    if (this.CarPagination.Manufacturer) {
                        this.searchCarsByManufacturerWithPagination();
                    } else {
                        this.getCarsbyPagination();
                    }

                },

                deep: true
        }
    },
    methods: {
            onClose() {
                this.showSearchItems = false;
            },

            getCarsbyPagination() {
                this.CarPagination.PageSize = 10;
                this.CarPagination.PageNumber = this.PageNumber;
                this.ResponseModel.Data = this.CarPagination;

                axios
                    .post(this.$apiUrl + 'Car/GetCarsByPagination', this.ResponseModel, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        }
                    })
                    .then(response => {
                        if (response.data.Status == true) {
                            this.CarList = response.data.Data.CarList;
                            if (response.data.Data.TotalCount > this.CarPagination.PageSize)
                                this.TotalCount = Math.ceil(response.data.Data.TotalCount / this.CarPagination.PageSize);
                            else this.TotalCount = 1;

                            this.getPieChart(response.data.Data);
                        }
                    })
                    .catch(error => {
                        if (error) throw new Error(error)
                    })
            },

            getPieChart(item) {
                let colorsList = [];
                let i;

                for (i = 0; i < item.CountForPieChart.length; i++) {
                    colorsList.push('#' + ((Math.random() * 0xffffff) << 0).toString(16));
                }

                var ctx = document.getElementById('myChart').getContext('2d');
                if (this.myChart) {
                    this.myChart.destroy();
                }
                this.myChart = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: item.ManufacturersForPieChart,
                        datasets: [{
                            backgroundColor: colorsList,

                            data: item.CountForPieChart
                        }]
                    }
                });
            },

            keyUponSearch() {
                clearTimeout(this.typingTimer);
                this.typingTimer = setTimeout(this.autosuggestionByManufacturer, this.typingInterval);
            },
            keyDownOnSearch() {
                clearTimeout(this.typingTimer);
            },
            autosuggestionByManufacturer() {

                this.ResponseModel.Status = true;
                this.ResponseModel.Data = this.CarPagination;
                axios.post(this.$apiUrl + 'Car/AutosuggestionByManufacturer',
                        this.ResponseModel, {
                            headers: {
                                'Content-Type': 'application/json',
                                'Access-Control-Allow-Origin': '*',
                            },
                        })
                    .then(response => {

                        if (response.data.Status == true) {
                            if (response.data.Data.ManufacturerList.length > 0) {
                                this.filteredList = response.data.Data.ManufacturerList;
                            } else this.filteredList = [];
                        }

                    })
                    .catch(error => {
                        if (error) throw new Error(error)
                    });


            },
            searchCarsByManufacturerWithPagination(item) {
                if (item == undefined || item == "") {
                    this.getCarsbyPagination();
                } else {
                    this.CarPagination.PageSize = 10;
                    this.CarPagination.PageNumber = this.PageNumber;
                    this.CarPagination.Manufacturer = item;
                    this.ResponseModel.Status = true;
                    this.ResponseModel.Data = this.CarPagination;
                    axios.post(this.$apiUrl + 'Car/SearchCarsByManufacturerWithPagination',
                            this.ResponseModel, {
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Access-Control-Allow-Origin': '*',
                                },
                            })
                        .then(response => {

                            if (response.data.Status == true) {
                                if (response.data.Data.CarList.length > 0) {

                                    this.CarList = response.data.Data.CarList;
                                    if (response.data.Data.TotalCount > this.CarPagination.PageSize)
                                        this.TotalCount = Math.ceil(response.data.Data.TotalCount / this.CarPagination.PageSize);
                                    else this.TotalCount = 1;

                                    this.getPieChart(response.data.Data);
                                } else this.CarList = response.data.Data.CarList;
                            }

                        })
                        .catch(error => {
                            if (error) throw new Error(error)
                        });

                }



            },
            addorUpdatenewCar(){
              if(this.submitBtn == "Save"){
                this.addnewCar();
              }
              else if(this.submitBtn == "Update"){
                this.updateCar();
              }
            },

            addnewCar(){

              this.ResponseModel.Data = this.CarModel;

              axios
                  .post(this.$apiUrl + 'Car/AddCar', this.ResponseModel, {
                      headers: {
                          'Content-Type': 'application/json',
                          'Access-Control-Allow-Origin': '*'
                      }
                  })
                  .then(response => {
                      if (response.data.Status == true) {
                          this.CarList.push(response.data.Data);
                          this.clear();
                      }
                  })
                  .catch(error => {
                      if (error) throw new Error(error)
                  })
            },

            updateCar(){
              this.ResponseModel.Data = this.CarModel;

              axios
                  .post(this.$apiUrl + 'Car/UpdateCar', this.ResponseModel, {
                      headers: {
                          'Content-Type': 'application/json',
                          'Access-Control-Allow-Origin': '*'
                      }
                  })
                  .then(response => {
                      if (response.data.Status == true) {
                          this.clear();
                      }
                  })
                  .catch(error => {
                      if (error) throw new Error(error)
                  })
            },

            updateCarClick(item){
              this.submitBtn = "Update";
              this.CarModel = item;
            },

            deleteCarClick(item,index){
              this.deleteModel = item;
              this.deleteindex = index;
            },
            deleteCar(){
              this.ResponseModel.Data = this.deleteModel;

              axios
                  .post(this.$apiUrl + 'Car/DeleteCar', this.ResponseModel, {
                      headers: {
                          'Content-Type': 'application/json',
                          'Access-Control-Allow-Origin': '*'
                      }
                  })
                  .then(response => {
                      if (response.data.Status == true) {
                          this.CarList.splice(this.deleteindex,1);
                          this.clear();
                      }
                  })
                  .catch(error => {
                      if (error) throw new Error(error)
                  })

            },
            clear(){
              this.CarModel = {};
              this.submitBtn = "Save";
            },



    }
}

</script>
