/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        // Load all enable groups
        this.loadListGroups();
        // EVENT --> choisir son jour
        // Afficher les cours du jour
        // EVENT --> cliquer sur un cours pour voir le détail
        // Afficher le détail du cours
    },

    // Load groups
    loadListGroups: function(){
        var that = this;
        that.selectGroup = $('#groups');
        // Get groups
        $.ajax({
            url: '/groups',
            dataType: "json",
            method : 'GET',
            success: function(data){
                var groups = JSON.parse(data);
                that.onLoadListGroups(groups);
            }
        });

        // LOAD Event Get all courses from a group
        that.eventGetAllCourses();
    },

    onLoadListGroups: function(groups){
        var that = this;
        groups.each(function(element){
            // Create option for each group
            var option = "<option value='"+element.id+"'>"+element.name+"</option>";
            that.selectGroup.append(option);
        });
    },

    getAllCourses: function(group){
        $.ajax({
            url: "/courses/"+group,
            dataType: "json",
            method : 'GET',
            success: function(data){
                var courses = JSON.parse(data);
                that.onGetAllCourses(courses);
            }
        });
    },

    onGetAllCourses: function(courses){
        courses.each(function(element){

        });
    },

    eventGetAllCourses: function(){
        var that = this;
        // Detect when group is choose
        that.selectGroup.on('change', function(){
            // Get ID of selected group
            var currentGroup = $(this).val();

            that.getAllCourses(currentGroup);
        });
    },

    onGetSingleCourse: function(data){
        $("#singleCourse").append();
    },

    getSingleCourse: function(id){
        jQuery.ajax({
          url: '/course/'+id,
          dataType: "json",
          method : 'GET',
          success: function(data){
            this.onGetSingleCourse(data);
          }
        });
    },

    eventSingleCourse: function(){
        var id;
        $(".course a").click(function() {
            id = $(this).data('id');
        });

        this.getSingleCourse(id);
    }
};

app.initialize();