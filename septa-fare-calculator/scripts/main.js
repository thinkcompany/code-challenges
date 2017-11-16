(function (){

    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://rawgit.com/thinkcompany/code-challenges/master/septa-fare-calculator/fares.json', true);

    xhr.onload = function(){
        if(this.status == 200){
            results = this.responseText;
            gogogadget(results);
           
        } else if(this.status = 404){
            console.log('Not Found'); //unlikely
        }
    }

    xhr.send();

    function gogogadget(key) {
        key = JSON.parse(key);
        //generates where dropdown
        for (var i = 0; i < key.zones.length; i++){ 
            var x = document.createElement("option");
            x.value = key.zones[i].name;
            x.text = x.value;
            document.getElementById('where').appendChild(x);      
        }
        //Listen for where changes and setup when
        document.getElementById('where').addEventListener('change', function(evt){
            //resets section
            while (document.getElementsByClassName('when_section')[0].children[1].hasChildNodes()){
                if (document.getElementsByClassName('when_section')[0].children[1].length == 1){
                    break;
                }
                document.getElementsByClassName('when_section')[0].children[1].removeChild(document.getElementsByClassName('when_section')[0].children[1].lastChild);
            }
            //if where selection is not "Make a selection"
            if(evt.target.value !== "none"){
                for (var i = 0; i < key.zones.length; i++){
                    if(key.zones[i].name == evt.target.value){
                        for(var a = 0; a < key.zones[i].fares.length; a++){
                            if(a==0){
                                var y = document.createElement("option");
                                y.value = key.zones[i].fares[a].type;
                                y.text = y.value;
                                if (y.text.includes("_")){
                                    y.text = y.text.replace("_" , " - ");
                                }else {
                                    y.text = y.text; 
                                }
                                document.getElementById('when').appendChild(y);
                            }
                            if (a>=1){
                                //avoiding duplicates
                                if(key.zones[i].fares[a].type !== key.zones[i].fares[a-1].type)//hacky idk
                                {
                                    var y = document.createElement("option");
                                    y.value = key.zones[i].fares[a].type;
                                    y.text = y.value;
                                    if (y.text.includes("_")){
                                        y.text = y.text.replace("_" , " - ");
                                    }else {
                                        y.text = y.text; 
                                    }
                                    //add dropdown then show
                                    document.getElementById('when').appendChild(y);  
                                    document.getElementsByClassName('when_section')[0].style.display = 'block';
                                }
                            }
                        }
                    }
                }
            }
            //if it is "Make a selection", make everything hidden (again)
            if(evt.target.value == "none"){
                document.getElementsByClassName('when_section')[0].style.display = 'none';
                document.getElementsByClassName('purchase_section')[0].style.display = 'none';
                document.getElementsByClassName('quantity_section')[0].style.display = 'none';
                document.getElementById("total_fare").style.display = 'none';
                document.getElementById("notes").style.display= 'none';
            }

        });

        //Listen for when changes and setup purchase options
        document.getElementById('when').addEventListener('change', function(event){
            //reset
            while (document.getElementsByClassName('purchase_section')[0].hasChildNodes() && document.getElementsByClassName('purchase_section')[0].children.length > 1){
                if (document.getElementsByClassName('purchase_section')[0].children.length == 1){
                    break;
                }
                document.getElementsByClassName('purchase_section')[0].removeChild(document.getElementsByClassName('purchase_section')[0].lastChild);
            }
            //if when selection is not "Make a selection"
            if(event.target.value !== "none"){

                where = document.getElementById("where").value;
                for (var i = 0; i < key.zones.length; i++){

                    if(key.zones[i].name == where){
                        var e = document.getElementById("when");
                        b1 = e.value;
                        for(var a = 0; a < key.zones[i].fares.length; a++){
                            if(b1 == key.zones[i].fares[a].type){
                                trips= key.zones[i].fares[a].trips;
                                price=key.zones[i].fares[a].price;

                                var z = document.createElement("input");
                                z.setAttribute("type", "radio");
                                gold = key.zones[i].fares[a].purchase;
                                z.name = 'purchase_choice';
                                z.text = gold;
                                z.value = gold;
                                z.className = "p_options";
                                if (z.value.includes("_")){
                                    z.value = z.value.replace("_" , " ");
                                }
                                //key bit here, passes max trips and price
                                z.onclick = function() {
                                    generateRides(trips, price);
                                };

                                var para = document.createElement("p");
                                para.style.display = 'inline-block';
                                var node = document.createTextNode(z.value);
                                para.appendChild(node);
                                
                                //line'em up
                                document.getElementById('purchase').appendChild(z);  
                                document.getElementById('purchase').insertBefore(para,z);

                            }

                        }
                        
                    }
                }
                // setup auto bottom margin 
                adjustButtom();
                document.getElementsByClassName('purchase_section')[0].style.display = 'block';
             }
             //if it is "Make a selection", make everything hidden (again)
             if(event.target.value == "none"){
                document.getElementsByClassName('purchase_section')[0].style.display = 'none';
                document.getElementsByClassName('quantity_section')[0].style.display = 'none';
                document.getElementById("total_fare").style.display = 'none';
                document.getElementById("notes").style.display= 'none';

            }
        });

        function generateRides(trips, price) {
            //reset
            while (document.getElementsByClassName('quantity_section')[0].hasChildNodes() && document.getElementsByClassName('purchase_section')[0].children.length > 1){
                if (document.getElementsByClassName('quantity_section')[0].children.length == 1){
                    break;
                }
                document.getElementsByClassName('quantity_section')[0].removeChild(document.getElementsByClassName('quantity_section')[0].lastChild);
            }
            //create inputs
            var x = document.createElement("input");
            x.setAttribute("type", "number");
            x.min = 0;
            x.max= trips;
            x.required = true;
            x.placeholder= "Max: "+ trips;

            x.addEventListener('change', function(event){
                TotalSetup(price);
            });

            document.getElementsByClassName('quantity_section')[0].appendChild(x);
            document.getElementsByClassName('quantity_section')[0].style.display = 'block';
            adjustButtom();
            document.getElementById('total_fare').style.display = 'block';
            runNotes();
            document.getElementById('notes').style.display = 'block';
        }

        function runNotes(){
            while (document.getElementById('notes').hasChildNodes()){
                document.getElementById('notes').removeChild(document.getElementById('notes').lastChild);
            }

            purchase_notes = null;
            when_notes = null;

            var f = document.getElementById("when");
            g1 = f.value;
            when_notes = key.info[g1];
            purchase_notes = null;
            
            for (var i=0; i<document.getElementsByName("purchase_choice").length; i++)  {
                if (document.getElementsByName("purchase_choice")[i].checked)  {
                
                    purchase_notes = document.getElementsByName("purchase_choice")[i].value;
                    if (purchase_notes.includes(" ")){
                        purchase_notes = purchase_notes.replace(" " , "_");
                    }else {
                        purchase_notes = purchase_notes; 
                    }
                
                }
            }

            purchase_notes = key.info[purchase_notes];


            if (purchase_notes !== null && when_notes !== null){
                var ul=document.createElement('ul');

                var li=document.createElement('li');
                li.innerHTML="Purchase notes: " + purchase_notes;
                ul.appendChild(li);

                
                var li2=document.createElement('li');
                li2.innerHTML="Travel time notes: " + when_notes;
                ul.appendChild(li2);

                document.getElementById('notes').appendChild(ul);

            }

        }

        function adjustButtom() {
            var t = document.getElementsByClassName('quantity_section')[0];
            t = t.clientHeight;
            t = t.toString();
            t += "px";
            document.getElementsByClassName('quantity_section')[0].style.marginBottom = t;
        }

        //Tally 
         function TotalSetup(g) {
             cost = g;
             num_trips = document.getElementsByClassName('quantity_section')[0].children[1].value;
             total = cost * num_trips;
             document.getElementById('price_total').innerText = "$"+total;
         }
            
    };
})();