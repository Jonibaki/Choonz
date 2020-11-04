let user_id = get_cookie_value("user_id");
getUserPlaylists(user_id)


function get_cookie_value(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}





function getUserPlaylists(user_id){
fetch('http://localhost:8082/users/read/' + user_id)
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      console.log('Fetch Success')
      response.json().then(function(dataData) {
        console.log(dataData);

        let table = document.querySelector("table");
        let data = Object.keys(dataData);
        console.log(data);

        createTableHead(table,data);
        createTableBody(table,dataData);
       


      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}

function createTableHead(table, data){
    let tableHead = table.createTHead();
    let row = tableHead.insertRow();
  
    for(let keys of data){
        console.log(keys);
      if(keys == "playList"){
        // let arr = dataData[keys];
        // for(obj in arr){
        //     console.log(obj[0].name);
        // }
        // console.log(arr)
        let id = document.createElement("th");
        let idText = document.createTextNode("Playlist");
        id.appendChild(idText);
        row.appendChild(id);

        let id1 = document.createElement("th");
        let idText1 = document.createTextNode("Add");
        id1.appendChild(idText1);
        row.appendChild(id1);
           
  
      }}
  
  
  }


  function createTableBody(table, dataData){
    for(let key in dataData){
        
      if(key == "playList"){
        let arr = dataData[key];
        for(let i = 0; i < arr.length; i++){
          let obj = arr[i];

          
          
          let row = table.insertRow();
  
          for(let prop in obj){
            if (prop == 'users'){

            } 
            else if(prop == 'tracks'){
                var trackids = [];
                let arr1 = obj[prop];
                
                for (let i = 0; i < arr1.length; i++){
                    let obj1 = arr1[i];
                    console.log(obj1);
                    
                    for(let prop in obj1){
                        if(prop == 'id'){
                            trackids.push(obj.tracks[i].id);
                            
                        }
                    }
                }
                console.log(trackids);



            }
            else if(prop == 'id'){
                var playlist_id = obj.id;
            }
            else if(prop == 'artwork'){
                var updated_artwork = obj.artwork;
            }
            else if(prop == 'description'){
                var updated_description = obj.description;
            }
            else if(prop == 'name'){
                let cell = row.insertCell();
                let text = document.createTextNode(obj[prop]);
                cell.appendChild(text);

                var updated_play_name = obj.name;

            }
           
            
            // console.log(prop);
            // console.log(obj[prop]);
            
            
            

            

            
          }
            let cell2 = row.insertCell();
            let a2 = document.createElement('a');
            a2.innerHTML = "Add";
            a2.className = "btn btn-primary";
            a2.onclick = function(){myfunc(updated_play_name, updated_artwork, updated_description, playlist_id, trackids);}
            cell2.appendChild(a2);
        }
        }
    }
}

function myfunc(updated_play_name, updated_artwork, updated_description, playlist_id, trackids){
    const params = new URLSearchParams(window.location.search);

    for(let param of params){
        var trackid = param[1];
    }
    trackids.push(trackid);
    // var newtrackids = [];
    // for (let i = 0; i < trackids.length; i++){
    //     newtrackids.push('id :' + trackids[i]);
        
    // }
    // console.log(newtrackids);
    // let pj = JSON.stringify(newtrackids);
    // console.log(pj);

    let json_sufffix = "]}'"
  
  // var json_prefix = '{"name": \"' + updated_play_name + '\","description":\"' + updated_description + '\","artwork" :\"' +
  //   updated_artwork + '\", "users": {"user_id" :' + get_cookie_value("user_id") + '}, "tracks":[{"id":3}, {"id" : 4}]}';

  var json_prefix = '{"name": \"' + updated_play_name + '\","description":\"' + updated_description + '\","artwork" :\"' +
  updated_artwork + '\", "users": {"user_id" :' + get_cookie_value("user_id") + '}, "tracks":[';
 
  // var json_prefix = "'\"name\" :  First half, \"tracks\" : ["; 
 
  for (let i = 0; i < trackids.length; i++) {
    if (trackids.length == 1 || trackids.length - 1 == i) {
      json_prefix = json_prefix.concat("{\"id\" : " + trackids[i].toString() + "}"+json_sufffix);
    } else {
      json_prefix = json_prefix.concat("{\"id\" : " + trackids[i].toString() + "},")
    }
  }
  console.log(json_prefix);

    

    

    
    
    

    
    

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    // let dataToUpdate = {
    //   "name": updated_play_name,
    //   "artwork" : updated_artwork,
    //   "description": updated_description,
    //   "tracks" : newtrackids,
    //   "users": {
  
    //     "user_id" : get_cookie_value("user_id")
    //   }
    // }
    // console.log(dataToUpdate);
    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: JSON.parse(JSON.stringify(json_prefix)),
      redirect: 'follow'
    };
  
    fetch("http://localhost:8082/playlists/update/" + playlist_id, requestOptions)
  
      .then(function (data) {
  
        console.log('Request succeeded with JSON response', data);
        // document.getElementById("show-msg").innerHTML = "User details Updated";
        // $('#messageModal').modal('show');
  
      })
      .catch(function (error) {
        console.log('Request failed', error);
        // document.getElementById("show-msg").innerHTML = "Failed to Update user";
        // $('#messageModal').modal('show');
      });
    
}

