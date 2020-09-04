<style>


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
        <ul class="list-group" v-show="false">
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
        <div class="w-50 border border-dark mt-4">
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
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in CarList" :key="index">
                    <th scope="row">{{index+1}}</th>
                    <td>{{item.Manufacturer}}</td>
                    <td>{{item.Model}}</td>
                    <td>{{item.Year}}</td>
                    <td>{{item.ProducingCountry}}</td>
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

            datalabels: ['React', 'Vanilla JS', 'JQuery', 'VueJS'],
            dataset: [5, 10, 15, 25],
            myChart: undefined,

            TotalCount: 1,
            PageNumber: 1,
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
                    this.getCarsbyPagination()
                },

                deep: true
        }
    },
    methods: {
        getCarsbyPagination() {
                this.CarPagination.PageSize = 10
                this.CarPagination.PageNumber = this.PageNumber
                this.ResponseModel.Data = this.CarPagination

                axios
                    .post(this.$apiUrl + 'Car/GetCarsByPagination', this.ResponseModel, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        }
                    })
                    .then(response => {
                        if (response.data.Status == true) {
                            this.CarList = response.data.Data.CarList
                            if (response.data.Data.TotalCount > this.CarPagination.PageSize)
                                this.TotalCount = Math.ceil(response.data.Data.TotalCount / this.CarPagination.PageSize)
                            else this.TotalCount = 1

                            this.getPieChart(response.data.Data)
                        }
                    })
                    .catch(error => {
                        if (error) throw new Error(error)
                    })
            },

            getPieChart(item) {
                let colorsList = []
                let i

                for (i = 0; i < item.CountForPieChart.length; i++) {
                    colorsList.push('#' + ((Math.random() * 0xffffff) << 0).toString(16))
                }

                var ctx = document.getElementById('myChart').getContext('2d')
                if (this.myChart) {
                    this.myChart.destroy()
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
                })
            }
    }
}

</script>
