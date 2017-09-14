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
        this.loadListGroups();
        // EVENT --> on choisi son groupe
        // Load les cours du groupe
        // EVENT --> choisir son jour
        // Afficher les cours du jour
        // EVENT --> cliquer sur un cours pour voir le détail
        // Afficher le détail du cours
    },

    // Load groups
    loadListGroups: function(){
        var request = new XMLHttpRequest();
        request.open("GET", "/groups", false);
        request.send(null);
        var my_JSON_object = JSON.parse(request.responseText);
        var select = $('#groups');
        my_JSON_object.forEach(function(element) {
            innerHtml += "<li class='list__item'>" +
                "<div class='name'><a href='"+element.html_url+"'>"+element.name+"</a></div>" +
                "<div class='avatar'><img src='"+element.owner.avatar_url+"' alt=''></div>" +
                "<div class='repos_name'><a href="+element.owner.url+">"+element.owner.login+"</a></div>" +
                "</li>";
        });
    }

    loadCourseDay: function(day){
        $.ajax({
            method: 'GET',
            url: '/courses/' + day,
            datatype: 'json',
            success: function(data){
                var dataParsed = $.parseJSON(data);
                this.onGetCourses(dataParsed);
            }
        })
        this.eventCourseDay();
    }

    eventCourseDay: function(){
        jQuery('body').on('click', '.day', function(e){
              e.preventDefault();
              var date = $(this).data('date');
              this.loadCourseDay(date);
        });
    }

    onGetCourses: function(data){

    }
};

app.initialize();